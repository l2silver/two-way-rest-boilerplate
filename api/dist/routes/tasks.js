'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _koaRoute = require('koa-route');

var _koaRoute2 = _interopRequireDefault(_koaRoute);

var _Task = require('./../models/Task');

var _Task2 = _interopRequireDefault(_Task);

var _coBody = require('co-body');

var _coBody2 = _interopRequireDefault(_coBody);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function addProps() {
	var body = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	var properties = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

	return properties.reduce(function (previousObject, property) {
		if ((0, _typeof3.default)(body[property]) == undefined) {
			return previousObject;
		}
		return (0, _assign2.default)({}, previousObject, (0, _defineProperty3.default)({}, property, body[property]));
	}, {});
}

exports.default = [_koaRoute2.default.get('/tasks', _regenerator2.default.mark(function _callee() {
	var tasks;
	return _regenerator2.default.wrap(function _callee$(_context) {
		while (1) {
			switch (_context.prev = _context.next) {
				case 0:
					_context.next = 2;
					return new _Task2.default().fetchAll();

				case 2:
					tasks = _context.sent;
					_context.next = 5;
					return tasks.toJSON();

				case 5:
					this.body = _context.sent;

				case 6:
				case 'end':
					return _context.stop();
			}
		}
	}, _callee, this);
})), _koaRoute2.default.post('/tasks', _regenerator2.default.mark(function _callee2() {
	var body, newTask;
	return _regenerator2.default.wrap(function _callee2$(_context2) {
		while (1) {
			switch (_context2.prev = _context2.next) {
				case 0:
					_context2.next = 2;
					return _coBody2.default.json(this);

				case 2:
					body = _context2.sent;
					_context2.next = 5;
					return _Task2.default.forge({ name: body.name, todo_list_id: body.todo_list_id }).save();

				case 5:
					newTask = _context2.sent;
					_context2.next = 8;
					return newTask.toJSON();

				case 8:
					this.body = _context2.sent;

				case 9:
				case 'end':
					return _context2.stop();
			}
		}
	}, _callee2, this);
})), _koaRoute2.default.get('/tasks/:id', _regenerator2.default.mark(function _callee3(id) {
	var body, task;
	return _regenerator2.default.wrap(function _callee3$(_context3) {
		while (1) {
			switch (_context3.prev = _context3.next) {
				case 0:
					_context3.next = 2;
					return _coBody2.default.json(this);

				case 2:
					body = _context3.sent;
					_context3.next = 5;
					return new _Task2.default().find(id);

				case 5:
					task = _context3.sent;

					this.body = task.toJSON();

				case 7:
				case 'end':
					return _context3.stop();
			}
		}
	}, _callee3, this);
})), _koaRoute2.default.put('/tasks/:id', _regenerator2.default.mark(function _callee4(id) {
	var body, task;
	return _regenerator2.default.wrap(function _callee4$(_context4) {
		while (1) {
			switch (_context4.prev = _context4.next) {
				case 0:
					_context4.next = 2;
					return _coBody2.default.json(this);

				case 2:
					body = _context4.sent;
					_context4.next = 5;
					return new _Task2.default({ id: id }).save(addProps(body, ['name', 'completed', 'todo_list_id']), { patch: true });

				case 5:
					task = _context4.sent;
					_context4.next = 8;
					return task.toJSON();

				case 8:
					this.body = _context4.sent;

				case 9:
				case 'end':
					return _context4.stop();
			}
		}
	}, _callee4, this);
})), _koaRoute2.default.delete('/tasks/:id', _regenerator2.default.mark(function _callee5(id) {
	var body, task;
	return _regenerator2.default.wrap(function _callee5$(_context5) {
		while (1) {
			switch (_context5.prev = _context5.next) {
				case 0:
					_context5.next = 2;
					return _coBody2.default.json(this);

				case 2:
					body = _context5.sent;
					_context5.next = 5;
					return new _Task2.default({ id: id }).destroy();

				case 5:
					task = _context5.sent;
					_context5.next = 8;
					return task.toJSON();

				case 8:
					this.body = _context5.sent;

				case 9:
				case 'end':
					return _context5.stop();
			}
		}
	}, _callee5, this);
}))];