import	{	JsonPipe						}	from	"@angular/common"
import	{	HttpClient, HttpHandler			}	from	"@angular/common/http"
import	{	ComponentFixture, TestBed		}	from	"@angular/core/testing"

import	{	MatMenu							}	from	"@angular/material/menu"
import	{	MatProgressBar					}	from	"@angular/material/progress-bar"
import	{	MatError						}	from	"@angular/material/form-field"

import	{	RX								}	from	"../../../../_core/rxjs/RXJS"
import	{	Testing 						}	from 	"../../../../_libs.module/Helpers/_testing/Testing"
import	{	clHContainerComponent			}	from	"../../../../_libs.module/Components/structural/hContainer/clHContainerComponent"
import	{	clVContainerComponent			}	from	"../../../../_libs.module/Components/structural/vContainer/clVContainerComponent"
import	{	clWeatherService				}	from	"../../../../services/weather/clWeatherService"
import	{	clWeatherDayComponent			}	from	"../../day/clWeatherDayComponent"
import	{	clWeatherLocationQueryComponent	}	from	'../clWeatherLocationQueryComponent'
import	{	clDebugComponent				}	from	"../../../../_libs.module/Components/_debug/clDebugComponent"


describe('clWeatherLocationQueryComponent.render', () => 
{
const testData:any		=
{
lastError				:Testing.ErrorInstance()	,
isBusy					:true						,
};

		Testing.Contents.MustReactToChanges<clWeatherLocationQueryComponent>
					(
						clWeatherLocationQueryComponent																							,
						{location:{}}																											,
						testData																												,
						[clWeatherDayComponent,clHContainerComponent,clVContainerComponent,MatProgressBar,clDebugComponent,MatMenu,MatError]	,
						[clWeatherService,HttpClient,HttpHandler]
					);
});

describe('clWeatherLocationQueryComponent.query', () => 
{
let 	fixture		:ComponentFixture<clWeatherLocationQueryComponent>		;
let		component	:clWeatherLocationQueryComponent						;
let 	native		:HTMLElement											;


		beforeEach(async () => 
		{
		await 	TestBed.configureTestingModule(
			{
			imports	:		[
							],
			declarations:	[
							clWeatherDayComponent,clHContainerComponent,clVContainerComponent,MatProgressBar,clDebugComponent,MatMenu,MatError
							],
			providers:		[
							clWeatherService,HttpClient,HttpHandler,JsonPipe
							]
			}).compileComponents();

			fixture 			= TestBed.createComponent(clWeatherLocationQueryComponent)		;
			component			= fixture.componentInstance										;
			component.location	={} as any														;
 			native				= fixture.debugElement.nativeElement							;
		});


		it('ngOnChanges must call service queryLocations', async () => 
		{
			spyOn(component.ws,"queryLocations").and.callFake(()=>{console.info("queryLocations.called");return(RX.of([]))});

			component.ngOnInit		();// subscribe  timer 
			component.ngOnChanges	();

			await Testing.sleep(1500);// refreshTimer	=new Helpers.Timer(1000);

			await expect(component.ws.queryLocations).toHaveBeenCalled();
		});


});

