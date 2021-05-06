import	{ 	Injectable 						}	from	'@angular/core'
import	{	HttpClient						}	from	'@angular/common/http'
import	{	RX								}	from	 "../../_core/rxjs/RXJS"
import	{	clHttpService					}	from	'../_core/clHttpService'

import	*	as	Interfaces						from	"./Interfaces/clWeatherInterfaces"
export	{	Interfaces						}


function	staticImage	(img:string)
{
			return("https://us-central1-cl-weather.cloudfunctions.net/api/metawheater/static/img/"+img);
}

@Injectable
({
	providedIn: 'root'
})


export	class	clWeatherService	extends	clHttpService
{
constructor			(http: HttpClient)
{
					super(http,"https://us-central1-cl-weather.cloudfunctions.net/api/metawheater/api");
}

static	minYear		():number
{
		return(2014);
}

static	maxDays		():number
{
		return(10)
}

// é uma query e responde multiplas locations

queryLocations		(query:string):RX.Observable<Interfaces.WeatherLocation[]>
{
					return(super.get("location/search",{query}))
}

getWeather			(location:Interfaces.WeatherLocation,date:Date):RX.Observable<Interfaces.WeatherInfo[]>
{
const 	yr	=date.getFullYear	();
const 	m	=date.getMonth		()+1;
const 	d	=date.getDate		();
const 	url	=["location",location.woeid,yr,m,d].join("/");

					return(super.get(url))
}



static			stateIconUrl	(info:Interfaces.WeatherInfo)
{
const 			stateSvg="weather/"+info.weather_state_abbr+".svg";
				return(staticImage(stateSvg));
}


}
