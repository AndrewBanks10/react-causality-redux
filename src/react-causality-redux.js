/** @preserve © 2017 Andrew Banks ALL RIGHTS RESERVED */

import {connect} from 'react-redux'
import CausalityRedux from 'causality-redux'

(function() {

    var undefinedString = 'undefined' ;
   
    const error = (msg) => {throw new Error('react-causality-redux: ' + msg);} 

    if ( typeof CausalityRedux == undefinedString ) 
        error(`CausalityRedux is undefined`);
    
    var reactreduxConnect = undefined ;
    if ( typeof connect != undefinedString )
        reactreduxConnect = connect;
        
    if ( typeof reactreduxConnect == undefinedString ) {
        if ( typeof ReactRedux == undefinedString )
            error(`ReactRedux is undefined`);
        reactreduxConnect = ReactRedux.connect;  
    }
    
    function handleListeners(arrArg) {
        let hasListerners = false ;
        arrArg.forEach( p => {
            hasListerners = hasListerners || (typeof p.changers != undefinedString );
        });
        if ( !hasListerners )
            return(undefined); 
        
        const mapDispatchToProps = () => {
            let obj = {};
            arrArg.forEach( p => {
                if ( typeof p.changers != undefinedString ) {
                    if ( p.changers.length == 0 ) {
                        let sEntry = CausalityRedux.partitionDefinitions.find( (entry)=>(p.partitionName == entry.partitionName ) ) ;
                        if ( !sEntry )
                            error(p.partitionName + ' not found.');  
                        for ( var o in sEntry.changers )
                            obj[o] = CausalityRedux.store[p.partitionName][o];
                    } else {
                        p.changers.forEach( (o) => {
                            if ( typeof CausalityRedux.store[p.partitionName][o] != 'function' )
                                throw `The entry ${o} is not a function.`;
                            obj[o] = CausalityRedux.store[p.partitionName][o];
                        });
                    }
                }
            });
            return(obj);
        }
        
        return(mapDispatchToProps);
    }
    
    function handleStateConnections(arrArg) {
        let hasState= false ;
        arrArg.forEach( p => {
            hasState = hasState || (typeof p.stateEntries != undefinedString );

            let partition = CausalityRedux.partitionDefinitions.find( e => (
                p.partitionName == e.partitionName
            ));
            if ( !partition )
                throw `${p.partitionName} is not a valid state entry.`
            
            if ( typeof stateEntries != undefinedString ) {
                if ( !Array.isArray(stateEntries) )
                    throw `The stateEntries parameter is not an array for ${p.partitionName}.`
                stateEntries.forEach( se => {
                    if ( typeof partition.defaultState[se] == undefinedString )
                        throw `${se} is not a valid key in the state partition ${p.partitionName}.`
                });
            }
        });
        
        if ( !hasState )
            return(undefined);
        
        const mapStateToProps = (state) => {
            var obj = {};
            arrArg.forEach( p => {
                if ( typeof p.stateEntries != undefinedString ) {
                    if ( p.stateEntries.length == 0 ) {
                        let partition = CausalityRedux.partitionDefinitions.find( e => (
                            p.partitionName == e.partitionName
                        ));
                        for ( let o in partition.defaultState )
                            obj[o] = state[p.partitionName][o];
                    };
                        
                    p.stateEntries.forEach((entry) => {
                        obj[entry] = state[p.partitionName][entry];
                    });
                }
            });
            return(obj);
        }
        
        return(mapStateToProps);
    }
    
    function doReduxConnect(reactComponent, reactComponentName, combinedPartitionName, mapStateToProps, mapDispatchToProps, mergeProps, options) {
        let simpleReduxComponent = reactreduxConnect(
            mapStateToProps,
            mapDispatchToProps,
            mergeProps,
            options
        )(reactComponent);
        
        simpleReduxComponent.prototype.priorRender = simpleReduxComponent.prototype.render;
        simpleReduxComponent.prototype.componentName = reactComponentName == undefinedString ? "React Component" : reactComponentName;
        simpleReduxComponent.prototype.combinedPartitionName = combinedPartitionName;
        simpleReduxComponent.prototype.render = function() {
            let priorState = this.stateProps;
            let returnComponent = this.priorRender();
            try {
                if ( typeof CausalityRedux.onListener == 'function' ) {
                    if ( priorState && !CausalityRedux.shallowEqual(priorState, this.stateProps) ) 
                        CausalityRedux.onListener({nextState: this.stateProps, listenerName: this.componentName, partitionName: this.combinedPartitionName});
                }
            } catch (msg) {
            }
            return(returnComponent);
        }

        return(simpleReduxComponent);
    }

    function connectChangersAndStateToPropsInternal(reactComponent, arrArg, reactComponentName, mergeProps, options) {
        if ( !CausalityRedux.store )
            throw 'CausalityRedux.createStore must be called before connecting to react components.'
        
        let combinedPartitionName = "";
        arrArg.forEach( p => {
            if ( combinedPartitionName != "" )
                combinedPartitionName += ', ';
            combinedPartitionName += p.partitionName ;
        });
        
        const mapDispatchToProps = handleListeners(arrArg) ;
        const mapStateToProps = handleStateConnections(arrArg) ;
        let simpleReduxComponent = doReduxConnect(
            reactComponent,
            reactComponentName,
            combinedPartitionName,
            mapStateToProps,
            mapDispatchToProps,
            mergeProps,
            options
        );
        return(simpleReduxComponent);
    }
    
    CausalityRedux.connectChangersAndStateToProps = (reactComponent, arg2, arg3, arg4, arg5, arg6, arg7) => {
        var arrArg = arg2;
        if ( !Array.isArray(arg2) ) {
            arrArg = [];
            if ( typeof arg3 == undefinedString )
                arg3 = [];
            if ( typeof arg4 == undefinedString )
                arg4 = [];
            arrArg.push({partitionName: arg2, changers: arg3, stateEntries: arg4});
            var mergeProps = arg6;
            var options = arg7;
            var reactComponentName = arg5 ;
        } else {
            var mergeProps = arg4;
            var options = arg5;
            var reactComponentName = arg3 ;            
        }        
        return(connectChangersAndStateToPropsInternal(reactComponent, arrArg, reactComponentName, mergeProps, options ));
    }
        
    CausalityRedux.connectStateToProps = (reactComponent, arg2, arg3, arg4, arg5, arg6) => {
        var arrArg = arg2;
        if ( !Array.isArray(arg2) ) {
            arrArg = [];
            if ( typeof arg3 == undefinedString )
                arg3 = [];
            arrArg.push({partitionName: arg2, changers: undefined, stateEntries: arg3});
            var mergeProps = arg5;
            var options = arg6;
            var reactComponentName = arg4 ;
        } else {
            var mergeProps = arg4;
            var options = arg5;
            var reactComponentName = arg3 ;
        }
        return(connectChangersAndStateToPropsInternal(reactComponent, arrArg, reactComponentName, mergeProps, options )) ;        
    }

    CausalityRedux.connectChangersToProps = (reactComponent, arg2, arg3, arg4, arg5, arg6) => {
        var arrArg = arg2;
        if ( !Array.isArray(arg2) ) {
            arrArg = [];
            if ( typeof arg3 == undefinedString )
                arg3 = [];
            arrArg.push({partitionName: arg2, changers: arg3, stateEntries: undefined});
            var mergeProps = arg5;
            var options = arg6;
            var reactComponentName = arg4 ;
        } else {
            var mergeProps = arg4;
            var options = arg5;
            var reactComponentName = arg3 ;            
        }
        return(connectChangersAndStateToPropsInternal(reactComponent, arrArg, reactComponentName, mergeProps, options )) ;        
    }

})();
