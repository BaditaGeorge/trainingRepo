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

    setAttributes(){
        let superThis = this;
        let targ;
        let isdown = false;
        let mouseUpFunction = function(){
            this.isDown = false;
        }
        let mouseDownFunction = function(e){
            this.target = e.target;
            if(this.target === this.slider || this.target === this.slidingSquare){
                this.slidingSquare.style.left = e.clientX - (parseInt(this.slidingSquare.style.width)/2) + 'px';
            }
            this.isDown = true;
            console.log(this.isDown);
        }
        this.label = document.createElement('p');
        this.label.innerText = 'Value: ' + this.max;
        if(this.mouseMoveFunction !== undefined){
            let tempFunction = this.mouseDownFunction;
            document.removeEventListener('mousemove',function(e){
                tempFunction(e);
            });
        }
        let mouseMoveFunction = function(e){
            if(this.isDown === true){
                if(this.target === this.slider || this.target === this.slidingSquare){
                    if(parseInt(this.slidingSquare.style.left) < parseInt(this.slider.style.width) + (parseInt(this.slidingSquare.style.width)/2) &&
                    parseInt(this.slidingSquare.style.left) > parseInt((this.slidingSquare.style.width))){
                        this.step = (this.max - this.min)/this.width;
                        this.slidingSquare.style.left = e.clientX - (parseInt(this.slidingSquare.style.width)/2) + 'px';
                        this.label.innerText = 'Value: ' + parseInt(this.max - (parseInt(this.slider.style.width) - parseInt(this.slidingSquare.style.left))*this.step);
                    }
                }
            }
        }
        document.addEventListener('mouseup',function(e){
            mouseUpFunction.call(superThis);
        });
        document.addEventListener('mousedown',function(e){
            mouseDownFunction.call(superThis,e);
        });
        document.addEventListener('mousemove',function(e){
            mouseMoveFunction.call(superThis,e);
        });
    }

    createElement() {
        this.clasList = [];
        this.slider = document.createElement('div');
        this.slider.style.width = this.width + 'px';
        this.slider.style.height = '20px';
        this.slider.style.backgroundColor = 'black';
        this.slidingSquare = document.createElement('div');
        this.slidingSquare.style.width = '10px';
        this.slidingSquare.style.height = '20px';
        this.slidingSquare.style.backgroundColor = 'green';
        this.slidingSquare.style.position = 'absolute';
        this.slidingSquare.style.left = this.width + 'px';
        this.setAttributes();
        this.slider.appendChild(this.slidingSquare);
        this.slider.style.display = 'inline-block';
        this.label.style.marginLeft = '10px';
        this.label.style.display = 'inline';
        return this.slider;
    }

    modifySlider() {
        if (this.slider !== undefined) {
            this.slider.style.width = this.width + 'px';
            this.slidingSquare.style.left = this.width + 'px';
        }
        this.label.innerText = 'Value: ' + this.max;
    }

    boundToParent(parent) {
        if ((parent instanceof HTMLElement) === true) {
            parent.appendChild(this.createElement());
            parent.appendChild(this.label);
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
        console.log(this.slider);
        this.cssClass = className;
    }
}
let cnt = document.getElementById('cont');
let sl = new Slider({min:-1000, max:2000, width:1000});
sl.boundToParent(cnt);
//sl.setClass('slider');
sl.addListener('mouseup', (slider) => {
    console.log(slider.style.width);
});
sl.addEvent(cnt, 'mouseup');

sl.setMin(0);
sl.setMax(3000);
sl.setWidth(500);
//sl.setClass('slider');