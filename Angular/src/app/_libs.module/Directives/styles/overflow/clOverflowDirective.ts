
import	{	Directive, ElementRef, Input, OnInit, Renderer2, OnChanges	}	from 	'@angular/core';


function	set(r:Renderer2,ne:HTMLElement,o:"overflowY"|"overflowX"|"overflow",v:string|number)
{
			if(typeof v==="string")
			{

				if(v.indexOf("a")===0) v="auto"		;
				if(v.indexOf("h")===0) v="hidden"	;

				r.setStyle(ne,o,v);
			}

			r.setStyle(ne,o,v);
}

@Directive
({
  selector: '[clOverflow]',
})

export class clOverflowDirective	implements	OnChanges
{
@Input	()	clOverflow:string;
constructor	(private r:Renderer2,private el: ElementRef)
{
}

ngOnChanges	()
{
const 	ne:HTMLElement=this.el.nativeElement;
let 	v=this.clOverflow;
		if(typeof v ==="string")
		{
		let vx:string[];
			v=this.clOverflow.toString().toLowerCase();
			vx=v.split(" ");

			for(const vi of vx)
			{
				if(vi.indexOf("x")>=0)
				{
					set(this.r,ne,"overflowX",vi.replace("x",""));
				}
				else
				if(vi.indexOf("y")>=0)
				{
					set(this.r,ne,"overflowY",vi.replace("y",""));
				}
				else
				{
					set(this.r,ne,"overflow",vi);
				}
			}
		}
		else
		{
			set(this.r,ne,"overflow",v);
		}

}
}

