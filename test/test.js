
var jsdom = require('jsdom')
const { JSDOM } = jsdom;

const doc = new JSDOM(`<!DOCTYPE html><body><div id="reactroot"></div></body></html>`);

const window = doc.window;
const document = window.document;
global.document = document;
global.window = window;
global.navigator = window.navigator;  

function simulateEvent(element, etype, param){
    var evObj = document.createEvent('Events');
    evObj.initEvent(etype, true, false);
    element.dispatchEvent(evObj);
}

global['simulateEvent'] = simulateEvent;

require('./react-test-es5.js');
