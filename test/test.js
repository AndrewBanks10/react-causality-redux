const jsdom = require('jsdom')
const html = `<!DOCTYPE html><body><div id="reactroot"></div></body></html>`;

let doc;
let window;
if ( typeof jsdom.JSDOM !== 'undefined') {
    doc = new jsdom.JSDOM(html);
    window = doc.window;
} else {
    doc = new jsdom.jsdom(html);
    window = doc.defaultView;
}

global.document = window.document;
global.window = window;
global.navigator = window.navigator;  

function simulateEvent(element, etype, param){
    var evObj = document.createEvent('Events');
    evObj.initEvent(etype, true, false);
    element.dispatchEvent(evObj);
}

global['simulateEvent'] = simulateEvent;

require('./react-test-es5.js');
