
import	{	Directive, ElementRef, Input, OnInit, Renderer2, RendererStyleFlags2, OnChanges	}	from 	'@angular/core';


declare type	kMarginType="margin"|"marginLeft"|"marginRight"|"marginTop"|"marginBottom"|"padding"|"paddingLeft"|"paddingRight"|"paddingTop"|"paddingBottom";


function	marginLeft	(mp:"margin"|"padding"):"marginLeft"|"paddingLeft"
{
			return(mp+"Left" 	as any);
}

function	marginRight	(mp:"margin"|"padding"):"marginRight"|"paddingRight"
{
			return(mp+"Right" 	as any);
}


function	marginTop	(mp:"margin"|"padding"):"marginTop"		|"paddingTop"
{
			return(mp+"Top" 	as any);
}

function	marginBottom(mp:"margin"|"padding"):"marginBottom"	|"paddingBottom"
{
			return(mp+"Bottom" 	as any);
}

function	setMarginsEx(r:Renderer2,e:HTMLElement,mp:"margin"|"padding",s:string|number)
{
const 		mpx	:kMarginType[]=[];
let			f:RendererStyleFlags2=0;

			if(typeof s==="string")
			{
				s=s.replace("vw","VW");
				s=s.replace("vh","VH");


				if(s.indexOf("!i")>=0)
				{
					s=s.replace("!i","");
					f|=RendererStyleFlags2.Important;
				}

				if(s.indexOf("h")>=0)
				{
					s=s.replace("h","");
					mpx.push(marginLeft		(mp));
					mpx.push(marginRight	(mp));
				}

				if(s.indexOf("v")>=0)
				{
					s=s.replace("v","");
					mpx.push(marginTop		(mp));
					mpx.push(marginBottom	(mp));
				}

				if(s.indexOf("l")>=0)
				{
					s=s.replace("l","");
					mpx.push(marginLeft		(mp));
				}

				if(s.indexOf("r")>=0)
				{
					s=s.replace("r","");
					mpx.push(marginRight	(mp));
				}

				if(s.indexOf("t")>=0)
				{
					s=s.replace("t","");
					mpx.push(marginTop		(mp));
				}

				if(s.indexOf("b")>=0)
				{
					s=s.replace("b","");
					mpx.push(marginBottom	(mp));
				}

				s=s.toLowerCase();
			}

			if(mpx.length===0)
			{
				mpx.push(mp)
			}

			if(!isNaN(s as any))
			{
				s=parseFloat(s as string);
				if(s!==0)
				{
					s=s+"em";
				}
			}


			for(const m of mpx)
			{
				r.setStyle(e,m,s,f);

				//e.style[m]=s+i;
			}
}

function	setMargins	(r:Renderer2,e:HTMLElement,mp:"margin"|"padding",s:string|number)
{
			if(e)
			{
				if(typeof s==="number")
				{
					setMarginsEx(r,e,mp,s.toString());
				}
				else
				if(typeof s==="string")
				{
				const sx=s.toLowerCase().split(" ");
					for(const ss of sx)
					{
						setMarginsEx(r,e,mp,ss);
					}
				}
			}
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////

@Directive
({
  selector: '[clM]',
})

export class clMarginDirective	implements	OnChanges
{
@Input	()	clM:string|number;
constructor	(private r:Renderer2,private el: ElementRef,) {}
ngOnChanges	()
{
			setMargins(this.r,this.el.nativeElement,"margin",this.clM);
}
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////

@Directive
({
  selector: '[clP]',
})

export class clPaddingDirective	implements	OnChanges
{
@Input	()	clP:string|number;
constructor	(private r:Renderer2,private el: ElementRef) {}
ngOnChanges	()
{
			setMargins(this.r,this.el.nativeElement,"padding",this.clP);
}
}

