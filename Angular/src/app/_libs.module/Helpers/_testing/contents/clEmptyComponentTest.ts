import	{	Type					}	from 	'@angular/core'

import	{	ComponentFixture		,
			TestBed					}	from	'@angular/core/testing'

export	function	clEmptyComponentTest<T>(c:Type<any>,imports:any[]=[])
{
let 	fixture		:ComponentFixture<T>	;
let		component	:T						;
let 	native		:HTMLElement			;


		beforeEach(async () => 
		{
		await 	TestBed.configureTestingModule(
			{
			imports	:		[
							...imports
							],
			declarations:	[
							c
							],
			}).compileComponents();

			fixture 	= TestBed.createComponent(c)			;
			component	= fixture.componentInstance				;
 			native		= fixture.debugElement.nativeElement	;
		});

		it('should create the component', () => 
		{
			expect(component).toBeTruthy();
		});

		it('template should have native element'	, () => 
		{
			expect(native).toBeTruthy();
		});


		it('template should have empty content', () => 
		{
			expect(native.innerHTML).toBe("");
		});
}

