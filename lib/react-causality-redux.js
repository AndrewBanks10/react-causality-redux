module.exports =
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

module.exports = require("causality-redux");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isCausalityReduxComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /** @preserve © 2017 Andrew Banks ALL RIGHTS RESERVED */
/* eslint valid-typeof:0 */


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
var historyAddPartition = null;

var error = function error(msg) {
  throw new Error('react-causality-redux: ' + msg);
};

if ((typeof _causalityRedux2.default === 'undefined' ? 'undefined' : _typeof(_causalityRedux2.default)) === undefinedString) {
  error('CausalityRedux is undefined');
}

var reactreduxConnect = void 0;
if ((typeof _reactRedux.connect === 'undefined' ? 'undefined' : _typeof(_reactRedux.connect)) !== undefinedString) {
  reactreduxConnect = _reactRedux.connect;
}

/* eslint-disable */
if ((typeof reactreduxConnect === 'undefined' ? 'undefined' : _typeof(reactreduxConnect)) === undefinedString) {
  if ((typeof ReactRedux === 'undefined' ? 'undefined' : _typeof(ReactRedux)) === undefinedString) {
    error('ReactRedux is undefined');
  }
  reactreduxConnect = ReactRedux.connect;
}
/* eslint-enable */

var getListenerDefs = function getListenerDefs(arrArg) {
  var listenerDefs = [];
  arrArg.forEach(function (p) {
    if (_typeof(p.changerKeys) !== undefinedString) {
      var changerKeys = void 0;
      if (p.changerKeys.length === 0) {
        var pEntry = _causalityRedux2.default.partitionDefinitions.find(function (entry) {
          return p.partitionName === entry.partitionName;
        });
        changerKeys = _causalityRedux2.default.getKeys(pEntry.uiServiceFunctions);
      } else {
        changerKeys = [].concat(_toConsumableArray(p.changerKeys));
      }
      listenerDefs.push({ partitionName: p.partitionName, changerKeys: changerKeys });
    }
  });
  return listenerDefs;
};

function mapDispatchToProps(listenerDefs) {
  return function () {
    var obj = {};
    listenerDefs.forEach(function (p) {
      var storePartition = _causalityRedux2.default.store[p.partitionName];
      if ((typeof storePartition === 'undefined' ? 'undefined' : _typeof(storePartition)) !== undefinedString) {
        p.changerKeys.forEach(function (key) {
          obj[key] = storePartition[key];
        });
      }
    });
    return obj;
  };
}

function handleListeners(arrArg) {
  var hasListerners = false;
  arrArg.forEach(function (p) {
    hasListerners = hasListerners || _typeof(p.changerKeys) !== undefinedString;
    var partition = _causalityRedux2.default.partitionDefinitions.find(function (e) {
      return p.partitionName === e.partitionName;
    });
    if (!partition) {
      error(p.partitionName + ' is not a valid state partition.');
    }

    if (_typeof(p.changerKeys) !== undefinedString) {
      p.changerKeys.forEach(function (o) {
        if (typeof _causalityRedux2.default.store[p.partitionName][o] !== 'function') {
          error('The entry ' + o + ' is not a function.');
        }
      });
    }
  });
  if (!hasListerners) {
    return undefined;
  }

  return mapDispatchToProps(getListenerDefs(arrArg));
}

function getStateDefs(arrArg) {
  var stateDefs = [];
  arrArg.forEach(function (p) {
    if (_typeof(p.storeKeys) !== undefinedString) {
      var storeKeys = p.storeKeys.length !== 0 ? [].concat(_toConsumableArray(p.storeKeys)) : _causalityRedux2.default.getKeys(_causalityRedux2.default.defaultState[p.partitionName]);
      stateDefs.push({ partitionName: p.partitionName, storeKeys: storeKeys });
    }
  });
  return stateDefs;
}

function mapStateToProps(stateDefs) {
  return function (state) {
    var obj = {};
    stateDefs.forEach(function (stateDef) {
      var statePartition = state[stateDef.partitionName];
      if ((typeof statePartition === 'undefined' ? 'undefined' : _typeof(statePartition)) !== undefinedString) {
        stateDef.storeKeys.forEach(function (e) {
          obj[e] = statePartition[e];
        });
      }
    });
    return obj;
  };
}

function handleStateConnections(arrArg) {
  var hasState = false;
  arrArg.forEach(function (p) {
    hasState = hasState || _typeof(p.storeKeys) !== undefinedString;

    var partition = _causalityRedux2.default.partitionDefinitions.find(function (e) {
      return p.partitionName === e.partitionName;
    });
    if (!partition) {
      error(p.partitionName + ' is not a valid state partition.');
    }

    if (_typeof(p.storeKeys) !== undefinedString) {
      if (!Array.isArray(p.storeKeys)) {
        error('The storeKeys parameter is not an array for ' + p.partitionName + '.');
      }
      p.storeKeys.forEach(function (se) {
        if (_typeof(partition.defaultState[se]) === undefinedString) {
          error(se + ' is not a valid key in the state partition ' + p.partitionName + '.');
        }
      });
    }
  });

  if (!hasState) {
    return undefined;
  }

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
      key: 'isCausalityReduxComponent',
      value: function isCausalityReduxComponent() {
        return true;
      }
    }, {
      key: 'render',
      value: function render() {
        // This is only called when a tracing onListener function is active.
        // Will not be called in production mode.
        if (typeof _causalityRedux2.default.onListener === 'function' && typeof mapStateToProps === 'function') {
          // Need to determine whether this render was caused by a store update.
          var priorState = this.causalityReduxState;
          this.causalityReduxState = mapStateToProps(store.getState());
          if (priorState && !_causalityRedux2.default.shallowEqual(priorState, this.causalityReduxState)) {
            _causalityRedux2.default.onListener({ nextState: this.causalityReduxState, listenerName: reactComponentName, partitionName: combinedPartitionName });
          }
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
  if (!_causalityRedux2.default.store) {
    error('CausalityRedux.createStore must be called before connecting to react components.');
  }

  var combinedPartitionName = '';
  arrArg.forEach(function (p) {
    if (combinedPartitionName !== '') {
      combinedPartitionName += ', ';
    }
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
    if ((typeof arg3 === 'undefined' ? 'undefined' : _typeof(arg3)) === undefinedString) {
      arg3 = [];
    } else if (arg3.length === 0) {
      arg3 = undefined;
    }
    if ((typeof arg4 === 'undefined' ? 'undefined' : _typeof(arg4)) === undefinedString) {
      arg4 = [];
    } else if (arg4.length === 0) {
      arg4 = undefined;
    }
    arrArg.push({ partitionName: arg2, changerKeys: arg3, storeKeys: arg4 });
  } else {
    var tarr = [].concat(_toConsumableArray(arg2));
    tarr.forEach(function (entry) {
      if (_typeof(entry.changerKeys) === undefinedString) {
        entry.changerKeys = [];
      } else if (entry.changerKeys.length === 0) {
        entry.changerKeys = undefined;
      }
      if (_typeof(entry.storeKeys) === undefinedString) {
        entry.storeKeys = [];
      } else if (entry.storeKeys.length === 0) {
        entry.storeKeys = undefined;
      }
    });
    arg2 = tarr;
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
    if ((typeof arg3 === 'undefined' ? 'undefined' : _typeof(arg3)) === undefinedString) {
      arg3 = [];
    } else if (arg3.length === 0) {
      arg3 = undefined;
    }
    arrArg.push({ partitionName: arg2, changerKeys: undefined, storeKeys: arg3 });
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
    if ((typeof arg3 === 'undefined' ? 'undefined' : _typeof(arg3)) === undefinedString) {
      arg3 = [];
    } else if (arg3.length === 0) {
      arg3 = undefined;
    }
    arrArg.push({ partitionName: arg2, changerKeys: arg3, storeKeys: undefined });
  } else {
    mergeProps = arg4;
    options = arg5;
    reactComponentName = arg3;
  }
  return connectChangersAndStateToPropsInternal(reactComponent, arrArg, reactComponentName, mergeProps, options);
}

var isCausalityReduxComponent = exports.isCausalityReduxComponent = function isCausalityReduxComponent(val) {
  return typeof val === 'function' && val.prototype !== undefinedString && _typeof(val.prototype.isCausalityReduxComponent) !== undefinedString;
};

/**
 * Establishes controller connections between the controller functions/store partition data and
 * react component(s) using redux connect.
 * @param {obj}
 * @param {obj.module} The variable module in the calling module. Used to support hot re-loading.
 * @param {obj.uiComponent} A react component to be wrapped with redux connect.
 * @param {obj.uiComponentName} The string name of the component, such as Todo is simply 'Todo'
 * @param {obj.partition} The causality redux partition definition.
 * @param {obj.storeKeys} By default, uiComponent is wrapped with all controller function keys
 * and all partition store keys sent into the props. Use this to select only a subset of those store keys.
   @param {obj.changerKeys} By default, uiComponent is wrapped with all controller function keys
 * and all partition store keys sent into the props. Use this to select only a subset of those function keys.
 * @param {obj.hotDisposeHandler} A function to be called before the module is hot reloaded. Use
 * this to remove module event listeners for example.
 * @param {obj.controllerUIConnections} This parameter is used for two reasons. One, you want to
 * connect a component to other partitions or two, you want to connect multiple conponents to Object.partition
 * or other state partitions. Either way this parameter is an array of arrays.
 * Note, if a partition is defined on input then each redux connected component will be contained in the partition store under its string componentname below.
 *
 * Array Parameter Format 1  - For connecting a component to one partition.
 * {
 *    uiComponent{Object} - The component to be wrapped.
 *    partitionName{string} - The partition from which to connect to.
 *    changerKeys{Array} - array of partition uiServiceFunction function keys to receive in the props of the component. If this entry is undefined then all uiServiceFunction keys are included in the props. If this entry is an empty array then no uiServiceFunction keys are included in the props.
 *    storeKeys{Array} - array of partition store keys to receive in the props of the component. If this entry is undefined then all defaultState keys are included in the props. If this entry is an empty array then no defaultState keys are included in the props.
 *    uiComponentName{String} - The string name of the component.
 * }
 *
 * Array Parameter Format 2  - For connecting a component to multiple component partitions. In short, you can connect state and/or functions from other components.
 *
 * {
 *    uiComponent{Object} - The component to be wrapped
 *    partitions: - The partitions you want to connect to.
 *    [
 *        { partitionName{String}, changerKeys{Array}, storeKeys{Array} }
 *    ],
 *    uiComponentName{String} - The string name of the component.
 * }
 *
 * @return {Object}
 * {
        partitionState = Proxy for getting and setting partition state values.
        setState - Set multiple partition values at a time.
        getState - Gets the current partition object
        subscribe - Listen for changes to any variable in this partition
        partitionStore - Accesses all features of this partition.
        wrappedComponents -- Redux connect wrapped component(s).
   }
 */
function establishControllerConnections(_ref) {
  var module = _ref.module,
      uiComponent = _ref.uiComponent,
      uiComponentName = _ref.uiComponentName,
      partition = _ref.partition,
      storeKeys = _ref.storeKeys,
      changerKeys = _ref.changerKeys,
      hotDisposeHandler = _ref.hotDisposeHandler,
      controllerUIConnections = _ref.controllerUIConnections;

  if ((typeof controllerUIConnections === 'undefined' ? 'undefined' : _typeof(controllerUIConnections)) !== undefinedString && (typeof uiComponent === 'undefined' ? 'undefined' : _typeof(uiComponent)) !== undefinedString) {
    error('Cannot define both controllerUIConnections and uiComponent.');
  }
  var copyControllerUIConnections = void 0;
  var copyPartition = void 0;
  if (partition) {
    copyPartition = _causalityRedux2.default.shallowCopy(partition);
  }

  if ((typeof controllerUIConnections === 'undefined' ? 'undefined' : _typeof(controllerUIConnections)) !== undefinedString) {
    if (!Array.isArray(controllerUIConnections)) {
      error('controllerUIConnections must be an array.');
    }
    copyControllerUIConnections = _causalityRedux2.default.shallowCopy(controllerUIConnections);

    copyControllerUIConnections.forEach(function (entry, index) {
      var obj = entry;
      // Backward compatibility
      if (Array.isArray(entry)) {
        obj = {
          uiComponent: entry[0]
        };
        if (Array.isArray(entry[1])) {
          obj.partitions = entry[1];
          obj.uiComponentName = entry[2];
        } else {
          obj.partitionName = entry[1];
          obj.changerKeys = entry[2];
          obj.storeKeys = entry[3];
          obj.uiComponentName = entry[4];
        }
      }
      copyControllerUIConnections[index] = obj;
      // Make a place for this component in the copyPartition
      if (copyPartition) {
        copyPartition.defaultState[obj.uiComponentName] = null;
      }
    });
  }

  var partitionState = void 0;
  var setState = void 0;
  var getState = void 0;
  var partitionStore = void 0;
  var subscribe = void 0;
  var wrappedComponents = {};

  if ((typeof copyPartition === 'undefined' ? 'undefined' : _typeof(copyPartition)) !== undefinedString) {
    // Create the causality-redux store and use the store copyPartition above for definitions.
    // If the store has already been created elsewhere, then only the copyPartition is created.
    _causalityRedux2.default.createStore(copyPartition);

    var foundPartition = _causalityRedux2.default.partitionDefinitions.find(function (e) {
      return copyPartition.partitionName === e.partitionName;
    });

    if (historyAddPartition) {
      historyAddPartition(foundPartition.partitionName);
    }

    // Get access to the partition’s controller functions.
    partitionStore = _causalityRedux2.default.store[foundPartition.partitionName];
    var _partitionStore = partitionStore;
    partitionState = _partitionStore.partitionState;
    setState = _partitionStore.setState;
    getState = _partitionStore.getState;
    subscribe = _partitionStore.subscribe;


    if ((typeof storeKeys === 'undefined' ? 'undefined' : _typeof(storeKeys)) === undefinedString) {
      storeKeys = _causalityRedux2.default.getKeys(foundPartition.defaultState);
    } else if (storeKeys.length === 0) {
      storeKeys = undefined;
    }

    if ((typeof changerKeys === 'undefined' ? 'undefined' : _typeof(changerKeys)) === undefinedString) {
      changerKeys = _causalityRedux2.default.getKeys(foundPartition.uiServiceFunctions);
    } else if (changerKeys.length === 0) {
      changerKeys = undefined;
    }

    if ((typeof uiComponent === 'undefined' ? 'undefined' : _typeof(uiComponent)) !== undefinedString) {
      if ((typeof uiComponentName === 'undefined' ? 'undefined' : _typeof(uiComponentName)) === undefinedString) {
        error('The component should have uiComponentName as the string name of the component.');
      }
      wrappedComponents[uiComponentName] = connectChangersAndStateToProps(uiComponent, // React component to wrap.
      foundPartition.partitionName, // State partition
      // uiServiceFunctions keys
      changerKeys,
      // This is an array of keys in the partition whose values you want passed into the props.
      // Whenever any value associated with a key listed in this array changes in the causality-redux store,
      // causality-redux will cause the component to render with the new values set in the props.
      storeKeys, uiComponentName);
      uiComponent = wrappedComponents[uiComponentName];
    }
  }

  if ((typeof copyControllerUIConnections === 'undefined' ? 'undefined' : _typeof(copyControllerUIConnections)) !== undefinedString) {
    copyControllerUIConnections.forEach(function (entry) {
      // connectChangersAndStateToProps accepts individual arguments.
      var arg = [entry.uiComponent];
      if (entry.partitions) {
        arg.push(entry.partitions);
      } else {
        arg.push(entry.partitionName);
        arg.push(entry.changerKeys);
        arg.push(entry.storeKeys);
      }
      arg.push(entry.uiComponentName);
      var wrappedComponent = connectChangersAndStateToProps.apply(undefined, arg);
      wrappedComponents[entry.uiComponentName] = wrappedComponent;
    });
    // If setState is defined then the wrapped components are set in the store under their names.
    if ((typeof setState === 'undefined' ? 'undefined' : _typeof(setState)) !== undefinedString) {
      setState(wrappedComponents);
    }
    uiComponent = wrappedComponents;
  }

  if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) !== undefinedString && module.hot) {
    // Add the dispose handler that is to be called before this module is changed out for the new one.
    // This must be done for any module with side effects like adding event listeners etc.
    module.hot.dispose(function () {
      if (typeof hotDisposeHandler === 'function') {
        hotDisposeHandler();
      }
    });
  }

  return {
    // Proxy for getting and setting partition state values.
    partitionState: partitionState,
    // Set multiple partition values at a time.
    setState: setState,
    // Gets the current partition object.
    getState: getState,
    // Listen for changes to any variable in this partition
    subscribe: subscribe,
    // Accesses all features of this partition.
    partitionStore: partitionStore,
    // Redux connect wrapped component(s).
    wrappedComponents: wrappedComponents,
    // From the past
    uiComponent: uiComponent
  };
}

_causalityRedux2.default.connectChangersAndStateToProps = connectChangersAndStateToProps;
_causalityRedux2.default.connectStateToProps = connectStateToProps;
_causalityRedux2.default.connectChangersToProps = connectChangersToProps;
_causalityRedux2.default.establishControllerConnections = establishControllerConnections;
_causalityRedux2.default.isCausalityReduxComponent = isCausalityReduxComponent;

/***/ })
/******/ ]);