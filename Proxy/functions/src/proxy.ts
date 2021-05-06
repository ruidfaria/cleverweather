import	*	as	express		from	'express';
import	*	as	http		from	"http";
import	*	as	https		from	"https";
import	*	as	qs			from	"qs";

function onResponse(file:http.IncomingMessage, res:express.Response)
{
	res.status(<number>file.statusCode);
	if (file.headers["content-type"])
	{
		res.setHeader("Content-Type",file.headers["content-type"]);
	}
	if (file.headers["content-length"])
	{
		res.setHeader("Content-Length",file.headers["content-length"]);
	}
	if (file.headers["cache-control"])
	{
		res.setHeader("Cache-Control",file.headers["cache-control"]);
	}
	if (file.headers["last-modified"])
	{
		res.setHeader("Last-Modified",file.headers["last-modified"]);
	}

	file.on('error', error=>
	{
		res.destroy(error);
	})

	file.on('data', (chunk:Buffer)=>
	{
		res.write(chunk);
	})

	file.on('end', ()=>
	{
		res.end();
	});
}

export function get(url:string, req:express.Request, res:express.Response)
{
	const query = qs.stringify(req.query);
	const req1 = https.get(url+"?"+query, file =>
	{
		if (file.statusCode==301 && file.headers.location)
		{
			const req2 = https.get(file.headers.location, file =>
			{
				onResponse(file,res);
			})

			req2.on('error', error =>
			{
				res.status(500).json({status:"error", name: error.name, msg: error.message});
			})
		}
		else
		{
			onResponse(file,res);
		}
	})

	req1.on('error', error =>
	{
		res.status(500).json({status:"error", name: error.name, msg: error.message});
	})
}
