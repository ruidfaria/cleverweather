import	{ 	Injectable 						}	from	'@angular/core'
import	{	HttpClient						}	from	'@angular/common/http'

import	{	RX,RXOps						}	from	 "../../_core/rxjs/RXJS"


// facilita debug
function		reqError<T>		(m,url:string,e:Error):RX.Observable<T>
{
				//debugger;
				console.error("httpReqError:",m,url,e);
				return(RX.throwError(e));
}

// facilita debug
function		reqDone<T>		(m,url:string,r:any):RX.Observable<T>
{
				console.debug("httpReqDone:",url);
				return(r);
}

function		REQ<T>		(m:string,url:string,r:RX.Observable<any>):RX.Observable<any>
{
				console.debug("httpRequest:",m,url)
				return(r.pipe(RXOps.map(r=>reqDone(m,url,r)),RXOps.catchError(e=>reqError(m,url,e))));
}

export	class	clHttpService
{
constructor	(private http: HttpClient,public api:string)
{
}

get<T>				(url:string,params?:{[header: string]: string | string[]}):RX.Observable<T>
{
const fullUrl=[this.api,url].join("/");
				return(REQ<T>("get",fullUrl,this.http.request<T>("GET",fullUrl,{params})));
}

}
