import { RX } from "../../../_core/rxjs/RXJS"

export	class	clTimer	extends RX.Subject<number>
{
timer	:any	;
counter	:number	=0;
constructor	(private time:number=500,private recursive:boolean=false)
{
			super()
}

stop		()
{
			if(this.timer)
			{
				clearTimeout(this.timer);
				delete this.timer;
			}
}

restart		()
{
			this.stop		();
			this.timer		=setTimeout(()=>
			{
				this.next(++this.counter);
				if(this.recursive)
				{
					this.restart();
				}
			},this.time);

}

start		(time?:number,recursive?:boolean)
{
			if(time!==undefined) 
			{
				this.time=time;
			}

			if(recursive!==undefined) 
			{
				this.recursive=recursive;
			}

			this.restart	();
}




}