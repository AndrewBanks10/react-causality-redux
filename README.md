### Installation
`npm install --save react-causality-redux`

### Basics
                
**establishControllerConnections** - Connects store partition keys and functions to a react component in the props. Whenever any of the store partition values change, the react component re-renders with the new values put into the props by causality-redux.
**Syntax**
```javascript
establishControllerConnections(obj)
```
**Parameters**
* obj.module{Object}[Optional] - The variable module in the calling module. Used to support hot re-loading..
* obj.partition{Object}[Optional] - The causality redux partition definition.
* obj.uiComponent{Object}[Optional] - A react component to be wrapped with redux connect.
* obj.uiComponentName{String}[Optional but required if obj.uiComponent is specified] - The string name of the component, such as Todo is simply 'Todo'.
* obj.storeKeys{Array}[Optional] - The default behavior connects all keys in the defaultState of the partition to the react uiComponent. Override this behavior by supplying a subset of defaultState keys in an array with this key.
* obj.changerKeys{Array }[Optional] - The default behavior connects all keys in the controllerFunctions of the partition to the react uiComponent. Override this behavior by supplying a subset of the uiServiceFunctions keys in an array with this key.
* obj.hotDisposeHandler{Function}[Optional] - A function that is to be called just before the module is hot reloaded. Generally use this to remove event listeners or other side effects of loading the module.
* obj.controllerUIConnections{Array}[Optional] - This parameter is used for two reasons. One, you want to connect a component in the view to other component partitions or two, you want to connect multiple conponents in the view to obj.partition or other component partitions. Either way this parameter is an array of objects.
Note, if a partition is defined on input then each redux connected component will be contained in the partition store under its string componentname below.
The format of each array entry in controllerUIConnections array is given below.

Array Parameter Format 1  - For connecting to one partition to one a component in the view.
```javascript
{
    uiComponent{Object} - The component to be wrapped.
    partitionName{string} - The partition from which to connect to.
    changerKeys{Array} - array of partition uiServiceFunction function keys to receive in the props of the component. If this entry is undefined then all uiServiceFunction keys are included in the props. If this entry is an empty array then no uiServiceFunction keys are included in the props.
    storeKeys{Array} - array of partition store keys to receive in the props of the component. If this entry is undefined then all defaultState keys are included in the props. If this entry is an empty array then no defaultState keys are included in the props.
    uiComponentName{String} - The string name of the component.
}
```

Array Parameter Format 2  - For connecting multiple partitions to a component in the view. In short, you can connect state and/or functions from other components.
```javascript

{
    uiComponent{Object} - The component to be wrapped
    partitions: - The partitions you want to connect to.
    [
        { partitionName{String}, changerKeys{Array}, storeKeys{Array} }
    ],
    uiComponentName{String} - The string name of the component.
}
As above, for the partitions array argument, if the changerKeys is undefined then all uiServiceFunction keys for the partition are included in the props and if changerKeys=[] then no uiServiceFunction keys for the partition are included in the props. Likewise, if the storeKeys is undefined then all defaultState keys for the partition are included in the props and if storeKeys=[] then no defaultState keys for the partition are included in the props.
```
**Return Value**
```javascript
{ partitionState, setState, getState, subscribe, partitionStore, uiComponent }
```
* partitionState - A proxy to the store partition keys so that you can get and set individual partition keys. The statement partitionState.key returns a shallow copy of key and partitionState.key = value sets key to value in the redux partition according o===to the rules of redux updating.
* setState(obj) - Merges obj with the redux partition object.
* getState - Gets the entire partition object.
* subscribe(listener{function}, keys{array}) - The listener is called if and only if any of the keys in the array argument are changed in the redux partition. The listener will receives an object that contains the key/value pairs of those that changed.
* partitionStore - Returns the partition's store object. This object contains the below.
    1. partitionState
    2. setState
    3. getState
    4. subscribe
    5. uiServiceFunctions at their respective key from the uiServiceFunctions object.
* uiComponent
    1. The redux connected component if uiComponent is valid on input.
    2. If controllerUIConnections.length === 1 then uiComponent is an object of the redux connected component(s).
    3. If controllerUIConnections.length > 1 then uiComponent is undefined and the redux connected components are stored in the redux partition with keys of their componentname.
