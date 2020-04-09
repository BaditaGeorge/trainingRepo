function EventTarget() {

}

EventTarget.prototype = {

    constructor: EventTarget,

    addListener: function(type, listener) {
        if (!this.hasOwnProperty('_listeners')) {
            this._listeners = [];
        }

        if (typeof this._listeners[type] === 'undefined') {
            this._listeners[type] = [];
        }

        this._listeners[type].push(listener);
    },

    fire: function(event) {
        if (event.target === undefined && event.type === undefined) {
            return;
        }

        if (!event.target) {
            event.target = this;
        }

        if (!event.type) {
            throw new Error("Event object missing 'type' property");
        }

        if (this._listeners && this._listeners[event.type] instanceof Array) {
            let listeners = this._listeners[event.type];
            for (let i = 0, len = listeners.length; i < len; i++) {
                listeners[i].call(event.target, event.data);
            }
        }
    },

    removeListener: function(type, listener) {
        if (this._listeners && this._listeners[type] instanceof Array) {
            let listeners = this._listeners[type];
            for (let i = 0, len = listeners.length; i < len; i++) {
                if (listener[i] === listener) {
                    listeners.splice(i, 1);
                    break;
                }
            }
        }
    }

}