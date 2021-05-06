import	{	Component					,
			ChangeDetectionStrategy		,		
			ViewChild,					
			ChangeDetectorRef} 	from 	'@angular/core'

import 	{	DateTime					}	from 'luxon'


import	{	clAbstractComponent			}	from	"../../_libs.module/Components/_core/clAbstractComponent"
import	{	clStringTableDirective		}	from	"../../_libs.module/Directives/stringTable/clStringTableDirective"

import	{	Interfaces					}	from	"../../_libs.module/Interfaces/Interfaces"

import	{	clWeatherService			}	from	"../../services/weather/clWeatherService"

@Component
({
selector	: 'clWeatherPage'						,
templateUrl	: './clWeatherPageComponent.html'		,
styleUrls	: ['./clWeatherPageComponent.scss']		,
changeDetection	:ChangeDetectionStrategy.OnPush		,
})




export class	clWeatherPageComponent	extends	clAbstractComponent
{
//@ViewChild	("locationsTable"		,{static:true,read:clStringTableDirective})	_locationsTable		:clStringTableDirective;
@ViewChild	("weeksTable"			,{static:true,read:clStringTableDirective})	_weeksTable			:clStringTableDirective;

startDate	:Date		;
endDate		:Date		;
minDate		:Date		;
maxDate		:Date		;

locationValue	:string					="lisbon"	;

weeksValue		:string					="1"		;
weeksCombo		:Interfaces.StringItem[]=[]			;

constructor		(private cdr:ChangeDetectorRef)
{ 
				super();
}

filterWeeks		()
{
const dmin	=DateTime.fromJSDate(this.startDate	);
const dmax	=DateTime.fromJSDate(this.maxDate	);
const mw	=dmax.diff(dmin,["days"]).days/7;

			this.weeksCombo=this._weeksTable.items.filter(i=>parseInt(i.id)<=mw);
}

onDateChanged	()
{
const	sd		=DateTime.fromJSDate(this.startDate	);
const	md		=DateTime.fromJSDate(this.maxDate	)
const 	ud		=sd.plus			({days:parseInt(this.weeksValue)*7});

				this.endDate=DateTime.min(md,ud).toJSDate();
}

get date		():Date
{
				return(this.startDate);
}

set date		(d:Date)
{
				this.startDate=d;
				this.onDateChanged	();
				this.filterWeeks	();
}

get location	():string
{
				return(this.locationValue);
}

set location	(l:string)
{
				this.locationValue=l;
				console.debug("setLocation",this.locationValue);
}


get weeks		():string
{
				return(this.weeksValue);
}


set weeks		(weeks:string)
{
				this.weeksValue=weeks;
				this.onDateChanged	();
}

ngOnInit		()
{
				this.startDate			=new Date()	;

				this.minDate			=DateTime.fromObject	({year:clWeatherService.minYear(),month:1,day:1}					).toJSDate();
				this.maxDate			=DateTime.fromJSDate	(this.startDate).plus({days:clWeatherService.maxDays()}				).toJSDate();

				this.onDateChanged		();
}

ngAfterViewInit	()
{
				// delay fill of weeks comobo to avoid angular render check error
				setTimeout(()=>
				{
					this.filterWeeks		();
					this.cdr.markForCheck	();
				},0);
}

}
