# DOMElementWatcher

A tiny and super simple library that watches for changes to the DOM. Give it one or more CSS selectors, and it will call you back with matching elements as and when they become available.

Tested in Chrome, Firefox, Safari, Edge and IE 9-11.

IE 9 and 10 require [polyfills for WeakMap](https://github.com/webcomponents/webcomponentsjs/blob/master/src/WeakMap/WeakMap.js)
and [MutationObserver](https://github.com/webcomponents/webcomponentsjs/blob/master/src/MutationObserver/MutationObserver.js) (pre-built versions included - see below).

## Installation

```bash
npm install dom-element-watcher --save
```

Then add a reference to one of:

```bash
./node_modules/dom-element-watcher/dist/DOMElementWatcher.js             # native (~4KB)
./node_modules/dom-element-watcher/dist/DOMElementWatcher.min.js         # native, minified (<1KB)
./node_modules/dom-element-watcher/dist/DOMElementWatcher.IE9-10.js      # polyfilled for old IE (~25KB)
./node_modules/dom-element-watcher/dist/DOMElementWatcher.IE9-10.min.js  # polyfilled for old IE, minified (~7KB)
```

eg:

```html
<script src="./node_modules/dom-element-watcher/dist/DOMElementWatcher.min.js"></script>
```

## Usage

```javascript
// create the watcher
var elementWatcher = new DOMElementWatcher();

// for all DIV elements with class="my-class", either existing now or added to the DOM in the future, 
// set their background color to red
elementWatcher.when('div.my-class', -1, function (element) {
    element.style.background = 'red';
});

// temporarily pause watching...
elementWatcher.pause();

// ... and resume once more
elementWatcher.resume();

// then perhaps later, stop watching permanently.
elementWatcher.stop()
```

## API

### `.when(selector, index, callback)`

Adds the selector to the list of watched changes. If a matching element is already present in the DOM, the callback will be executed immediately.
The callback will be executed a maximum of once on each matched element.  

- `selector`: A CSS selector against which to match elements. Selectors can be arbitrarily complex (whatever is supported by the browser's native `querySelectorAll()`).
- `index`: In the case where multiple elements are matched by the selector, this restricts the match to this array index. Pass in `-1` to match all elements.
- `callback`: The function to call when an element is matched. It is passed the matched 
[HTMLElement](https://developer.mozilla.org/en/docs/Web/API/HTMLElement) as its argument.

### `.pause()`

Temporarily stop watching for changes. Callbacks will not be executed.

### `.resume()`

Resumes watching for changes. Callbacks will be executed once more.

### `.stop()`

Permanently stops watching for changes and disconnects the MutationObserver. Watcher cannot be used after calling this method.

## Live demo

```bash
npm install
npm run build
```

Then open `demo.html`.

## Development

```bash
git clone https://github.com/mikechamberlain/dom-element-watcher.git
cd dom-element-watcher
npm install
npm run build
```

## See also

The [mutation-summary](https://github.com/rafaelw/mutation-summary) might also be of interest.  It's much bigger but has lots more features, and gives you a full breakdown of exactly how the DOM changed.
