import			{ ElementRef, ChangeDetectorRef, Directive } 	from 	"@angular/core"

import			{	FormBuilder, FormGroup	,
					NgControl				}	from	"@angular/forms"

import			{ 	FocusMonitor	 		} 	from 	"@angular/cdk/a11y"

import			{	clAbstractInput			}	from	 "./clAbstractInput"

@Directive()
export abstract	class clAbstractStaticInput<T>	extends	clAbstractInput<T>
{
_input			:T;
constructor		(type:string, elRef: ElementRef, fm: FocusMonitor, ngControl: NgControl,public cdr:ChangeDetectorRef)
{
				super(type, elRef, fm, ngControl);

}

ngDisabled		():any
{
				if(this.disabled)
				{
					return({["pointer-events"]: "none"});
				}
				else
				{	
					return({["cursor"]:"pointer"});
				}
				return({});
}




inputGet		()	:	T|null
{
				return(this._input);
}

inputSet		(_input:T|null)
{
				this.inputSetCache(_input);
				this._input=_input;
				this.cdr.markForCheck();
}

get	input		()	:	any
{
const 	value	=this.inputGet		(		);
const 	input	=this.inputFromValue(value	);
				return(input);
}

set	input		(input:any)
{
const 	value	=this.inputToValue	(input	);
				this.inputSet(value);
				this.onChange(this.inputGet());
}

}
