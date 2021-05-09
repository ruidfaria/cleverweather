
import { Component, ViewChild							}	from	'@angular/core'
import { NO_ERRORS_SCHEMA 					} 	from	'@angular/core'
import { ComponentFixture, TestBed 			}	from	'@angular/core/testing'
import { Testing } from 'src/app/_libs.module/Helpers/_testing/Testing';
import { clStringTableDirective	 			} 	from	'../clStringTableDirective'

@Component
({
selector	: 'clStringTableComponentStub'					,
template	:
[
"<ng-template clStringTable #stringTable>"	,
"	<div id='1'				>one</div>"		,
"	<div id='2'				>two</div>"		,
"	<div id='3'				>tree</div>"	,
"	<div id='4'				>four</div>"	,
"</ng-template>"
].join("\n")
})

class	clStringTableComponentStub
{
@ViewChild	("stringTable",{static:true,read:clStringTableDirective})	stringTable:clStringTableDirective;
}


// https://stackoverflow.com/questions/51515530/unit-testing-angular-5-component-with-viewchild

describe('clStringTableComponent', () => 
{
let 	fixture		:ComponentFixture<clStringTableComponentStub>	;
let		component	:clStringTableComponentStub						;

		beforeEach(async () => 
		{
		await 	TestBed.configureTestingModule(
			{
			declarations:	[
							clStringTableComponentStub,clStringTableDirective
							],
			}).compileComponents();

			fixture 			= TestBed.createComponent(clStringTableComponentStub)			;
			component			= fixture.componentInstance										;
			fixture.detectChanges();
		});

		it('should create', async () => 
		{
    		expect(component).toBeTruthy();
  		});

		it('string table must be loaded', async () => 
		{
			expect(component.stringTable.items.length).toBe(4);
		});

});
