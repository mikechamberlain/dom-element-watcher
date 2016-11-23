# DOMElementWatcher

A super simple library that watches for changes to the DOM. Give it a CSS selector, and it will call you back whenever a matching element
becomes available in the DOM. 
Uses a [MutationObserver](https://developer.mozilla.org/en/docs/Web/API/MutationObserver) to watch for new elements. 

Tested in Chrome, Firefox, Safari, Edge and IE 9-11.

IE 9 and 10 require polyfills for `WeakMap` and `MutationObserver` (pre-built versions below).

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
<script src="./node_modules/dom-element-watcher/DOMElementWatcher.min.js"></script>
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

Observes elements matching the selector with the given index. Executes the callback once for each element.
If a matching element is already present in the DOM, the callback will be executed against it immediately.

- `selector`: A CSS selector against which to match elements.
- `index`: In the case where multiple elements are matched by the selector, this restricts the match to this array index. Pass in `-1` to match all elements.
- `callback`: The function to call when a matched element is added to the DOM. The callback is passed the matched 
[HTMLElement](https://developer.mozilla.org/en/docs/Web/API/HTMLElement) as its only argument.

### `.startWatching()`

Starts watching for DOM Mutations. 

### `.stopWatching()`

Stops watching for DOM Mutations.

## Development

```bash
git clone https://github.com/mikechamberlain/dom-element-watcher.git
cd dom-element-watcher
npm install
```

To rebuild:

```bash
npm run build
```
