import	{	Testing 				}	from 	"../../../../_libs.module/Helpers/_testing/Testing"
import	{	clImageDirective		}	from	"../../../../_libs.module/Directives/image/clImageDirective"
import	{	clHContainerComponent	}	from	"../../../../_libs.module/Components/structural/hContainer/clHContainerComponent"
import	{	clVContainerComponent	}	from	"../../../../_libs.module/Components/structural/vContainer/clVContainerComponent"
import	{	clWeatherDayComponent	}	from	'../clWeatherDayComponent'



describe('clWeatherDayComponent', () => 
{
const testData:any		=Testing.DataAddPrefix("weather",
{
weather_state_abbr		:"sn"	,
min_temp				:10.123	,
max_temp				:20.191	,
wind_direction_compass	:"N"	,
humidity				:12.56	,
});

		Testing.Contents.MustReactToChanges<clWeatherDayComponent>(clWeatherDayComponent,{},testData,[clImageDirective,clHContainerComponent,clVContainerComponent]);
});
