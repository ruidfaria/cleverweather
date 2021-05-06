
import	{	Directive, ElementRef, Input, Renderer2, OnChanges	}	from 	'@angular/core';




@Directive
({
  selector: '[clOpacity]',
})

export class clOpacityDirective	implements	OnChanges
{
@Input	()	clOpacity:number;
constructor	(private r:Renderer2,private el: ElementRef) {}


ngOnChanges	()
{
const ne:HTMLElement=this.el.nativeElement;
			this.r.setStyle(ne,"opacity",this.clOpacity.toString());
}


}

