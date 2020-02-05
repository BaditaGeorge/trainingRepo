function Graphs(){
    this.sayHi = function(){
        throw "Not overwritten!";
    }
}

// let GraphsCircle = Graphs;
// Graphs.prototype = {
//     sayHi:function(){
//         console.log('Hello');
//     }
// }
Graphs.prototype.sayHi = function(){
    console.log('Hello!');
}

function Graphs2(){

}
Graphs2.prototype = Graphs.prototype;
Graphs2.prototype.sayHi = function(){
    console.log('Hello2!');
}
let a = new Graphs2();
let b = new Graphs();
a.sayHi();
// b.sayHi();