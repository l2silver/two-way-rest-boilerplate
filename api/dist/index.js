'use strict';

require('babel-polyfill');

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _routes = require('./routes/');

var _routes2 = _interopRequireDefault(_routes);

var _koaCors = require('koa-cors');

var _koaCors2 = _interopRequireDefault(_koaCors);

var _koaJson = require('koa-json');

var _koaJson2 = _interopRequireDefault(_koaJson);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _koa2.default)();

app.use((0, _koaCors2.default)({
	origin: 'http://localhost:3333',
	allowMethods: 'GET,HEAD,PUT,POST,DELETE',
	credentials: true
}));

(0, _routes2.default)(app);
var server = app.listen(8888, function () {
	console.log('Koa is listening to http://localhost:8888');
});