import	{	Component							,
			ChangeDetectionStrategy				,		
			Input								,								
			ChangeDetectorRef					} 	from 	'@angular/core'

import	{	clAbstractQueryComponent			}	from	"../../../_libs.module/Components/_core/clAbstractQueryComponent"
import	{	Helpers								}	from	"../../../_libs.module/Helpers/Helpers"

import	{	clWeatherService					}	from	"../../../services/weather/clWeatherService"
import	{	Interfaces as WeatherInterfaces		}	from	"../../../services/weather/clWeatherService"

@Component
({
selector	: 'clWeatherLocationQuery'					,
templateUrl	: './clWeatherLocationQueryComponent.html'	,
styleUrls	: ['./clWeatherLocationQueryComponent.scss'],
changeDetection	:ChangeDetectionStrategy.OnPush			,
})

export class	clWeatherLocationQueryComponent	extends	clAbstractQueryComponent<WeatherInterfaces.WeatherLocation[]>
{
@Input()		startDate		:Date	;
@Input()		endDate			:Date	;
@Input()		location		:string	;

				refreshTimer	=new Helpers.Timer(1000);

				currentLocation	:string								;
				queryLocation	:string								;

constructor		(cdr:ChangeDetectorRef,private ws:clWeatherService)
{ 
				super(cdr);
}

// helps html more readable
get locations	():WeatherInterfaces.WeatherLocation[]
{
				return(super.data);
}

onData			(lx:WeatherInterfaces.WeatherLocation[])
{
				super.onData(lx);
				if(this.queryLocation!==this.currentLocation)// mudou durante o pedido,ver linha 65, pedir de novo
				{
					this.refreshTimer.start();
				}
}

onQueryLocation	()
{
				this.queryLocation=this.currentLocation;
				this.queryData(this.ws.queryLocations(this.currentLocation));
}

ngOnChanges		()
{
				if(this.location!==this.currentLocation)
				{
					console.debug("ngOnChanges.changed")
					this.currentLocation=this.location	;
					delete this.data					;
					delete this.lastError				;
					this.cdr.markForCheck()				;
					if(!this.isBusy) // waiting for api
					{
						this.refreshTimer.start	();
					}
				}
}

ngOnInit		()
{
				this.subscribe(this.refreshTimer,()=>this.onQueryLocation());
}

}
