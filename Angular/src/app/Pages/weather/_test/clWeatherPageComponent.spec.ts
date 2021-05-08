import	{	HttpClient, HttpHandler			}	from	"@angular/common/http"

import	{	BrowserAnimationsModule			}	from	"@angular/platform-browser/animations"
import	{	BrowserModule					}	from	"@angular/platform-browser"

import	{	FormsModule						}	from	"@angular/forms"

import	{	MatCommonModule					,
			MatNativeDateModule				}	from	"@angular/material/core"
import	{	MatInputModule					}	from	"@angular/material/input"

import	{	MatDialogModule					}	from	'@angular/material/dialog'
import	{	MatMenuModule					}	from	"@angular/material/menu"
import	{	MatSelectModule					}	from	"@angular/material/select"
import	{	MatFormFieldModule				}	from	"@angular/material/form-field"
import	{	MatDatepickerModule				} 	from 	'@angular/material/datepicker'

import	{	Testing 						}	from 	"../../../_libs.module/Helpers/_testing/Testing"

import	{	clHContainerComponent			}	from	"../../../_libs.module/Components/structural/hContainer/clHContainerComponent"
import	{	clVContainerComponent			}	from	"../../../_libs.module/Components/structural/vContainer/clVContainerComponent"
import	{	clTableInputComponent			}	from	"../../../_libs.module/Inputs/table/clTableInputComponent"
import	{	clDebugComponent				}	from	"../../../_libs.module/Components/_debug/clDebugComponent"
import	{	clWeatherService				}	from	"../../../services/weather/clWeatherService"
import	{	clWeatherLocationQueryComponent	}	from	"../../../components/weather/locationQuery/clWeatherLocationQueryComponent"
import	{	clWeatherPageComponent			}	from	'../clWeatherPageComponent'



describe('clWeatherPageComponent', () => 
{
const testData:any		=
{
"startDate"			:new Date("1990/01/01")		,
"locationValue"		:"oporto"					,
"weeksValue"		:"2"						,
};

		Testing.Contents.MustReactToChanges<clWeatherPageComponent>
				(
					clWeatherPageComponent																														,
					{}																																			,
					testData																																	,
					[	
						clWeatherLocationQueryComponent,clHContainerComponent,clVContainerComponent,clTableInputComponent,clDebugComponent,
					],
					[	
						clWeatherService,HttpClient,HttpHandler
					]																											,
					[
						BrowserModule			,
						BrowserAnimationsModule	,
						FormsModule				,
						MatInputModule			,
						MatDialogModule			,
						MatFormFieldModule		,
						MatDatepickerModule		,
						MatMenuModule			,
						MatSelectModule			,
						MatCommonModule			,
						MatNativeDateModule		,

/*
						MatRippleModule			,
						MatSelectModule			,
						MatCardModule			,
						MatProgressSpinnerModule,
						MatProgressBarModule	,
						MatMenuModule			,
*/
					]
				);
});
// MatDatepicker,MatLabel,MatDatepickerToggle,MatDialog