class EventManager {
    constructor() {
    }

    addListener(type, listener) {
        if (!this.hasOwnProperty("_listeners")) {
            this._listeners = [];
        }

        if (typeof this._listeners[type] === "undefined") {
            this._listeners[type] = [];
        }

        this._listeners[type].push(listener);
    }

    fire(event) {
        if (!event.target) {
            event.target = this;
        }

        if (!event.type) {
            throw new Error("Event object missing 'type' property.");
        }

        if (this._listeners && this._listeners[event.type] instanceof Array) {
            let listeners = this._listeners[event.type];
            for (let i = 0, len = listeners.length; i < len; i++) {
                listeners[i].call(this, event.data);
            }
        }
    }

    removeListener(type, listener) {
        if (this._listeners && this._listeners[type] instanceof Array) {
            let listeners = this._listeners[type];
            for (let i = 0, len = listeners.length; i < len; i++) {
                if (listeners[i] === listener) {
                    listeners.splice(i, 1);
                    break;
                }
            }
        }
    }
}

class Slider extends EventManager {
    constructor(options) {
        super();
        this.cssClass = options.cssClass
        this.min = options.min;
        this.max = options.max;
        this.width = options.width;
    }

    createElement() {
        this.clasList = [];
        this.slider = document.createElement('input');
        this.slider.type = 'range';
        this.modifySlider();
        if(this.cssClass !== undefined){
            this.slider.classList.add(this.cssClass);
        }
        return this.slider;
    }

    modifySlider() {
        if (this.slider !== undefined) {
            this.slider.min = this.min;
            this.slider.max = this.max;
            this.slider.value = this.min;
            this.slider.step = (this.max / this.width);
            this.slider.style.width = this.width + 'px';
        }
    }

    boundToParent(parent) {
        if ((parent instanceof HTMLElement) === true) {
            parent.appendChild(this.createElement());
        }
    }

    setMin(min) {
        this.min = min;
        this.modifySlider();
    }

    setMax(max) {
        this.max = max;
        this.modifySlider();
    }

    setWidth(width) {
        this.width = width;
        this.modifySlider();
    }

    getMin() {
        return this.min;
    }

    getMax() {
        return this.max;
    }

    getWidth() {
        return this.width;
    }

    addEvent(parent, type) {
        let callFire = () => {
            super.fire({
                type: 'mouseup',
                data: this.slider
            });
        };
        parent.addEventListener(type, function () {
            callFire();
        });
    }

    setClass(className) {
        if(this.cssClass !== undefined){
            this.slider.classList.remove(this.cssClass);
        }
        this.slider.classList.add(className);
    }
}
let cnt = document.getElementById('cont');
let sl = new Slider({min:-1000, max:1000, width:100});
sl.boundToParent(cnt);
sl.addListener('mouseup', (slider) => {
    console.log(slider.value);
});
sl.addEvent(cnt, 'mouseup');

sl.setWidth(150);
sl.setClass('slider');
