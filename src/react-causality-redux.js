/** @preserve © 2017 Andrew Banks ALL RIGHTS RESERVED */

import { connect } from 'react-redux';
import CausalityRedux from 'causality-redux';

(function() {

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
    
    function handleListeners(arrArg) {
        let hasListerners = false;
        arrArg.forEach( p => {
            hasListerners = hasListerners || typeof p.changers !== undefinedString;
        });
        if ( !hasListerners )
            return undefined; 
        
        const mapDispatchToProps = () => {
            const obj = {};
            arrArg.forEach( p => {
                if ( typeof p.changers !== undefinedString ) {
                    if ( p.changers.length === 0 ) {
                        const sEntry = CausalityRedux.partitionDefinitions.find( entry => p.partitionName === entry.partitionName);
                        if ( !sEntry )
                            error(`${p.partitionName} not found.`);  
                        for ( const o in sEntry.changers )
                            obj[o] = CausalityRedux.store[p.partitionName][o];
                    } else {
                        p.changers.forEach( (o) => {
                            if ( typeof CausalityRedux.store[p.partitionName][o] !== 'function' )
                                error(`The entry ${o} is not a function.`);
                            obj[o] = CausalityRedux.store[p.partitionName][o];
                        });
                    }
                }
            });
            return obj;
        };
        
        return mapDispatchToProps;
    }
    
    function handleStateConnections(arrArg) {
        let hasState= false;
        arrArg.forEach( p => {
            hasState = hasState || typeof p.stateEntries !== undefinedString;

            const partition = CausalityRedux.partitionDefinitions.find( e =>
                p.partitionName === e.partitionName
            );
            if ( !partition )
                error(`${p.partitionName} is not a valid state entry.`);
            
            if ( typeof p.stateEntries !== undefinedString ) {
                if ( !Array.isArray(p.stateEntries) )
                    error(`The stateEntries parameter is not an array for ${p.partitionName}.`);
                p.stateEntries.forEach( se => {
                    if ( typeof partition.defaultState[se] === undefinedString )
                        error(`${se} is not a valid key in the state partition ${p.partitionName}.`);
                });
            }
        });
        
        if ( !hasState )
            return undefined;
        
        const mapStateToProps = (state) => {
            const obj = {};
            arrArg.forEach( p => {
                if ( typeof p.stateEntries !== undefinedString ) {
                    if ( p.stateEntries.length === 0 ) {
                        const partition = CausalityRedux.partitionDefinitions.find( e =>
                            p.partitionName === e.partitionName
                        );
                        for ( const o in partition.defaultState )
                            obj[o] = state[p.partitionName][o];
                    }
                        
                    p.stateEntries.forEach((entry) => {
                        obj[entry] = state[p.partitionName][entry];
                    });
                }
            });
            return obj;
        };
        
        return mapStateToProps;
    }
    
    function doReduxConnect(reactComponent, reactComponentName, combinedPartitionName, mapStateToProps, mapDispatchToProps, mergeProps, options) {
        const simpleReduxComponent = reactreduxConnect(
            mapStateToProps,
            mapDispatchToProps,
            mergeProps,
            options
        )(reactComponent);
        
        simpleReduxComponent.prototype.priorRender = simpleReduxComponent.prototype.render;
        simpleReduxComponent.prototype.componentName = reactComponentName === undefinedString ? 'React Component' : reactComponentName;
        simpleReduxComponent.prototype.combinedPartitionName = combinedPartitionName;
        simpleReduxComponent.prototype.render = function() {
            const priorState = this.stateProps;
            const returnComponent = this.priorRender();
            if ( typeof CausalityRedux.onListener === 'function' ) {
                if ( priorState && !CausalityRedux.shallowEqual(priorState, this.stateProps) ) 
                    CausalityRedux.onListener({nextState: this.stateProps, listenerName: this.componentName, partitionName: this.combinedPartitionName});
            }
            return returnComponent;
        };

        return simpleReduxComponent;
    }

    function connectChangersAndStateToPropsInternal(reactComponent, arrArg, reactComponentName, mergeProps, options) {
        if ( !CausalityRedux.store )
            error('CausalityRedux.createStore must be called before connecting to react components.');
        
        let combinedPartitionName = '';
        arrArg.forEach( p => {
            if ( combinedPartitionName !== '' )
                combinedPartitionName += ', ';
            combinedPartitionName += p.partitionName;
        });
        
        const mapDispatchToProps = handleListeners(arrArg);
        const mapStateToProps = handleStateConnections(arrArg);
        const simpleReduxComponent = doReduxConnect(
            reactComponent,
            reactComponentName,
            combinedPartitionName,
            mapStateToProps,
            mapDispatchToProps,
            mergeProps,
            options
        );
        return simpleReduxComponent;
    }
    
    CausalityRedux.connectChangersAndStateToProps = (reactComponent, arg2, arg3, arg4, arg5, arg6, arg7) => {
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
    };
        
    CausalityRedux.connectStateToProps = (reactComponent, arg2, arg3, arg4, arg5, arg6) => {
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
    };

    CausalityRedux.connectChangersToProps = (reactComponent, arg2, arg3, arg4, arg5, arg6) => {
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
    };

})();
