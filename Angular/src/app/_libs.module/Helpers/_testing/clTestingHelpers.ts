import	{	ChangeDetectorRef			}	from	"@angular/core"
import		* as Contents					from	"./contents/Contents"
export	{	Contents					}
export	interface Data
{
id		:number	;
name	:string	;
}

function	inc(counters:{[id:string]:number},id:string):void
{
const	c=counters[id]||0;
		counters[id]=c+1;
}

export	class	ChangeDetectorRefStub	extends	ChangeDetectorRef
{
counters:{[id:string]:number}={};


markForCheck	(): void{inc(this.counters,"markForCheck");};
detach			(): void{inc(this.counters,"detach");};
detectChanges	(): void{inc(this.counters,"detectChanges");};
checkNoChanges	(): void{inc(this.counters,"checkNoChanges");};
reattach		(): void{inc(this.counters,"reattach");};
}


export	function	ErrorInstance	()	:Error
{
			return(new Error("ErrorStub"));
}

export	function	DataInstance	(count:number=1)	:Data[]
{
const 	d:Data[]=[];
		for(let i=0;i<count;i++)
		{
		const 	r=Math.ceil(Math.random()*1000);
			d.push({id:r,name:"name "+r.toString});
		}

		return(d);
}

export	function	DataAddPrefix	(prefix:string,data:any):any
{
const 	d:any={};
const 	keys=Object.keys(data);
		for(const k of keys)
		{
			d[prefix+"."+k]=data[k];
		}
		return(d);
}

export	function	sleep(time:number):Promise<void>
{
const p	=new Promise<void>((resolve,reject)=>
			{
				setTimeout(()=>
				{
					resolve();
				},time);
			});
		return(p);
}