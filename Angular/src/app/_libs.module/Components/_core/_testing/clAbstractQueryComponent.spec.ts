import	{	RX							}	from	"../../../../_core/rxjs/RXJS"

import	{	clAbstractQueryComponent	}	from	"../clAbstractQueryComponent"
import	{	Testing						}	from	"../../../Helpers/_testing/Testing"



describe	("clAbstractQueryComponent",()=>
{
let component	:clAbstractQueryComponent<Testing.Data[]>;
let cdr			:Testing.ChangeDetectorRefStub;

			beforeEach(async ()=>
			{	
				cdr			=new Testing.ChangeDetectorRefStub	();
				console.log("CDR",cdr)
				component	=new clAbstractQueryComponent		<Testing.Data[]>(cdr);

			});

			it("onCreate,isBusy shold by falsy"		,async ()=>
			{
				await expect(component.isBusy	).toBeFalsy();
			});


			it("onCreate,hasData shold by falsy"	,async ()=>
			{
				await expect(component.hasData	).toBeFalsy();
			});

			it("onCreate,hasError shold by falsy"	,async ()=>
			{
				await expect(component.hasError	).toBeFalsy();
			});


			it("onData,should call markForCheck"	,async ()=>
			{
				component.onData(Testing.DataInstance());
				await expect(cdr.counters.markForCheck).toBe(1);
			});

			it("onError,should call MarkForCheck"	,async ()=>
			{
				component.onError(Testing.ErrorInstance());
				await expect(cdr.counters.markForCheck).toBe(1);
			});

			it("onData,should update data"	,async ()=>
			{
			const data=Testing.DataInstance(Math.random()*100);
				component.onData(data);
				await expect(component.hasData).toBeTrue();
				await expect(component.data).toBe(data);
			});

			it("onError,should update Error"	,async ()=>
			{
			const error=Testing.ErrorInstance();
				component.onError(error);
				await expect(component.hasError).toBeTrue();
				await expect(component.lastError).toBe(error);
			});


			it("valid query,should call onData"	,async ()=>
			{
				spyOn(component,"onData");

				component.queryData(RX.of(Testing.DataInstance()));

				await expect(component.onData).toHaveBeenCalled();

			});

			it("error query,should call onError"	,async ()=>
			{
				spyOn(component,"onError");

				component.queryData(RX.throwError(Testing.ErrorInstance()));

				await expect(component.onError).toHaveBeenCalled();

			});



});
