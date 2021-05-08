import	{	ChangeDetectorRef, Directive				,
			OnDestroy				}			from "@angular/core"
import { RX } from "src/app/_core/rxjs/RXJS";

import	{	Helpers					}			from	"../../../_libs.module/Helpers/Helpers"

import	{	clAbstractComponent		}			from	"./clAbstractComponent"

@Directive()
export class	clAbstractQueryComponent<T>	extends	clAbstractComponent
{
lastError		:Error	;
data			:T		;
isBusy			:boolean;
busyCounter		:number=0;// for testing

constructor		(protected cdr:ChangeDetectorRef)
{ 
				super();
}

get hasError	():boolean
{
				return(!!this.lastError)
}

get errorTitle	():string
{
				return(Helpers.Error.title(this.lastError));
}

onError			(e:Error)
{	
				this.lastError	=e;
				this.isBusy		=false;
				this.cdr.markForCheck	();
}

get hasData		():boolean
{
				return(!!this.data)
}

onData			(d:T)
{
				this.data		=d;
				this.isBusy		=false;
				this.cdr.markForCheck	();
}

queryData		(o:RX.Observable<T>)
{
				this.busyCounter++;
				this.isBusy		=true;
				super.subscribe(o,d=>this.onData(d),e=>this.onError(e));
				this.cdr.markForCheck();
}

}
