const { JSDOM } = require('jsdom');
const localStorage = require('localStorage');

const jsdom = new JSDOM('<!doctype html><html><body></body></html>', {
	url: "http://localhost/"
});
const { window } = jsdom;

function copyProps (src, target) {
	const props = Object.getOwnPropertyNames(src)
		.filter(prop => typeof target[prop] === 'undefined')
		.reduce((result, prop) => ({
			...result,
			[prop]: Object.getOwnPropertyDescriptor(src, prop),
		}), {});
	Object.defineProperties(target, props);
}

global.window = window;
global.document = window.document;
global.localStorage = localStorage;
global.navigator = {
	userAgent: 'node.js',
};
copyProps(window, global);
