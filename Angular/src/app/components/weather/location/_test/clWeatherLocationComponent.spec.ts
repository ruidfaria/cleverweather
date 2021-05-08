import	{	HttpClient, HttpHandler		}	from	"@angular/common/http"
import	{	MatSpinner					}	from	"@angular/material/progress-spinner"

import	{	Testing 					}	from 	"../../../../_libs.module/Helpers/_testing/Testing"
import	{	clImageDirective			}	from	"../../../../_libs.module/Directives/image/clImageDirective"
import	{	clHContainerComponent		}	from	"../../../../_libs.module/Components/structural/hContainer/clHContainerComponent"
import	{	clVContainerComponent		}	from	"../../../../_libs.module/Components/structural/vContainer/clVContainerComponent"
import	{	clWeatherService			}	from	"../../../../services/weather/clWeatherService"
import	{	clWeatherDayQueryComponent	}	from	'../../dayQuery/clWeatherDayQueryComponent'
import	{	clWeatherLocationComponent	}	from	'../clWeatherLocationComponent'



describe('clWeatherLocationComponent', () => 
{
const testData:any		=
{
"location.title"		:"Lisbon"	,
"location.location_type":"City"		,
"weeks"					:[[1,2,3]]	,
};

		Testing.Contents.MustReactToChanges<clWeatherLocationComponent>
				(
					clWeatherLocationComponent																				,
					{
					startDate	:new Date()																					,
					endDate		:new Date()																					,
					location:{}}																							,
					testData																								,
					[clWeatherDayQueryComponent,clImageDirective,clHContainerComponent,clVContainerComponent,MatSpinner]	,
					[clWeatherService,HttpClient,HttpHandler]																,
				);
});
