(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("data-capsule", [], factory);
	else if(typeof exports === 'object')
		exports["data-capsule"] = factory();
	else
		root["data-capsule"] = factory();
})((typeof self !== 'undefined' ? self : this), function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "https://static.parastorage.com/services/data-capsule/1.0.0/";
/******/
/******/
/******/ 	__webpack_require__.p = typeof window !== 'undefined' && window.__STATICS_BASE_URL__ || __webpack_require__.p;
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 53);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/*!*************************!*\
  !*** ./base-storage.js ***!
  \*************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


class BaseStorage {
  constructor() {
    ['setItem', 'getItem', 'removeItem', 'getAllItems'].forEach(method => {
      if (this[method] === BaseStorage.prototype[method]) {
        throw new Error(`BaseStorage method [${method}] must be overriden!`);
      }
    });
  }

  setItem(key, value, options) {
    throw options;
  }

  getItem(key, options) {
    throw options;
  }

  removeItem(key, options) {
    throw options;
  }

  getAllItems(options) {
    throw options;
  }

  static verify(strategy) {
    if (strategy instanceof BaseStorage) {
      return strategy;
    } else {
      throw new Error(`This class must extend BaseStorage!`);
    }
  }
}

module.exports = BaseStorage;

/***/ }),

/***/ 1:
/*!****************************!*\
  !*** ./utils/constants.js ***!
  \****************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports) {

const errors = {
  NOT_FOUND: new Error('Key was not found in capsule'),
  SERVER_ERROR: new Error('Failed to perform operarion on server')
};

function toError(str) {
  return Object.values(errors).find(err => err.message === str) || str;
}

module.exports = {
  PREFIX_SEPARATOR: '|',
  KEY_SEPARATOR: '#',
  STORAGE_PREFIX: 'capsule',
  NOT_FOUND: errors.NOT_FOUND,
  CONNECTION_MAX_TIMEOUT: 2000,
  MESSAGE_MAX_TIMEOUT: 8000,
  SERVER_ERROR: errors.SERVER_ERROR,
  toError
};

/***/ }),

/***/ 14:
/*!*************************************!*\
  !*** ./strategies/frame-storage.js ***!
  \*************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const greedySplit = __webpack_require__(/*! greedy-split */ 5);
const connectMessageChannel = __webpack_require__(/*! message-channel/connect */ 15);
const BaseStorage = __webpack_require__(/*! ../base-storage */ 0);
const { CONNECTION_MAX_TIMEOUT, MESSAGE_MAX_TIMEOUT } = __webpack_require__(/*! ../utils/constants */ 1);

class FrameStorageStrategy extends BaseStorage {
  constructor(target, origin, token) {
    super();
    this.target = target;
    this.origin = origin;
    this.token = token;
    this.channel;
  }

  getChannel() {
    if (this.channel) {
      return Promise.resolve(this.channel);
    }

    return connectMessageChannel('data-capsule', { target: this.target, origin: this.origin, connectionMaxTimeout: CONNECTION_MAX_TIMEOUT, messageMaxTimeout: MESSAGE_MAX_TIMEOUT }).then(channel => {
      this.channel = channel;
      return channel;
    });
  }

  sendCommand(method, params) {
    const payload = { data: params };

    return this.getChannel().then(sendToChannel => {
      const message = [this.token, method, JSON.stringify(payload)].join('|');

      return sendToChannel(message).then(e => {
        const [status, payload] = greedySplit(e.data, '|', 2);
        if (status === 'reject') {
          throw payload;
        }

        return JSON.parse(payload).data;
      });
    });
  }

  setItem(...params) {
    return this.sendCommand('setItem', params);
  }

  getItem(...params) {
    return this.sendCommand('getItem', params);
  }

  removeItem(...params) {
    return this.sendCommand('removeItem', params);
  }

  getAllItems(...params) {
    return this.sendCommand('getAllItems', params);
  }
}

module.exports = FrameStorageStrategy;

/***/ }),

/***/ 15:
/*!**************************************************!*\
  !*** ../node_modules/message-channel/connect.js ***!
  \**************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./dist/src/connect/connect */ 16);


/***/ }),

/***/ 16:
/*!*******************************************************************!*\
  !*** ../node_modules/message-channel/dist/src/connect/connect.js ***!
  \*******************************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _constants = __webpack_require__(/*! ../constants */ 4);

var _utils = __webpack_require__(/*! ../utils */ 3);

var _sendFactory = __webpack_require__(/*! ./send-factory */ 17);

var _sendFactory2 = _interopRequireDefault(_sendFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function connect(scope) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _options$targetOrigin = options.targetOrigin,
      targetOrigin = _options$targetOrigin === undefined ? '*' : _options$targetOrigin,
      _options$connectionMa = options.connectionMaxTimeout,
      connectionMaxTimeout = _options$connectionMa === undefined ? _constants.deafultConnectionMaxTimeout : _options$connectionMa,
      _options$messageMaxTi = options.messageMaxTimeout,
      messageMaxTimeout = _options$messageMaxTi === undefined ? _constants.deafultMessageMaxTimeout : _options$messageMaxTi;


  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      reject(new Error('max timeout of ' + connectionMaxTimeout + 'ms exceeded'));
    }, connectionMaxTimeout);

    var channel = new window.MessageChannel();

    channel.port1.onmessage = function (e) {
      if (e.data === _constants.connectionSuccessMsg) {
        return resolve((0, _sendFactory2.default)(channel.port1, { messageMaxTimeout: messageMaxTimeout }));
      } else {
        reject(new Error('connection could not establise'));
      }
    };

    var connectionMessage = (0, _utils.constructConnectionMessage)(scope);
    window.parent.postMessage(connectionMessage, targetOrigin, [channel.port2]);
  });
}

module.exports = connect;

/***/ }),

/***/ 17:
/*!************************************************************************!*\
  !*** ../node_modules/message-channel/dist/src/connect/send-factory.js ***!
  \************************************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = sendFactory;

var _utils = __webpack_require__(/*! ../utils */ 3);

var _v = __webpack_require__(/*! uuid/v4 */ 18);

var _v2 = _interopRequireDefault(_v);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function sendFactory(port, options) {
  var messageMaxTimeout = options.messageMaxTimeout;

  var messages = {};

  port.onmessage = function (e) {
    var _parseChannelMessage = (0, _utils.parseChannelMessage)(e.data),
        id = _parseChannelMessage.id,
        payload = _parseChannelMessage.payload;

    if (messages[id]) {
      var modifiedEvent = {
        data: payload,
        origin: e.origin,
        lastEventId: e.lastEventId,
        source: e.source,
        ports: e.ports
      };

      messages[id](modifiedEvent);
    }
  };

  return function (message, transferList) {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        reject(new Error('max timeout of ' + messageMaxTimeout + 'ms exceeded'));
      }, messageMaxTimeout);

      var messageId = (0, _v2.default)();
      var packaged = (0, _utils.constructChannelMessage)(message, messageId);
      messages[messageId] = resolve;
      return port.postMessage(packaged, transferList);
    });
  };
}

/***/ }),

/***/ 18:
/*!**********************************!*\
  !*** ../node_modules/uuid/v4.js ***!
  \**********************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

var rng = __webpack_require__(/*! ./lib/rng */ 19);
var bytesToUuid = __webpack_require__(/*! ./lib/bytesToUuid */ 20);

function v4(options, buf, offset) {
  var i = buf && offset || 0;

  if (typeof(options) == 'string') {
    buf = options === 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};

  var rnds = options.random || (options.rng || rng)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (var ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || bytesToUuid(rnds);
}

module.exports = v4;


/***/ }),

/***/ 19:
/*!***********************************************!*\
  !*** ../node_modules/uuid/lib/rng-browser.js ***!
  \***********************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports) {

// Unique ID creation requires a high quality random # generator.  In the
// browser this is a little complicated due to unknown quality of Math.random()
// and inconsistent support for the `crypto` API.  We do the best we can via
// feature-detection

// getRandomValues needs to be invoked in a context where "this" is a Crypto
// implementation. Also, find the complete implementation of crypto on IE11.
var getRandomValues = (typeof(crypto) != 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto)) ||
                      (typeof(msCrypto) != 'undefined' && typeof window.msCrypto.getRandomValues == 'function' && msCrypto.getRandomValues.bind(msCrypto));

if (getRandomValues) {
  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
  var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef

  module.exports = function whatwgRNG() {
    getRandomValues(rnds8);
    return rnds8;
  };
} else {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  var rnds = new Array(16);

  module.exports = function mathRNG() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return rnds;
  };
}


/***/ }),

/***/ 20:
/*!***********************************************!*\
  !*** ../node_modules/uuid/lib/bytesToUuid.js ***!
  \***********************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports) {

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4
  return ([bth[buf[i++]], bth[buf[i++]], 
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]],
	bth[buf[i++]], bth[buf[i++]],
	bth[buf[i++]], bth[buf[i++]]]).join('');
}

module.exports = bytesToUuid;


/***/ }),

/***/ 3:
/*!*********************************************************!*\
  !*** ../node_modules/message-channel/dist/src/utils.js ***!
  \*********************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseConnectionMessage = exports.constructConnectionMessage = exports.parseChannelMessage = exports.constructChannelMessage = undefined;

var _constants = __webpack_require__(/*! ./constants */ 4);

var constructChannelMessage = exports.constructChannelMessage = function constructChannelMessage(payload, id) {
  if (!id) {
    return payload;
  }

  return id + _constants.messageDelimiter + payload;
};

var parseChannelMessage = exports.parseChannelMessage = function parseChannelMessage(message) {
  var firstDelimiterIndex = message.indexOf(_constants.messageDelimiter);
  if (firstDelimiterIndex === -1) {
    return { id: null, payload: message };
  }

  var id = message.slice(0, firstDelimiterIndex);
  var payload = message.slice(firstDelimiterIndex + 1);
  return { id: id, payload: payload };
};

var constructConnectionMessage = exports.constructConnectionMessage = function constructConnectionMessage(scope) {
  return _constants.connectionRequestMsg + _constants.messageDelimiter + scope;
};

var parseConnectionMessage = exports.parseConnectionMessage = function parseConnectionMessage(message) {
  var firstDelimiterIndex = message.indexOf(_constants.messageDelimiter);
  if (firstDelimiterIndex === -1 || message.slice(0, firstDelimiterIndex) !== _constants.connectionRequestMsg) {
    throw new Error('Invalid connection message');
  }

  var scope = message.slice(firstDelimiterIndex + 1);
  return scope;
};

/***/ }),

/***/ 4:
/*!*************************************************************!*\
  !*** ../node_modules/message-channel/dist/src/constants.js ***!
  \*************************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var connectionRequestMsg = exports.connectionRequestMsg = 'req_con';
var connectionSuccessMsg = exports.connectionSuccessMsg = 'connection_success';
var messageDelimiter = exports.messageDelimiter = '|';
var deafultConnectionMaxTimeout = exports.deafultConnectionMaxTimeout = 200;
var deafultMessageMaxTimeout = exports.deafultMessageMaxTimeout = 5000;

/***/ }),

/***/ 5:
/*!******************************************************!*\
  !*** ../node_modules/greedy-split/dist/src/index.js ***!
  \******************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function greedySplit(str, separator, limit) {
  var result = str.split(separator, limit);
  if (result.length === limit) {
    var length = 0;
    if (typeof separator === 'string') {
      length = result.join(separator).length;
    } else {
      length = result.reduce(function (l, x, i) {
        var separatorLength = 0;
        if (i + 1 < limit) {
          separatorLength = str.slice(l).match(separator).shift().length;
        }
        return l + x.length + separatorLength;
      }, 0);
    }
    result[limit - 1] += str.slice(length);
  }
  return result;
}

module.exports = greedySplit;
//# sourceMappingURL=index.js.map


/***/ }),

/***/ 53:
/*!*************************!*\
  !*** ./global-frame.js ***!
  \*************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* global window */


const dataCapsuleTools = __webpack_require__(/*! ./frame */ 54);

if (typeof window !== 'undefined') {
  window.DataCapsuleTools = dataCapsuleTools;
}

module.exports = dataCapsuleTools;

/***/ }),

/***/ 54:
/*!******************!*\
  !*** ./frame.js ***!
  \******************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const FrameStorageStrategy = __webpack_require__(/*! ./strategies/frame-storage */ 14);
const { NOT_FOUND } = __webpack_require__(/*! ./utils/constants */ 1);
const BaseStorage = __webpack_require__(/*! ./base-storage */ 0);
const DataCapsule = __webpack_require__(/*! ./data-capsule */ 8);

module.exports = {
  NOT_FOUND,
  BaseStorage,
  DataCapsule,
  FrameStorageStrategy
};

/***/ }),

/***/ 8:
/*!*************************!*\
  !*** ./data-capsule.js ***!
  \*************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const BaseStorage = __webpack_require__(/*! ./base-storage */ 0);

function validateNamespace(options) {
  if (!options.namespace) {
    throw new Error('namespace is required');
  } else if (typeof options.namespace !== 'string') {
    throw new Error('namespace should be a string');
  }
}

function buildValidadateOptions(capsuleOptions, options) {
  options = Object.assign({}, capsuleOptions, options);
  validateNamespace(options);
  return options;
}

class DataCapsule extends BaseStorage {
  constructor({ strategy, namespace, scope }) {
    super();
    this.storageStrategy = BaseStorage.verify(strategy);
    this._options = { namespace, scope };
  }

  setItem(key, value, options) {
    options = buildValidadateOptions(this._options, options);
    return this.storageStrategy.setItem(key, value, options);
  }

  getItem(key, options) {
    options = buildValidadateOptions(this._options, options);
    return this.storageStrategy.getItem(key, options);
  }

  removeItem(key, options) {
    options = buildValidadateOptions(this._options, options);
    return this.storageStrategy.removeItem(key, options);
  }

  getAllItems(options) {
    options = buildValidadateOptions(this._options, options);
    return this.storageStrategy.getAllItems(options);
  }
}

module.exports = DataCapsule;

/***/ })

/******/ });
});
//# sourceMappingURL=frame.bundle.js.map