'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _defineProperty = require('babel-runtime/core-js/object/define-property');

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _desc, _value, _class, _descriptor, _descriptor2;

var _mobx = require('mobx');

var _Collection = require('./Collection');

var _Collection2 = _interopRequireDefault(_Collection);

var _lodash = require('lodash');

var _apiClient = require('./apiClient');

var _apiClient2 = _interopRequireDefault(_apiClient);

var _Request = require('./Request');

var _Request2 = _interopRequireDefault(_Request);

var _ErrorObject = require('./ErrorObject');

var _ErrorObject2 = _interopRequireDefault(_ErrorObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  (0, _defineProperty2.default)(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

var Model = (_class = function () {
  function Model() {
    var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, Model);

    _initDefineProp(this, 'request', _descriptor, this);

    _initDefineProp(this, 'error', _descriptor2, this);

    this.optimisticId = (0, _lodash.uniqueId)('i_');
    this.collection = null;

    this.attributes = _mobx.observable.map(attributes);
  }

  /**
   * Returns a JSON representation
   * of the model
   */


  (0, _createClass3.default)(Model, [{
    key: 'toJS',
    value: function toJS() {
      return (0, _mobx.toJS)(this.attributes);
    }

    /**
     * Determine what attribute do you use
     * as a primary id
     *
     * @abstract
     */

  }, {
    key: 'urlRoot',


    /**
     * Return the base url used in
     * the `url` method
     *
     * @abstract
     */
    value: function urlRoot() {
      throw new Error('`url` method not implemented');
    }

    /**
     * Return the url for this given REST resource
     */

  }, {
    key: 'url',
    value: function url() {
      var urlRoot = void 0;

      if (this.collection) {
        urlRoot = this.collection.url();
      } else {
        urlRoot = this.urlRoot();
      }

      if (!urlRoot) {
        throw new Error('Either implement `urlRoot` or assign a collection');
      }

      if (this.isNew) {
        return urlRoot;
      } else {
        return urlRoot + '/' + this.get(this.primaryKey);
      }
    }

    /**
     * Questions whether the request exists
     * and matches a certain label
     */

  }, {
    key: 'isRequest',
    value: function isRequest(label) {
      if (!this.request) return false;

      return this.request.label === label;
    }

    /**
     * Wether the resource is new or not
     *
     * We determine this asking if it contains
     * the `primaryKey` attribute (set by the server).
     */

  }, {
    key: 'get',


    /**
     * Get the attribute from the model.
     *
     * Since we want to be sure changes on
     * the schema don't fail silently we
     * throw an error if the field does not
     * exist.
     *
     * If you want to deal with flexible schemas
     * use `has` to check wether the field
     * exists.
     */
    value: function get(attribute) {
      if (this.has(attribute)) {
        return this.attributes.get(attribute);
      }
      throw new Error('Attribute "' + attribute + '" not found');
    }

    /**
     * Returns whether the given field exists
     * for the model.
     */

  }, {
    key: 'has',
    value: function has(attribute) {
      return this.attributes.has(attribute);
    }

    /**
     * Get an id from the model. It will use either
     * the backend assigned one or the client.
     */

  }, {
    key: 'set',
    value: function set(data) {
      this.attributes.merge(data);
    }

    /**
     * Fetches the model from the backend.
     */

  }, {
    key: 'fetch',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var _this = this;

        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        var label, _apiClient$get, abort, promise, data;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                label = 'fetching';
                _apiClient$get = (0, _apiClient2.default)().get(this.url(), options.data), abort = _apiClient$get.abort, promise = _apiClient$get.promise;


                this.request = new _Request2.default(label, abort, 0);

                data = void 0;
                _context.prev = 4;
                _context.next = 7;
                return promise;

              case 7:
                data = _context.sent;
                _context.next = 14;
                break;

              case 10:
                _context.prev = 10;
                _context.t0 = _context['catch'](4);

                (0, _mobx.runInAction)('fetch-error', function () {
                  _this.error = new _ErrorObject2.default(label, _context.t0);
                  _this.request = null;
                });

                throw _context.t0;

              case 14:

                (0, _mobx.runInAction)('fetch-done', function () {
                  _this.set(data);
                  _this.request = null;
                  _this.error = null;
                });

                return _context.abrupt('return', data);

              case 16:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[4, 10]]);
      }));

      function fetch() {
        return _ref.apply(this, arguments);
      }

      return fetch;
    }()

    /**
     * Saves the resource on the backend.
     *
     * If the item has a `primaryKey` it updates it,
     * otherwise it creates the new resource.
     *
     * It supports optimistic and patch updates.
     *
     * TODO: Add progress
     */

  }, {
    key: 'save',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(attributes) {
        var _this2 = this;

        var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
            _ref3$optimistic = _ref3.optimistic,
            optimistic = _ref3$optimistic === undefined ? true : _ref3$optimistic,
            _ref3$patch = _ref3.patch,
            patch = _ref3$patch === undefined ? true : _ref3$patch;

        var newAttributes, data, label, originalAttributes, onProgress, _apiClient$put, promise, abort, response;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (this.has(this.primaryKey)) {
                  _context2.next = 7;
                  break;
                }

                this.set((0, _assign2.default)({}, attributes));

                if (!this.collection) {
                  _context2.next = 6;
                  break;
                }

                return _context2.abrupt('return', this.collection.create(this, { optimistic: optimistic }));

              case 6:
                return _context2.abrupt('return', this._create(this.toJS(), { optimistic: optimistic }));

              case 7:
                newAttributes = void 0;
                data = void 0;
                label = 'updating';
                originalAttributes = this.toJS();


                if (patch) {
                  newAttributes = (0, _assign2.default)({}, originalAttributes, attributes);
                  data = (0, _assign2.default)({}, attributes);
                } else {
                  newAttributes = (0, _assign2.default)({}, attributes);
                  data = (0, _assign2.default)({}, originalAttributes, attributes);
                }

                onProgress = (0, _lodash.debounce)(function onProgress(progress) {
                  if (optimistic && this.request) {
                    this.request.progress = progress;
                  }
                }, 300);
                _apiClient$put = (0, _apiClient2.default)().put(this.url(), data, {
                  method: patch ? 'PATCH' : 'PUT',
                  onProgress: onProgress
                }), promise = _apiClient$put.promise, abort = _apiClient$put.abort;


                if (optimistic) this.set(newAttributes);

                this.request = new _Request2.default(label, abort, 0);

                response = void 0;
                _context2.prev = 17;
                _context2.next = 20;
                return promise;

              case 20:
                response = _context2.sent;
                _context2.next = 27;
                break;

              case 23:
                _context2.prev = 23;
                _context2.t0 = _context2['catch'](17);

                (0, _mobx.runInAction)('save-fail', function () {
                  _this2.request = null;
                  _this2.set(originalAttributes);
                  _this2.error = new _ErrorObject2.default(label, _context2.t0);
                });

                throw (0, _lodash.isString)(_context2.t0) ? new Error(_context2.t0) : _context2.t0;

              case 27:

                (0, _mobx.runInAction)('save-done', function () {
                  _this2.request = null;
                  _this2.error = null;
                  _this2.set(response);
                });

                return _context2.abrupt('return', response);

              case 29:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[17, 23]]);
      }));

      function save(_x3) {
        return _ref2.apply(this, arguments);
      }

      return save;
    }()

    /**
     * Internal method that takes care of creating a model that does
     * not belong to a collection
     */

  }, {
    key: '_create',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(attributes) {
        var _this3 = this;

        var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
            _ref5$optimistic = _ref5.optimistic,
            optimistic = _ref5$optimistic === undefined ? true : _ref5$optimistic;

        var label, onProgress, _apiClient$post, abort, promise, data;

        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                label = 'creating';
                onProgress = (0, _lodash.debounce)(function onProgress(progress) {
                  if (optimistic && this.request) {
                    this.request.progress = progress;
                  }
                }, 300);
                _apiClient$post = (0, _apiClient2.default)().post(this.url(), attributes, {
                  onProgress: onProgress
                }), abort = _apiClient$post.abort, promise = _apiClient$post.promise;


                if (optimistic) {
                  this.request = new _Request2.default(label, abort, 0);
                }

                data = void 0;
                _context3.prev = 5;
                _context3.next = 8;
                return promise;

              case 8:
                data = _context3.sent;
                _context3.next = 15;
                break;

              case 11:
                _context3.prev = 11;
                _context3.t0 = _context3['catch'](5);

                (0, _mobx.runInAction)('create-error', function () {
                  _this3.error = new _ErrorObject2.default(label, _context3.t0);
                  _this3.request = null;
                });

                throw _context3.t0;

              case 15:

                (0, _mobx.runInAction)('create-done', function () {
                  _this3.set(data);
                  _this3.request = null;
                  _this3.error = null;
                });

                return _context3.abrupt('return', data);

              case 17:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[5, 11]]);
      }));

      function _create(_x5) {
        return _ref4.apply(this, arguments);
      }

      return _create;
    }()

    /**
     * Destroys the resurce on the client and
     * requests the backend to delete it there
     * too
     */

  }, {
    key: 'destroy',
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
        var _this4 = this;

        var _ref7 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref7$optimistic = _ref7.optimistic,
            optimistic = _ref7$optimistic === undefined ? true : _ref7$optimistic;

        var label, _apiClient$del, promise, abort;

        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!(!this.has(this.primaryKey) && this.collection)) {
                  _context4.next = 3;
                  break;
                }

                this.collection.remove([this.optimisticId]);
                return _context4.abrupt('return', _promise2.default.resolve());

              case 3:
                label = 'destroying';
                _apiClient$del = (0, _apiClient2.default)().del(this.url()), promise = _apiClient$del.promise, abort = _apiClient$del.abort;


                if (optimistic && this.collection) {
                  this.collection.remove([this.id]);
                }

                this.request = new _Request2.default(label, abort, 0);

                _context4.prev = 7;
                _context4.next = 10;
                return promise;

              case 10:
                _context4.next = 16;
                break;

              case 12:
                _context4.prev = 12;
                _context4.t0 = _context4['catch'](7);

                (0, _mobx.runInAction)('destroy-fail', function () {
                  if (optimistic && _this4.collection) {
                    _this4.collection.add([_this4.attributes.toJS()]);
                  }
                  _this4.error = new _ErrorObject2.default(label, _context4.t0);
                  _this4.request = null;
                });

                throw _context4.t0;

              case 16:

                (0, _mobx.runInAction)('destroy-done', function () {
                  if (!optimistic && _this4.collection) {
                    _this4.collection.remove([_this4.id]);
                  }
                  _this4.request = null;
                  _this4.error = null;
                });

                return _context4.abrupt('return', null);

              case 18:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this, [[7, 12]]);
      }));

      function destroy() {
        return _ref6.apply(this, arguments);
      }

      return destroy;
    }()

    /**
     * Call an RPC action for all those
     * non-REST endpoints that you may have in
     * your API.
     */

  }, {
    key: 'rpc',
    value: function () {
      var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(method, body) {
        var _this5 = this;

        var label, _apiClient$post2, promise, abort, response;

        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                label = 'updating'; // TODO: Maybe differentiate?

                _apiClient$post2 = (0, _apiClient2.default)().post(this.url() + '/' + method, body || {}), promise = _apiClient$post2.promise, abort = _apiClient$post2.abort;


                this.request = new _Request2.default(label, abort, 0);

                response = void 0;
                _context5.prev = 4;
                _context5.next = 7;
                return promise;

              case 7:
                response = _context5.sent;
                _context5.next = 14;
                break;

              case 10:
                _context5.prev = 10;
                _context5.t0 = _context5['catch'](4);

                (0, _mobx.runInAction)('accept-fail', function () {
                  _this5.request = null;
                  _this5.error = new _ErrorObject2.default(label, _context5.t0);
                });

                throw _context5.t0;

              case 14:

                this.request = null;
                this.error = null;

                return _context5.abrupt('return', response);

              case 17:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this, [[4, 10]]);
      }));

      function rpc(_x8, _x9) {
        return _ref8.apply(this, arguments);
      }

      return rpc;
    }()
  }, {
    key: 'primaryKey',
    get: function get() {
      return 'id';
    }
  }, {
    key: 'isNew',
    get: function get() {
      return !this.has(this.primaryKey);
    }
  }, {
    key: 'id',
    get: function get() {
      return this.has(this.primaryKey) ? this.get(this.primaryKey) : this.optimisticId;
    }

    /**
     * Merge the given attributes with
     * the current ones
     */

  }]);
  return Model;
}(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'request', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'error', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return null;
  }
}), _applyDecoratedDescriptor(_class.prototype, 'isNew', [_mobx.computed], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'isNew'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'set', [_mobx.action], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'set'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'fetch', [_mobx.action], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'fetch'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'save', [_mobx.action], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'save'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'destroy', [_mobx.action], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'destroy'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'rpc', [_mobx.action], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'rpc'), _class.prototype)), _class);
exports.default = Model;