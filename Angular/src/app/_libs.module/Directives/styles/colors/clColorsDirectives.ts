
import	{	Directive, ElementRef, Input, OnInit, Renderer2, OnChanges	}	from 	'@angular/core';

function	setColor	(r:Renderer2,e:HTMLElement,c:"color"|"backgroundColor",v:string)
{
			if(e && v!==undefined)
			{
				r.setStyle(e,c,v);
			}
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////

@Directive
({
  selector: '[clC]',
})

export class clColorDirective	implements	OnChanges
{
@Input	()	clC:string;
constructor	(private r:Renderer2,private el: ElementRef) {}
ngOnChanges()
{
			setColor(this.r,this.el.nativeElement,"color",this.clC);
}
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////

@Directive
({
  selector: '[clBC]',
})

export class clBackgroundColorDirective	implements	OnChanges
{
@Input	()	clBC:string;
constructor	(private r:Renderer2,private el: ElementRef) {}
ngOnChanges	()
{
			setColor(this.r,this.el.nativeElement,"backgroundColor",this.clBC);
}
}
