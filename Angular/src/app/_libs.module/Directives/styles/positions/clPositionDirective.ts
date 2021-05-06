
import	{	Directive, ElementRef, Input, OnChanges	}	from 	'@angular/core';


function	setPos(ne:HTMLElement,p:string)
{
			if(p==="t" || p==="top" || p==="topMost") 
			{
				ne.style.zIndex="9999";
			}
			else
			if(p==="b" || p==="bot" || p==="bottomMost") 
			{
				ne.style.zIndex="-1";
			}
			else
			if(p==="m" || p==="mid" || p==="middle")
			{
				ne.style.zIndex="5000";
			}
			else
			if(p==="o" || p==="overlay") // overlay
			{
				ne.style.position		="absolute";
				ne.style.top			="0";
				ne.style.bottom			="0";
				ne.style.left			="0";
				ne.style.right			="0";
				ne.style.margin			="auto";
				ne.style.maxWidth		="100%";
				ne.style.maxHeight		="100%";  
				ne.style.overflow		="hidden";
			}
			else
			if(p==="r" || p==="relative") 
			{
				ne.style.position		="relative";
			}
			else
			if(p==="a" || p==="absolute") 
			{
				ne.style.position		="absolute";
			}
}

@Directive
({
  selector: '[clPos]',
})

export class clPositionDirective	implements	OnChanges
{
@Input	()	clPos:string;
constructor	(private el: ElementRef) 
{ 
}

ngOnChanges	()
{
let 	p=this.clPos;
			if(typeof p==="string")
			{
			const px=p.toLowerCase().split(" ");
				for(let pi of px)
				{
					setPos(this.el.nativeElement,pi);
				}
			}
}


}
