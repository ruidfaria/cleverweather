import	{	Component						,
			ChangeDetectionStrategy			,		
			ChangeDetectorRef				,			
			Input,							
			OnChanges} 	from 	'@angular/core'

import	{	clAbstractComponent				}	 from 	'../../../_libs.module/Components/_core/clAbstractComponent'

import	{	clWeatherService				}	from	"../../../services/weather/clWeatherService"
import	{	Interfaces as WeatherInterfaces	}	from	"../../../services/weather/clWeatherService"

import 	{	DateTime						}	from 'luxon'

declare	type	WeekDays		=Date[];


@Component
({
selector	: 'clWeatherLocation'						,
templateUrl	: './clWeatherLocationComponent.html'		,
styleUrls	: ['./clWeatherLocationComponent.scss']		,
changeDetection	:ChangeDetectionStrategy.OnPush	,
})

export class	clWeatherLocationComponent	extends	clAbstractComponent	implements	OnChanges
{
@Input()		startDate	:Date								;
@Input()		endDate		:Date								;	
@Input()		location	:WeatherInterfaces.WeatherLocation	;

weeks			:WeekDays[]	=[];

constructor		(private cdr:ChangeDetectorRef)
{ 
				super();
}


ngOnChanges		()
{
let 	sd		=DateTime.fromJSDate(this.startDate);
const 	ed		=DateTime.fromJSDate(this.endDate);
let		cd		=sd;
const 	dc		=ed.diff(sd,["days"]).days;
let		days:Date[]=[];
		this.weeks=[];

		for(let d=0;d<dc;d++)
		{
			days.push(cd.toJSDate());
			// ver em blocos semanais é mais user friendly
			if(days.length===7)
			{
				this.weeks.push(days);
				days=[];
			}

			cd=cd.plus({day:1});
		}
		this.cdr.markForCheck();
}



}