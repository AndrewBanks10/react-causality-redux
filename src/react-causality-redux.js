/** @preserve © 2017 Andrew Banks ALL RIGHTS RESERVED */
import { connect } from 'react-redux';
import CausalityRedux from 'causality-redux';

const undefinedString = 'undefined';

const error = (msg) => {throw new Error(`react-causality-redux: ${msg}`);}; 

if ( typeof CausalityRedux === undefinedString ) 
    error('CausalityRedux is undefined');

let reactreduxConnect = undefined;
if ( typeof connect !== undefinedString )
    reactreduxConnect = connect;
    
if ( typeof reactreduxConnect === undefinedString ) {
    if ( typeof ReactRedux === undefinedString )
        error('ReactRedux is undefined');
    reactreduxConnect = ReactRedux.connect;  
}

const getListenerDefs = (arrArg) => {
    const listenerDefs = [];
    arrArg.forEach( p => {
        if (typeof p.changers !== undefinedString) {
            let keys;
            if ( p.changers.length === 0 ) {
                const pEntry = CausalityRedux.partitionDefinitions.find( entry => p.partitionName === entry.partitionName);
                keys = CausalityRedux.getKeys(pEntry.changers);
            } else {
                keys = [...p.changers];
            }
            listenerDefs.push({ partitionName: p.partitionName, keys });
        }
    });
    return listenerDefs;
};

function mapDispatchToProps(listenerDefs) {
    return () => {
        const obj = {};
        listenerDefs.forEach(p => {
            const storePartition = CausalityRedux.store[p.partitionName];
            p.keys.forEach(key => {
                obj[key] = storePartition[key];
            });
        });
        return obj;
    };
}

function handleListeners(arrArg) {
    let hasListerners = false;
    arrArg.forEach( p => {
        hasListerners = hasListerners || typeof p.changers !== undefinedString;
        const partition = CausalityRedux.partitionDefinitions.find(e =>
            p.partitionName === e.partitionName
        );
        if (!partition)
            error(`${p.partitionName} is not a valid state partition.`);
        
        if (typeof p.changers !== undefinedString) {
            if (!Array.isArray(p.changers))
                error(`The changers parameter is not an array for ${p.partitionName}.`);
            p.changers.forEach( (o) => {
                if ( typeof CausalityRedux.store[p.partitionName][o] !== 'function' )
                    error(`The entry ${o} is not a function.`);
            });
        }
    });
    if ( !hasListerners )
        return undefined; 
    
    return mapDispatchToProps(getListenerDefs(arrArg));
}

function getStateDefs(arrArg) {
    const stateDefs = [];
    arrArg.forEach(p => {
        if (typeof p.stateEntries !== undefinedString) {
            const keys = p.stateEntries.length !== 0 ? [...p.stateEntries] : CausalityRedux.getKeys(CausalityRedux.defaultState[p.partitionName]);
            stateDefs.push({ partitionName: p.partitionName, keys });
        }
    });
    return stateDefs;
}

function mapStateToProps(stateDefs) {
    return state => {
        const obj = {};
        stateDefs.forEach(stateDef => {
            const statePartition = state[stateDef.partitionName];
            stateDef.keys.forEach(e => {
                obj[e] = statePartition[e];
            });
        });
        return obj;
    };
}

function handleStateConnections(arrArg) {
    let hasState = false;
    arrArg.forEach(p => {
        hasState = hasState || typeof p.stateEntries !== undefinedString;

        const partition = CausalityRedux.partitionDefinitions.find(e =>
            p.partitionName === e.partitionName
        );
        if (!partition)
            error(`${p.partitionName} is not a valid state partition.`);
        
        if (typeof p.stateEntries !== undefinedString) {
            if (!Array.isArray(p.stateEntries))
                error(`The stateEntries parameter is not an array for ${p.partitionName}.`);
            p.stateEntries.forEach(se => {
                if (typeof partition.defaultState[se] === undefinedString)
                    error(`${se} is not a valid key in the state partition ${p.partitionName}.`);
            });
        }
    });
    
    if (!hasState)
        return undefined;

    return mapStateToProps(getStateDefs(arrArg));
}

//
// At this time, the redux connect wrapper class fails when using a constructor for this wrapped class.
// So, instead of using 'this' in the constructor to save state, create a closure for the class which 
// achieves the same goal of providing the parameters (Component, mapStateToProps, reactComponentName, 
// combinedPartitionName, store) to the class when it is rendered.
//
function WrapConnectComponent(Component, mapStateToProps, reactComponentName, combinedPartitionName, store) {
    return class WrappedComponent extends Component {
        isCausalityReduxComponent() {
            return true;
        }
        render() {
            // This is only called when a tracing onListener function is active.
            // Will not be called in production mode.
            if (typeof CausalityRedux.onListener === 'function' && typeof mapStateToProps === 'function') {
                // Need to determine whether this render was caused by a store update.
                const priorState = this.causalityReduxState;
                this.causalityReduxState = mapStateToProps(store.getState());
                if ( priorState && !CausalityRedux.shallowEqual(priorState, this.causalityReduxState) ) 
                    CausalityRedux.onListener({nextState: this.causalityReduxState, listenerName: reactComponentName, partitionName: combinedPartitionName});
            }
            // redux connect render
            return super.render();
        }
    };
}

function doReduxConnect(reactComponent, arrArg, reactComponentName, combinedPartitionName, mapStateToProps, mapDispatchToProps, mergeProps, options) {
    const reduxComponent = reactreduxConnect(
        mapStateToProps,
        mapDispatchToProps,
        mergeProps,
        options
    )(reactComponent);

    return WrapConnectComponent(reduxComponent, mapStateToProps, reactComponentName, combinedPartitionName, CausalityRedux.store);
}

function connectChangersAndStateToPropsInternal(reactComponent, arrArg, reactComponentName, mergeProps, options) {
    if ( !CausalityRedux.store )
        error('CausalityRedux.createStore must be called before connecting to react components.');
    
    let combinedPartitionName = '';
    arrArg.forEach( p => {
        if ( combinedPartitionName !== '' )
            combinedPartitionName += ', ';
        combinedPartitionName += p.partitionName.toString();
    });
    
    const mapDispatchToProps = handleListeners(arrArg);
    const mapStateToProps = handleStateConnections(arrArg);
    const simpleReduxComponent = doReduxConnect(
        reactComponent,
        arrArg,
        reactComponentName,
        combinedPartitionName,
        mapStateToProps,
        mapDispatchToProps,
        mergeProps,
        options
    );
    return simpleReduxComponent;
}

export function connectChangersAndStateToProps(reactComponent, arg2, arg3, arg4, arg5, arg6, arg7) {
    let arrArg = arg2;
    let mergeProps = arg6;
    let options = arg7;
    let reactComponentName = arg5;
    if ( !Array.isArray(arg2) ) {
        arrArg = [];
        if ( typeof arg3 === undefinedString )
            arg3 = [];
        if ( typeof arg4 === undefinedString )
            arg4 = [];
        arrArg.push({partitionName: arg2, changers: arg3, stateEntries: arg4});
    } else {
        mergeProps = arg4;
        options = arg5;
        reactComponentName = arg3;            
    }        
    return connectChangersAndStateToPropsInternal(reactComponent, arrArg, reactComponentName, mergeProps, options );
}
    
export function connectStateToProps(reactComponent, arg2, arg3, arg4, arg5, arg6) {
    let arrArg = arg2;
    let mergeProps = arg5;
    let options = arg6;
    let reactComponentName = arg4;
    if ( !Array.isArray(arg2) ) {
        arrArg = [];
        if ( typeof arg3 === undefinedString )
            arg3 = [];
        arrArg.push({partitionName: arg2, changers: undefined, stateEntries: arg3});
    } else {
        mergeProps = arg4;
        options = arg5;
        reactComponentName = arg3;
    }
    return connectChangersAndStateToPropsInternal(reactComponent, arrArg, reactComponentName, mergeProps, options);        
}

export function connectChangersToProps(reactComponent, arg2, arg3, arg4, arg5, arg6) {
    let arrArg = arg2;
    let mergeProps = arg5;
    let options = arg6;
    let reactComponentName = arg4;
    if ( !Array.isArray(arg2) ) {
        arrArg = [];
        if ( typeof arg3 === undefinedString )
            arg3 = [];
        arrArg.push({partitionName: arg2, changers: arg3, stateEntries: undefined});
    } else {
        mergeProps = arg4;
        options = arg5;
        reactComponentName = arg3;            
    }
    return connectChangersAndStateToPropsInternal(reactComponent, arrArg, reactComponentName, mergeProps, options);        
}

export const isCausalityReduxComponent = val =>
    typeof val === 'function' && val.prototype !== 'undefined' && typeof val.prototype.isCausalityReduxComponent !== 'undefined';  

/**
 * Establishes controller connections between the controller functions/store partition data and
 * react component(s) using redux connect.
 * @param {Object.module} The variable module in the calling module. Used to support hot re-loading.
 * @param {Object.uiComponent} A react component to be wrapped with redux connect.
 * @param {String.uiComponentName} The string name of the component, such as Todo is simply 'Todo'
 * @param {Object.partition} The causality redux partition definition.
 * @param {Array.storeKeys} By default, uiComponent is wrapped with all controller function keys
 * and all partition store keys sent into the props. Use this to select only a subset of those store keys.
   @param {Array.changerKeys} By default, uiComponent is wrapped with all controller function keys
 * and all partition store keys sent into the props. Use this to select only a subset of those function keys.
 * @param {Function.hotDisposeHandler} A function to be called before the module is hot reloaded. Use
 * this to remove module event listeners for example.
 * @param {Array.controllerUIConnections} This parameter is used for two reasons. One, you want to
 * connect a component to other partitions or two, you want to connect multiple conponents to Object.partition
 * or other state partitions. Either way this parameter is an array of arrays.
 * Note, if a partition is defined on input then each redux connected component will be contained in the partition store under its string componentname below. 
 *
 * Array Parameter Format 1  - For connecting a component to one partition.
 * [
        component - The comnponent to be wrapped,
        partition - The partition from which to conneced to.
        controllerFunctionKeys - array of partition controller function keys to receive in the props of the component. 
        defaultStateKeys - array of partition store keys to receive in the props of the component.
        componentname - The string name of the component.
 * ]
 *
 * Array Parameter Format 2  - For connecting a component to multiple partitions.
 * [
        component - The component to be wrapped,
        [
            { partitionName1, arrayControllerFunctionKeys1, arrayDefaultStateKeys1 },
            { partitionName2, arrayControllerFunctionKeys2, arrayDefaultStateKeys2 },
        ],
        componentname - The string name of the component.
 * ]
 
 * @return {Object}
 * {
        partitionState = Proxy for getting and setting partition state values.
        setState - Set multiple partition values at a time.
        getState -Gets the current partition object
        partitionStore - Accesses all features of this partition.
        wrappedComponents -- Redux connect wrapped component(s).  
   }
 */
export function establishControllerConnections({ module, uiComponent, uiComponentName, partition, storeKeys, changerKeys, hotDisposeHandler, controllerUIConnections }) {
    
    if (typeof controllerUIConnections !== undefinedString && typeof uiComponent !== undefinedString)
        error('Cannot define both controllerUIConnections and uiComponent.'); 
    
    if (typeof controllerUIConnections !== undefinedString) {
        if (!Array.isArray(controllerUIConnections))
            error('controllerUIConnections must be an array.'); 
        
        if (typeof partition !== undefinedString) {
            controllerUIConnections.forEach(entry => {
                partition.defaultState[entry[4]] = null;
            });
        }    
    } 

    let partitionState;
    let setState;
    let getState;
    let partitionStore;
    const unsubscribers = [];
    const wrappedComponents = {};

    if (typeof partition !== undefinedString) {
        // Create the causality-redux store and use the store partition above for definitions.
        // If the store has already been created elsewhere, then only the input partition is created.
        CausalityRedux.createStore(partition);

        const foundPartition = CausalityRedux.partitionDefinitions.find(e =>
            partition.partitionName === e.partitionName
        );

        // Get access to the partition’s controller functions.
        partitionStore = CausalityRedux.store[foundPartition.partitionName];

        // Get a proxy to the store partition so that causality-redux can detect changes to the values of the partition.
        partitionState = partitionStore.partitionState;

        // Allows setting multiple keys in a state partition.
        setState = partitionStore.setState;

        // Gets the current partition object.
        getState = partitionStore.getState;

        const funcKeys = [];
        CausalityRedux.getKeys(foundPartition.changerDefinitions).forEach(changerKey => {
            const entry = foundPartition.changerDefinitions[changerKey];
            if (entry.operation === CausalityRedux.operations.STATE_FUNCTION_CALL) {
                if (typeof partition.controllerFunctions !== undefinedString && typeof partition.controllerFunctions[changerKey] === 'function')
                    unsubscribers.push(partitionStore.subscribe(partition.controllerFunctions[changerKey], changerKey));
                else
                    unsubscribers.push(partitionStore.subscribe(partition.changerDefinitions[changerKey].controllerFunction, changerKey));
                funcKeys.push(changerKey);
            }
        });

        if (typeof storeKeys === undefinedString)
            storeKeys = CausalityRedux.getKeys(foundPartition.defaultState);
        else if (storeKeys.length === 0)
            storeKeys = undefined;

        if (typeof changerKeys === undefinedString)
            changerKeys = funcKeys;
        else if (changerKeys.length === 0)
            changerKeys = undefined;
    
        if (typeof uiComponent !== undefinedString) {
            if ( typeof uiComponentName === undefinedString )
                error('The component should have uiComponentName as the string name of the component.');
            wrappedComponents[uiComponentName] = CausalityRedux.connectChangersAndStateToProps(
                uiComponent, // React component to wrap.
                foundPartition.partitionName, // State partition
                // This is an array of names of changers/action creators defined in the partition that you want
                // passed into the props by causality-redux so that the component can call these functions.
                changerKeys,
                // This is an array of keys in COUNTTEN_STATE whose values you want passed into the props.
                // Whenever any value associated with a key listed in this array changes in the causality-redux store,
                // causality-redux will cause the component to render with the new values set in the props.
                storeKeys,
                uiComponentName
            );
            uiComponent = wrappedComponents[uiComponentName];
        }
    }    

    if (typeof module !== undefinedString && module.hot) {
        // Add the dispose handler that is to be called before this module is changed out for the new one. 
        // This must be done for any module with side effects like adding event listeners etc.
        module.hot.dispose(function () {
            if ( typeof unsubscribers !== undefinedString )
                unsubscribers.forEach(unsubscriber => unsubscriber());
            if (typeof hotDisposeHandler === 'function')
                hotDisposeHandler();
        });
    }

    if (typeof controllerUIConnections !== undefinedString) {
        controllerUIConnections.forEach(entry => {
            const wrappedComponent = CausalityRedux.connectChangersAndStateToProps(...entry);
            if (typeof entry[4] === 'string')
                wrappedComponents[entry[4]] = wrappedComponent;
            else
                wrappedComponents[entry[2]] = wrappedComponent;
        });
        // If partition is defined then the wrapped components are set in the store under their names. 
        if (typeof setState !== undefinedString)
            setState(wrappedComponents);
        uiComponent = wrappedComponents;
    }

    return {
        // Proxy for getting and setting partition state values.
        partitionState,
        // Set multiple partition values at a time.
        setState,
        // Gets the current partition object.
        getState,
        // Accesses all features of this partition.
        partitionStore,
        // Redux connect wrapped component(s).
        wrappedComponents,
        // From the past
        uiComponent     
    };
}

CausalityRedux.connectChangersAndStateToProps = connectChangersAndStateToProps;
CausalityRedux.connectStateToProps = connectStateToProps;
CausalityRedux.connectChangersToProps = connectChangersToProps;
CausalityRedux.establishControllerConnections = establishControllerConnections;
CausalityRedux.isCausalityReduxComponent = isCausalityReduxComponent;