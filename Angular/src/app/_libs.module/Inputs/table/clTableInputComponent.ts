
import		{	Component,ElementRef	,
				ChangeDetectionStrategy	,
				Optional				,
				Self					,					
				Input					,
				ChangeDetectorRef		,		
				OnInit					,
				OnDestroy,				
				OnChanges}	from 	'@angular/core'	

import 		{ 	NgControl				} 	from 	'@angular/forms'
import		{	MatFormFieldControl		 }	from '@angular/material/form-field';


import 		{ 	FocusMonitor 			} 	from 	'@angular/cdk/a11y'

import		{	Interfaces				} 	from '../../Interfaces/Interfaces';

import		{	clAbstractStaticInput	}	from	"../_core/clAbstractStaticInput"
//import		{	clStringTableDirective	}	from	"../../Directives/stringTable/clStringTableDirective"

@Component
({
selector		: 'clTableInput'						,
templateUrl		: './clTableInputComponent.html'		,
styleUrls		: ['./clTableInputComponent.scss'	]	,
changeDetection	: ChangeDetectionStrategy.OnPush		,
providers		:[{provide: MatFormFieldControl, useExisting: clTableInputComponent}],
})

export class	clTableInputComponent  	extends	clAbstractStaticInput<string>		implements	OnInit,OnDestroy,OnChanges
{
@Input	()	items		:Interfaces.StringItem[]=[]	;

constructor	(elRef: ElementRef,fm: FocusMonitor,@Optional() @Self() ngControl: NgControl,cdr:ChangeDetectorRef)
{
			super("tableInput",elRef,fm,ngControl,cdr);
}

}
