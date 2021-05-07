import	{	Component						,
			ChangeDetectionStrategy			,		
			ChangeDetectorRef				,			
			Input							} 	from 	'@angular/core'

import	{	clAbstractComponent				}	from 	'../../../_libs.module/Components/_core/clAbstractComponent'

import	{	clWeatherService				}	from	"../../../services/weather/clWeatherService"

import	{	Interfaces as WeatherInterfaces	}	from	"../../../services/weather/clWeatherService"

function	formatTemp	(t:number):string
{
			return(Math.ceil(t*10+.5)/10).toString();
}

function	normalizeCompass	(c:string):string
{
			c=c.toUpperCase();
			c=c.replace("B","b");
			return(c);
}
function	assetsFile	(f:string):string
{
			return("/assets/"+f);
}

@Component
({
selector	: 'clWeatherDay'						,
templateUrl	: './clWeatherDayComponent.html'		,
styleUrls	: ['./clWeatherDayComponent.scss']		,
changeDetection	:ChangeDetectionStrategy.OnPush	,
})

export class	clWeatherDayComponent	extends	clAbstractComponent
{
@Input		()		weather		:WeatherInterfaces.WeatherInfo;

constructor		(private cdr:ChangeDetectorRef)
{ 
				super();
}


get stateIconUrl():string
{
				return(clWeatherService.stateIconUrl(this.weather));
}

get minTemp		():string
{
				return(formatTemp(this.weather.min_temp))
}

get maxTemp		():string
{
				return(formatTemp(this.weather.max_temp))
}




// https://commons.wikimedia.org/w/index.php?search=Compass%2Fwindrose+icon&title=Special:MediaSearch&go=Go&type=image

get windIconUrl():string
{
const compassUrl="compass/"+normalizeCompass(this.weather.wind_direction_compass)+".svg"
				return(assetsFile(compassUrl));
}

get windText	():string
{
				return(this.weather.wind_direction_compass);
}

get humidityText():string
{
const h=Math.ceil(this.weather.humidity+.5).toString()+"%";
				return(h)
}


}
