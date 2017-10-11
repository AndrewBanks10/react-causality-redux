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
exports.establishControllerConnections = establishControllerConnections;

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

    var foundPartition = _causalityRedux2.default.partitionDefinitions.find(function (e) {
        return partition.partitionName === e.partitionName;
    });

    // Get access to the partition’s controller functions.
    var partitionStore = _causalityRedux2.default.store[foundPartition.partitionName];

    // Get a proxy to the store partition so that causality-redux can detect changes to the values of the partition.
    var partitionState = partitionStore.partitionState;

    // Allows setting multiple keys in a state partition.
    var setState = partitionStore.setState;

    var getState = partitionStore.getState;

    var funcKeys = [];
    var unsubscribers = [];
    _causalityRedux2.default.getKeys(foundPartition.changerDefinitions).forEach(function (changerKey) {
        var entry = foundPartition.changerDefinitions[changerKey];
        if (entry.operation === _causalityRedux2.default.operations.STATE_FUNCTION_CALL) {
            if (typeof partition.controllerFunctions !== 'undefined' && typeof partition.controllerFunctions[changerKey] === 'function') unsubscribers.push(partitionStore.subscribe(partition.controllerFunctions[changerKey], changerKey));else unsubscribers.push(partitionStore.subscribe(partition.changerDefinitions[changerKey].controllerFunction, changerKey));
            funcKeys.push(changerKey);
        }
    });

    if (typeof storeKeys === 'undefined') storeKeys = _causalityRedux2.default.getKeys(foundPartition.defaultState);else if (storeKeys.length === 0) storeKeys = undefined;

    if (typeof changerKeys === 'undefined') changerKeys = funcKeys;else if (changerKeys.length === 0) changerKeys = undefined;

    if (typeof uiComponent !== 'undefined') {
        uiComponentName = typeof uiComponentName === 'undefined' ? 'React component render' : uiComponentName + ' render';
        uiComponent = _causalityRedux2.default.connectChangersAndStateToProps(uiComponent, // React component to wrap.
        foundPartition.partitionName, // State partition
        // This is an array of names of changers/action creators defined in the partition that you want
        // passed into the props by causality-redux so that the component can call these functions.
        changerKeys,
        // This is an array of keys in COUNTTEN_STATE whose values you want passed into the props.
        // Whenever any value associated with a key listed in this array changes in the causality-redux store,
        // causality-redux will cause the component to render with the new values set in the props.
        storeKeys, uiComponentName);
    }

    if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) !== undefinedString && module.hot) {
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
        getState: getState,
        partitionStore: partitionStore,
        uiComponent: uiComponent
    };
}

_causalityRedux2.default.connectChangersAndStateToProps = connectChangersAndStateToProps;
_causalityRedux2.default.connectStateToProps = connectStateToProps;
_causalityRedux2.default.connectChangersToProps = connectChangersToProps;
_causalityRedux2.default.establishControllerConnections = establishControllerConnections;

/***/ })
/******/ ]);