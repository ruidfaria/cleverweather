import * as functions from 'firebase-functions';
import * as express from 'express';
import * as cors from 'cors'
import * as proxy from "./proxy"

const config =
{
	metaWeatherUrl: "https://www.metaweather.com/",
	corsOptions:
	{
		origin: ["*"]
	}
}

const app = express();
app.use(cors(config.corsOptions));

app.get('/metawheater/*', (req, res) =>
{
	const path = req.params[0];
	proxy.get(config.metaWeatherUrl+"/"+path,req,res);
});

app.get('*', (req, res) =>
{
	// functions.logger.info("Hello logs!", {structuredData: true});
	// response.send("Hello from Firebase!");
	res.status(404).send({
		status	:"error",
		msg		:"not found"
	})
});

export const api = functions.https.onRequest(app);