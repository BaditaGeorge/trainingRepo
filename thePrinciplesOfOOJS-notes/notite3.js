function mixin(receiver,supplier){
    for(var property in supplier){
        if(supplier.hasOwnProperty(property)){
            receiver[property] = supplier[property];
        }
    }

    return receiver;
}

function EventTarget(){

}

EventTarget.prototype = {
    constructor:EventTarget,
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
            var listeners = this._listeners[event.type];
            for(var i=0, len=listeners.length; i < len; i++){
                listeners[i].call(this, event);
            }
        }
    },
    removeListener: function(type,listener){
        if(this._listeners && this._listeners[type] instanceof Array){
            var listeners = this._listeners[type];
            for(var i=0,len=listeners.length;i<len;i++){
                if(listeners[i] === listener){
                    listeners.splice(i,1);
                    break;
                }
            }
        }
    }
};

// let target = new EventTarget();
// target.addListener('message',function(event){
//     console.log('Message is ' + event.data);
// });
// target.fire({
//     type:'message',
//     data:'Hello world!'
// });

function Person(name){
    this.name = name;
}

// Person.prototype = Object.create(EventTarget.prototype);
// Person.prototype.constructor = Person;

// Person.prototype.sayName = function(){
//     console.log(this.name);
//     this.fire({type:'namesaid',name:name});
// }

// let person = new Person('Nicholas');
// console.log(person instanceof Person);
// console.log(person instanceof EventTarget);

mixin(Person.prototype,new EventTarget());
mixin(Person.prototype,{
    constructor:Person,
    sayName:function(){
        console.log(this.name);
        this.fire({type:'namesaid',name:this.name});
    }
});

var person = new Person('Nicholas');

console.log(person instanceof Person);
console.log(person instanceof EventTarget);
person.sayName();