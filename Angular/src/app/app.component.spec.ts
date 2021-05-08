import	{	ComponentFixture		,
			TestBed					}	from	'@angular/core/testing'
import { By } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';

import	{	RouterTestingModule		}	from	'@angular/router/testing'

import	{	AppComponent			}	 from	'./app.component'


describe('AppComponent', () => 
{
let 	fixture		:ComponentFixture<AppComponent>	;
let		component	:AppComponent					;


		beforeEach(async () => 
		{
		await 	TestBed.configureTestingModule(
			{
			imports	:		[
							RouterTestingModule
							],
			declarations:	[
							AppComponent
							],
			}).compileComponents();

			fixture 	= TestBed.createComponent(AppComponent);
			component	= fixture.componentInstance;


		});

		it('should create the component', () => 
		{
			expect(component).toBeTruthy();
		});

		it('template should have router-outlet', () => 
		{
		const ro=fixture.debugElement.query(By.directive(RouterOutlet));
			expect(ro).toBeTruthy();
		});


});
