import	{	Component						,
			ChangeDetectionStrategy			,		
			ChangeDetectorRef				,			
			Input							} 	from 	'@angular/core'

import 	{	DateTime						}	from 	'luxon'

import	{	clAbstractQueryComponent		}	 from 	'../../../_libs.module/Components/_core/clAbstractQueryComponent'

import	{	clWeatherService				}	from	"../../../services/weather/clWeatherService"

import	{	Interfaces as WeatherInterfaces	}	from	"../../../services/weather/clWeatherService"
import	{ 	RX,RXOps						}	from	"../../../_core/rxjs/RXJS"

function	delayQueries	(max:number):RX.Observable<number>
{
const q=new RX.Observable<number>(o=>
			{
			const 	tm	=Math.random()*max;
			let 	t	=setTimeout(()=>
				{
					t=undefined;
					o.next		(tm);
					o.complete	();
				},tm);

				return(()=>
				{
					// handle unsubscribe
					if(t)
					{
						debugger;
						clearTimeout(t);
					}
				});
			});
			return(q);
}




@Component
({
selector	: 'clWeatherDayQuery'						,
templateUrl	: './clWeatherDayQueryComponent.html'		,
styleUrls	: ['./clWeatherDayQueryComponent.scss']		,
changeDetection	:ChangeDetectionStrategy.OnPush			,
})

export class	clWeatherDayQueryComponent	extends	clAbstractQueryComponent<WeatherInterfaces.WeatherInfo[]>
{
@Input()			date		:Date								;	
@Input()			location	:WeatherInterfaces.WeatherLocation	;

currentDate			:Date								;
currentLocation		:number								;

dateTitle			:string								="";

isVisible			:boolean							;
hasWeather			:boolean							;
weather				:WeatherInterfaces.WeatherInfo		;

constructor		(cdr:ChangeDetectorRef,public ws:clWeatherService)
{ 
				super(cdr);
}


onData			(d:WeatherInterfaces.WeatherInfo[])
{
				super.onData(d);
				// O tempo a mostrar é o primeiro da lista pois é o mais recente logo o mais fiavel
				this.hasWeather			=true;
				this.weather			=d.length?d[0]:undefined;
				this.currentDate		=this.date				;
				this.currentLocation	=this.location?.woeid	;
}

updateDateTitle	()
{
const dt=DateTime.fromJSDate(this.date);
const w=dt.weekdayLong.slice(0,3)	;
const d=dt.day						;
const m=dt.monthLong.slice(0,3)		;
const y=dt.year						;

				this.dateTitle=[w,d,m,y].join(" ");
}

doQuery			()
{
				this.updateDateTitle();
				this.queryData(delayQueries(1500).pipe(RXOps.switchMap(r=>this.ws.getWeather(this.location,this.date))));
}

onVisible		()
{
				this.isVisible=true;
				this.doQuery();
}



ngOnChanges		()
{
				if(this.isVisible)
				{
					if(this.date!==this.currentDate || this.location?.woeid!==this.currentLocation)
					{
						this.doQuery();
					}
				}
}

}
