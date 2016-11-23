# DOMElementWatcher

Watches for DOM elements, invoking a callback as and when they are added to the DOM. 
Uses a [MutationObserver](https://developer.mozilla.org/en/docs/Web/API/MutationObserver) to listen for new elements.
Polyfilled version available for IE9-10.

## Installation

```
npm install dom-element-watcher --save
```

Then add a reference to one of:

```
./node_modules/dom-element-watcher/DOMElementWatcher.js             # native (~4KB)
./node_modules/dom-element-watcher/DOMElementWatcher.min.js         # native, minified (<1KB)
./node_modules/dom-element-watcher/DOMElementWatcher.IE9-10.js      # polyfilled for old IE (~24KB)
./node_modules/dom-element-watcher/DOMElementWatcher.IE9-10.min.js  # polyfilled for old IE, minified (~7KB)
```

eg:

```
<script src="./node_modules/dom-element-watcher/DOMElementWatcher.min.js></script>
```

## Example usage

```
// create the watcher
var elementWatcher = new DOMElementWatcher();

// start listening for mutations
elementWatcher.startWatching();

// for all DIV elements, either existing now or added in the future, set their background color to red
elementWatcher.when('div', -1, function (element) {
    element.style.background = 'red';
});

// then perhaps later...
elementWatcher.stopListening()

```

## API

### `.when(selector, index, callback)`

Observes elements matching the selector with the given index. Executes the callback once for each element.
If a matching element is already present in the DOM, the callback will be executed immediately.

`selector`: A CSS selector against which to match elements.
`index`: In the case where multiple elements are matched by the selector, this restricts the match to this array index. Pass in `-1` to match all elements.
`callback`: The function to call when a matched element is added to the DOM. The callback is passed the matched element as its only argument.

### `.startWatching()`

Starts watching for DOM Mutations. 

### `.stopWatching()`

Stops watching for DOM Mutations.

## Development

```
git clone https://github.com/mikechamberlain/dom-element-watcher.git
cd dom-element-watcher
npm install
npm run build
```

Outputs built versions to `/dist`.