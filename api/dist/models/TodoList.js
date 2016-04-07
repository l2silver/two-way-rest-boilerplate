'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bookshelf = require('./bookshelf');

var _bookshelf2 = _interopRequireDefault(_bookshelf);

var _Task = require('./Task');

var _Task2 = _interopRequireDefault(_Task);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _bookshelf2.default.Model.extend({
  tableName: 'todo_lists',
  hasTimestamps: 'true',
  tasks: function tasks() {
    return this.hasMany(_Task2.default);
  }
});