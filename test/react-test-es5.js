/******/ (function(modules) { // webpackBootstrap
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require('causality-redux');

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require('react-redux');

/***/ }),
/* 2 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports =
/******/function (modules) {
    // webpackBootstrap
    /******/ // The module cache
    /******/var installedModules = {};
    /******/
    /******/ // The require function
    /******/function __webpack_require__(moduleId) {
        /******/
        /******/ // Check if module is in cache
        /******/if (installedModules[moduleId]) {
            /******/return installedModules[moduleId].exports;
            /******/
        }
        /******/ // Create a new module (and put it into the cache)
        /******/var module = installedModules[moduleId] = {
            /******/i: moduleId,
            /******/l: false,
            /******/exports: {}
            /******/ };
        /******/
        /******/ // Execute the module function
        /******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        /******/
        /******/ // Flag the module as loaded
        /******/module.l = true;
        /******/
        /******/ // Return the exports of the module
        /******/return module.exports;
        /******/
    }
    /******/
    /******/
    /******/ // expose the modules object (__webpack_modules__)
    /******/__webpack_require__.m = modules;
    /******/
    /******/ // expose the module cache
    /******/__webpack_require__.c = installedModules;
    /******/
    /******/ // identity function for calling harmony imports with the correct context
    /******/__webpack_require__.i = function (value) {
        return value;
    };
    /******/
    /******/ // define getter function for harmony exports
    /******/__webpack_require__.d = function (exports, name, getter) {
        /******/if (!__webpack_require__.o(exports, name)) {
            /******/Object.defineProperty(exports, name, {
                /******/configurable: false,
                /******/enumerable: true,
                /******/get: getter
                /******/ });
            /******/
        }
        /******/
    };
    /******/
    /******/ // getDefaultExport function for compatibility with non-harmony modules
    /******/__webpack_require__.n = function (module) {
        /******/var getter = module && module.__esModule ?
        /******/function getDefault() {
            return module['default'];
        } :
        /******/function getModuleExports() {
            return module;
        };
        /******/__webpack_require__.d(getter, 'a', getter);
        /******/return getter;
        /******/
    };
    /******/
    /******/ // Object.prototype.hasOwnProperty.call
    /******/__webpack_require__.o = function (object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
    };
    /******/
    /******/ // __webpack_public_path__
    /******/__webpack_require__.p = "";
    /******/
    /******/ // Load entry module and return exports
    /******/return __webpack_require__(__webpack_require__.s = 2);
    /******/
}(
/************************************************************************/
/******/[
/* 0 */
/***/function (module, exports) {

    module.exports = __webpack_require__(0);

    /***/
},
/* 1 */
/***/function (module, exports) {

    module.exports = __webpack_require__(1);

    /***/
},
/* 2 */
/***/function (module, exports, __webpack_require__) {

    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
            }
        }return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
        };
    }();

    var _get = function get(object, property, receiver) {
        if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
            var parent = Object.getPrototypeOf(object);if (parent === null) {
                return undefined;
            } else {
                return get(parent, property, receiver);
            }
        } else if ("value" in desc) {
            return desc.value;
        } else {
            var getter = desc.get;if (getter === undefined) {
                return undefined;
            }return getter.call(receiver);
        }
    };

    var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
        return typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
    } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
    }; /** @preserve © 2017 Andrew Banks ALL RIGHTS RESERVED */

    exports.connectChangersAndStateToProps = connectChangersAndStateToProps;
    exports.connectStateToProps = connectStateToProps;
    exports.connectChangersToProps = connectChangersToProps;
    exports.establishControllerConnections = establishControllerConnections;

    var _reactRedux = __webpack_require__(1);

    var _causalityRedux = __webpack_require__(0);

    var _causalityRedux2 = _interopRequireDefault(_causalityRedux);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof2(superClass)));
        }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    function _toConsumableArray(arr) {
        if (Array.isArray(arr)) {
            for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
                arr2[i] = arr[i];
            }return arr2;
        } else {
            return Array.from(arr);
        }
    }

    var undefinedString = 'undefined';

    var error = function error(msg) {
        throw new Error('react-causality-redux: ' + msg);
    };

    if ((typeof _causalityRedux2.default === 'undefined' ? 'undefined' : _typeof(_causalityRedux2.default)) === undefinedString) error('CausalityRedux is undefined');

    var reactreduxConnect = undefined;
    if ((typeof _reactRedux.connect === 'undefined' ? 'undefined' : _typeof(_reactRedux.connect)) !== undefinedString) reactreduxConnect = _reactRedux.connect;

    if ((typeof reactreduxConnect === 'undefined' ? 'undefined' : _typeof(reactreduxConnect)) === undefinedString) {
        if ((typeof ReactRedux === 'undefined' ? 'undefined' : _typeof(ReactRedux)) === undefinedString) error('ReactRedux is undefined');
        reactreduxConnect = ReactRedux.connect;
    }

    var getListenerDefs = function getListenerDefs(arrArg) {
        var listenerDefs = [];
        arrArg.forEach(function (p) {
            if (_typeof(p.changers) !== undefinedString) {
                var keys = void 0;
                if (p.changers.length === 0) {
                    var pEntry = _causalityRedux2.default.partitionDefinitions.find(function (entry) {
                        return p.partitionName === entry.partitionName;
                    });
                    keys = _causalityRedux2.default.getKeys(pEntry.changers);
                } else {
                    keys = [].concat(_toConsumableArray(p.changers));
                }
                listenerDefs.push({ partitionName: p.partitionName, keys: keys });
            }
        });
        return listenerDefs;
    };

    function mapDispatchToProps(listenerDefs) {
        return function () {
            var obj = {};
            listenerDefs.forEach(function (p) {
                var storePartition = _causalityRedux2.default.store[p.partitionName];
                p.keys.forEach(function (key) {
                    obj[key] = storePartition[key];
                });
            });
            return obj;
        };
    }

    function handleListeners(arrArg) {
        var hasListerners = false;
        arrArg.forEach(function (p) {
            hasListerners = hasListerners || _typeof(p.changers) !== undefinedString;
            var partition = _causalityRedux2.default.partitionDefinitions.find(function (e) {
                return p.partitionName === e.partitionName;
            });
            if (!partition) error(p.partitionName + ' is not a valid state partition.');

            if (_typeof(p.changers) !== undefinedString) {
                if (!Array.isArray(p.changers)) error('The changers parameter is not an array for ' + p.partitionName + '.');
                p.changers.forEach(function (o) {
                    if (typeof _causalityRedux2.default.store[p.partitionName][o] !== 'function') error('The entry ' + o + ' is not a function.');
                });
            }
        });
        if (!hasListerners) return undefined;

        return mapDispatchToProps(getListenerDefs(arrArg));
    }

    function getStateDefs(arrArg) {
        var stateDefs = [];
        arrArg.forEach(function (p) {
            if (_typeof(p.stateEntries) !== undefinedString) {
                var keys = p.stateEntries.length !== 0 ? [].concat(_toConsumableArray(p.stateEntries)) : _causalityRedux2.default.getKeys(_causalityRedux2.default.defaultState[p.partitionName]);
                stateDefs.push({ partitionName: p.partitionName, keys: keys });
            }
        });
        return stateDefs;
    }

    function mapStateToProps(stateDefs) {
        return function (state) {
            var obj = {};
            stateDefs.forEach(function (stateDef) {
                var statePartition = state[stateDef.partitionName];
                stateDef.keys.forEach(function (e) {
                    obj[e] = statePartition[e];
                });
            });
            return obj;
        };
    }

    function handleStateConnections(arrArg) {
        var hasState = false;
        arrArg.forEach(function (p) {
            hasState = hasState || _typeof(p.stateEntries) !== undefinedString;

            var partition = _causalityRedux2.default.partitionDefinitions.find(function (e) {
                return p.partitionName === e.partitionName;
            });
            if (!partition) error(p.partitionName + ' is not a valid state partition.');

            if (_typeof(p.stateEntries) !== undefinedString) {
                if (!Array.isArray(p.stateEntries)) error('The stateEntries parameter is not an array for ' + p.partitionName + '.');
                p.stateEntries.forEach(function (se) {
                    if (_typeof(partition.defaultState[se]) === undefinedString) error(se + ' is not a valid key in the state partition ' + p.partitionName + '.');
                });
            }
        });

        if (!hasState) return undefined;

        return mapStateToProps(getStateDefs(arrArg));
    }

    //
    // At this time, the redux connect wrapper class fails when using a constructor for this wrapped class.
    // So, instead of using 'this' in the constructor to save state, create a closure for the class which 
    // achieves the same goal of providing the parameters (Component, mapStateToProps, reactComponentName, 
    // combinedPartitionName, store) to the class when it is rendered.
    //
    function WrapConnectComponent(Component, mapStateToProps, reactComponentName, combinedPartitionName, store) {
        return function (_Component) {
            _inherits(WrappedComponent, _Component);

            function WrappedComponent() {
                _classCallCheck(this, WrappedComponent);

                return _possibleConstructorReturn(this, (WrappedComponent.__proto__ || Object.getPrototypeOf(WrappedComponent)).apply(this, arguments));
            }

            _createClass(WrappedComponent, [{
                key: 'render',
                value: function render() {
                    // This is only called when a tracing onListener function is active.
                    // Will not be called in production mode.
                    if (typeof _causalityRedux2.default.onListener === 'function' && typeof mapStateToProps === 'function') {
                        // Need to determine whether this render was caused by a store update.
                        var priorState = this.causalityReduxState;
                        this.causalityReduxState = mapStateToProps(store.getState());
                        if (priorState && !_causalityRedux2.default.shallowEqual(priorState, this.causalityReduxState)) _causalityRedux2.default.onListener({ nextState: this.causalityReduxState, listenerName: reactComponentName, partitionName: combinedPartitionName });
                    }
                    // redux connect render
                    return _get(WrappedComponent.prototype.__proto__ || Object.getPrototypeOf(WrappedComponent.prototype), 'render', this).call(this);
                }
            }]);

            return WrappedComponent;
        }(Component);
    }

    function doReduxConnect(reactComponent, arrArg, reactComponentName, combinedPartitionName, mapStateToProps, mapDispatchToProps, mergeProps, options) {
        var reduxComponent = reactreduxConnect(mapStateToProps, mapDispatchToProps, mergeProps, options)(reactComponent);

        return WrapConnectComponent(reduxComponent, mapStateToProps, reactComponentName, combinedPartitionName, _causalityRedux2.default.store);
    }

    function connectChangersAndStateToPropsInternal(reactComponent, arrArg, reactComponentName, mergeProps, options) {
        if (!_causalityRedux2.default.store) error('CausalityRedux.createStore must be called before connecting to react components.');

        var combinedPartitionName = '';
        arrArg.forEach(function (p) {
            if (combinedPartitionName !== '') combinedPartitionName += ', ';
            combinedPartitionName += p.partitionName.toString();
        });

        var mapDispatchToProps = handleListeners(arrArg);
        var mapStateToProps = handleStateConnections(arrArg);
        var simpleReduxComponent = doReduxConnect(reactComponent, arrArg, reactComponentName, combinedPartitionName, mapStateToProps, mapDispatchToProps, mergeProps, options);
        return simpleReduxComponent;
    }

    function connectChangersAndStateToProps(reactComponent, arg2, arg3, arg4, arg5, arg6, arg7) {
        var arrArg = arg2;
        var mergeProps = arg6;
        var options = arg7;
        var reactComponentName = arg5;
        if (!Array.isArray(arg2)) {
            arrArg = [];
            if ((typeof arg3 === 'undefined' ? 'undefined' : _typeof(arg3)) === undefinedString) arg3 = [];
            if ((typeof arg4 === 'undefined' ? 'undefined' : _typeof(arg4)) === undefinedString) arg4 = [];
            arrArg.push({ partitionName: arg2, changers: arg3, stateEntries: arg4 });
        } else {
            mergeProps = arg4;
            options = arg5;
            reactComponentName = arg3;
        }
        return connectChangersAndStateToPropsInternal(reactComponent, arrArg, reactComponentName, mergeProps, options);
    }

    function connectStateToProps(reactComponent, arg2, arg3, arg4, arg5, arg6) {
        var arrArg = arg2;
        var mergeProps = arg5;
        var options = arg6;
        var reactComponentName = arg4;
        if (!Array.isArray(arg2)) {
            arrArg = [];
            if ((typeof arg3 === 'undefined' ? 'undefined' : _typeof(arg3)) === undefinedString) arg3 = [];
            arrArg.push({ partitionName: arg2, changers: undefined, stateEntries: arg3 });
        } else {
            mergeProps = arg4;
            options = arg5;
            reactComponentName = arg3;
        }
        return connectChangersAndStateToPropsInternal(reactComponent, arrArg, reactComponentName, mergeProps, options);
    }

    function connectChangersToProps(reactComponent, arg2, arg3, arg4, arg5, arg6) {
        var arrArg = arg2;
        var mergeProps = arg5;
        var options = arg6;
        var reactComponentName = arg4;
        if (!Array.isArray(arg2)) {
            arrArg = [];
            if ((typeof arg3 === 'undefined' ? 'undefined' : _typeof(arg3)) === undefinedString) arg3 = [];
            arrArg.push({ partitionName: arg2, changers: arg3, stateEntries: undefined });
        } else {
            mergeProps = arg4;
            options = arg5;
            reactComponentName = arg3;
        }
        return connectChangersAndStateToPropsInternal(reactComponent, arrArg, reactComponentName, mergeProps, options);
    }

    function establishControllerConnections(_ref) {
        var module = _ref.module,
            uiComponent = _ref.uiComponent,
            uiComponentName = _ref.uiComponentName,
            partition = _ref.partition,
            storeKeys = _ref.storeKeys,
            changerKeys = _ref.changerKeys,
            hotDisposeHandler = _ref.hotDisposeHandler;

        // Create the causality-redux store and use the store partition above for definitions. 
        // If the store has already been created elsewhere, then only the input partition is created.
        _causalityRedux2.default.createStore(partition);

        partition = _causalityRedux2.default.partitionDefinitions.find(function (e) {
            return partition.partitionName === e.partitionName;
        });

        // Get access to the partition’s controller functions.
        var partitionStore = _causalityRedux2.default.store[partition.partitionName];

        // Get a proxy to the store partition so that causality-redux can detect changes to the values of the partition.
        var partitionState = partitionStore.partitionState;

        // Allows setting multiple keys in a state partition.
        var setState = partitionStore.setState;

        var funcKeys = [];
        var unsubscribers = [];
        _causalityRedux2.default.getKeys(partition.changerDefinitions).forEach(function (changerKey) {
            var entry = partition.changerDefinitions[changerKey];
            if (entry.operation === _causalityRedux2.default.operations.STATE_FUNCTION_CALL) {
                unsubscribers.push(partitionStore.subscribe(entry.controllerFunction, changerKey));
                funcKeys.push(changerKey);
            }
        });

        if (typeof storeKeys === 'undefined') storeKeys = Object.keys(partition.defaultState);else if (storeKeys.length === 0) storeKeys = undefined;

        if (typeof changerKeys === 'undefined') changerKeys = funcKeys;else if (changerKeys.length === 0) changerKeys = undefined;

        uiComponentName = typeof uiComponentName === 'undefined' ? 'React component render' : uiComponentName + ' render';

        if (typeof uiComponent !== 'undefined') {
            uiComponent = _causalityRedux2.default.connectChangersAndStateToProps(uiComponent, // React component to wrap.
            partition.partitionName, // State partition
            // This is an array of names of changers/action creators defined in the partition that you want
            // passed into the props by causality-redux so that the component can call these functions.
            changerKeys,
            // This is an array of keys in COUNTTEN_STATE whose values you want passed into the props.
            // Whenever any value associated with a key listed in this array changes in the causality-redux store,
            // causality-redux will cause the component to render with the new values set in the props.
            storeKeys, uiComponentName);
        }

        if (module.hot) {
            // Add the dispose handler that is to be called before this module is changed out for the new one. 
            // This must be done for any module with side effects like adding event listeners etc.
            module.hot.dispose(function () {
                unsubscribers.forEach(function (unsubscriber) {
                    return unsubscriber();
                });
                if (typeof hotDisposeHandler === 'function') hotDisposeHandler();
            });
        }

        return {
            partitionState: partitionState,
            setState: setState,
            partitionStore: partitionStore,
            uiComponent: uiComponent
        };
    }

    _causalityRedux2.default.connectChangersAndStateToProps = connectChangersAndStateToProps;
    _causalityRedux2.default.connectStateToProps = connectStateToProps;
    _causalityRedux2.default.connectChangersToProps = connectChangersToProps;
    _causalityRedux2.default.establishControllerConnections = establishControllerConnections;

    /***/
}]);

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

// compare and isBuffer taken from https://github.com/feross/buffer/blob/680e9e5e488f22aac27599a57dc844a6315928dd/index.js
// original notice:

/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
function compare(a, b) {
  if (a === b) {
    return 0;
  }

  var x = a.length;
  var y = b.length;

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i];
      y = b[i];
      break;
    }
  }

  if (x < y) {
    return -1;
  }
  if (y < x) {
    return 1;
  }
  return 0;
}
function isBuffer(b) {
  if (global.Buffer && typeof global.Buffer.isBuffer === 'function') {
    return global.Buffer.isBuffer(b);
  }
  return !!(b != null && b._isBuffer);
}

// based on node assert, original notice:

// http://wiki.commonjs.org/wiki/Unit_Testing/1.0
//
// THIS IS NOT TESTED NOR LIKELY TO WORK OUTSIDE V8!
//
// Originally from narwhal.js (http://narwhaljs.org)
// Copyright (c) 2009 Thomas Robinson <280north.com>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the 'Software'), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

var util = __webpack_require__(12);
var hasOwn = Object.prototype.hasOwnProperty;
var pSlice = Array.prototype.slice;
var functionsHaveNames = (function () {
  return function foo() {}.name === 'foo';
}());
function pToString (obj) {
  return Object.prototype.toString.call(obj);
}
function isView(arrbuf) {
  if (isBuffer(arrbuf)) {
    return false;
  }
  if (typeof global.ArrayBuffer !== 'function') {
    return false;
  }
  if (typeof ArrayBuffer.isView === 'function') {
    return ArrayBuffer.isView(arrbuf);
  }
  if (!arrbuf) {
    return false;
  }
  if (arrbuf instanceof DataView) {
    return true;
  }
  if (arrbuf.buffer && arrbuf.buffer instanceof ArrayBuffer) {
    return true;
  }
  return false;
}
// 1. The assert module provides functions that throw
// AssertionError's when particular conditions are not met. The
// assert module must conform to the following interface.

var assert = module.exports = ok;

// 2. The AssertionError is defined in assert.
// new assert.AssertionError({ message: message,
//                             actual: actual,
//                             expected: expected })

var regex = /\s*function\s+([^\(\s]*)\s*/;
// based on https://github.com/ljharb/function.prototype.name/blob/adeeeec8bfcc6068b187d7d9fb3d5bb1d3a30899/implementation.js
function getName(func) {
  if (!util.isFunction(func)) {
    return;
  }
  if (functionsHaveNames) {
    return func.name;
  }
  var str = func.toString();
  var match = str.match(regex);
  return match && match[1];
}
assert.AssertionError = function AssertionError(options) {
  this.name = 'AssertionError';
  this.actual = options.actual;
  this.expected = options.expected;
  this.operator = options.operator;
  if (options.message) {
    this.message = options.message;
    this.generatedMessage = false;
  } else {
    this.message = getMessage(this);
    this.generatedMessage = true;
  }
  var stackStartFunction = options.stackStartFunction || fail;
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, stackStartFunction);
  } else {
    // non v8 browsers so we can have a stacktrace
    var err = new Error();
    if (err.stack) {
      var out = err.stack;

      // try to strip useless frames
      var fn_name = getName(stackStartFunction);
      var idx = out.indexOf('\n' + fn_name);
      if (idx >= 0) {
        // once we have located the function frame
        // we need to strip out everything before it (and its line)
        var next_line = out.indexOf('\n', idx + 1);
        out = out.substring(next_line + 1);
      }

      this.stack = out;
    }
  }
};

// assert.AssertionError instanceof Error
util.inherits(assert.AssertionError, Error);

function truncate(s, n) {
  if (typeof s === 'string') {
    return s.length < n ? s : s.slice(0, n);
  } else {
    return s;
  }
}
function inspect(something) {
  if (functionsHaveNames || !util.isFunction(something)) {
    return util.inspect(something);
  }
  var rawname = getName(something);
  var name = rawname ? ': ' + rawname : '';
  return '[Function' +  name + ']';
}
function getMessage(self) {
  return truncate(inspect(self.actual), 128) + ' ' +
         self.operator + ' ' +
         truncate(inspect(self.expected), 128);
}

// At present only the three keys mentioned above are used and
// understood by the spec. Implementations or sub modules can pass
// other keys to the AssertionError's constructor - they will be
// ignored.

// 3. All of the following functions must throw an AssertionError
// when a corresponding condition is not met, with a message that
// may be undefined if not provided.  All assertion methods provide
// both the actual and expected values to the assertion error for
// display purposes.

function fail(actual, expected, message, operator, stackStartFunction) {
  throw new assert.AssertionError({
    message: message,
    actual: actual,
    expected: expected,
    operator: operator,
    stackStartFunction: stackStartFunction
  });
}

// EXTENSION! allows for well behaved errors defined elsewhere.
assert.fail = fail;

// 4. Pure assertion tests whether a value is truthy, as determined
// by !!guard.
// assert.ok(guard, message_opt);
// This statement is equivalent to assert.equal(true, !!guard,
// message_opt);. To test strictly for the value true, use
// assert.strictEqual(true, guard, message_opt);.

function ok(value, message) {
  if (!value) fail(value, true, message, '==', assert.ok);
}
assert.ok = ok;

// 5. The equality assertion tests shallow, coercive equality with
// ==.
// assert.equal(actual, expected, message_opt);

assert.equal = function equal(actual, expected, message) {
  if (actual != expected) fail(actual, expected, message, '==', assert.equal);
};

// 6. The non-equality assertion tests for whether two objects are not equal
// with != assert.notEqual(actual, expected, message_opt);

assert.notEqual = function notEqual(actual, expected, message) {
  if (actual == expected) {
    fail(actual, expected, message, '!=', assert.notEqual);
  }
};

// 7. The equivalence assertion tests a deep equality relation.
// assert.deepEqual(actual, expected, message_opt);

assert.deepEqual = function deepEqual(actual, expected, message) {
  if (!_deepEqual(actual, expected, false)) {
    fail(actual, expected, message, 'deepEqual', assert.deepEqual);
  }
};

assert.deepStrictEqual = function deepStrictEqual(actual, expected, message) {
  if (!_deepEqual(actual, expected, true)) {
    fail(actual, expected, message, 'deepStrictEqual', assert.deepStrictEqual);
  }
};

function _deepEqual(actual, expected, strict, memos) {
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;
  } else if (isBuffer(actual) && isBuffer(expected)) {
    return compare(actual, expected) === 0;

  // 7.2. If the expected value is a Date object, the actual value is
  // equivalent if it is also a Date object that refers to the same time.
  } else if (util.isDate(actual) && util.isDate(expected)) {
    return actual.getTime() === expected.getTime();

  // 7.3 If the expected value is a RegExp object, the actual value is
  // equivalent if it is also a RegExp object with the same source and
  // properties (`global`, `multiline`, `lastIndex`, `ignoreCase`).
  } else if (util.isRegExp(actual) && util.isRegExp(expected)) {
    return actual.source === expected.source &&
           actual.global === expected.global &&
           actual.multiline === expected.multiline &&
           actual.lastIndex === expected.lastIndex &&
           actual.ignoreCase === expected.ignoreCase;

  // 7.4. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if ((actual === null || typeof actual !== 'object') &&
             (expected === null || typeof expected !== 'object')) {
    return strict ? actual === expected : actual == expected;

  // If both values are instances of typed arrays, wrap their underlying
  // ArrayBuffers in a Buffer each to increase performance
  // This optimization requires the arrays to have the same type as checked by
  // Object.prototype.toString (aka pToString). Never perform binary
  // comparisons for Float*Arrays, though, since e.g. +0 === -0 but their
  // bit patterns are not identical.
  } else if (isView(actual) && isView(expected) &&
             pToString(actual) === pToString(expected) &&
             !(actual instanceof Float32Array ||
               actual instanceof Float64Array)) {
    return compare(new Uint8Array(actual.buffer),
                   new Uint8Array(expected.buffer)) === 0;

  // 7.5 For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else if (isBuffer(actual) !== isBuffer(expected)) {
    return false;
  } else {
    memos = memos || {actual: [], expected: []};

    var actualIndex = memos.actual.indexOf(actual);
    if (actualIndex !== -1) {
      if (actualIndex === memos.expected.indexOf(expected)) {
        return true;
      }
    }

    memos.actual.push(actual);
    memos.expected.push(expected);

    return objEquiv(actual, expected, strict, memos);
  }
}

function isArguments(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
}

function objEquiv(a, b, strict, actualVisitedObjects) {
  if (a === null || a === undefined || b === null || b === undefined)
    return false;
  // if one is a primitive, the other must be same
  if (util.isPrimitive(a) || util.isPrimitive(b))
    return a === b;
  if (strict && Object.getPrototypeOf(a) !== Object.getPrototypeOf(b))
    return false;
  var aIsArgs = isArguments(a);
  var bIsArgs = isArguments(b);
  if ((aIsArgs && !bIsArgs) || (!aIsArgs && bIsArgs))
    return false;
  if (aIsArgs) {
    a = pSlice.call(a);
    b = pSlice.call(b);
    return _deepEqual(a, b, strict);
  }
  var ka = objectKeys(a);
  var kb = objectKeys(b);
  var key, i;
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length !== kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] !== kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!_deepEqual(a[key], b[key], strict, actualVisitedObjects))
      return false;
  }
  return true;
}

// 8. The non-equivalence assertion tests for any deep inequality.
// assert.notDeepEqual(actual, expected, message_opt);

assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
  if (_deepEqual(actual, expected, false)) {
    fail(actual, expected, message, 'notDeepEqual', assert.notDeepEqual);
  }
};

assert.notDeepStrictEqual = notDeepStrictEqual;
function notDeepStrictEqual(actual, expected, message) {
  if (_deepEqual(actual, expected, true)) {
    fail(actual, expected, message, 'notDeepStrictEqual', notDeepStrictEqual);
  }
}


// 9. The strict equality assertion tests strict equality, as determined by ===.
// assert.strictEqual(actual, expected, message_opt);

assert.strictEqual = function strictEqual(actual, expected, message) {
  if (actual !== expected) {
    fail(actual, expected, message, '===', assert.strictEqual);
  }
};

// 10. The strict non-equality assertion tests for strict inequality, as
// determined by !==.  assert.notStrictEqual(actual, expected, message_opt);

assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
  if (actual === expected) {
    fail(actual, expected, message, '!==', assert.notStrictEqual);
  }
};

function expectedException(actual, expected) {
  if (!actual || !expected) {
    return false;
  }

  if (Object.prototype.toString.call(expected) == '[object RegExp]') {
    return expected.test(actual);
  }

  try {
    if (actual instanceof expected) {
      return true;
    }
  } catch (e) {
    // Ignore.  The instanceof check doesn't work for arrow functions.
  }

  if (Error.isPrototypeOf(expected)) {
    return false;
  }

  return expected.call({}, actual) === true;
}

function _tryBlock(block) {
  var error;
  try {
    block();
  } catch (e) {
    error = e;
  }
  return error;
}

function _throws(shouldThrow, block, expected, message) {
  var actual;

  if (typeof block !== 'function') {
    throw new TypeError('"block" argument must be a function');
  }

  if (typeof expected === 'string') {
    message = expected;
    expected = null;
  }

  actual = _tryBlock(block);

  message = (expected && expected.name ? ' (' + expected.name + ').' : '.') +
            (message ? ' ' + message : '.');

  if (shouldThrow && !actual) {
    fail(actual, expected, 'Missing expected exception' + message);
  }

  var userProvidedMessage = typeof message === 'string';
  var isUnwantedException = !shouldThrow && util.isError(actual);
  var isUnexpectedException = !shouldThrow && actual && !expected;

  if ((isUnwantedException &&
      userProvidedMessage &&
      expectedException(actual, expected)) ||
      isUnexpectedException) {
    fail(actual, expected, 'Got unwanted exception' + message);
  }

  if ((shouldThrow && actual && expected &&
      !expectedException(actual, expected)) || (!shouldThrow && actual)) {
    throw actual;
  }
}

// 11. Expected to throw an error:
// assert.throws(block, Error_opt, message_opt);

assert.throws = function(block, /*optional*/error, /*optional*/message) {
  _throws(true, block, error, message);
};

// EXTENSION! This is annoying to write outside this module.
assert.doesNotThrow = function(block, /*optional*/error, /*optional*/message) {
  _throws(false, block, error, message);
};

assert.ifError = function(err) { if (err) throw err; };

var objectKeys = Object.keys || function (obj) {
  var keys = [];
  for (var key in obj) {
    if (hasOwn.call(obj, key)) keys.push(key);
  }
  return keys;
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require('react');

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require('react-dom');

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require('redux');

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _assert = __webpack_require__(4);

var _assert2 = _interopRequireDefault(_assert);

var _react = __webpack_require__(5);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(6);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _redux = __webpack_require__(7);

var _causalityRedux = __webpack_require__(0);

var _causalityRedux2 = _interopRequireDefault(_causalityRedux);

var _reactRedux = __webpack_require__(1);

__webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable react/no-multi-comp */
/* eslint-disable react/jsx-sort-prop-types */

var COUNTER_STATE = "Counter";
var reduxCounter = {
  partitionName: COUNTER_STATE,
  defaultState: { counter: 0, counter3: 0 },
  changerDefinitions: {
    'onIncrement': { operation: _causalityRedux2.default.operations.STATE_INCREMENT, impliedArguments: ['counter'] },
    'onDecrement': { operation: _causalityRedux2.default.operations.STATE_DECREMENT, impliedArguments: ['counter'] },
    'onIncrement3': { operation: _causalityRedux2.default.operations.STATE_INCREMENT, impliedArguments: ['counter3'] }
  }
};

var FIELD_STATE = 'FIELD_STATE';
var reduxField = {
  partitionName: FIELD_STATE,
  defaultState: { fieldValue: "" },
  changerDefinitions: {
    'onChangeField': { operation: _causalityRedux2.default.operations.STATE_FUNCTION_CALL },
    'setField': { arguments: ['fieldValue'] }
  }
};

var onChangeFieldFunctionCalled = false;
function init() {
  var fieldState = _causalityRedux2.default.store[FIELD_STATE];
  function onChangeField(arg) {
    onChangeFieldFunctionCalled = true;
    var x = /^[a-zA-Z\s]*/.exec(arg);
    var fieldValue = "";
    if (x !== null) fieldValue = x[0];
    fieldState.setField(fieldValue);
  }
  fieldState.subscribe(onChangeField, ['onChangeField'], 'onChangeField');
}
_causalityRedux2.default.onStoreCreated(init);

var store = _causalityRedux2.default.createStore([reduxCounter, reduxField]);
var counterStore = store[COUNTER_STATE];

describe('CausalityRedux createStore', function () {
  it('CausalityRedux.store should exist', function () {
    (0, _assert2.default)(typeof store !== 'undefined');
  });
  it('CausalityRedux.connectChangersAndStateToProps should be a function.', function () {
    (0, _assert2.default)(typeof _causalityRedux2.default.connectChangersAndStateToProps === 'function');
  });
  it('CausalityRedux.connectChangersToProps should be a function.', function () {
    (0, _assert2.default)(typeof _causalityRedux2.default.connectChangersToProps === 'function');
  });
  it('CausalityRedux.connectStateToProps should be a function.', function () {
    (0, _assert2.default)(typeof _causalityRedux2.default.connectStateToProps === 'function');
  });
});

var incButton = null;
var decButton = null;
var incButton3 = null;
var incButton2 = null;
var counterDisplay = null;
var renderCallback = null;
var update = false;
var update2 = false;
var inputField = null;
var counterDisplay2 = null;

var CounterForm = function (_React$Component) {
  _inherits(CounterForm, _React$Component);

  function CounterForm() {
    _classCallCheck(this, CounterForm);

    return _possibleConstructorReturn(this, (CounterForm.__proto__ || Object.getPrototypeOf(CounterForm)).apply(this, arguments));
  }

  _createClass(CounterForm, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      update = true;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          onIncrement = _props.onIncrement,
          onDecrement = _props.onDecrement,
          onIncrement3 = _props.onIncrement3,
          counter = _props.counter;

      return _react2.default.createElement(
        'div',
        { className: 'counter-form-button-container' },
        _react2.default.createElement(
          'div',
          { ref: function ref(e) {
              counterDisplay = e;
            } },
          counter
        ),
        _react2.default.createElement(
          'button',
          { ref: function ref(e) {
              incButton = e;
            }, onClick: function onClick(e) {
              return onIncrement();
            } },
          'Up'
        ),
        _react2.default.createElement(
          'button',
          { ref: function ref(e) {
              decButton = e;
            }, onClick: function onClick(e) {
              return onDecrement();
            } },
          'Down'
        ),
        _react2.default.createElement(
          'button',
          { ref: function ref(e) {
              incButton3 = e;
            }, onClick: function onClick(e) {
              return onIncrement3();
            } },
          'Up'
        )
      );
    }
  }]);

  return CounterForm;
}(_react2.default.Component);

var CounterFormCausalityRedux = _causalityRedux2.default.connectChangersAndStateToProps(CounterForm, COUNTER_STATE, ['onIncrement', 'onDecrement', 'onIncrement3'], ['counter']);

var CounterForm2 = function (_React$Component2) {
  _inherits(CounterForm2, _React$Component2);

  function CounterForm2() {
    _classCallCheck(this, CounterForm2);

    return _possibleConstructorReturn(this, (CounterForm2.__proto__ || Object.getPrototypeOf(CounterForm2)).apply(this, arguments));
  }

  _createClass(CounterForm2, [{
    key: 'render',
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement(
        'button',
        { ref: function ref(e) {
            incButton2 = e;
          }, onClick: function onClick(e) {
            return _this3.props.onIncrement();
          } },
        'Up'
      );
    }
  }]);

  return CounterForm2;
}(_react2.default.Component);

var CounterForm2CausalityRedux = _causalityRedux2.default.connectChangersToProps(CounterForm2, COUNTER_STATE, ['onIncrement']);

var CounterForm3 = function (_React$Component3) {
  _inherits(CounterForm3, _React$Component3);

  function CounterForm3() {
    _classCallCheck(this, CounterForm3);

    return _possibleConstructorReturn(this, (CounterForm3.__proto__ || Object.getPrototypeOf(CounterForm3)).apply(this, arguments));
  }

  _createClass(CounterForm3, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      update2 = true;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { ref: function ref(e) {
            counterDisplay2 = e;
          } },
        this.props.counter
      );
    }
  }]);

  return CounterForm3;
}(_react2.default.Component);

var CounterForm3CausalityRedux = _causalityRedux2.default.connectStateToProps(CounterForm3, COUNTER_STATE, ['counter']);

var numEditUpdates = 0;

var EditField = function (_React$Component4) {
  _inherits(EditField, _React$Component4);

  function EditField() {
    _classCallCheck(this, EditField);

    return _possibleConstructorReturn(this, (EditField.__proto__ || Object.getPrototypeOf(EditField)).apply(this, arguments));
  }

  _createClass(EditField, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      inputField.onchange = this.props.onChangeField.bind(this);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      numEditUpdates++;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          fieldValue = _props2.fieldValue,
          onChangeField = _props2.onChangeField;

      return _react2.default.createElement('input', { ref: function ref(e) {
          inputField = e;
        },
        type: 'text',
        name: 'ID',
        required: 'required',
        value: fieldValue,
        placeholder: 'Name',
        onChange: function onChange(e) {
          return onChangeField(e.target.value);
        }
      });
    }
  }]);

  return EditField;
}(_react2.default.Component);

var EditFieldCausalityRedux = _causalityRedux2.default.connectChangersAndStateToProps(EditField, FIELD_STATE, ['onChangeField'], ['fieldValue']);

_reactDom2.default.render(_react2.default.createElement(
  _reactRedux.Provider,
  { store: _causalityRedux2.default.store },
  _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(CounterFormCausalityRedux, null),
    _react2.default.createElement(EditFieldCausalityRedux, null),
    _react2.default.createElement(CounterForm2CausalityRedux, null),
    _react2.default.createElement(CounterForm3CausalityRedux, null)
  )
), document.getElementById('reactroot'));

var intervalID = void 0;
var currentTime = void 0;
var numEditUpdatesExpected = 0;

var which = 0;
function handleReactAsync(done) {
  if (update && update2 && which === 0 || numEditUpdates === numEditUpdatesExpected && which === 1) {
    clearInterval(intervalID);
    done();
  } else if (new Date() - currentTime > 100) {
    clearInterval(intervalID);
    done();
  }
}

function handleReactAsyncStart(done) {
  intervalID = setInterval(handleReactAsync, 10, done);
}

function testStart() {
  update = false;
  update2 = false;
  numEditUpdates = 0;
  onChangeFieldFunctionCalled = false;
  currentTime = new Date();
}

//
// react-causailty-redux only has 3 functions, connectChangersAndStateToProps, connectChangersToProps and connectStateToProps.
// So, those will be proven to work in react.
//  

describe('Operations CounterForm and CounterForm3', function (done) {
  //
  // Demonstrate that onIncrement works and updates the state value counter in CounterForm and CounterForm3.
  // This also verifies connectChangersAndStateToProps and connectStateToProps.
  //

  it('Try async click on counter increment button', function (done) {
    testStart();
    simulateEvent(incButton, 'click');
    handleReactAsyncStart(done);
  });

  it('Increment button should increment counter in the COUNTER_STATE partition.', function () {
    (0, _assert2.default)(counterStore.getState().counter === 1);
  });

  it('Counter displayed in component CounterForm should have updated.', function () {
    (0, _assert2.default)(counterDisplay.innerHTML === "1");
  });

  it('Counter displayed in component CounterForm3 should have updated.', function () {
    (0, _assert2.default)(counterDisplay2.innerHTML === "1");
  });

  //
  // Demonstrate that onDecrement works and updates the state value counter in CounterForm and CounterForm3.
  // This also verifies connectChangersAndStateToProps and connectStateToProps.
  //
  it('Try async click on counter decrement button', function (done) {
    testStart();
    simulateEvent(decButton, 'click');
    handleReactAsyncStart(done);
  });

  it('Decrement button should decrement counter in the COUNTER_STATE partition.', function () {
    (0, _assert2.default)(counterStore.getState().counter === 0);
  });

  it('Counter displayed in component should have updated.', function () {
    (0, _assert2.default)(counterDisplay.innerHTML === "0");
  });

  it('Counter displayed in component CounterForm3 should have updated.', function () {
    (0, _assert2.default)(counterDisplay2.innerHTML === "0");
  });

  //  
  // This updates the COUNTER_STATE value counter3 and proves CounterForm and CounterForm3 do not render since they do not listen to its changes
  // but are connected to the state partition COUNTER_STATE.
  //
  it('Try async click on counter increment button3', function (done) {
    testStart();
    simulateEvent(incButton3, 'click');
    handleReactAsyncStart(done);
  });

  it('Increment3 button should increment counter3 in the COUNTER_STATE partition.', function () {
    (0, _assert2.default)(counterStore.getState().counter3 === 1);
  });

  it('Components CounterForm and CounterForm3 should not have rendered.', function () {
    (0, _assert2.default)(!update && !update2);
  });

  //
  // Demonstrate that onIncrement works and updates the state value counter in CounterForm and CounterForm3 with just connectChangersToProps.
  //
  it('Try async click on counter increment button2', function (done) {
    testStart();
    simulateEvent(incButton2, 'click');
    handleReactAsyncStart(done);
  });

  it('Increment button should increment counter in the COUNTER_STATE partition to exercise connectChangersToProps.', function () {
    (0, _assert2.default)(counterStore.getState().counter === 1);
  });

  it('Counter displayed in component CounterForm should have updated.', function () {
    (0, _assert2.default)(counterDisplay.innerHTML === "1");
  });

  it('Counter displayed in component CounterForm3 should have updated.', function () {
    (0, _assert2.default)(counterDisplay2.innerHTML === "1");
  });
});

//
// This will check that outside business logic works as expected. An edit control changes and business logic is called
// to correct the control and then updates ot to the correct value on screen. This should trigger a render.
// 
describe('EditField corrected by business logic.', function () {

  it('Try onchange on the input field.', function (done) {
    which = 1;
    testStart();
    numEditUpdatesExpected = 1;
    inputField.onchange('abcd2');
    handleReactAsyncStart(done);
  });

  it('Business logic should be called.', function () {
    (0, _assert2.default)(onChangeFieldFunctionCalled);
  });

  it('Render on the edit field should be called.', function () {
    (0, _assert2.default)(numEditUpdates === numEditUpdatesExpected);
  });

  it('Verify that the input field was corrected by the business logic to "abcd".', function () {
    (0, _assert2.default)(inputField.value = 'abcd');
  });
});

//
// This will check that outside business logic works as expected. An edit control changes and business logic is called
// to correct the control and then updates ot to the correct value on screen. This should trigger a render.
// 
var field = 'aawqz';
describe('EditField not corrected by business logic.', function () {

  it('Try onchange on the input field.', function (done) {
    which = 1;
    testStart();
    numEditUpdatesExpected = 1;
    _causalityRedux2.default.store[FIELD_STATE].setField(field);
    inputField.onchange(field);
    handleReactAsyncStart(done);
  });

  it('Business logic should be called.', function () {
    (0, _assert2.default)(onChangeFieldFunctionCalled);
  });

  it('Render on the edit field should not be called. The field was not changed by the business logic.', function () {
    //
    // The input field was updated once by the call CausalityRedux.store[FIELD_STATE].setField(field) above. Then it
    // it should not be called a second time since the business logic does not change its value but sets it anyway.
    // When a value is not change in the props (ie stays the same) then the component should not be rendered.
    //
    (0, _assert2.default)(numEditUpdates === numEditUpdatesExpected);
  });

  it('Verify that the input field was not corrected by the business logic and remained at "aawqz".', function () {
    // verify that the component was rendered twice, the first time for abcd2 (2 is illegal) and a second time for 
    // this business logic correcting abcd2 to abcd
    (0, _assert2.default)(inputField.value = 'aawqz');
  });
});

/***/ }),
/* 9 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 10 */
/***/ (function(module, exports) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}


/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = __webpack_require__(11);

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = __webpack_require__(10);

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2), __webpack_require__(9)))

/***/ })
/******/ ]);