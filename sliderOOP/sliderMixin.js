
function mixin(receiver,supplier){
    for(let property in supplier){
        if(supplier.hasOwnProperty(property)){
            receiver[property] = supplier[property];
        }
    }
    return receiver;
}


function EventManager(){

}

EventManager.prototype = {
    constructor:EventManager,

    functions:{
        addListener:function(type,listener){
            if(!this.hasOwnProperty("_listeners")){
                this._listeners = [];
            }

            if(typeof this._listeners[type] == "undefined"){
                this._listeners[type] = [];
            }

            this._listeners[type].push(listener);
        },

        fire:function(event){

            if(!event.target){
                event.target = this;
            }

            if(!event.type){
                throw new Error("Event object missing 'type' property.");
            }
            
            if(this._listeners && this._listeners[event.type] instanceof Array){
                let listeners = this._listeners[event.type];
                for(let i=0,len=listeners.length;i < len;i++){
                    listeners[i].call(this,event.data);
                }
            }
        },

        removeListener:function(type,listener){
            if(this._listeners && this._listeners[type] instanceof Array){
                let listeners = this._listeners[type];
                for(let i=0,len=listeners.length;i<len;i++){
                    if(listeners[i] === listener){
                        listeners.splice(i,1);
                        break;
                    }
                }
            }
        }
    }
}

function Slider(options){
    
    this.cssClass = options.cssClass
    this.min = options.min;
    this.max = options.max;
    this.width = options.width;

    this.setAttributes = function(){
        let superThis = this;
        let mouseUpFunction = function(){
            this.isDown = false;
        }
        let mouseDownFunction = function(e){
            this.target = e.target;
            if(this.target === this.slider || this.target === this.slidingSquare){
                this.step = ((this.max - this.min))/this.width;
                this.slidingSquare.style.left = e.clientX - (parseInt(this.slidingSquare.style.width)/2) + 'px';
                this.label.innerText = 'Value: ' + parseInt(this.max - (parseInt(this.slider.style.width) - parseInt(this.slidingSquare.style.left))*this.step);
            }
            this.isDown = true;
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
                    let leftFromCorner = parseInt(this.slider.getBoundingClientRect().left);
                    if(parseInt(e.clientX) < parseInt(this.slider.style.width) + 6 && 
                    parseInt(e.clientX) > leftFromCorner - 4){
                        //compute the step, basically, i just divide by width the difference between max and min(values set by the user)
                        this.step = ((this.max - this.min))/this.width;
                        this.slidingSquare.style.left = e.clientX - (parseInt(this.slidingSquare.style.width)/2) + 'px';
                        //compute the value for the label, it's gonna be distance between right end and current position of the sliding square, multiplied with step
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

    this.createElement = function(){
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

    this.modifySlider = function(){
        if (this.slider !== undefined) {
            this.slider.style.width = this.width + 'px';
            this.slidingSquare.style.left = this.width + 'px';
        }
        this.label.innerText = 'Value: ' + this.max;
    }

    this.boundToParent = function(parent){
        if ((parent instanceof HTMLElement) === true) {
            parent.appendChild(this.createElement());
            parent.appendChild(this.label);
        }
    }

    this.setMin = function(min){
        this.min = min;
        this.modifySlider();
    }

    this.setMax = function(max){
        this.max = max;
        this.modifySlider();
    }

    this.setWidth = function(width){
        this.width = width;
        this.modifySlider();
    }

    this.getMin = function() {
        return this.min;
    }

    this.getMax = function() {
        return this.max;
    }

    this.getWidth = function() {
        return this.width;
    }

    this.addEvent = function(parent, type) {
        let callFire = () => {
            this.fire({
                type: type,
                data: this.slider
            });
        };
        parent.addEventListener(type, function () {
            callFire();
        });
    }

    this.setSliderClass = function(className) {
        if(this.cssClass !== undefined){
            this.slider.classList.remove(this.cssClass);
        }
        this.slider.classList.add(className);
        console.log(this.slider);
        this.cssClass = className;
    }

    this.setSliderSquareClass = function(className){
        if(this.squareCssClass !== undefined){
            this.squareCssClass.classList.remove(this.squareCssClass);
        }
        this.slidingSquare.classList.add(className);
    }
}


Slider.prototype = {};
Slider.prototype = mixin(Slider.prototype,new EventManager().functions);

let cnt = document.getElementById('cont');
let a = new Slider({min:1000,max:1000,width:1000});
a.boundToParent(cnt);
a.setWidth(500);
a.setMax(2000);
a.addListener('click',function(slider){
    console.log(slider.style.width);
});
a.addEvent(cnt,'click');
// a.setSliderClass('slider');
// a.setSliderSquareClass('square');
// a.fire({type:'ms',data:'Data'});
// a.speak();

