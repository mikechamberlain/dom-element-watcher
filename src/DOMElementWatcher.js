(function (window) {
    /**
     * Watches for DOM elements, invoking a callback if and when they become available.
     */
    window.DOMElementWatcher = function () {
        var CALLBACK_KEY = '__DOMElementWatcherCallbackID__';
        var MODIFIED_KEY = '__DOMElementWatcherModified__';
        var callbackId = 0;
        var observed = [];
        var observer = new MutationObserver(tryInvokeAll);
        var watching = true;
        var paused = false;

        start();

        function start() {
            if (watching) {
                return;
            }
            watching = true;
            observer.observe(window.document.documentElement, {
                childList: true,
                subtree: true
            });
        }

        function stop() {
            observer.disconnect();
            watching = false;
        }

        function warnIfStopped() {
            if (!watching) {
                console.warn('Attempt to call against a permanently stopped DOMElementWatcher.');
                return true;
            }
            return false;
        }

        function when(selector, index, callback) {
            if (warnIfStopped()) {
                return;
            }

            // tag the callback if we haven't seen it before
            callback[CALLBACK_KEY] = callback[CALLBACK_KEY] || callbackId++;

            // store to check against future DOM mutations
            observed.push({
                selector: selector,
                index: index,
                callback: callback
            });

            // invoke callback for elements currently in the DOM
            tryInvokeNow(selector, index, callback);
        }

        function tryInvokeAll() {
            // check the DOM for elements matching a stored selector
            observed.forEach(function (listener) {
                tryInvokeNow(listener.selector, listener.index, listener.callback);
            });
        }

        function tryInvokeNow(selector, index, callback) {
            // ensure we don't end up reacting to our own changes
            stop();

            var elements = window.document.querySelectorAll(selector);
            for (var i = 0; i < elements.length; i++) {
                var element = elements[i];
                // make sure we are matching against the right index
                if (index >= 0 && index !== i) {
                    continue;
                }

                // make sure we invoke the callback on this element only once per selector per callback
                var callbackId = callback[CALLBACK_KEY];
                if (element[MODIFIED_KEY] && element[MODIFIED_KEY][selector] && element[MODIFIED_KEY][selector][callbackId]) {
                    continue;
                }
                element[MODIFIED_KEY] = element[MODIFIED_KEY] || {};
                element[MODIFIED_KEY][selector] = element[MODIFIED_KEY][selector] || {};
                element[MODIFIED_KEY][selector][callbackId] = true;

                if (paused) {
                    continue;
                }
                callback(element);
            }

            start();
        }

        /**
         * Permanently stops watching for changes.
         */
        this.stop = stop;

        /**
         * Temporarily stops watching for changes.
         */
        this.pause = function() {
            if (warnIfStopped()) {
                return;
            }
            paused = true;
        };

        /**
         * Resumes watching for changes.
         */
        this.resume = function() {
            if (warnIfStopped()) {
                return;
            }
            paused = false;
        };

        /**
         * Invokes the callback on all elements matching the selector, either now or if they become available in the future.
         * @selector {string} The CSS selector.
         * @index {number} The zero-based index of the selector results against which to invoke the callback, or -1 for all
         * selected elements.
         * @callback {Function} The callback to execute if and when the element becomes available. The callback will be executed
         * only once for each element per selector per callback.
         */
        this.when = when;
    };
})(window);
