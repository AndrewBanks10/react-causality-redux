/* eslint-disable react/no-multi-comp */
/* eslint-disable react/jsx-sort-prop-types */

import assert from 'assert';
import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import CausalityRedux from 'causality-redux';
import {Provider} from 'react-redux';
import { mount } from 'enzyme';

import '../lib/react-causality-redux.js';


const COUNTER_STATE = "Counter";
const reduxCounter = {
    partitionName: COUNTER_STATE,
    defaultState: {counter: 0, counter3: 0},
    changerDefinitions: {
        'onIncrement':  { operation: CausalityRedux.operations.STATE_INCREMENT, impliedArguments: ['counter'] },
        'onDecrement':  { operation: CausalityRedux.operations.STATE_DECREMENT, impliedArguments: ['counter'] },
        'onIncrement3': { operation: CausalityRedux.operations.STATE_INCREMENT, impliedArguments: ['counter3'] }
    }
};

const FIELD_STATE = 'FIELD_STATE';
const reduxField = {
    partitionName: FIELD_STATE,
    defaultState: {fieldValue: "abcd"},
    changerDefinitions: {
        'onChangeField': { operation: CausalityRedux.operations.STATE_FUNCTION_CALL},
        'setField': { arguments: ['fieldValue'] }
    }
};

function init() {
  var fieldState = CausalityRedux.store[FIELD_STATE];
  function onChangeField(arg) {
      var x = /^[a-zA-Z\s]*/.exec(arg);
      let fieldValue = "";
      if ( x !== null )
          fieldValue = x[0];
      fieldState.setField(fieldValue);
  }
  fieldState.subscribe(onChangeField, ['onChangeField'], 'onChangeField');
}
CausalityRedux.onStoreCreated(init);

const store = CausalityRedux.createStore([reduxCounter, reduxField]);
const counterStore = store[COUNTER_STATE];
const editStore = store[FIELD_STATE];

describe('CausalityRedux createStore', function(){
  it('CausalityRedux.store should exist', function(){
    assert(typeof store !== 'undefined' );
  });
  it('CausalityRedux.connectChangersAndStateToProps should be a function.', function(){
    assert(typeof CausalityRedux.connectChangersAndStateToProps  === 'function' );
  });
  it('CausalityRedux.connectChangersToProps should be a function.', function(){
    assert(typeof CausalityRedux.connectChangersToProps  === 'function' );
  });
  it('CausalityRedux.connectStateToProps should be a function.', function(){
    assert(typeof CausalityRedux.connectStateToProps  === 'function' );
  });
  it('CausalityRedux.establishControllerConnections should be a function.', function(){
    assert(typeof CausalityRedux.establishControllerConnections === 'function' );
  });
});

const CounterForm = ({onIncrement, onDecrement, onIncrement3, counter, counter3}) => 
  <div className='counter-form-button-container'>
    <div id='counter-text' >{counter}</div>
    <div id='counter-text3' >{counter3}</div>
    <button id='onIncrement' onClick={e => onIncrement()}>Up</button>
    <button id='onDecrement' onClick={e => onDecrement()}>Down</button>
    <button  id='onIncrement3' onClick={e => onIncrement3()}>Up</button>
  </div>;

const CounterFormCausalityRedux = CausalityRedux.connectChangersAndStateToProps(CounterForm, COUNTER_STATE, ['onIncrement', 'onDecrement', 'onIncrement3'], ['counter', 'counter3']);

const CounterForm2 = ({onIncrement}) =>
  <button id='onIncrement2' onClick={e => onIncrement()}>Up</button>;

const CounterForm2CausalityRedux = CausalityRedux.connectChangersToProps(CounterForm2, COUNTER_STATE, ['onIncrement']);

const CounterForm3 = ({counter}) =>
  <div id='counter-text2' >{counter}</div>;

const CounterForm3CausalityRedux = CausalityRedux.connectStateToProps(CounterForm3, COUNTER_STATE, ['counter']);

const EditField = ({fieldValue, onChangeField}) =>
  <input 
      id='EditField'
      type="text"
      name="ID"
      required="required"
      value={fieldValue}
      placeholder="Name"
      onChange={e => onChangeField(e.target.value)}
  />

const EditFieldCausalityRedux = CausalityRedux.connectChangersAndStateToProps(EditField, FIELD_STATE, ['onChangeField'], ['fieldValue']);

const waitTime = 2000;
let intervalID;

//
// React rendering is asynchronous. Components must be validated asynchronously.
//
const handleReactAsync = (done, startTime, waitTime, callbackCheck) => {
    // The callback checks that the conditions for success have been met
    if ( callbackCheck() ) {
        clearInterval(intervalID);
        done();
    // Timeout means failure.
    } else if (new Date() - startTime > waitTime) {
        clearInterval(intervalID);
        done(new Error('Timeout'));
    }
};

const handleReactAsyncStart = (done, waitTime, callbackCheck) => {
    intervalID = setInterval(handleReactAsync, 10, done, new Date(), waitTime, callbackCheck);
};

export const nodeExists = selector => appMount.find(selector).exists();
export const nodeString = selector => appMount.find(selector).text();
export const nodeValue = selector => appMount.find(selector).get(0).value;
export const simulateClick = selector => appMount.find(selector).first().simulate('click');
export const simulateInput = (selector, value) => appMount.find(selector).first().simulate('change', { target: { value}});

export const testCauseAndEffectWithExists = (causeSelector, effectSelector, done) => {
    simulateClick(causeSelector);
    handleReactAsyncStart(done, waitTime, () => 
        nodeExists(effectSelector)
    );
};

export const testCauseAndEffectWithNotExists = (causeSelector, effectSelector, done) => {
    simulateClick(causeSelector);
    handleReactAsyncStart(done, waitTime, () => 
        !nodeExists(effectSelector)
    );
};

export const testCauseAndEffectWithHtmlString = (causeSelector, effectSelector, expectedHtmlString, done) => {
    simulateClick(causeSelector);
    handleReactAsyncStart(done, waitTime, () =>
        nodeString(effectSelector) === expectedHtmlString
    );
};

export const testCauseAndEffectWithTextField = (causeSelector, inputValue, expectedValue, done) => {
  simulateInput(causeSelector, inputValue);
  handleReactAsyncStart(done, waitTime, () =>
      nodeValue(causeSelector) === expectedValue
  );
};

const CounterFormValue = ({ counter }) =>
  <div id='counterformvalue'>
      {`Counter Display: ${counter}`}
  </div>;

const CounterForm4 = ({ increment, decrement, counter, CounterFormValue }) =>
    <div>
      <div id='counter-text4' >{`The current counter is ${counter}.`}</div>
      <CounterFormValue />
      <button id='onIncrement4' label="Up" onClick={increment} />
      <button id='onDecrement4' label="Down" onClick={decrement} />
    </div>;

let defaultState = { counter: 0 };

let controllerFunctions = {
    increment: () => ++partitionState2.counter,
    decrement: () => --partitionState2.counter
};

const CounterForm_Partition4 = 'CounterForm_Partition4';

let controllerUIConnections = [
    [
        CounterFormValue,    // React Component to wrap with redux connect
        CounterForm_Partition4,
        [],            // Function keys that you want passed into the props of the react component.
        ['counter'],    // Partition keys that you want passed into the props of the react component.
        'CounterFormValue'   // Name of the react component string form
    ],
    [
        CounterForm4, // Wrapped component
        CounterForm_Partition4,
        ['increment', 'decrement'], 
        ['counter', 'CounterFormValue'], 
        'CounterForm4' 
    ]
];

let ret = CausalityRedux.establishControllerConnections({
    module,
    partition: { partitionName: CounterForm_Partition4, defaultState, controllerFunctions },
    controllerUIConnections
});

const uiComponent2 = ret.uiComponent;
const partitionState2 = ret.partitionState;
const setState2 = ret.setState;
const getState2 = ret.getState;
const partitionStore2 = ret.partitionStore;

const CounterForm5 = ({ increment, decrement, counter }) =>
  <div>
    <div id='counter-text5' >{`The current counter is ${counter}.`}</div>
    <button id='onIncrement5' label="Up" onClick={increment} />
    <button id='onDecrement5' label="Down" onClick={decrement} />
  </div>;

defaultState = { counter: 0 };

controllerFunctions = {
  increment: () => ++partitionState5.counter,
  decrement: () => --partitionState5.counter
};

const CounterForm_Partition5 = 'CounterForm_Partition5';

ret = CausalityRedux.establishControllerConnections({
  module,
  partition: { partitionName: CounterForm_Partition5, defaultState, controllerFunctions },
  uiComponent: CounterForm5,
  uiComponentName: 'CounterForm5'
});

const UiComponent5 = ret.wrappedComponents.CounterForm5;
const partitionState5 = ret.partitionState;
const setState5 = ret.setState;
const getState5 = ret.getState;
const partitionStore5 = ret.partitionStore;


const CounterFormValue2 = ({ counter }) =>
<div id='counterformvalue6'>
    {`Counter Display: ${counter}`}
</div>;

controllerUIConnections = [
  [
      CounterFormValue2,    // React Component to wrap with redux connect
      CounterForm_Partition4,
      [],            // Function keys that you want passed into the props of the react component.
      ['counter'],    // Partition keys that you want passed into the props of the react component.
      'CounterFormValue2'   // Name of the react component string form
  ]
];

ret = CausalityRedux.establishControllerConnections({
  module,
  controllerUIConnections
});

const UiComponent6 = ret.wrappedComponents.CounterFormValue2;
const partitionState6 = ret.partitionState;
const setState6 = ret.setState;
const getState6 = ret.getState;
const partitionStore6 = ret.partitionStore;


const appMount = mount(
    <Provider store={CausalityRedux.store}>
        <div>
            <CounterFormCausalityRedux/>
            <EditFieldCausalityRedux/>
            <CounterForm2CausalityRedux/>
            <CounterForm3CausalityRedux/>
            <partitionState2.CounterForm4/>
            <UiComponent5/>
            <UiComponent6/>
        </div>
    </Provider>
);

describe('Operations CounterForm and CounterForm3', function(done){
  //
  // Demonstrate that onIncrement works and updates the state value counter in CounterForm and CounterForm3.
  // This also verifies connectChangersAndStateToProps and connectStateToProps.
  //
  
  // Click on the increment button  
  it('increment cause and effect 1 - validated.', function(done) {
      testCauseAndEffectWithHtmlString('#onIncrement', '#counter-text', '1', done);
  });
  

  it('Increment button should increment counter in the COUNTER_STATE partition.', function(){
    assert(counterStore.getState().counter === 1 );
  });
  
  it('Counter displayed in component CounterForm3 should have updated.', function(){
    assert(nodeString('#counter-text2') === "1" );
  });


  //
  // Demonstrate that onDecrement works and updates the state value counter in CounterForm and CounterForm3.
  // This also verifies connectChangersAndStateToProps and connectStateToProps.
  //
  it('decrement cause and effect 1 - validated.', function(done) {
    testCauseAndEffectWithHtmlString('#onDecrement', '#counter-text', '0', done);
  });;
  
  it('Decrement button should decrement counter in the COUNTER_STATE partition.', function(){
    assert(counterStore.getState().counter === 0 );
  });
  
  it('Counter displayed in component CounterForm3 should have updated.', function(){
    assert(nodeString('#counter-text2') === "0" );
  });

  //  
  // This updates the COUNTER_STATE value counter3 and proves CounterForm and CounterForm3 do not render since they do not listen to its changes
  // but are connected to the state partition COUNTER_STATE.
  //
  it('Try async click on counter increment button3', function(done){
    testCauseAndEffectWithHtmlString('#onIncrement3', '#counter-text3', '1', done);
  });
  
  it('Increment3 button should increment counter3 in the COUNTER_STATE partition.', function(){
    assert(counterStore.getState().counter3 === 1 );
  });
  
  
  //
  // Demonstrate that onIncrement works and updates the state value counter in CounterForm and CounterForm3 with just connectChangersToProps.
  //
  it('increment cause and effect 2 - validated.', function(done) {
    testCauseAndEffectWithHtmlString('#onIncrement2', '#counter-text', '1', done);
  });
  
  it('Increment button should increment counter in the COUNTER_STATE partition to exercise connectChangersToProps.', function(){
    assert(counterStore.getState().counter === 1 );
  });
  
  it('Counter displayed in component CounterForm3 should have updated.', function(){
    assert(nodeString('#counter-text2') === "1" );
  });
});

describe('EditField corrected by controller logic.', function(){

  it('Try onchange on the input field.', function(done) {
    testCauseAndEffectWithTextField('#EditField', 'abcd2', 'abcd', done);
  });

  it('Verify that fieldValue in the FIELD_STATE partition is "abcd".', function(){
    assert(editStore.getState().fieldValue === 'abcd' );
  });
  
  it('Verify that the input field is "abcd".', function(){
    
    assert(nodeValue('#EditField') === 'abcd');
  });
});


//
// Test establishControllerConnections with one component.
//
describe('Test establishControllerConnections with one component.', function () {
  it('UiComponent5 is defined - validated.', function() {
    assert(UiComponent5 !== undefined);
  });
  it('partitionState5 is defined - validated.', function() {
    assert(partitionState5 !== undefined);
  });
  it('setState5 is defined - validated.', function() {
    assert(setState5 !== undefined);
  });
  it('getState5 is defined - validated.', function() {
    assert(getState5 !== undefined);
  });
  it('partitionStore5 is defined - validated.', function() {
    assert(partitionStore5 !== undefined);
  });
  // Click on the increment button  
  it('increment cause and effect - validated.', function(done) {
      testCauseAndEffectWithHtmlString('#onIncrement5', '#counter-text5', 'The current counter is 1.', done);
  });

  // Click on the decrement button  
  it('decrement cause and effect - validated.', function(done) {
      testCauseAndEffectWithHtmlString('#onDecrement5', '#counter-text5', 'The current counter is 0.', done);
  });
});

//
// Test establishControllerConnections with multiple components.
//
describe('Test establishControllerConnections with multiple components.', function () {
  it('partitionState2 is defined - validated.', function() {
    assert(partitionState2 !== undefined);
  });
  it('setState2 is defined - validated.', function() {
    assert(setState2 !== undefined);
  });
  it('getState2 is defined - validated.', function() {
    assert(getState2 !== undefined);
  });
  it('partitionStore2 is defined - validated.', function() {
    assert(partitionStore2 !== undefined);
  });
  // Click on the increment button  
  it('increment cause and effect 1 - validated.', function(done) {
      testCauseAndEffectWithHtmlString('#onIncrement4', '#counter-text4', 'The current counter is 1.', done);
  });

  // Click on the increment button  
  it('increment cause and effect 2 - validated.', function(done) {
      testCauseAndEffectWithHtmlString('#onIncrement4', '#counterformvalue', 'Counter Display: 2', done);
  });

   // Click on the decrement button  
  it('decrement cause and effect 1 - validated.', function(done) {
      testCauseAndEffectWithHtmlString('#onDecrement4', '#counter-text4', 'The current counter is 1.', done);
  });

   // Click on the decrement button  
  it('decrement cause and effect 2 - validated.', function(done) {
      testCauseAndEffectWithHtmlString('#onDecrement4', '#counterformvalue', 'Counter Display: 0', done);
  });
});


//
// Test establishControllerConnections with component and no partition definition
//
describe('Test establishControllerConnections with component and no partition definition.', function () {
  it('UiComponent6 is not undefined - validated.', function() {
    assert(UiComponent6 !== undefined);
  });
  it('partitionState6 is undefined - validated.', function() {
    assert(partitionState6 === undefined);
  });
  it('setState6 is undefined - validated.', function() {
    assert(setState6 === undefined);
  });
  it('getState6 is undefined - validated.', function() {
    assert(getState6 === undefined);
  });
  it('partitionStore6 is undefined - validated.', function() {
    assert(partitionStore6 === undefined);
  });

  // Click on the increment button  
  it('increment cause and effect 1 - validated.', function(done) {
      testCauseAndEffectWithHtmlString('#onIncrement4', '#counterformvalue6', 'Counter Display: 1', done);
  });

   // Click on the decrement button  
  it('decrement cause and effect 1 - validated.', function(done) {
      testCauseAndEffectWithHtmlString('#onDecrement4', '#counterformvalue6', 'Counter Display: 0', done);
  });
});