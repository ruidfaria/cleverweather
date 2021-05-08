import	{	ComponentFixture	} 	from "@angular/core/testing";

import {	jsGetValue			,
			jsSetValue			}	from	"./jsValues/jsValues"


function	getStyles		(e:HTMLElement,content:string[]):string
{
const 	s=e.style;
			if(s)
			{
			const keys=Object.keys(s);
				for(const k of keys)
				{
				const v=s[k];

					if(v!==undefined && v!=="")
					{
					const c=[k,v].join(":");
						//console.info("CSS=>",c);
						content.push(c);
					}
				}
				return;
			}
			content.push(undefined)
}


function	getDeepContentEx(e:HTMLElement,content:string[])
{
			if(e)
			{
				content.push(e.innerHTML			);
				getStyles(e,content);

				for(let i=0;i<e.children.length;i++)
				{
				const c=e.children[i];
					getDeepContentEx(c as any,content);
				}
			}
}

function	getDeepContent<T>(fixture:ComponentFixture<T>)
{
const  		html:string[]=[];

			fixture.detectChanges();
			getDeepContentEx(fixture.debugElement.nativeElement,html);


			return(html);
}

function	isContentEqual(h1:string[],h2:string[]):boolean
{
			if(h1.length === h2.length)
			{
				for(let i=0;i<h2.length;i++)
				{
					if(h1[i]!==h2[i])
					{
						return(false);
					}
				}
				return(true);
			}
			return(false);
}



export	function	clVerifyContentChanges	<T>	(fixture:ComponentFixture<T>,component:T,contents:any):boolean
{
		if(fixture && component && contents)
		{
		const 	oldData:any		={}										;
		const 	keys			=Object.keys(contents)					;
		let 	initialContent	=getDeepContent(fixture);

			// copy component data
			for(const k of keys)
			{
				oldData[k]=jsGetValue(component,k.split("."));
			}


			for(const k of keys)
			{
				if(contents[k]!==oldData[k])
				{
				let modifiedContent:string[];

					jsSetValue(component	,k.split(".")	,contents	[k]);

					modifiedContent=getDeepContent(fixture);
					if(isContentEqual(initialContent,modifiedContent)) // does not react to changes
					{
						console.info("DOEST NO REACT TO CHANGES:",k,);
						console.info("HTML.ORIGINAL:"		,initialContent		);
						console.info("HTML.MODIFIED:"		,modifiedContent	);

						return(false);
					}

					jsSetValue(component	,k.split(".")	,oldData	[k]);

					modifiedContent=getDeepContent(fixture);
					if(!isContentEqual(initialContent,modifiedContent)) // does not react to changes
					{
						console.info("DOEST NO REACT TO RESTORE:",k);
						console.info("HTML.ORIGINAL:"		,initialContent		);
						console.info("HTML.MODIFIED:"		,modifiedContent	);
						return(false);
					}
				}
			}

			return(true);
		}
		return(false);
}

