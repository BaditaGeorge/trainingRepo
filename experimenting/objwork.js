let o1 = {v:15,l:'ana',
    myName:function(){
        console.log(this.l);
    }
};
let b = Object.create(o1);
b.l = 'maria';
console.log(o1);
console.log(b.l);
b.myName();