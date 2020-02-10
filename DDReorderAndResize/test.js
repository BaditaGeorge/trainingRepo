// function base1(){
    
// }
// base1.prototype.react = function(){
//     console.log('reaction!');
// }

// function base2(){
    
// }

// base2.prototype['react'] = base1.prototype.react;
// base1.prototype.react = function(){
//     console.log('that a boy!');
// }
// new base2().react();

function change(a,x){
    for(let i=0;i<a.length;i++){
        // if(a[i].el%2 === 0){
        //     a[i].el = a[i].el*2;
        // }
        a.pop();
    }
    x = 15;
    console.log(a);
}

let a = [];

for(let i=0;i<5;i++){
    let obj = {};
    obj.el = i;
    a.push(obj);
}
let x = 10;
change(a,x);
console.log(a,x);