
import	{	Directive, ElementRef, Input, OnInit, Renderer2, RendererStyleFlags2, OnChanges	}	from 	'@angular/core';



function	maxSize		(sz:"height"|"width"):"max-height"|"max-width"
{
			return("max-"+sz as any);
}

function	minSize		(sz:"height"|"width"):"max-height"|"max-width"
{
			return("min-"+sz as any);
}


function	setSizes	(r:Renderer2,e:HTMLElement,sz:"height"|"width",s:string|number)
{
			if(s===undefined) return;


			if(s===100 || (!isNaN(s as any) && parseFloat(s as any)===100))
			{
				s="100%"
			}


			if(e)
			{
			//const 	szx	:("height"|"width"|"maxHeight"|"maxWidth")[]=[];
			const 	szx	:("height"|"width"|"max-height"|"max-width")[]=[];
			let 	v	:string|number;
			let		f	:RendererStyleFlags2=0;
			let 	sp	:string="em";

				if(typeof s==="number")
				{
					v=s.toString()+sp;
				}
				else
				if(typeof s==="string")
				{
					s=s.toLowerCase();

					if(s==="auto")
					{
						r.setStyle(e,sz				,"auto"	,RendererStyleFlags2.Important);
						r.setStyle(e,minSize(sz)	,"0"	,RendererStyleFlags2.Important);
						return;
					}


					if(s.indexOf("min")>=0)
					{
						s=s.replace("min","");
						szx.push(minSize(sz));
					}

					if(s.indexOf("max")>=0)
					{
						s=s.replace("max","");
						szx.push(maxSize(sz));
					}

					if(s.indexOf("fix")>=0)
					{
						s=s.replace("fix","");
						szx.push(minSize(sz));
						szx.push(maxSize(sz));
					}

					if(s.indexOf("!i")>=0)
					{
						s=s.replace("!i","");
						f|=RendererStyleFlags2.Important;
					}

					if(s.indexOf("calc")<0)
					{
						if(s.indexOf("px")>=0)
						{
							s=s.replace("px","");
							sp="px";
						}

						if(s.indexOf("m")>=0)
						{
							s=s.replace("m","");
							szx.push(minSize(sz));
						}

						if(s.indexOf("x")>=0)
						{
							s=s.replace("x","");
							szx.push(maxSize(sz));
						}

						if(s.indexOf("f")>=0)
						{
							s=s.replace("f","");
							szx.push(minSize(sz));
							szx.push(maxSize(sz));
						}

						if(s.indexOf(" ")>=0)
						{
							while(s.indexOf(" ")>=0)
							{
								s=s.replace(" ","");
							}
							szx.push(sz);
						}
					}
					else
					{
						console.debug("clSizeCalc",s);
						//e.style.backgroundColor="#00ff0010";
					}

					v=s;

					if(v.length===0)
					{
						v="100%"
					}
				}
				else
				{
					v="100%"
				}

				if(!isNaN(v as any))
				{
					v=parseFloat(v as any);
					if(v!==0)
					{
						v=v+sp;
					}
				}

				if(szx.length===0)
				{
					szx.push(sz)
				}


				for(const s of szx)
				{
					r.setStyle(e,s,v as string,f);
				}
			}
}

function	setSizeSizes	(r:Renderer2,e:HTMLElement,v:string|number)
{
			if(typeof v==="string" && v.indexOf(",")>=0)
			{
			const vx=v.split(",")
				if(vx.length===2)
				{
					if(vx[0])
					{
						setSizes(r,e,"width"	,vx[0]);
					}
					if(vx[1])
					{
						setSizes(r,e,"height"	,vx[1]);
					}
				}
			}
			else
			{
				setSizes(r,e,"width"	,v);
				setSizes(r,e,"height"	,v);
			}
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////


@Directive
({
  selector: '[clH]',
})

export class clHeightDirective	implements	OnChanges
{
@Input	()	clH:string|number;
constructor	(private r:Renderer2,private el: ElementRef) {}
ngOnChanges	()
{
			setSizes(this.r,this.el.nativeElement,"height",this.clH);
}
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////


@Directive
({
  selector: '[clHFix]',
})

export class clHeightFixDirective	implements	OnChanges
{
@Input	()	clHFix:string|number;
constructor	(private r:Renderer2,private el: ElementRef) {}
ngOnChanges	()
{
			setSizes(this.r,this.el.nativeElement,"height",this.clHFix+"fix");
}
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////

@Directive
({
  selector: '[clW]',
})

export class clWidthDirective	implements	OnChanges
{
@Input	()	clW:string|number;
constructor	(private r:Renderer2,private el: ElementRef) {}
ngOnChanges	()
{
			setSizes(this.r,this.el.nativeElement,"width",this.clW);
}
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////

@Directive
({
  selector: '[clWFix]',
})

export class clWidthFixDirective	implements	OnChanges
{
@Input	()	clWFix:string|number;
constructor	(private r:Renderer2,private el: ElementRef) {}
ngOnChanges	()
{
			setSizes(this.r,this.el.nativeElement,"width",this.clWFix+"fix");
}
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////

@Directive
({
  selector: '[clSize]',
})

export class clSizeDirective	implements	OnChanges
{
@Input	()	clSize:string|number;
constructor	(private r:Renderer2,private el: ElementRef) {}
ngOnChanges	()
{
			setSizeSizes(this.r,this.el.nativeElement,this.clSize)
}
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////

@Directive
({
  selector: '[clSizeFix]',
})

export class clSizeFixDirective	implements	OnChanges
{
@Input	()	clSizeFix:string|number;
constructor	(private r:Renderer2,private el: ElementRef) 
{

}
ngOnChanges	()
{
			setSizeSizes(this.r,this.el.nativeElement,this.clSizeFix+"fix")
}
}
