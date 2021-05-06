// https://www.metaweather.com/api/


export	interface		WeatherLocation		
{
title			:string	;//string		- Name of the location
location_type	:string	;//string		- City|Region / State / Province|Country|Continent)	
latt_long		:string ;//floats		- comma separated		
woeid			:number	;//integer		- Where On Earth ID
distance?		:number	;//integer		- Metres	Only returned on a lattlong search
}

export	interface		WeatherInfo
{
id						:number	;
weather_state_name		:string	;
weather_state_abbr		:string	;
wind_direction_compass	:string	;
created					:string	;
applicable_date			:string	;
min_temp				:number	;
max_temp				:number	;
the_temp				:number	;
wind_speed				:number	;
wind_direction			:number	;
air_pressure			:number	;
humidity				:number	;
visibility				:number	;
predictability			:number	;
}