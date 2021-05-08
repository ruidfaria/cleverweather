import	{	HttpClient, HttpHandler		}	from	"@angular/common/http"
import	{	ComponentFixture, TestBed	}	from	"@angular/core/testing"
import	{	MatSpinner					}	from	"@angular/material/progress-spinner"
import	{	MatError					}	from	"@angular/material/form-field"
import	{	RX							}	from	"../../../../_core/rxjs/RXJS"
import	{	Testing 					}	from 	"../../../../_libs.module/Helpers/_testing/Testing"
import	{	clHContainerComponent		}	from	"../../../../_libs.module/Components/structural/hContainer/clHContainerComponent"
import	{	clVContainerComponent		}	from	"../../../../_libs.module/Components/structural/vContainer/clVContainerComponent"
import	{	clWeatherService			}	from	"../../../../services/weather/clWeatherService"
import	{	clWeatherDayComponent		}	from	"../../day/clWeatherDayComponent"
import	{	clWeatherDayQueryComponent	}	from	'../clWeatherDayQueryComponent'


describe('clWeatherDayQueryComponent.render', () => 
{
const testData:any		=
{
dateTitle				:"01.01.2001"				,
hasWeather				:true						,
lastError				:Testing.ErrorInstance()	,
isBusy					:true						,
};

		Testing.Contents.MustReactToChanges<clWeatherDayQueryComponent>
					(
						clWeatherDayQueryComponent																	,
						{date:new Date()}																			,
						testData																					,
						[clHContainerComponent,clVContainerComponent,clWeatherDayComponent,MatSpinner,MatError]		,
						[clWeatherService,HttpClient,HttpHandler]
					);
});


describe('clWeatherDayQueryComponent.query', () => 
{
let 	fixture		:ComponentFixture<clWeatherDayQueryComponent>	;
let		component	:clWeatherDayQueryComponent						;
let 	native		:HTMLElement									;


		beforeEach(async () => 
		{
		await 	TestBed.configureTestingModule(
			{
			imports	:		[
							],
			declarations:	[
							clWeatherDayQueryComponent,clHContainerComponent,clVContainerComponent,clWeatherDayComponent,MatSpinner,MatError
							],
			providers:		[
							clWeatherService,HttpClient,HttpHandler
							]
			}).compileComponents();

			fixture 			= TestBed.createComponent(clWeatherDayQueryComponent)			;
			component			= fixture.componentInstance										;
			component.date		=new Date()														;
			component.location	={} as any														;
 			native				= fixture.debugElement.nativeElement							;
		});

		it('doQuery must call service getWeather', async () => 
		{
			spyOn(component.ws,"getWeather").and.callFake(()=>{console.info("getWeather.called");return(RX.of([]))});

			component.date		=new Date();
			component.doQuery	();

			await Testing.sleep(2000);// wait for delayQueries(1500)

			await expect(component.ws.getWeather).toHaveBeenCalled();
		});


});
