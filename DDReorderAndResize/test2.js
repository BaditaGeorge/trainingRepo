function mixin(receiver, supplier) {
    for (var property in supplier) {
        if (supplier.hasOwnProperty(property)) {
            receiver[property] = supplier[property]
        }
    }

    return receiver;
}

function EventTarget(){

}

EventTarget.prototype = {

    constructor:EventTarget,

    addListener:function(type,listener){
        if(!this.hasOwnProperty('_listeners')){
            this._listeners = [];
        }

        if(typeof this._listeners[type] === 'undefined'){
            this._listeners[type] = [];
        }

        this._listeners[type].push(listener);
    },


    fire:function(event){
        if(!event.target){
            event.target = this;
        }

        if(!event.type){
            throw new Error('Event object missing "type" property');
        }

        if(this._listeners && this._listeners[event.type] instanceof Array){
            let listeners = this._listeners[event.type];
            for(let i=0,len=listeners.length;i<len;i++){
                listeners[i].call(this,event);
            }
        }
    },

    removeListener:function(type,listener){
        if(this._listeners && this._listeners[type] instanceof Array){
            let listeners = this._listeners[type];
            for(let i=0,len=listeners.length;i<len;i++){
                if(listeners[i] === listener){
                    listener.splice(i,1);
                    break;
                }
            }
        }
    }

}

function Base(){
    
}

Base.prototype = {
    sing:function(){
        console.log('Singing a BEAUTIFUL song!');
    }
}

function NoBase(){

}

console.log(Base.prototype);
mixin(NoBase.prototype,Base.prototype);

et = new EventTarget();

let a = new NoBase();
a.sing();