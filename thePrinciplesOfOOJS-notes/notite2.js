let basicPerson = {
    name:'basicName',
    speak:function(){
        console.log('Hello friend!');
    },
    changeName:function(name){
        this.name = name
    },
    introduce:function(){
        console.log('Hello ,my name is ' + this.name);
    }
}
let p1 = Object.create(basicPerson,{
    name:{
        configurable:true,
        enumerable:true,
        writable:true,
        value:'Virgil'
    }
});
p1.introduce();
p1.changeName('Ionut');
p1.introduce();

console.log(basicPerson.isPrototypeOf(p1));