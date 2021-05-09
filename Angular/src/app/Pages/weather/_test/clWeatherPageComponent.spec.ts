import	{	ComponentFixture, TestBed		}	from	"@angular/core/testing"

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



describe('clWeatherPageComponent.render', () => 
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
					]
				);
});

describe('clWeatherLocationQueryComponent.setsAndGets', () => 
{
let 	fixture		:ComponentFixture<clWeatherPageComponent>				;
let		component	:clWeatherPageComponent									;
let 	native		:HTMLElement											;

		beforeEach(async () => 
		{
		await 	TestBed.configureTestingModule(
			{
			imports	:		[
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
							],
			declarations:	[
							clWeatherPageComponent,clWeatherLocationQueryComponent,clHContainerComponent,clVContainerComponent,clTableInputComponent,clDebugComponent,
							],
			providers:		[
							clWeatherService,HttpClient,HttpHandler
							]
			}).compileComponents();

			fixture 			= TestBed.createComponent(clWeatherPageComponent)				;
			component			= fixture.componentInstance										;
			native				= fixture.debugElement.nativeElement							;
			fixture.detectChanges();
		});


		it('must update date', async () => 
		{
		const d=new Date();
			component.date=d;
			await expect(component.date).toBe(d);

		});

		it('must update location', async () => 
		{
		const l="location"
			component.location=l;
			await expect(component.location).toBe(l);

		});

		it('must update weeks', async () => 
		{
		const w="12"
			component.weeks=w;
			await expect(component.weeks).toBe(w);

		});


});
