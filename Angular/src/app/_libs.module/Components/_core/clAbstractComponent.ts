import	{	Directive		,
			OnDestroy		}			from "@angular/core"
import	{	rxObject		}			from	"../../../_core/rxjs/rxObject"

@Directive()
export class	clAbstractComponent	extends	rxObject	implements	OnDestroy
{

ngOnDestroy			()
{
					// 2021.05.05
					// RF:
					// never forget to unsubscribe observables
					super.unsubscribeAll();
}

}
