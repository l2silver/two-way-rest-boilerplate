'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _todo_lists = require('./todo_lists');

var _todo_lists2 = _interopRequireDefault(_todo_lists);

var _tasks = require('./tasks');

var _tasks2 = _interopRequireDefault(_tasks);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var controllers = [_todo_lists2.default, _tasks2.default];

exports.default = function (app) {
	return controllers.map(function (routes) {
		return routes.map(function (route) {
			return app.use(route);
		});
	});
};