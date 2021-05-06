

import			{ ElementRef, Input, HostBinding, ChangeDetectorRef, HostListener, Directive, OnChanges, OnDestroy, OnInit } 	from 	"@angular/core"

import			{	ControlValueAccessor	,
					NgControl				}	from	"@angular/forms"

import			{ 	FocusMonitor	 		} 	from 	"@angular/cdk/a11y"
import			{	coerceBooleanProperty	}	from	'@angular/cdk/coercion'

import			{	MatFormFieldControl		}	from	"@angular/material/form-field"

import			{	Subject					}	from	"rxjs"

import			{	rxObject				}	from	 "../../../_core/rxjs/rxObject"

@Directive()
export abstract	class clAbstractInput<T>	extends	rxObject	implements OnChanges,OnInit,OnDestroy,ControlValueAccessor, MatFormFieldControl<T>	
{

static		instance		:number			=0;

_placeholder	:string									;
_required		:boolean			=false				;
_disabled		:boolean			=false				;

focused			:boolean			=false				;
over			: boolean			=false				;

onChange							= (_: any) 	=> {}	;
onTouched							= () 		=> {}	;

controlType		:string									;
id				:string									;
stateChanges 	:Subject<void>							;
describedBy		:string=''								;

_emptyValue		:T										;
_defaultValue	:T										;

writeCache		:T										;
initialized		:boolean								;

get errorState(): boolean 
{
	if(this.ngControl.control)
	{
		return(!this.ngControl.control.valid && this.ngControl.control.touched);
	}
	return(false);
}

constructor	(type:string,public elRef: ElementRef,public fm: FocusMonitor,public ngControl: NgControl)
{
			super()																			;
			this.controlType	="input."+type												;
			this.id				=this.controlType+"@"+String(clAbstractInput.instance++)	;
			this.stateChanges	=new Subject<void>		()	;
			this._emptyValue	=this.inputEmpty		()	;
			this._defaultValue	=this.inputDefault		()	;
			this.initialized	=false						;
			this.fm.monitor(this.elRef, true).subscribe(origin => 
			{
				if (this.focused && !origin) 
				{
					this.onTouched();
					this.onInputLostFocus();
				}

				this.focused = !!origin;

				console.debug("Focused:",this.focused)
				this.stateChanges.next();
				
   			 });

			if (this.ngControl != null) 
			{
      			this.ngControl.valueAccessor = this;
    		}
}

@HostListener	('mouseenter') 
onMouseEnter	() 
{
				console.debug("over=true");
    			this.over		=true;
				this.stateChanges.next();
}

@HostListener	('mouseleave') 
onMouseLeave() 
{
				console.debug("over=false");
    			this.over		=false;
				this.stateChanges.next();
}

@Input			()
get placeholder	()	: string
{
				return this._placeholder; 
}

set placeholder	(value: string) 
{
				this._placeholder = value;
				this.stateChanges.next();
}

 @Input()
get	required	()	: boolean
{
				return this._required; 
}

set	required	(value: boolean) 
{
    			this._required = coerceBooleanProperty(value);
    			this.stateChanges.next();
}

@Input			()
get	disabled	(): boolean
{				
				return this._disabled; 
}

set	disabled	(value: boolean) 
{
				this._disabled = coerceBooleanProperty(value);
				if(this._disabled)
				{
					this.onInputDisable	();
				}
				else
				{
				 	this.onInputEnable	();
				}
				this.stateChanges.next();
}

@Input()
get				value()	: T | null 
{
const			inputGet=this.inputGet();
	    		return inputGet;
}

set				value	(inputSet: T | null) 
{
				if(inputSet===undefined || inputSet===null)
				{
					if(this._emptyValue===null)
					{
						inputSet=this._defaultValue;
					}
				}

				this.inputSet(inputSet);
		 		this.stateChanges.next();
}

get						empty			() 
{
						return(this.inputIsEmpty());
}

get						shouldLabelFloat	()
{
						return (this.focused || !this.inputIsEmpty()); 
}

writeValue				(value: T | null): void 
{
						if(this.initialized)
						{
							this.inputSet(value);
						}
						else
						{
							this.writeCache=value;
						}
}

registerOnChange		(fn: any): void 
{
						this.onChange = fn;
}

registerOnTouched		(fn: any): void 
{
						this.onTouched = fn;
}

setDisabledState		(isDisabled: boolean): void 
{
						this.disabled = isDisabled;
}

setDescribedByIds		(ids: string[]) 
{
						this.describedBy = ids.join(' ');
}

onContainerClick		(event: MouseEvent) 
{
						this.onInputFocus(event);
}


// *****************************
// *** TO OVERRIDE 			****
// *****************************


onInputFocus	(event: MouseEvent)
{
				if((event.target as Element).tagName.toLowerCase() != 'input') 
				{
				const input=this.elRef.nativeElement.querySelector('input');
					if(input)
					{
						input.focus();
					}
				}
}

onInputLostFocus()
{	
}

onInputEnable	()				:	void
{
}

onInputDisable	()				:	void
{
}

inputEmpty		()				:T
{
				return(null);
}

inputDefault	()				:T
{
				return(null);
}

inputFromValue	(value:T	)	:any
{
				return(value);
}

inputToValue	(input:any	)	:T
{
				return(input);
}

inputIsEmpty	()	:	boolean
{
const	value=this.inputGet();
				if(value!==undefined && value!==null && value!==this._emptyValue)
				{
					return(false);
				}
				return(true);
}

abstract	inputGet		()				:	T|null;
abstract	inputSet		(value:T|null) 	: void;
			
			
inputSetCache	(value:T)
{

}

markForCheck		(cdr:ChangeDetectorRef)
{
					setTimeout(()=>
					{
						cdr.markForCheck();
						cdr.detectChanges();
					},0);
}


ngOnChanges				()
{
						this._defaultValue	=this.inputDefault		()	;
}

ngOnInit				()
{
						this.initialized	=true;
						if(this.writeCache!==undefined)
						{
							this.inputSet	(this.writeCache);
							this.writeCache=undefined;
						}
}

ngOnDestroy				()
{
						this.stateChanges.complete	();
						this.fm.stopMonitoring		(this.elRef);
						this.unsubscribeAll			();
}

}
