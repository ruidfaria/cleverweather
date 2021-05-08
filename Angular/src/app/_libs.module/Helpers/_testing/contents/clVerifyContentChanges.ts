import { ComponentFixture } from "@angular/core/testing";

export	function	clVerifyContentChanges	<T>	(fixture:ComponentFixture<T>,component:T,contents:any):boolean
{
		if(fixture && component && contents)
		{
		const	native:HTMLElement	=fixture.debugElement.nativeElement;
			if(native)
			{
			const 	oldData:any		={}										;
			const 	keys			=Object.keys(contents)					;
			let 	htmlContent		:string									;

				// ensure that HTML is updated;
				fixture.detectChanges();

				// copy component data
				for(const k of keys)
				{
					oldData[k]=component[k];
				}

				htmlContent=native.innerHTML;

				for(const k of keys)
				{
					if(contents[k]!==oldData[k])
					{
						component[k]=contents[k]
						fixture.detectChanges();

						if(htmlContent===native.innerHTML) // does not react to changes
						{
							console.error("DOEST NO REACT TO CHANGES:",k);
							return(false);
						}

						component[k]=oldData[k]
						fixture.detectChanges();

						if(htmlContent!==native.innerHTML) // does not react to changes
						{
							console.error("DOEST NO REACT TO RESTORE:",k);
							return(false);
						}
					}
				}

				return(true);
			}
		}
		return(false);
}

