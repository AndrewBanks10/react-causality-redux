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



export function establishControllerConnections({ module, uiComponent, uiComponentName, partition, storeKeys, changerKeys, hotDisposeHandler }) {
    // Create the causality-redux store and use the store partition above for definitions. 
    // If the store has already been created elsewhere, then only the input partition is created.
    CausalityRedux.createStore(partition);

    partition = CausalityRedux.partitionDefinitions.find(e =>
        partition.partitionName === e.partitionName
    );

    // Get access to the partition’s controller functions.
    const partitionStore = CausalityRedux.store[partition.partitionName];

    // Get a proxy to the store partition so that causality-redux can detect changes to the values of the partition.
    const partitionState = partitionStore.partitionState;

    // Allows setting multiple keys in a state partition.
    const setState = partitionStore.setState;

    const funcKeys = [];
    const unsubscribers = [];
    CausalityRedux.getKeys(partition.changerDefinitions).forEach(changerKey => {
        const entry = partition.changerDefinitions[changerKey];
        if (entry.operation === CausalityRedux.operations.STATE_FUNCTION_CALL) {
            unsubscribers.push(partitionStore.subscribe(entry.controllerFunction, changerKey));
            funcKeys.push(changerKey);
        }    
    });

    if (typeof storeKeys === 'undefined')
        storeKeys = Object.keys(partition.defaultState);
    else if (storeKeys.length === 0)
        storeKeys = undefined;

    if (typeof changerKeys === 'undefined')
        changerKeys = funcKeys;
    else if (changerKeys.length === 0)
        changerKeys = undefined;

    uiComponentName = typeof uiComponentName === 'undefined' ? 'React component render' : `${uiComponentName} render`;
    
    if (typeof uiComponent !== 'undefined') {
        uiComponent = CausalityRedux.connectChangersAndStateToProps(
            uiComponent, // React component to wrap.
            partition.partitionName, // State partition
            // This is an array of names of changers/action creators defined in the partition that you want
            // passed into the props by causality-redux so that the component can call these functions.
            changerKeys,
            // This is an array of keys in COUNTTEN_STATE whose values you want passed into the props.
            // Whenever any value associated with a key listed in this array changes in the causality-redux store,
            // causality-redux will cause the component to render with the new values set in the props.
            storeKeys,
            uiComponentName            
        );
    }

    if (module.hot) {
        // Add the dispose handler that is to be called before this module is changed out for the new one. 
        // This must be done for any module with side effects like adding event listeners etc.
        module.hot.dispose(function () {
            unsubscribers.forEach(unsubscriber => unsubscriber());
            if (typeof hotDisposeHandler === 'function')
                hotDisposeHandler();
        });
    }

    return {
        partitionState,
        setState,
        partitionStore,
        uiComponent
    };
}

CausalityRedux.connectChangersAndStateToProps = connectChangersAndStateToProps;
CausalityRedux.connectStateToProps = connectStateToProps;
CausalityRedux.connectChangersToProps = connectChangersToProps;
CausalityRedux.establishControllerConnections = establishControllerConnections;
