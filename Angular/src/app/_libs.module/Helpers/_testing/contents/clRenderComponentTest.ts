import	{	ChangeDetectionStrategy, Type					}	from 	'@angular/core'

import	{	ComponentFixture		,
			TestBed					}	from	'@angular/core/testing'
import	{	clVerifyContentChanges	}	from	"./clVerifyContentChanges"

function	setInitialData		(component	:any,d:any)
{
const kx	=Object.keys(d);
			for(const k of kx)
			{
				component[k]=d[k];
			}

			if(component.ngOnChanges)
			{
				component.ngOnChanges();
			}
}

export	function	clRenderComponentTest<T>(c:Type<any>,initialData:any,contents:any,declarations:any[]=[],providers:any[]=[],imports:any[]=[],schemas:any[]=[])
{
let 	fixture		:ComponentFixture<T>	;
let		component	:T						;
let 	native		:HTMLElement			;


		beforeEach(async () => 
		{
		await 	TestBed.configureTestingModule(
			{
			imports	:		[
							...imports		,
							],
			declarations:	[
							c,...declarations
							],
			providers:		[
							...providers
							],
			schemas			: 
							[ 
							...schemas 
							]
			})
			.overrideComponent(c,
			{
      		set: { changeDetection: ChangeDetectionStrategy.Default }
    		})
			.compileComponents();

			fixture 	= TestBed.createComponent(c)			;
			component	= fixture.componentInstance				;
 			native		= fixture.debugElement.nativeElement	;
			setInitialData	(component,initialData||{})			;
			

		});

		it('should create the component', () => 
		{
			expect(component).toBeTruthy();
		});
		it('template should have native element'	, () => 
		{
			expect(native).toBeTruthy();
		});

		it('template should react to content changes', () => 
		{
		const r=clVerifyContentChanges(fixture,component,contents);

			expect(r).toBeTrue();
		});
}

