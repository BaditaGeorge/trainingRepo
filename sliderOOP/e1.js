class Person{
    constructor(name){
        this.name = name;
        this.val = 10;
    }

    do(ob){
        let sup = this;
        document.addEventListener('click',function(e){
            ob.call(sup);
        });
    }

    speak(){
        console.log(this.name);
    }
}

let a = new Person('Catalin');
a.speak();
let f = function(){
    console.log(this.name);
    console.log(this.val);
}
a.do(f);