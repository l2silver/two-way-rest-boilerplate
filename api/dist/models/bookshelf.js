'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _knexfile = require('./../../../knexfile.js');

var _knexfile2 = _interopRequireDefault(_knexfile);

var _knex = require('knex');

var _knex2 = _interopRequireDefault(_knex);

var _bookshelf = require('bookshelf');

var _bookshelf2 = _interopRequireDefault(_bookshelf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
var knexConnection = _knexfile2.default[env];
exports.default = (0, _bookshelf2.default)((0, _knex2.default)(knexConnection));