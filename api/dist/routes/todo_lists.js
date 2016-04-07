'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _koaRoute = require('koa-route');

var _koaRoute2 = _interopRequireDefault(_koaRoute);

var _TodoList = require('./../models/TodoList');

var _TodoList2 = _interopRequireDefault(_TodoList);

var _Task = require('./../models/Task');

var _Task2 = _interopRequireDefault(_Task);

var _coBody = require('co-body');

var _coBody2 = _interopRequireDefault(_coBody);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [_koaRoute2.default.get('/todo_lists', _regenerator2.default.mark(function _callee() {
	var todoLists;
	return _regenerator2.default.wrap(function _callee$(_context) {
		while (1) {
			switch (_context.prev = _context.next) {
				case 0:
					_context.next = 2;
					return new _TodoList2.default().fetchAll({ withRelated: ['tasks'] });

				case 2:
					todoLists = _context.sent;
					_context.next = 5;
					return todoLists.toJSON();

				case 5:
					this.body = _context.sent;

				case 6:
				case 'end':
					return _context.stop();
			}
		}
	}, _callee, this);
})), _koaRoute2.default.post('/todo_lists', _regenerator2.default.mark(function _callee2() {
	var body, newTodoList;
	return _regenerator2.default.wrap(function _callee2$(_context2) {
		while (1) {
			switch (_context2.prev = _context2.next) {
				case 0:
					_context2.next = 2;
					return _coBody2.default.json(this);

				case 2:
					body = _context2.sent;
					_context2.next = 5;
					return _TodoList2.default.forge({ name: body.name }).save();

				case 5:
					newTodoList = _context2.sent;
					_context2.next = 8;
					return newTodoList.toJSON();

				case 8:
					this.body = _context2.sent;

				case 9:
				case 'end':
					return _context2.stop();
			}
		}
	}, _callee2, this);
})), _koaRoute2.default.get('/todo_lists/:id', _regenerator2.default.mark(function _callee3(id) {
	var body, todoList;
	return _regenerator2.default.wrap(function _callee3$(_context3) {
		while (1) {
			switch (_context3.prev = _context3.next) {
				case 0:
					_context3.next = 2;
					return _coBody2.default.json(this);

				case 2:
					body = _context3.sent;
					_context3.next = 5;
					return new _TodoList2.default().find(id);

				case 5:
					todoList = _context3.sent;

					this.body = todoList.toJSON();

				case 7:
				case 'end':
					return _context3.stop();
			}
		}
	}, _callee3, this);
})), _koaRoute2.default.put('/todo_lists/:id', _regenerator2.default.mark(function _callee4(id) {
	var body, todoList;
	return _regenerator2.default.wrap(function _callee4$(_context4) {
		while (1) {
			switch (_context4.prev = _context4.next) {
				case 0:
					_context4.next = 2;
					return _coBody2.default.json(this);

				case 2:
					body = _context4.sent;
					_context4.next = 5;
					return new _TodoList2.default({ id: id }).save({ name: body.name }, { patch: true });

				case 5:
					todoList = _context4.sent;
					_context4.next = 8;
					return todoList.toJSON();

				case 8:
					this.body = _context4.sent;

				case 9:
				case 'end':
					return _context4.stop();
			}
		}
	}, _callee4, this);
})), _koaRoute2.default.put('/todo_lists/:id/complete_all', _regenerator2.default.mark(function _callee5(id) {
	var body, tasks, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, task, completedArray;

	return _regenerator2.default.wrap(function _callee5$(_context5) {
		while (1) {
			switch (_context5.prev = _context5.next) {
				case 0:
					_context5.next = 2;
					return _coBody2.default.json(this);

				case 2:
					body = _context5.sent;
					_context5.next = 5;
					return _Task2.default.where({ todo_list_id: id }).fetchAll();

				case 5:
					tasks = _context5.sent;
					_iteratorNormalCompletion = true;
					_didIteratorError = false;
					_iteratorError = undefined;
					_context5.prev = 9;
					_iterator = (0, _getIterator3.default)(tasks.toJSON());

				case 11:
					if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
						_context5.next = 18;
						break;
					}

					task = _step.value;
					_context5.next = 15;
					return new _Task2.default({ id: task.id }).save({ completed: true }, { patch: true });

				case 15:
					_iteratorNormalCompletion = true;
					_context5.next = 11;
					break;

				case 18:
					_context5.next = 24;
					break;

				case 20:
					_context5.prev = 20;
					_context5.t0 = _context5['catch'](9);
					_didIteratorError = true;
					_iteratorError = _context5.t0;

				case 24:
					_context5.prev = 24;
					_context5.prev = 25;

					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}

				case 27:
					_context5.prev = 27;

					if (!_didIteratorError) {
						_context5.next = 30;
						break;
					}

					throw _iteratorError;

				case 30:
					return _context5.finish(27);

				case 31:
					return _context5.finish(24);

				case 32:
					completedArray = tasks.toJSON().map(function (task) {
						task.completed = 1;
						return task;
					});
					_context5.next = 35;
					return { tasks: completedArray };

				case 35:
					this.body = _context5.sent;

				case 36:
				case 'end':
					return _context5.stop();
			}
		}
	}, _callee5, this, [[9, 20, 24, 32], [25,, 27, 31]]);
})), _koaRoute2.default.put('/todo_lists/:id/clear_completed', _regenerator2.default.mark(function _callee6(id) {
	var body, tasks, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, task, deletedArray;

	return _regenerator2.default.wrap(function _callee6$(_context6) {
		while (1) {
			switch (_context6.prev = _context6.next) {
				case 0:
					_context6.next = 2;
					return _coBody2.default.json(this);

				case 2:
					body = _context6.sent;
					_context6.next = 5;
					return _Task2.default.where({ todo_list_id: id, completed: 1 }).fetchAll();

				case 5:
					tasks = _context6.sent;
					_iteratorNormalCompletion2 = true;
					_didIteratorError2 = false;
					_iteratorError2 = undefined;
					_context6.prev = 9;
					_iterator2 = (0, _getIterator3.default)(tasks.toJSON());

				case 11:
					if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
						_context6.next = 18;
						break;
					}

					task = _step2.value;
					_context6.next = 15;
					return new _Task2.default({ id: task.id }).destroy();

				case 15:
					_iteratorNormalCompletion2 = true;
					_context6.next = 11;
					break;

				case 18:
					_context6.next = 24;
					break;

				case 20:
					_context6.prev = 20;
					_context6.t0 = _context6['catch'](9);
					_didIteratorError2 = true;
					_iteratorError2 = _context6.t0;

				case 24:
					_context6.prev = 24;
					_context6.prev = 25;

					if (!_iteratorNormalCompletion2 && _iterator2.return) {
						_iterator2.return();
					}

				case 27:
					_context6.prev = 27;

					if (!_didIteratorError2) {
						_context6.next = 30;
						break;
					}

					throw _iteratorError2;

				case 30:
					return _context6.finish(27);

				case 31:
					return _context6.finish(24);

				case 32:
					deletedArray = tasks.toJSON().map(function (task) {
						task.deleted_at = new Date().getTime();
						return task;
					});
					_context6.next = 35;
					return { tasks: deletedArray };

				case 35:
					this.body = _context6.sent;

				case 36:
				case 'end':
					return _context6.stop();
			}
		}
	}, _callee6, this, [[9, 20, 24, 32], [25,, 27, 31]]);
})), _koaRoute2.default.delete('/todo_lists/:id', _regenerator2.default.mark(function _callee7(id) {
	var body, todoList;
	return _regenerator2.default.wrap(function _callee7$(_context7) {
		while (1) {
			switch (_context7.prev = _context7.next) {
				case 0:
					_context7.next = 2;
					return _coBody2.default.json(this);

				case 2:
					body = _context7.sent;
					_context7.next = 5;
					return new _TodoList2.default({ id: id }).destroy();

				case 5:
					todoList = _context7.sent;
					_context7.next = 8;
					return todoList.toJSON();

				case 8:
					this.body = _context7.sent;

				case 9:
				case 'end':
					return _context7.stop();
			}
		}
	}, _callee7, this);
}))];