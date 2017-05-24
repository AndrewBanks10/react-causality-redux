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


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /** @preserve © 2017 Andrew Banks ALL RIGHTS RESERVED */

var _reactRedux = __webpack_require__(1);

var _causalityRedux = __webpack_require__(0);

var _causalityRedux2 = _interopRequireDefault(_causalityRedux);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {

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

    function handleListeners(arrArg) {
        var hasListerners = false;
        arrArg.forEach(function (p) {
            hasListerners = hasListerners || _typeof(p.changers) !== undefinedString;
        });
        if (!hasListerners) return undefined;

        var mapDispatchToProps = function mapDispatchToProps() {
            var obj = {};
            arrArg.forEach(function (p) {
                if (_typeof(p.changers) !== undefinedString) {
                    if (p.changers.length === 0) {
                        var sEntry = _causalityRedux2.default.partitionDefinitions.find(function (entry) {
                            return p.partitionName === entry.partitionName;
                        });
                        if (!sEntry) error(p.partitionName + ' not found.');
                        for (var o in sEntry.changers) {
                            obj[o] = _causalityRedux2.default.store[p.partitionName][o];
                        }
                    } else {
                        p.changers.forEach(function (o) {
                            if (typeof _causalityRedux2.default.store[p.partitionName][o] !== 'function') throw 'The entry ' + o + ' is not a function.';
                            obj[o] = _causalityRedux2.default.store[p.partitionName][o];
                        });
                    }
                }
            });
            return obj;
        };

        return mapDispatchToProps;
    }

    function handleStateConnections(arrArg) {
        var hasState = false;
        arrArg.forEach(function (p) {
            hasState = hasState || _typeof(p.stateEntries) !== undefinedString;

            var partition = _causalityRedux2.default.partitionDefinitions.find(function (e) {
                return p.partitionName === e.partitionName;
            });
            if (!partition) throw p.partitionName + ' is not a valid state entry.';

            if (_typeof(p.stateEntries) !== undefinedString) {
                if (!Array.isArray(p.stateEntries)) throw 'The stateEntries parameter is not an array for ' + p.partitionName + '.';
                p.stateEntries.forEach(function (se) {
                    if (_typeof(partition.defaultState[se]) === undefinedString) throw se + ' is not a valid key in the state partition ' + p.partitionName + '.';
                });
            }
        });

        if (!hasState) return undefined;

        var mapStateToProps = function mapStateToProps(state) {
            var obj = {};
            arrArg.forEach(function (p) {
                if (_typeof(p.stateEntries) !== undefinedString) {
                    if (p.stateEntries.length === 0) {
                        var partition = _causalityRedux2.default.partitionDefinitions.find(function (e) {
                            return p.partitionName === e.partitionName;
                        });
                        for (var o in partition.defaultState) {
                            obj[o] = state[p.partitionName][o];
                        }
                    }

                    p.stateEntries.forEach(function (entry) {
                        obj[entry] = state[p.partitionName][entry];
                    });
                }
            });
            return obj;
        };

        return mapStateToProps;
    }

    function doReduxConnect(reactComponent, reactComponentName, combinedPartitionName, mapStateToProps, mapDispatchToProps, mergeProps, options) {
        var simpleReduxComponent = reactreduxConnect(mapStateToProps, mapDispatchToProps, mergeProps, options)(reactComponent);

        simpleReduxComponent.prototype.priorRender = simpleReduxComponent.prototype.render;
        simpleReduxComponent.prototype.componentName = reactComponentName === undefinedString ? 'React Component' : reactComponentName;
        simpleReduxComponent.prototype.combinedPartitionName = combinedPartitionName;
        simpleReduxComponent.prototype.render = function () {
            var priorState = this.stateProps;
            var returnComponent = this.priorRender();
            if (typeof _causalityRedux2.default.onListener === 'function') {
                if (priorState && !_causalityRedux2.default.shallowEqual(priorState, this.stateProps)) _causalityRedux2.default.onListener({ nextState: this.stateProps, listenerName: this.componentName, partitionName: this.combinedPartitionName });
            }
            return returnComponent;
        };

        return simpleReduxComponent;
    }

    function connectChangersAndStateToPropsInternal(reactComponent, arrArg, reactComponentName, mergeProps, options) {
        if (!_causalityRedux2.default.store) throw 'CausalityRedux.createStore must be called before connecting to react components.';

        var combinedPartitionName = '';
        arrArg.forEach(function (p) {
            if (combinedPartitionName !== '') combinedPartitionName += ', ';
            combinedPartitionName += p.partitionName;
        });

        var mapDispatchToProps = handleListeners(arrArg);
        var mapStateToProps = handleStateConnections(arrArg);
        var simpleReduxComponent = doReduxConnect(reactComponent, reactComponentName, combinedPartitionName, mapStateToProps, mapDispatchToProps, mergeProps, options);
        return simpleReduxComponent;
    }

    _causalityRedux2.default.connectChangersAndStateToProps = function (reactComponent, arg2, arg3, arg4, arg5, arg6, arg7) {
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
    };

    _causalityRedux2.default.connectStateToProps = function (reactComponent, arg2, arg3, arg4, arg5, arg6) {
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
    };

    _causalityRedux2.default.connectChangersToProps = function (reactComponent, arg2, arg3, arg4, arg5, arg6) {
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
    };
})();

/***/ })
/******/ ]);