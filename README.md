# DOMElementWatcher

Watches for DOM elements, invoking a callback as and when they are added to the DOM. 
Uses a [MutationObserver](https://developer.mozilla.org/en/docs/Web/API/MutationObserver) to listen for new elements.
Polyfilled version available for IE9-10.

## Example usage

```
// create the watcher
var elementWatcher = new DOMElementWatcher();
elementWatcher.startWatching();

// for all DIV elements, either existing now or added in the future, set their background color to red
elementWatcher.when('div', -1, function (element) {
    element.style.background = 'red';
});

```