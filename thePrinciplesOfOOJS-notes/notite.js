//vizualizam prototype-ul unui empty object
function f1(){
    let obj = {a:()=>{console.log('salut!');}};
    let prot = Object.getPrototypeOf(obj);
    console.log(prot);
    console.log(prot === Object.prototype);
}

//un pic de joaca cu Prototype, pntru a intelege mai bine ce face, si ce nu face

function Person(){
}
Person.prototype.getName = function(){
    return this.name;
};
Person.prototype.setName = function(name){
    this.name = name;
}
Person.prototype.shared = [];
let p1 = new Person();
p1.setName('Joe');
let p2 = new Person();
p2.setName('Flavius');
console.log(p1.getName());
console.log(p2.getName());
p1.shared.push('bani');
p2.shared.push('acte');
p1.shared.push('filme');
console.log(p1.shared);
console.log(p2.shared);