// `npm run build` to browserify this file

// polyfills for IE9-10
require('../node_modules/webcomponents.js/src/WeakMap/WeakMap');
require('../node_modules/webcomponents.js/src/MutationObserver/MutationObserver');

require('./DOMElementWatcher');
