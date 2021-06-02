const readline = require('readline');

module.exports = class {
    constructor () {
        this.listeners = [];
        this.unblockedListeners = [];
        this.cleanupHandlers = [];
        this.blocked = false;

        process.stdin.on("keypress", (str, key) => {
            if (key.sequence === '\u0003') {
                this.cleanupHandlers.forEach(h => h());
                process.exit();
            }

            this.unblockedListeners.forEach(l => l(key));
            if (this.blocked) return;
            this.listeners.forEach(l => l(key));
        });
    }

    bind (listener) {
        this.listeners.push(listener);
    }

    bindCleanup (handler) {
        this.cleanupHandlers.push(handler);
    }

    init () {
        readline.emitKeypressEvents(process.stdin);
        if (process.stdin.isTTY) process.stdin.setRawMode(true);
    }

    block () {
        this.blocked = true;
    }

    unblock () {
        this.blocked = false;
    }

    bindUnblocked (fn) {
        this.unblockedListeners.push(fn);
    }
}
