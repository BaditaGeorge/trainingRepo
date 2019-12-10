function Clock(){
    let page_body = document.getElementsByTagName('body')[0];
    page_body.style.width = window.innerWidth + 'px';
    page_body.style.height = window.innerHeight + 'px';
    let middle,secundar,minutar,orar;
    let hands = {
        small:0,
        medium:0,
        long:0
    };
    function create_Shape(){
        let shape = document.createElement('div');
        shape.style.width='750px';
        shape.style.height = '750px';
        shape.style.borderRadius = '50%';
        shape.style.border = '2px solid black';
        page_body.appendChild(shape);
        return shape;
    }
    function draw_arrows(clock_shape){
        let middle = document.createElement('div');
        middle.style.width = '50px';
        middle.style.height = '50px';
        middle.style.borderRadius = '50%';
        middle.style.border = '2px solid black';
        middle.style.position = 'absolute';
        clock_shape.append(middle);
        let val = parseInt(clock_shape.style.width.slice(0,clock_shape.style.width.indexOf('p')));
        middle.style.top = (val/2 - 15) + 'px';
        middle.style.left = (val/2) + 'px';
        middle.style.backgroundColor = 'black';
        let secundar = document.createElement('div');
        secundar.style.width = '6px';
        secundar.style.height = (val/2 + 5) + 'px';
        secundar.style.position = 'absolute';
        secundar.style.backgroundColor = 'black';
        secundar.style.top = (val/2 - 370) + 'px';
        secundar.style.left = (val/2 + 15) + 'px';
        clock_shape.append(secundar);
        let minutar = document.createElement('div');
        minutar.style.width = '8px';
        minutar.style.height = (val/2 - 20) + 'px';
        minutar.style.position = 'absolute';
        minutar.style.backgroundColor = 'black';
        minutar.style.top = (val/2 - 350) + 'px';
        minutar.style.left = (val/2 + 15) + 'px';
        clock_shape.append(minutar);
        let orar = document.createElement('div');
        orar.style.width = '10px';
        orar.style.height = (val/2 - 40) + 'px';
        orar.style.position = 'absolute';
        orar.style.backgroundColor = 'black';
        orar.style.top = (val/2 - 315) + 'px';
        orar.style.left = (val/2 + 5) + 'px';
        clock_shape.append(orar);
        return [middle,secundar,minutar,orar];
    }
    document.addEventListener('click',(e)=>{
        console.log(e.clientX,e.clientY);
    });
    function draw_numbers(clock_shape){
        let r = parseInt(clock_shape.style.width.slice(0,clock_shape.style.width.indexOf('p')));
        r = r/2;
        r -= 20;
        let degr = 270;
        for(let i = 0 ; i < 12 ; i++){
            let x = r * Math.cos((degr*(Math.PI/180)));
            let y = r * Math.sin((degr*(Math.PI/180)));
            let el = document.createElement('div');
            clock_shape.append(el);
            el.style.width = '50px';
            el.style.height = '50px';
            el.style.position = 'absolute';
            el.style.borderRadius = '50%';
            if(i==0){
                el.innerHTML = (12).toString();
            }
            else{
                el.innerHTML = (i).toString();
            }
            el.style.fontSize = '40px';
            el.style.top = (r + y + 14) + 'px';
            el.style.left = (r + x + 14) + 'px';
            degr += 30;
        }
    }
    this.execute = function(){
        let clock_shape = create_Shape();
        [middle,secundar,minutar,orar] = draw_arrows(clock_shape);
        //secundar.style.webkitTransform = 'rotate(30deg)';
        draw_numbers(clock_shape);
    }
    this.moveSecundar = function(){
        // if(hands.long === 60){
        //     hands.long = 0;
        // }
        hands.long += 6;
        hands.medium += 0.1;
        hands.short += (360/(3600 * 12));
        secundar.style.transformOrigin = '6px 380px';
        secundar.style.transform = 'rotate(' + hands.long +'deg)';
        minutar.style.transformOrigin = '8px 355px';
        minutar.style.transform = 'rotate(' + hands.medium + 'deg)';
        orar.style.transformOrigin = '10px 335px';
        orar.style.transform = 'rotate(' + hands.short + 'deg)';
    };
    this.initialize = function(seconds,minutes,hours){
        hands.long = seconds * 6;
        hands.medium = (0.1 * ((minutes*60 + seconds)));
        hands.short = ((360/(3600*12))*(hours*3600 + minutes*60 + seconds));
        secundar.style.transformOrigin = '6px 380px';
        secundar.style.transform = 'rotate(' + seconds * 6 + 'deg)';
        minutar.style.transformOrigin = '8px 355px';
        minutar.style.transform = 'rotate(' + (0.1 * ((minutes*60 + seconds))) + 'deg)';
        orar.style.transformOrigin = '10px 335px';
        orar.style.transform = 'rotate(' + ((360/(3600*12)) * (hours*3600 + minutes*60 + seconds)) + 'deg)';
    }
}
let date = new Date();
let clock_object = new Clock();
clock_object.execute();
clock_object.initialize(date.getSeconds(),date.getMinutes(),date.getHours());
function recCall(){
    setTimeout(function(){
        clock_object.moveSecundar();
        recCall();
    },1000);
}
recCall();