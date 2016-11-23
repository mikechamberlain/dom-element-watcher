(function (window) {
    /**
     * Watches for DOM elements, invoking a callback if and when they become available.
     */
    window.DOMElementWatcher = function () {
        var MODIFIED_KEY = '__DOMElementWatcherModified__';
        var observed = [];
        var observer;
        var watching = false;
        var initialRun = true;

        /**
         * Starts watching for elements.
         */
        function startWatching() {
            if (watching) {
                return;
            }
            
            watching = true;
            observer = observer || new MutationObserver(tryInvokeAll);
            observer.observe(window.document.documentElement, {
                childList: true,
                subtree: true
            });

            if (initialRun) {
                initialRun = false;
                tryInvokeAll();
            }
        }
        this.startWatching = startWatching;

        /**
         * Stops watching for elements.
         */
        function stopWatching() {
            observer && observer.disconnect();
            watching = false;
        }
        this.stopWatching = stopWatching;

        /**
         * Invokes the callback on all elements matching the selector, either now or if they become available in the future.
         * @selector {string} The CSS selector
         * @index {number} The zero-based index of the selector results against which to invoke the callback, or -1 for all
         * selected elements.
         * @callback {Function} The callback to execute if and when the element becomes available. The callback will be executed
         * only once for each element per selector per callback.
         */
        this.when = function (selector, index, callback) {
            // store to check against future DOM mutations
            observed.push({
                selector: selector,
                index: index,
                callback: callback
            });

            if (watching) {
                // invoke callback for elements currently in the DOM
                tryInvokeNow(selector, index, callback);
            }
        };

        /**
         * Called upon any DOM mutation.  Iterates through our watched selectors and tries to invoke the callback.
         */
        function tryInvokeAll() {
            // check the DOM for elements matching a stored selector
            observed.forEach(function (listener) {
                tryInvokeNow(listener.selector, listener.index, listener.callback);
            });
        }

        /**
         * Queries the DOM for given selector / index and invokes the callback if it has not been invoked before for this
         * element.
         * @param {string} selector
         * @param {number} index
         * @param {Function} callback
         */
        function tryInvokeNow(selector, index, callback) {
            var wasWatching = watching;
            if (wasWatching) {
                // make sure we do not later observe any mutations as a result of our own changes
                stopWatching();
            }

            var elements = window.document.querySelectorAll(selector);
            for (var i = 0; i < elements.length; i++) {
                var element = elements[i];
                // make sure we are matching against the right index
                if (index >= 0 && index !== i) {
                    continue;
                }
                // make sure we invoke the callback on this element only once per selector per callback
                if (element[MODIFIED_KEY] && element[MODIFIED_KEY][selector] && element[MODIFIED_KEY][selector][callback]) {
                    continue;
                }
                element[MODIFIED_KEY] = element[MODIFIED_KEY] || {};
                element[MODIFIED_KEY][selector] = element[MODIFIED_KEY][selector] || {};
                element[MODIFIED_KEY][selector][callback] = element[MODIFIED_KEY][selector][callback] || true;
                callback(element);
            }

            if (wasWatching) {
                startWatching();
            }
        }
    };
})(window);
