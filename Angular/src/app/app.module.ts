import	{	BrowserModule					} 	from	'@angular/platform-browser';
import	{	NgModule						}	from	'@angular/core';
import	{	ServiceWorkerModule				}	from	'@angular/service-worker';

import	{	BrowserAnimationsModule			}	from	'@angular/platform-browser/animations'

import	{	FormsModule						}	from	'@angular/forms'

import	{	HttpClientModule				}	from	"@angular/common/http"

import	{	MatCommonModule					,
			MatNativeDateModule				,
			MatRippleModule					} 	from 	'@angular/material/core';

import	{	MatFormFieldModule				}	from	'@angular/material/form-field'
import	{	MatDatepickerModule				} 	from	'@angular/material/datepicker'

import	{	MatSelectModule					}	from	'@angular/material/select'
import	{	MatCardModule					}	from	'@angular/material/card'

import	{	MatInputModule					}	from	'@angular/material/input'

import	{	MatProgressSpinnerModule		}	from	'@angular/material/progress-spinner'
import	{	MatProgressBarModule			}	from	'@angular/material/progress-bar'

import	{	MatMenuModule					}	from	'@angular/material/menu'


import	{	FlexLayoutModule				}	from	"@angular/flex-layout"


import	{	AppRoutingModule				}	from	'./app-routing.module';
import	{	AppComponent					}	from	'./app.component';


import	{	clHContainerComponent			}	from	"./_libs.module/Components/structural/hContainer/clHContainerComponent"
import	{	clVContainerComponent			}	from	"./_libs.module/Components/structural/vContainer/clVContainerComponent"
import	{	clColorDirective				}	from	"./_libs.module/Directives/styles/colors/clColorsDirectives"
import	{	clBackgroundColorDirective		}	from	"./_libs.module/Directives/styles/colors/clColorsDirectives"
import	{	clVisibleObserverDirective		}	from	"./_libs.module/Directives/observers/visible/clVisibleObserverDirective"
import	{	clStringTableDirective			}	from	"./_libs.module/Directives/stringTable/clStringTableDirective"

import	{	clDebugComponent				}	from	"./_libs.module/Components/_debug/clDebugComponent"

import	{	clMarginDirective				,
			clPaddingDirective				}	from	"./_libs.module/Directives/styles/margins/clMarginsDirectives"


import	{ 	clHeightDirective				,
			clHeightFixDirective			,
			clWidthDirective				,
			clWidthFixDirective				,
			clSizeDirective					,
			clSizeFixDirective				}	from	"./_libs.module/Directives/styles/sizes/clSizesDirectives"


import	{ 	clOverflowDirective				}	from	"./_libs.module/Directives/styles/overflow/clOverflowDirective"

import	{	clOpacityDirective				}	from	"./_libs.module/Directives/styles/opacity/clOpacityDirective"
import	{	clPositionDirective				}	from	"./_libs.module/Directives/styles/positions/clPositionDirective"
import	{	clImageDirective				}	from	"./_libs.module/Directives/image/clImageDirective"

import	{	clTableInputComponent			}	from	"./_libs.module/Inputs/table/clTableInputComponent"

import	{	clWeatherPageComponent			}	from	"./Pages/weather/clWeatherPageComponent"
import	{	clWeatherLocationQueryComponent	}	from	"./Components/weather/locationQuery/clWeatherLocationQueryComponent"
import	{	clWeatherLocationComponent		}	from	"./Components/weather/location/clWeatherLocationComponent"
import	{	clWeatherDayQueryComponent		}	from	"./Components/weather/dayQuery/clWeatherDayQueryComponent"
import	{	clWeatherDayComponent			}	from	"./Components/weather/day/clWeatherDayComponent"

import	{	environment						}	from	'src/environments/environment';





@NgModule
({
declarations: 
[
	AppComponent					,

	//TODO:PASSAR ISTO PARA MODULO

	clHContainerComponent			,
	clVContainerComponent			,
	clDebugComponent				,


	clColorDirective				,

	clBackgroundColorDirective		,
	clVisibleObserverDirective		,
	clStringTableDirective			,

	clMarginDirective				,
	clPaddingDirective				,

	clHeightDirective				,
	clHeightFixDirective			,
	clWidthDirective				,
	clWidthFixDirective				,
	clSizeDirective					,
	clSizeFixDirective				,
	clOverflowDirective				,
	clOpacityDirective				,
	clPositionDirective				,
	clImageDirective				,

	clTableInputComponent			,

	// <====

	clWeatherPageComponent			,
	clWeatherLocationQueryComponent	,
	clWeatherLocationComponent		,
	clWeatherDayQueryComponent		,
	clWeatherDayComponent			,

],
imports: 
[
	BrowserModule			,
	BrowserAnimationsModule	,
	FormsModule				,
	HttpClientModule		,
	MatInputModule			,
	MatDatepickerModule		,
	MatFormFieldModule		,
	MatCommonModule			,
	MatNativeDateModule		,
	MatRippleModule			,
	MatSelectModule			,
	MatCardModule			,
	MatProgressSpinnerModule,
	MatProgressBarModule	,
	MatMenuModule			,
	FlexLayoutModule		,
	AppRoutingModule		,
	ServiceWorkerModule.register("/ngsw-worker.js", {enabled: environment.production})
],
providers: 	[],
bootstrap: 	[
			AppComponent
			]
})

export class AppModule 
{

constructor	()
{
			clDebugComponent.initialize();
}
}

