import	{	ChangeDetectorRef			}	from	"@angular/core"


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
