# DOMElementWatcher

A super simple library that watches for changes to the DOM. Give it one or more CSS selectors, and it will call you back whenever a matching element becomes available.

Uses a [MutationObserver](https://developer.mozilla.org/en/docs/Web/API/MutationObserver) to watch for new elements. 

Tested in Chrome, Firefox, Safari, Edge and IE 9-11.

IE 9 and 10 require polyfills for `WeakMap` and `MutationObserver` (pre-built versions included - see below).

## Installation

```bash
npm install dom-element-watcher --save
```

Then add a reference to one of:

```bash
./node_modules/dom-element-watcher/dist/DOMElementWatcher.js             # native (~4KB)
./node_modules/dom-element-watcher/dist/DOMElementWatcher.min.js         # native, minified (<1KB)
./node_modules/dom-element-watcher/dist/DOMElementWatcher.IE9-10.js      # polyfilled for old IE (~24KB)
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

// start watcing for mutations
elementWatcher.startWatching();

// for all DIV elements with class="my-class", either existing now or added to the DOM in the future, 
// set their background color to red
elementWatcher.when('div.my-class', -1, function (element) {
    element.style.background = 'red';
});

// then perhaps later...
elementWatcher.stopWatching()

```

## API

### `.when(selector, index, callback)`

Adds the selector to the watchlist,. Once `startWatching()` is called, the callback will be executed a maximum of once on each matched
element.  If a matching element is already present in the DOM, the callback will be executed immediately.

- `selector`: A CSS selector against which to match elements.
- `index`: In the case where multiple elements are matched by the selector, this restricts the match to this array index. Pass in `-1` to match all elements.
- `callback`: The function to call when an element is matched. It is passed the matched 
[HTMLElement](https://developer.mozilla.org/en/docs/Web/API/HTMLElement) as its argument.

### `.startWatching()`

Starts watching the DOM and executing callbacks.

### `.stopWatching()`

Stops watching the DOM and excuting callbacks.

## Development

```bash
git clone https://github.com/mikechamberlain/dom-element-watcher.git
cd dom-element-watcher
npm install
npm run build
```
