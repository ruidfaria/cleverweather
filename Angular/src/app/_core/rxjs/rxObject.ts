
import	{	Observable		,
			Subscription	}			from	"rxjs"

function	ctxUnsubscribe	(ctxSubscriptions:{[id:string]:Subscription},ctx:string,subscription:Subscription)
{
			if(ctxSubscriptions[ctx])
			{
				ctxSubscriptions[ctx].remove(subscription);
			}
}



// 2021.05.05
// RF:shared by components and services

export class	rxObject
{
subscriptions	:{[id:string]:Subscription}={};
constructor		()
{ 
}

ctxSubscribe<T>	(ctx:string,observable:Observable<T>,next?:(data:T)=>void,_error?:(error:Error)=>void,completes?:()=>void)
{
let 			subscription:Subscription;

				subscription=observable.subscribe(
					(data:T)=>
					{
						try
						{
							if(next)
							{
								next(data);
							}
						}
						catch(e)
						{
							console.error(e);
						}
					},
					(err:Error)=>
					{
						//console.error("RXJS.error:",err);
						ctxUnsubscribe(this.subscriptions,ctx,subscription);
						if(err && _error)
						{
							_error(err);
						}

					},
					()=>
					{
						console.debug("RXJS.completes");
						ctxUnsubscribe(this.subscriptions,ctx,subscription);
						if(completes)
						{
							completes();
						}
					})

				if(!subscription.closed)
				{
					if(!this.subscriptions[ctx])
					{
						this.subscriptions[ctx]=new Subscription();
					}
					this.subscriptions[ctx].add(subscription);
				}
				return(subscription);
}

ctxUnsubscribe	(ctx:string)
{
				if(this.subscriptions[ctx])
				{
					this.subscriptions[ctx].unsubscribe();
					delete this.subscriptions[ctx];
				}
}

subscribe<T>	(observable:Observable<T>,next?:(data:T)=>void,_error?:(error:Error)=>void,completes?:()=>void)
{
				return(this.ctxSubscribe("global",observable,next,_error));
}

unsubscribeAll	()
{
const ctxList=Object.keys(this.subscriptions);
				ctxList.forEach(ctx=>this.ctxUnsubscribe(ctx));
				this.subscriptions={}
}

}
