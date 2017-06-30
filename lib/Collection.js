'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _defineProperty = require('babel-runtime/core-js/object/define-property');

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _desc, _value, _class, _descriptor, _descriptor2, _descriptor3;

var _mobx = require('mobx');

var _Model = require('./Model');

var _Model2 = _interopRequireDefault(_Model);

var _lodash = require('lodash');

var _ErrorObject = require('./ErrorObject');

var _ErrorObject2 = _interopRequireDefault(_ErrorObject);

var _Request = require('./Request');

var _Request2 = _interopRequireDefault(_Request);

var _apiClient = require('./apiClient');

var _apiClient2 = _interopRequireDefault(_apiClient);

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

var Collection = (_class = function () {
  function Collection() {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    (0, _classCallCheck3.default)(this, Collection);

    _initDefineProp(this, 'request', _descriptor, this);

    _initDefineProp(this, 'error', _descriptor2, this);

    _initDefineProp(this, 'models', _descriptor3, this);

    this.set(data);
  }

  /**
   * Returns the URL where the model's resource would be located on the server.
   *
   * @abstract
   */


  (0, _createClass3.default)(Collection, [{
    key: 'url',
    value: function url() {
      throw new Error('You must implement this method');
    }

    /**
     * Specifies the model class for that collection
     */

  }, {
    key: 'model',
    value: function model() {
      return _Model2.default;
    }

    /**
     * Returns a JSON representation
     * of the collection
     */

  }, {
    key: 'toJS',
    value: function toJS() {
      return (0, _mobx.toJS)(this.models);
    }

    /**
     * Returns a shallow array representation
     * of the collection
     */

  }, {
    key: 'toArray',
    value: function toArray() {
      return this.models.slice();
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
     * Wether the collection is empty
     */

  }, {
    key: 'isEmpty',
    value: function isEmpty() {
      return (0, _lodash.isEmpty)(this.models);
    }

    /**
     * Gets the ids of all the items in the collection
     */

  }, {
    key: '_ids',
    value: function _ids() {
      return (0, _lodash.map)(this.models, function (item) {
        return item.id;
      }).filter(Boolean);
    }

    /**
     * Get a resource at a given position
     */

  }, {
    key: 'at',
    value: function at(index) {
      return this.models[index];
    }

    /**
     * Get a resource with the given id or uuid
     */

  }, {
    key: 'get',
    value: function get(id) {
      return this.models.find(function (item) {
        return item.id === id;
      });
    }

    /**
     * The whinny version of the `get` method
     */

  }, {
    key: 'mustGet',
    value: function mustGet(id) {
      var model = this.get(id);

      if (!model) throw Error('Invariant: Model must be found with id: ' + id);

      return model;
    }

    /**
     * Get resources matching criteria
     */

  }, {
    key: 'filter',
    value: function filter() {
      var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return (0, _lodash.filter)(this.models, function (_ref) {
        var attributes = _ref.attributes;

        return (0, _lodash.isMatch)(attributes.toJS(), query);
      });
    }

    /**
     * Finds an element with the given matcher
     */

  }, {
    key: 'find',
    value: function find(query) {
      return (0, _lodash.find)(this.models, function (_ref2) {
        var attributes = _ref2.attributes;

        return (0, _lodash.isMatch)(attributes.toJS(), query);
      });
    }

    /**
     * The whinny version of `find`
     */

  }, {
    key: 'mustFind',
    value: function mustFind(query) {
      var model = this.find(query);

      if (!model) {
        var conditions = (0, _stringify2.default)(query);
        throw Error('Invariant: Model must be found with: ' + conditions);
      }

      return model;
    }

    /**
     * Adds a collection of models.
     * Returns the added models.
     */

  }, {
    key: 'add',
    value: function add(data) {
      var _this = this,
          _models;

      var models = data.map(function (d) {
        return _this.build(d);
      });
      (_models = this.models).push.apply(_models, (0, _toConsumableArray3.default)(models));
      return models;
    }

    /**
     * Removes the model with the given ids or uuids
     */

  }, {
    key: 'remove',
    value: function remove(ids) {
      var _this2 = this;

      ids.forEach(function (id) {
        var model = _this2.get(id);
        if (!model) return;

        _this2.models.splice(_this2.models.indexOf(model), 1);
      });
    }

    /**
     * Sets the resources into the collection.
     *
     * You can disable adding, changing or removing.
     */

  }, {
    key: 'set',
    value: function set(resources) {
      var _this3 = this;

      var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref3$add = _ref3.add,
          add = _ref3$add === undefined ? true : _ref3$add,
          _ref3$change = _ref3.change,
          change = _ref3$change === undefined ? true : _ref3$change,
          _ref3$remove = _ref3.remove,
          remove = _ref3$remove === undefined ? true : _ref3$remove;

      if (remove) {
        var ids = resources.map(function (r) {
          return r.id;
        });
        var toRemove = (0, _lodash.difference)(this._ids(), ids);
        if (toRemove.length) this.remove(toRemove);
      }

      resources.forEach(function (resource) {
        var model = _this3.get(resource.id);

        if (model && change) model.set(resource);
        if (!model && add) _this3.add([resource]);
      });
    }

    /**
     * Creates a new model instance with the given attributes
     */

  }, {
    key: 'build',
    value: function build() {
      var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var ModelClass = this.model();
      var model = new ModelClass(attributes);
      model.collection = this;

      return model;
    }

    /**
     * Creates the model and saves it on the backend
     *
     * The default behaviour is optimistic but this
     * can be tuned.
     */

  }, {
    key: 'create',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(attributesOrModel) {
        var _this4 = this;

        var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
            _ref5$optimistic = _ref5.optimistic,
            optimistic = _ref5$optimistic === undefined ? true : _ref5$optimistic;

        var model, attributes, label, onProgress, _apiClient$post, abort, promise, data;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                model = void 0;
                attributes = attributesOrModel instanceof _Model2.default ? attributesOrModel.toJS() : attributesOrModel;
                label = 'creating';
                onProgress = (0, _lodash.debounce)(function onProgress(progress) {
                  if (optimistic && model.request) {
                    model.request.progress = progress;
                  }

                  if (this.request) {
                    this.request.progress = progress;
                  }
                }, 300);
                _apiClient$post = (0, _apiClient2.default)().post(this.url(), attributes, {
                  onProgress: onProgress
                }), abort = _apiClient$post.abort, promise = _apiClient$post.promise;


                if (optimistic) {
                  model = attributesOrModel instanceof _Model2.default ? attributesOrModel : (0, _lodash.last)(this.add([attributesOrModel]));
                  model.request = new _Request2.default(label, abort, 0);
                }

                this.request = new _Request2.default(label, abort, 0);

                data = void 0;
                _context.prev = 8;
                _context.next = 11;
                return promise;

              case 11:
                data = _context.sent;
                _context.next = 18;
                break;

              case 14:
                _context.prev = 14;
                _context.t0 = _context['catch'](8);

                (0, _mobx.runInAction)('create-error', function () {
                  if (model) {
                    _this4.remove([model.id]);
                  }
                  _this4.error = new _ErrorObject2.default(label, _context.t0);
                  _this4.request = null;
                });

                throw _context.t0;

              case 18:

                (0, _mobx.runInAction)('create-done', function () {
                  if (model) {
                    model.set(data);
                    model.request = null;
                  } else {
                    _this4.add([data]);
                  }
                  _this4.request = null;
                  _this4.error = null;
                });

                return _context.abrupt('return', data);

              case 20:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[8, 14]]);
      }));

      function create(_x5) {
        return _ref4.apply(this, arguments);
      }

      return create;
    }()

    /**
     * Fetches the models from the backend.
     *
     * It uses `set` internally so you can
     * use the options to disable adding, changing
     * or removing.
     */

  }, {
    key: 'fetch',
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
        var _this5 = this;

        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        var label, _apiClient$get, abort, promise, data;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                label = 'fetching';
                _apiClient$get = (0, _apiClient2.default)().get(this.url(), options.data), abort = _apiClient$get.abort, promise = _apiClient$get.promise;


                this.request = new _Request2.default(label, abort, 0);

                data = void 0;
                _context2.prev = 4;
                _context2.next = 7;
                return promise;

              case 7:
                data = _context2.sent;
                _context2.next = 14;
                break;

              case 10:
                _context2.prev = 10;
                _context2.t0 = _context2['catch'](4);

                (0, _mobx.runInAction)('fetch-error', function () {
                  _this5.error = new _ErrorObject2.default(label, _context2.t0);
                  _this5.request = null;
                });

                throw _context2.t0;

              case 14:

                (0, _mobx.runInAction)('fetch-done', function () {
                  _this5.set(data, options);
                  _this5.request = null;
                  _this5.error = null;
                });

                return _context2.abrupt('return', data);

              case 16:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[4, 10]]);
      }));

      function fetch() {
        return _ref6.apply(this, arguments);
      }

      return fetch;
    }()

    /**
     * Call an RPC action for all those
     * non-REST endpoints that you may have in
     * your API.
     */

  }, {
    key: 'rpc',
    value: function () {
      var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(method, body) {
        var _this6 = this;

        var label, _apiClient$post2, promise, abort, response;

        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                label = 'updating'; // TODO: Maybe differentiate?

                _apiClient$post2 = (0, _apiClient2.default)().post(this.url() + '/' + method, body || {}), promise = _apiClient$post2.promise, abort = _apiClient$post2.abort;


                this.request = new _Request2.default(label, abort, 0);

                response = void 0;
                _context3.prev = 4;
                _context3.next = 7;
                return promise;

              case 7:
                response = _context3.sent;
                _context3.next = 14;
                break;

              case 10:
                _context3.prev = 10;
                _context3.t0 = _context3['catch'](4);

                (0, _mobx.runInAction)('accept-fail', function () {
                  _this6.request = null;
                  _this6.error = new _ErrorObject2.default(label, _context3.t0);
                });

                throw _context3.t0;

              case 14:

                this.request = null;
                this.error = null;

                return _context3.abrupt('return', response);

              case 17:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[4, 10]]);
      }));

      function rpc(_x8, _x9) {
        return _ref7.apply(this, arguments);
      }

      return rpc;
    }()
  }]);
  return Collection;
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
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, 'models', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return [];
  }
}), _applyDecoratedDescriptor(_class.prototype, 'add', [_mobx.action], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'add'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'remove', [_mobx.action], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'remove'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'set', [_mobx.action], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'set'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'create', [_mobx.action], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'create'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'fetch', [_mobx.action], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'fetch'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'rpc', [_mobx.action], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'rpc'), _class.prototype)), _class);
exports.default = Collection;