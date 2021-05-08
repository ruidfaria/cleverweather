import	{	Type					}	from 	'@angular/core'

import	{	ComponentFixture		,
			TestBed					}	from	'@angular/core/testing'

export	function	clContainerTest<T>(c:Type<any>)
{
let 	fixture		:ComponentFixture<T>	;
let		component	:T						;


		beforeEach(async () => 
		{
		await 	TestBed.configureTestingModule(
			{
			imports	:		[
							],
			declarations:	[
							c
							],
			}).compileComponents();

			fixture 	= TestBed.createComponent(c);
			component	= fixture.componentInstance;
		});

		it('should create the component', () => 
		{
			expect(component).toBeTruthy();
		});

		it('template should have empty content', () => 
		{
 		const ne: HTMLElement = fixture.debugElement.nativeElement;

			expect(ne).toBeTruthy();
			expect(ne.innerHTML).toBe("");
		});


}

