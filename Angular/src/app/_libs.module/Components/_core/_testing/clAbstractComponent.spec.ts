import	{	clAbstractComponent	}	from	"../clAbstractComponent"

describe	("clAbstractComponent",()=>
{
let component:clAbstractComponent;
			beforeEach(()=>
			{
				component=new clAbstractComponent();
			});

			it("ngOnDestroy,should call unsubscribeAll"	,async ()=>
			{
				spyOn(component,"unsubscribeAll");
				component.ngOnDestroy();
				await expect(component.unsubscribeAll).toHaveBeenCalled();
			});

});
