
export	function	jsGetValue	(o:any,ps:string[]) : any
{
			if(ps.length)
			{
			const p=ps.shift();
				if(o && o[p]!==undefined)
				{
					return(jsGetValue(o[p],ps));
				}
				return(undefined);
			}
			else
			{
				return(o);
			}
}

export	function	jsSetValue	(object:any,ps:string[],value:any,setUndefined:boolean=true)	
{
		if(object)
		{
		const 	p=ps.shift();
			if(ps.length)
			{
			let o2:any=object[p];
				if(o2===undefined || (typeof o2)!=="object")
				{
					o2={};
				}
				
				jsSetValue(o2,ps,value,setUndefined);

				object[p]=o2;
			}
			else
			{
				if(value!==undefined || setUndefined)
				{
					object[p]=value;
				}
			}
		}
		else
		{
			debugger;
		}
}
