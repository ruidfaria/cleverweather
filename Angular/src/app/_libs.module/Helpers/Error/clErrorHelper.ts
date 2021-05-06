

// 2021-05-05
// RF:better error handling  
function	errorOrError(e:any):any
{
			if(e && e.error && e.error.error && e.error.error.code)
			{
				return(e.error.error)
			}

			if(e && e.error && e.error.statusCode)
			{
				return(e.error)
			}

			return(e)
}
function	trimNumbers	(t:string):string
{
			for(let i=0;i<t.length;i++)
			{
			const c=t.charAt(i)
				if(!(c>="0" && c<="9"))
				{
					return(t.slice(i).trim());
				}
			}
			return("");
}

function	stripTitle	(t:string)
{
const 		tx=t.split(":");
			t="";

			for(let i=0;i<tx.length;i++)
			{
			const tt=trimNumbers(tx[i]);

				if((t.length>0 && t+tt).length>40)
				{
					break;
				}

				t+=tt+" ";
			}

			t=t.slice(0,40);

			t=t.trim();


			return(t);
}
export class	clErrorHelper
{

static	title	(_e:Error)
{
const 	e=errorOrError(_e);
let		t:string;

			if(e)
			{
				if(typeof e.error==="string" && !e.error.includes("<!"))
				{
					t=e.error;
				}
				else
				if(typeof e.message==="string")
				{
					t=e.message;
				}
				else
				if(typeof e.name==="string")
				{
					t=e.name;
				}
				else
				if(typeof e.code==="string")
				{
					t=e.code;
				}
			}

			return(stripTitle(t));
}

}
