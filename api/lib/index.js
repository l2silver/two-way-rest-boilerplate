import 'babel-polyfill'
import koa from 'koa'
import routes from './routes/'
import cors  from 'koa-cors'
import json from 'koa-json'
const app = koa();

app.use(
	cors({
		origin: 'http://localhost:3333',
		allowMethods: 'GET,HEAD,PUT,POST,DELETE',
		credentials: true
	})
);

routes(app)
const server = app.listen(8888, function() {
	console.log('Koa is listening to http://localhost:8888')
});