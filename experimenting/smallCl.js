class Animal{
    constructor(name){
        this.name = name;
    }

    myName(){
        console.log(this.name);
    }

    speak(){
        console.log("Basic Animal Sound!");
    }
}

class Rabbit extends Animal{
    myName(){
        console.log('Bunny ' + this.name);
        this.v = 10;
    }

    speak(){
        console.log('bun');
    }
}
r = new Rabbit('Bun');
r.myName();
console.log(r.v);
// a = new Animal('And');
// a.speak();
// a.myName();

// r = new Rabbit('Bun');
// r.speak();
// r.myName();

// function Animal2(){
//     this.speak = function(){
//         console.log('Basic Animal Sound2!');
//     }
// }

// function Rabbit2(){
//     this.speak = function(){
//         console.log('overwritten!');
//     }
// }
// Rabbit2.prototype = new Animal2();
// new Rabbit2().speak();