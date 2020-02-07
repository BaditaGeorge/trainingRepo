function base1(){
    this.react = function(){
        console.log('reaction!');
    }
}

function base2(){
    this.react2 = function(){
        console.log('2nd reaction!');
    }
}

function notBase(){

}

notBase.prototype = {
    fst:new base1(),
    snd:new base2()
};

a = new notBase();
a.fst.react();
a.snd.react2();