
import	{	Directive, ElementRef, EventEmitter	,Output	}	from 	'@angular/core';

@Directive
({
  selector: '[clVisibleObserver]',
})

export class clVisibleObserverDirective
{
@Output		()	clVisibleObserver=new EventEmitter();

constructor	(er: ElementRef<any>) 
{ 
const ne=er.nativeElement;
			if(ne)
			{
			const 	o=new IntersectionObserver(ex=>
				{
					for(const e of ex)
					{
						if(e.target===ne && e.isIntersecting)
						{
							o.unobserve(ne);
							this.clVisibleObserver.emit(true);
						}
					}
				});
				o.observe(ne);
			}
}

}
