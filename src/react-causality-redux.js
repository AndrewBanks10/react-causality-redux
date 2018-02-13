/** @preserve © 2017 Andrew Banks ALL RIGHTS RESERVED */
/* eslint valid-typeof:0 */
import { connect } from 'react-redux'
import CausalityRedux from 'causality-redux'

const undefinedString = 'undefined'
let historyAddPartition = null

const error = (msg) => { throw new Error(`react-causality-redux: ${msg}`) }

if (typeof CausalityRedux === undefinedString) {
  error('CausalityRedux is undefined')
}

let reactreduxConnect
if (typeof connect !== undefinedString) {
  reactreduxConnect = connect
}

/* eslint-disable */
if (typeof reactreduxConnect === undefinedString) {
  if (typeof ReactRedux === undefinedString) {
    error('ReactRedux is undefined')
  }
  reactreduxConnect = ReactRedux.connect
}
/* eslint-enable */

const getListenerDefs = (arrArg) => {
  const listenerDefs = []
  arrArg.forEach(p => {
    if (typeof p.changerKeys !== undefinedString) {
      let changerKeys
      if (p.changerKeys.length === 0) {
        const pEntry = CausalityRedux.partitionDefinitions.find(entry => p.partitionName === entry.partitionName)
        changerKeys = CausalityRedux.getKeys(pEntry.uiServiceFunctions)
      } else {
        changerKeys = [...p.changerKeys]
      }
      listenerDefs.push({ partitionName: p.partitionName, changerKeys })
    }
  })
  return listenerDefs
}

function mapDispatchToProps (listenerDefs) {
  return () => {
    const obj = {}
    listenerDefs.forEach(p => {
      const storePartition = CausalityRedux.store[p.partitionName]
      if (typeof storePartition !== undefinedString) {
        p.changerKeys.forEach(key => {
          obj[key] = storePartition[key]
        })
      }
    })
    return obj
  }
}

function handleListeners (arrArg) {
  let hasListerners = false
  arrArg.forEach(p => {
    hasListerners = hasListerners || typeof p.changerKeys !== undefinedString
    const partition = CausalityRedux.partitionDefinitions.find(e =>
      p.partitionName === e.partitionName
    )
    if (!partition) {
      error(`${p.partitionName} is not a valid state partition.`)
    }

    if (typeof p.changerKeys !== undefinedString) {
      p.changerKeys.forEach(o => {
        if (typeof CausalityRedux.store[p.partitionName][o] !== 'function') {
          error(`The entry ${o} is not a function.`)
        }
      })
    }
  })
  if (!hasListerners) {
    return undefined
  }

  return mapDispatchToProps(getListenerDefs(arrArg))
}

function getStateDefs (arrArg) {
  const stateDefs = []
  arrArg.forEach(p => {
    if (typeof p.storeKeys !== undefinedString) {
      const storeKeys = p.storeKeys.length !== 0 ? [...p.storeKeys] : CausalityRedux.getKeys(CausalityRedux.defaultState[p.partitionName])
      stateDefs.push({ partitionName: p.partitionName, storeKeys })
    }
  })
  return stateDefs
}

function mapStateToProps (stateDefs) {
  return state => {
    const obj = {}
    stateDefs.forEach(stateDef => {
      const statePartition = state[stateDef.partitionName]
      if (typeof statePartition !== undefinedString) {
        stateDef.storeKeys.forEach(e => {
          obj[e] = statePartition[e]
        })
      }
    })
    return obj
  }
}

function handleStateConnections (arrArg) {
  let hasState = false
  arrArg.forEach(p => {
    hasState = hasState || typeof p.storeKeys !== undefinedString

    const partition = CausalityRedux.partitionDefinitions.find(e =>
      p.partitionName === e.partitionName
    )
    if (!partition) {
      error(`${p.partitionName} is not a valid state partition.`)
    }

    if (typeof p.storeKeys !== undefinedString) {
      if (!Array.isArray(p.storeKeys)) {
        error(`The storeKeys parameter is not an array for ${p.partitionName}.`)
      }
      p.storeKeys.forEach(se => {
        if (typeof partition.defaultState[se] === undefinedString) {
          error(`${se} is not a valid key in the state partition ${p.partitionName}.`)
        }
      })
    }
  })

  if (!hasState) {
    return undefined
  }

  return mapStateToProps(getStateDefs(arrArg))
}

//
// At this time, the redux connect wrapper class fails when using a constructor for this wrapped class.
// So, instead of using 'this' in the constructor to save state, create a closure for the class which
// achieves the same goal of providing the parameters (Component, mapStateToProps, reactComponentName,
// combinedPartitionName, store) to the class when it is rendered.
//
function WrapConnectComponent (Component, mapStateToProps, reactComponentName, combinedPartitionName, store) {
  return class WrappedComponent extends Component {
    isCausalityReduxComponent () {
      return true
    }
    render () {
      // This is only called when a tracing onListener function is active.
      // Will not be called in production mode.
      if (typeof CausalityRedux.onListener === 'function' && typeof mapStateToProps === 'function') {
        // Need to determine whether this render was caused by a store update.
        const priorState = this.causalityReduxState
        this.causalityReduxState = mapStateToProps(store.getState())
        if (priorState && !CausalityRedux.shallowEqual(priorState, this.causalityReduxState)) {
          CausalityRedux.onListener({nextState: this.causalityReduxState, listenerName: reactComponentName, partitionName: combinedPartitionName})
        }
      }
      // redux connect render
      return super.render()
    }
  }
}

function doReduxConnect (reactComponent, arrArg, reactComponentName, combinedPartitionName, mapStateToProps, mapDispatchToProps, mergeProps, options) {
  const reduxComponent = reactreduxConnect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps,
    options
  )(reactComponent)

  return WrapConnectComponent(reduxComponent, mapStateToProps, reactComponentName, combinedPartitionName, CausalityRedux.store)
}

function connectChangersAndStateToPropsInternal (reactComponent, arrArg, reactComponentName, mergeProps, options) {
  if (!CausalityRedux.store) {
    error('CausalityRedux.createStore must be called before connecting to react components.')
  }

  let combinedPartitionName = ''
  arrArg.forEach(p => {
    if (combinedPartitionName !== '') {
      combinedPartitionName += ', '
    }
    combinedPartitionName += p.partitionName.toString()
  })

  const mapDispatchToProps = handleListeners(arrArg)
  const mapStateToProps = handleStateConnections(arrArg)
  const simpleReduxComponent = doReduxConnect(
    reactComponent,
    arrArg,
    reactComponentName,
    combinedPartitionName,
    mapStateToProps,
    mapDispatchToProps,
    mergeProps,
    options
  )
  return simpleReduxComponent
}

export function connectChangersAndStateToProps (reactComponent, arg2, arg3, arg4, arg5, arg6, arg7) {
  let arrArg = arg2
  let mergeProps = arg6
  let options = arg7
  let reactComponentName = arg5
  if (!Array.isArray(arg2)) {
    arrArg = []
    if (typeof arg3 === undefinedString) {
      arg3 = []
    } else if (arg3.length === 0) {
      arg3 = undefined
    }
    if (typeof arg4 === undefinedString) {
      arg4 = []
    } else if (arg4.length === 0) {
      arg4 = undefined
    }
    arrArg.push({partitionName: arg2, changerKeys: arg3, storeKeys: arg4})
  } else {
    let tarr = [...arg2]
    tarr.forEach(entry => {
      if (typeof entry.changerKeys === undefinedString) {
        entry.changerKeys = []
      } else if (entry.changerKeys.length === 0) {
        entry.changerKeys = undefined
      }
      if (typeof entry.storeKeys === undefinedString) {
        entry.storeKeys = []
      } else if (entry.storeKeys.length === 0) {
        entry.storeKeys = undefined
      }
    })
    arg2 = tarr
    mergeProps = arg4
    options = arg5
    reactComponentName = arg3
  }
  return connectChangersAndStateToPropsInternal(reactComponent, arrArg, reactComponentName, mergeProps, options)
}

export function connectStateToProps (reactComponent, arg2, arg3, arg4, arg5, arg6) {
  let arrArg = arg2
  let mergeProps = arg5
  let options = arg6
  let reactComponentName = arg4
  if (!Array.isArray(arg2)) {
    arrArg = []
    if (typeof arg3 === undefinedString) {
      arg3 = []
    } else if (arg3.length === 0) {
      arg3 = undefined
    }
    arrArg.push({partitionName: arg2, changerKeys: undefined, storeKeys: arg3})
  } else {
    mergeProps = arg4
    options = arg5
    reactComponentName = arg3
  }
  return connectChangersAndStateToPropsInternal(reactComponent, arrArg, reactComponentName, mergeProps, options)
}

export function connectChangersToProps (reactComponent, arg2, arg3, arg4, arg5, arg6) {
  let arrArg = arg2
  let mergeProps = arg5
  let options = arg6
  let reactComponentName = arg4
  if (!Array.isArray(arg2)) {
    arrArg = []
    if (typeof arg3 === undefinedString) {
      arg3 = []
    } else if (arg3.length === 0) {
      arg3 = undefined
    }
    arrArg.push({partitionName: arg2, changerKeys: arg3, storeKeys: undefined})
  } else {
    mergeProps = arg4
    options = arg5
    reactComponentName = arg3
  }
  return connectChangersAndStateToPropsInternal(reactComponent, arrArg, reactComponentName, mergeProps, options)
}

export const isCausalityReduxComponent = val =>
  typeof val === 'function' && val.prototype !== undefinedString && typeof val.prototype.isCausalityReduxComponent !== undefinedString

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
export function establishControllerConnections ({ module, uiComponent, uiComponentName, partition, storeKeys, changerKeys, hotDisposeHandler, controllerUIConnections }) {
  if (typeof controllerUIConnections !== undefinedString && typeof uiComponent !== undefinedString) {
    error('Cannot define both controllerUIConnections and uiComponent.')
  }
  let copyControllerUIConnections
  let copyPartition
  if (partition) {
    copyPartition = CausalityRedux.shallowCopy(partition)
  }

  if (typeof controllerUIConnections !== undefinedString) {
    if (!Array.isArray(controllerUIConnections)) {
      error('controllerUIConnections must be an array.')
    }
    copyControllerUIConnections = CausalityRedux.shallowCopy(controllerUIConnections)

    copyControllerUIConnections.forEach((entry, index) => {
      let obj = entry
      // Backward compatibility
      if (Array.isArray(entry)) {
        obj = {
          uiComponent: entry[0]
        }
        if (Array.isArray(entry[1])) {
          obj.partitions = entry[1]
          obj.uiComponentName = entry[2]
        } else {
          obj.partitionName = entry[1]
          obj.changerKeys = entry[2]
          obj.storeKeys = entry[3]
          obj.uiComponentName = entry[4]
        }
      }
      copyControllerUIConnections[index] = obj
      // Make a place for this component in the copyPartition
      if (copyPartition) {
        copyPartition.defaultState[obj.uiComponentName] = null
      }
    })
  }

  let partitionState
  let setState
  let getState
  let partitionStore
  let subscribe
  const wrappedComponents = {}

  if (typeof copyPartition !== undefinedString) {
    // Create the causality-redux store and use the store copyPartition above for definitions.
    // If the store has already been created elsewhere, then only the copyPartition is created.
    CausalityRedux.createStore(copyPartition)

    const foundPartition = CausalityRedux.partitionDefinitions.find(e =>
      copyPartition.partitionName === e.partitionName
    )

    if (historyAddPartition) {
      historyAddPartition(foundPartition.partitionName)
    }

    // Get access to the partition’s controller functions.
    partitionStore = CausalityRedux.store[foundPartition.partitionName];
    ({ partitionState, setState, getState, subscribe } = partitionStore)

    if (typeof storeKeys === undefinedString) {
      storeKeys = CausalityRedux.getKeys(foundPartition.defaultState)
    } else if (storeKeys.length === 0) {
      storeKeys = undefined
    }

    if (typeof changerKeys === undefinedString) {
      changerKeys = CausalityRedux.getKeys(foundPartition.uiServiceFunctions)
    } else if (changerKeys.length === 0) {
      changerKeys = undefined
    }

    if (typeof uiComponent !== undefinedString) {
      if (typeof uiComponentName === undefinedString) {
        error('The component should have uiComponentName as the string name of the component.')
      }
      wrappedComponents[uiComponentName] = connectChangersAndStateToProps(
        uiComponent, // React component to wrap.
        foundPartition.partitionName, // State partition
        // uiServiceFunctions keys
        changerKeys,
        // This is an array of keys in the partition whose values you want passed into the props.
        // Whenever any value associated with a key listed in this array changes in the causality-redux store,
        // causality-redux will cause the component to render with the new values set in the props.
        storeKeys,
        uiComponentName
      )
      uiComponent = wrappedComponents[uiComponentName]
    }
  }

  if (typeof copyControllerUIConnections !== undefinedString) {
    copyControllerUIConnections.forEach(entry => {
      // connectChangersAndStateToProps accepts individual arguments.
      let arg = [
        entry.uiComponent
      ]
      if (entry.partitions) {
        arg.push(entry.partitions)
      } else {
        arg.push(entry.partitionName)
        arg.push(entry.changerKeys)
        arg.push(entry.storeKeys)
      }
      arg.push(entry.uiComponentName)
      const wrappedComponent = connectChangersAndStateToProps(...arg)
      wrappedComponents[entry.uiComponentName] = wrappedComponent
    })
    // If setState is defined then the wrapped components are set in the store under their names.
    if (typeof setState !== undefinedString) {
      setState(wrappedComponents)
    }
    uiComponent = wrappedComponents
  }

  if (typeof module !== undefinedString && module.hot) {
    // Add the dispose handler that is to be called before this module is changed out for the new one.
    // This must be done for any module with side effects like adding event listeners etc.
    module.hot.dispose(function () {
      if (typeof hotDisposeHandler === 'function') {
        hotDisposeHandler()
      }
    })
  }

  return {
    // Proxy for getting and setting partition state values.
    partitionState,
    // Set multiple partition values at a time.
    setState,
    // Gets the current partition object.
    getState,
    // Listen for changes to any variable in this partition
    subscribe,
    // Accesses all features of this partition.
    partitionStore,
    // Redux connect wrapped component(s).
    wrappedComponents,
    // From the past
    uiComponent
  }
}

CausalityRedux.connectChangersAndStateToProps = connectChangersAndStateToProps
CausalityRedux.connectStateToProps = connectStateToProps
CausalityRedux.connectChangersToProps = connectChangersToProps
CausalityRedux.establishControllerConnections = establishControllerConnections
CausalityRedux.isCausalityReduxComponent = isCausalityReduxComponent
