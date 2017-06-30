'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ErrorObject = function ErrorObject(label, body) {
  (0, _classCallCheck3.default)(this, ErrorObject);

  this.label = label;
  this.body = body;
};

exports.default = ErrorObject;