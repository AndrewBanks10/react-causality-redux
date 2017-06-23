/* eslint-disable react/no-multi-comp */
/* eslint-disable react/jsx-sort-prop-types */


import assert from 'assert';
import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import CausalityRedux from 'causality-redux';
import {Provider} from 'react-redux';

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
    defaultState: {fieldValue: ""},
    changerDefinitions: {
        'onChangeField': { operation: CausalityRedux.operations.STATE_FUNCTION_CALL},
        'setField': { arguments: ['fieldValue'] }
    }
};

let onChangeFieldFunctionCalled = false;
function init() {
    var fieldState = CausalityRedux.store[FIELD_STATE];
    function onChangeField(arg) {
        onChangeFieldFunctionCalled = true;
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
});

let incButton = null;
let decButton = null;
let incButton3 = null;
let incButton2 = null;
let counterDisplay = null;
let renderCallback = null;
let update = false;
let update2 = false;
let inputField = null;
let counterDisplay2 = null;

class CounterForm extends React.Component {
  componentDidUpdate() {
    update = true;
  }
	render() {
    const {onIncrement, onDecrement, onIncrement3, counter} = this.props;
		return( 
      <div className='counter-form-button-container'>
        <div  ref={e => { counterDisplay = e; }} >{counter}</div>
        <button ref={e => { incButton = e; }} onClick={e => onIncrement()}>Up</button>
        <button ref={e => { decButton = e; }} onClick={e => onDecrement()}>Down</button>
        <button ref={e => { incButton3 = e; }} onClick={e => onIncrement3()}>Up</button>
      </div>
		);
	}
}
const CounterFormCausalityRedux = CausalityRedux.connectChangersAndStateToProps(CounterForm, COUNTER_STATE, ['onIncrement', 'onDecrement', 'onIncrement3'], ['counter']);

class CounterForm2 extends React.Component {
  render() {
		return( 
      <button ref={e => { incButton2 = e; }} onClick={e => this.props.onIncrement()}>Up</button>
		);
	}
}
const CounterForm2CausalityRedux = CausalityRedux.connectChangersToProps(CounterForm2, COUNTER_STATE, ['onIncrement']);

class CounterForm3 extends React.Component {
  componentDidUpdate() {
    update2 = true;
  }
	render() {
		return( 
      <div ref={e => {counterDisplay2 = e;}} >{this.props.counter}</div>
		);
	}
}
const CounterForm3CausalityRedux = CausalityRedux.connectStateToProps(CounterForm3, COUNTER_STATE, ['counter']);

let numEditUpdates = 0;
class EditField extends React.Component {
  componentDidMount() {
    inputField.onchange = this.props.onChangeField.bind(this);
  }
  componentDidUpdate() {
    numEditUpdates++;
  }
	render() {
        const {fieldValue, onChangeField} = this.props; 
        return(
            <input ref={e => {inputField = e;}}
                type="text"
                name="ID"
                required="required"
                value={fieldValue}
                placeholder="Name"
                onChange={e => onChangeField(e.target.value)}
            />
        );
	}
}
const EditFieldCausalityRedux = CausalityRedux.connectChangersAndStateToProps(EditField, FIELD_STATE, ['onChangeField'], ['fieldValue']);

ReactDOM.render(
    <Provider store={CausalityRedux.store}>
        <div>
            <CounterFormCausalityRedux/>
            <EditFieldCausalityRedux/>
            <CounterForm2CausalityRedux/>
            <CounterForm3CausalityRedux/>
        </div>
    </Provider>,
    document.getElementById('reactroot')
);

let intervalID;
let currentTime;
let numEditUpdatesExpected=0;

let which = 0;
function handleReactAsync(done) {
    if ( update && update2 && which === 0 || numEditUpdates === numEditUpdatesExpected && which === 1 ) {
        clearInterval(intervalID);
        done();
    } else if ( new Date() - currentTime > 100 ) {
        clearInterval(intervalID);
        done();
    }
}

function handleReactAsyncStart(done) {
    intervalID = setInterval(handleReactAsync, 10, done);
}

function testStart() {
    update = false;
    update2 = false;
    numEditUpdates = 0;
    onChangeFieldFunctionCalled = false;
    currentTime = new Date();
}

//
// react-causailty-redux only has 3 functions, connectChangersAndStateToProps, connectChangersToProps and connectStateToProps.
// So, those will be proven to work in react.
//  

describe('Operations CounterForm and CounterForm3', function(done){
  //
  // Demonstrate that onIncrement works and updates the state value counter in CounterForm and CounterForm3.
  // This also verifies connectChangersAndStateToProps and connectStateToProps.
  //
  
  it('Try async click on counter increment button', function(done){
    testStart();
    simulateEvent(incButton, 'click');
    handleReactAsyncStart(done);
  });
  
  it('Increment button should increment counter in the COUNTER_STATE partition.', function(){
    assert(counterStore.getState().counter === 1 );
  });
  
  it('Counter displayed in component CounterForm should have updated.', function(){
    assert(counterDisplay.innerHTML === "1" );
  });
  
  it('Counter displayed in component CounterForm3 should have updated.', function(){
    assert(counterDisplay2.innerHTML === "1" );
  });

  //
  // Demonstrate that onDecrement works and updates the state value counter in CounterForm and CounterForm3.
  // This also verifies connectChangersAndStateToProps and connectStateToProps.
  //
  it('Try async click on counter decrement button', function(done){
    testStart();
    simulateEvent(decButton, 'click');
    handleReactAsyncStart(done);
  });
  
  it('Decrement button should decrement counter in the COUNTER_STATE partition.', function(){
    assert(counterStore.getState().counter === 0 );
  });
  
  it('Counter displayed in component should have updated.', function(){
    assert(counterDisplay.innerHTML === "0" );
  });
  
  it('Counter displayed in component CounterForm3 should have updated.', function(){
    assert(counterDisplay2.innerHTML === "0" );
  });

  //  
  // This updates the COUNTER_STATE value counter3 and proves CounterForm and CounterForm3 do not render since they do not listen to its changes
  // but are connected to the state partition COUNTER_STATE.
  //
  it('Try async click on counter increment button3', function(done){
    testStart();
    simulateEvent(incButton3, 'click');
    handleReactAsyncStart(done);
  });
  
  it('Increment3 button should increment counter3 in the COUNTER_STATE partition.', function(){
    assert(counterStore.getState().counter3 === 1 );
  });
  
  it('Components CounterForm and CounterForm3 should not have rendered.', function(){
    assert(!update && !update2);
  });
  
  //
  // Demonstrate that onIncrement works and updates the state value counter in CounterForm and CounterForm3 with just connectChangersToProps.
  //
  it('Try async click on counter increment button2', function(done){
    testStart();
    simulateEvent(incButton2, 'click');
    handleReactAsyncStart(done);
  });
  
  it('Increment button should increment counter in the COUNTER_STATE partition to exercise connectChangersToProps.', function(){
    assert(counterStore.getState().counter === 1 );
  });
  
  it('Counter displayed in component CounterForm should have updated.', function(){
    assert(counterDisplay.innerHTML === "1" );
  });
  
  it('Counter displayed in component CounterForm3 should have updated.', function(){
    assert(counterDisplay2.innerHTML === "1" );
  });
});


//
// This will check that outside business logic works as expected. An edit control changes and business logic is called
// to correct the control and then updates ot to the correct value on screen. This should trigger a render.
// 
describe('EditField corrected by business logic.', function(){

  it('Try onchange on the input field.', function(done){
    which = 1;
    testStart();
    numEditUpdatesExpected = 1;
    inputField.onchange('abcd2');
    handleReactAsyncStart(done);
  });
  
  it('Business logic should be called.', function(){
    assert(onChangeFieldFunctionCalled);
  });
  
 
  it('Render on the edit field should be called.', function(){
    assert(numEditUpdates === numEditUpdatesExpected);
  });
  
  it('Verify that the input field was corrected by the business logic to "abcd".', function(){
    assert(inputField.value = 'abcd');
  });
});


//
// This will check that outside business logic works as expected. An edit control changes and business logic is called
// to correct the control and then updates ot to the correct value on screen. This should trigger a render.
// 
let field = 'aawqz';
describe('EditField not corrected by business logic.', function(){

  it('Try onchange on the input field.', function(done){
    which = 1;
    testStart();
    numEditUpdatesExpected = 1;
    CausalityRedux.store[FIELD_STATE].setField(field);
    inputField.onchange(field);
    handleReactAsyncStart(done);
  });

  it('Business logic should be called.', function(){
    assert(onChangeFieldFunctionCalled);
  });
 
  it('Render on the edit field should not be called. The field was not changed by the business logic.', function(){
    //
    // The input field was updated once by the call CausalityRedux.store[FIELD_STATE].setField(field) above. Then it
    // it should not be called a second time since the business logic does not change its value but sets it anyway.
    // When a value is not change in the props (ie stays the same) then the component should not be rendered.
    //
    assert(numEditUpdates === numEditUpdatesExpected);
  });
  
  it('Verify that the input field was not corrected by the business logic and remained at "aawqz".', function(){
    // verify that the component was rendered twice, the first time for abcd2 (2 is illegal) and a second time for 
    // this business logic correcting abcd2 to abcd
    assert(inputField.value = 'aawqz');
  });

});





