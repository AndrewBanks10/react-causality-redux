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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = CausalityRedux;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = ReactRedux;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /** @preserve © 2017 Andrew Banks ALL RIGHTS RESERVED */


exports.connectChangersAndStateToProps = connectChangersAndStateToProps;
exports.connectStateToProps = connectStateToProps;
exports.connectChangersToProps = connectChangersToProps;

var _reactRedux = __webpack_require__(1);

var _causalityRedux = __webpack_require__(0);

var _causalityRedux2 = _interopRequireDefault(_causalityRedux);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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

_causalityRedux2.default.connectChangersAndStateToProps = connectChangersAndStateToProps;
_causalityRedux2.default.connectStateToProps = connectStateToProps;
_causalityRedux2.default.connectChangersToProps = connectChangersToProps;

/***/ })
/******/ ]);