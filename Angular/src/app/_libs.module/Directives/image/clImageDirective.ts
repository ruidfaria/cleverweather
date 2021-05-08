
import	{	Directive, ElementRef, Input, OnInit, OnChanges, Renderer2	}	from 	'@angular/core';


function	url(image:string)
{
const u="url("+image+")";

			//console.info("utlImage:",u)

			return(u);
}

@Directive
({
  selector: '[clImage]',
})

export class clImageDirective	implements	OnChanges
{
@Input	()	clImage:string;
constructor	(private r:Renderer2,private el: ElementRef) {}

ngOnChanges	()
{
const e:HTMLImageElement=this.el.nativeElement;

			this.r.setStyle(e,"backgroundRepeat"	,"no-repeat"		);
			this.r.setStyle(e,"backgroundPosition"	,"center"			);
			this.r.setStyle(e,"backgroundSize"		,"contain"			);
			this.r.setStyle(e,"backgroundImage"		,url(this.clImage)	);
}
}
