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

function WrapConnectComponent(Component, mapStateToProps, reactComponentName, combinedPartitionName, store) {
    return class WrappedComponent extends Component {
        render() {
            // This is only called when a tracing onListener function is active.
            // Will not be called in production mode.
            if (typeof CausalityRedux.onListener === 'function') {
                // Need to determine whether this render was caused by a store update.
                const priorState = this.causalityReduxState;
                this.causalityReduxState = mapStateToProps(store.getState());
                if ( priorState && !CausalityRedux.shallowEqual(priorState, this.causalityReduxState) ) 
                    CausalityRedux.onListener({nextState: this.causalityReduxState, listenerName: reactComponentName, partitionName: combinedPartitionName});
            }
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

CausalityRedux.connectChangersAndStateToProps = connectChangersAndStateToProps;
CausalityRedux.connectStateToProps = connectStateToProps;
CausalityRedux.connectChangersToProps = connectChangersToProps;
