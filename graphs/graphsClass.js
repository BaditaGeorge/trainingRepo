class Graphs{
    constructor(){
        this.data = [];
        this.colors = [];
    }

    draw(){
        throw "Draw function not overwritten!";
    }

    setConfiguration(config){
        throw "setConfiguration not overwritten!";
    }

    loadData(object){
        let cols = ['blue','red','purple','green','cyan','orange','yellow','violet','black','grey','coral','aquamarine','chartreuse','darkblue','indigo','mistyrose'];
        let keys = object['data'].length;
        this.data = object['data'];
        for(let i=0;i<keys;i++){
            this.colors.push(cols[i]);
        }
    }
}

let testObj = {data:[{label:'Paramount',percent:10},{label:'Universal',percent:25},{label:'Disney',percent:45},{label:'Fox',percent:10},{label:'WB',percent:5},{label:'A24',percent:5}]};
// let a = new Graphs();
// a.loadData({data:[{label:'Paramount',percent:10},{label:'Universal',percent:25},{label:'Disney',percent:45},{label:'Fox',percent:10},{label:'WB',percent:5},{label:'A24',percent:5}]});

// Pie Chart
class PieChart extends Graphs{
    
    constructor(){
        super();
        this.elements = [];
    }

    draw(){
        //adjust ul este un numar cu care adun valoare in radieni a unghiului(angleInDegrees), pentru a putea sa mut spre stanga cu cat e este nevoie portiunea de cerc desenata
        if(this.cX === undefined || this.cY === undefined || this.r === undefined){
            throw "Can't draw chart with undefined value!";
        }
        let centerX = this.cX;
        let centerY = this.cY;
        let radius = this.r;
        let colors = {'red':0,'blue':0,'purple':0,'black':0,'cyan':0};
        function polarToCartesian(centerX,centerY,radius,angleInDegrees,adjust){
            let angleInRadians = (angleInDegrees + adjust) * Math.PI / 180.0;
            return {
                x: centerX + (radius * Math.cos(angleInRadians)),
                y: centerY + (radius * Math.sin(angleInRadians))
            };
        }
        let i = 0;
        function createLabel(mij,percent){
            let txt = document.createElementNS('http://www.w3.org/2000/svg','text');
            let mijX = (centerX + mij.x)/2;
            let mijY = (centerY + mij.y)/2;
            txt.setAttribute('x',mijX);
            txt.setAttribute('y',mijY);
            txt.setAttribute('fill','black');
            txt.textContent = percent+'%';
            return txt;
        }
    
        let superThis = this;
        function eventOver(e){
            // console.log(superThis.elements[0]);
            for(let el of superThis.elements){
                if(el[0] === e.target){
                    superThis.element = el;
                    document.body.addEventListener('mousemove',eventMove);
                    el[0].addEventListener('mouseleave',eventLeave);
                    superThis.originalX = el[1].getAttribute('x');
                    superThis.originalY = el[1].getAttribute('y');
                    // console.log(el[1].getAttribute('x'),el[1].getAttribute('y'),e.clientX,e.clientY);
                    break;
                }
            }
        }
    
        function eventMove(e){
            // console.log(this.isOver);
            // console.log('move');
            superThis.element[1].setAttribute('x',e.clientX+10);
            superThis.element[1].setAttribute('y',e.clientY);
        }
    
        function eventLeave(e){
            // console.log(superThis.element);
            superThis.element[0].removeEventListener('mouseleave',eventLeave);
            superThis.element[1].setAttribute('x',superThis.originalX);
            superThis.element[1].setAttribute('y',superThis.originalY);
            superThis.originalX = undefined;
            superThis.originalY = undefined;
            superThis.element = undefined;
            document.body.removeEventListener('mousemove',eventMove);
            // this.isOver = false;
            // console.log(this.isOver);
        }
    
        //asta este echivalentul ca si grade a 1% pe grafic
        let smallestPerc = 3.599;
        let svgBox = document.createElementNS('http://www.w3.org/2000/svg','svg');
        svgBox.setAttribute('width',radius*2);
        svgBox.setAttribute('height',radius*2);
        let initialAdjust = 0;
        for(let i=0;i<this.data.length;i++){
            let pth = document.createElementNS('http://www.w3.org/2000/svg','path');
            let end = polarToCartesian(centerX,centerY,radius,0,initialAdjust);
            let start = polarToCartesian(centerX,centerY,radius,this.data[i].percent*smallestPerc,initialAdjust);
            let mij = polarToCartesian(centerX,centerY,radius,(this.data[i].percent*smallestPerc)/2,initialAdjust);
            initialAdjust += this.data[i].percent*smallestPerc;
            let arcSweep = (this.data[i].percent*smallestPerc - 0 <= 180) ? "0" : "1"; 
            let arcPth = [
                "M",start.x,start.y,
                "A",radius,radius,0,arcSweep,0,end.x,end.y,
                "L",centerX,centerY,
                "L",start.x,start.y,
            ].join(" ");
            pth.setAttribute("d",arcPth);
            pth.setAttribute("fill",this.colors[i]);
            let label = createLabel(mij,this.data[i].percent)
            this.elements.push([pth,label]);
            svgBox.appendChild(pth);
            svgBox.appendChild(label);
        }
        document.body.addEventListener('mouseover',eventOver);
        return svgBox;
    }

    setConfiguration(config){
        this.cX = config['cX'];
        this.cY = config['cY'];
        this.r = config['r'];
    }
}

//Nail Chart
class NailChart extends Graphs{

    constructor(){
        super();
    }

    draw(){
        if(this.orientation === undefined || this.w === undefined || this.h === undefined){
            throw "Can't draw with undefined values!";
        }
        let orientation = this.orientation;
        let w = this.w;
        let h = this.h;
        let svgBox = document.createElementNS('http://www.w3.org/2000/svg','svg');
        function producePath(percent,lastPosition){
            if(orientation === 'horizontal'){
                return [
                    "M",lastPosition,0,
                    "L",lastPosition + (percent*(w/100)),0,
                    "L",lastPosition + (percent*(w/100)),h,
                    "L",lastPosition,h,
                ].join(" ");
            }else{
                return [
                    "M",0,lastPosition,
                    "L",0,lastPosition + (percent*(h/100)),
                    "L",w,lastPosition + (percent*(h/100)),
                    "L",w,lastPosition,
                ].join(" ");
            }
        }
        
        function createLabel(percent,lastPosition){
            let txt = document.createElementNS('http://www.w3.org/2000/svg','text');
            let mijX;
            let mijY;
            let marginPadd = 10;
            if(orientation === 'horizontal'){
                mijX = (lastPosition*2 - percent*(w/100))/2;
                mijX -= marginPadd;
                mijY = (0+h)/2;
            }else{
                mijX = (0+w)/2;
                mijY = (lastPosition*2 - percent*(h/100))/2;
                mijY += marginPadd;
            }
            txt.setAttribute('x',mijX);
            txt.setAttribute('y',mijY);
            txt.textContent = percent + '%';
            return txt;
        }
    
        //marginea primului bloc din diagrama de tip cui
        let initialPosition = 0;
        
        svgBox.setAttribute("width",w);
        svgBox.setAttribute("height",h);
    
        for(let i=0;i<this.data.length;i++){
            let pth = document.createElementNS('http://www.w3.org/2000/svg','path');
            pth.setAttribute('d',producePath(this.data[i].percent,initialPosition));
            pth.setAttribute('fill',this.colors[i]);
            svgBox.appendChild(pth);
            if(orientation === 'horizontal'){
                initialPosition += this.data[i].percent*(w/100);
            }else{
                initialPosition += this.data[i].percent*(h/100);
            }
            svgBox.appendChild(createLabel(this.data[i].percent,initialPosition));
        }
        return svgBox;
    }

    setConfiguration(config){
        this.orientation = config['orientation'];
        this.w = config['w'];
        this.h = config['h'];
    }
}

//Legend, also somekind of chart or diagram
class Legend extends Graphs{

    constructor(){
        super();
    }

    setConfiguration(obj){
        console.log('It is not necessarly to offer a config object for Legend!');
    }

    draw(){
        let svgBox = document.createElementNS('http://www.w3.org/2000/svg','svg');
        svgBox.setAttribute('width',400);
        svgBox.setAttribute('height',1200);
        //rectangle fixed dimension
        let length = 20;
        let width = 12;
        let padding = 4; //distanta dintre dreptunghiuri
        function createRectangle(lastPosition){
            return [
                "M",0,lastPosition,
                "L",length,lastPosition,
                "L",length,lastPosition + width,
                "L",0,lastPosition + width,
                "L",0,lastPosition,
            ].join(" ");
        }
        let initialPosition = 0;
        for(let i=0;i<this.data.length;i++){
            let svgPth = document.createElementNS('http://www.w3.org/2000/svg','path');
            let svgTxt = document.createElementNS('http://www.w3.org/2000/svg','text');
            console.log(createRectangle(initialPosition));
            svgPth.setAttribute('d',createRectangle(initialPosition));
            svgPth.setAttribute('fill',this.colors[i]);
            initialPosition += (width + padding);
            svgTxt.setAttribute('x',length + padding);
            svgTxt.setAttribute('y',initialPosition - padding);
            svgTxt.textContent = this.data[i].label;
            svgBox.appendChild(svgPth);
            svgBox.appendChild(svgTxt);
        }
        return svgBox;
    }

}
// Legend.prototype = new Graphs();



//Donut Chart
class DonutChart extends Graphs{
    constructor(){
        super();
        this.elements = [];
    }

    setConfiguration(config){
        this.cX = config['cX'];
        this.cY = config['cY'];
        this.r = config['r'];
        this.hr = config['holeRadius'];
        if(this.hr >= this.r){
            throw "Hole radius cannot be bigger than chart radius!";
        }
    }

    draw(){
        //adjust ul este un numar cu care adun valoare in radieni a unghiului(angleInDegrees), pentru a putea sa mut spre stanga cu cat e este nevoie portiunea de cerc desenata
        if(this.cX === undefined || this.cY === undefined || this.r === undefined || this.hr === undefined){
            throw "Can't draw with undefined value!";
        }
        let centerX = this.cX;
        let centerY = this.cY;
        let radius = this.r;
        let holeRadius = this.hr;
        
        function polarToCartesian(centerX,centerY,radius,angleInDegrees,adjust){
            let angleInRadians = (angleInDegrees + adjust) * Math.PI / 180.0;
            return {
                x: centerX + (radius * Math.cos(angleInRadians)),
                y: centerY + (radius * Math.sin(angleInRadians))
            };
        }
    
        let superThis = this;
        function eventOver(e){
            for(let el of superThis.elements){
                if(e.target === el[0]){
                    superThis.txt = document.createElementNS('http://www.w3.org/2000/svg','text');
                    let textToAdd = el[1].label + ' ' + el[1].percent + '%';
                    superThis.txt.setAttribute('x',superThis.cX - textToAdd.length*3);
                    superThis.txt.setAttribute('y',superThis.cY);
                    superThis.txt.textContent = textToAdd;
                    superThis.txt.setAttribute('font-size',20);
                    superThis.innerCircle.appendChild(superThis.txt);
                    superThis.element = el[0];
                    superThis.element.addEventListener('mouseleave',eventLeave);
                    break;
                }
            }
        }
    
        function eventLeave(e){
            superThis.innerCircle.removeChild(superThis.txt);
            superThis.txt = undefined;
            superThis.element.removeEventListener('mouseleave',eventLeave);
            superThis.element = undefined;
        }
    
        // function createInnerCircle(centerX,centerY,radius){
        //     let st = polarToCartesian(centerX,centerY,radius,359.9,0);
        //     let end = polarToCartesian(centerX,centerY,radius,0,0);
        //     let svgPth = document.createElementNS('http://www.w3.org/2000/svg','path');
        //     let d = [
        //         "M",st.x,st.y,
        //         "A",radius,radius,0,1,0,end.x,end.y,
        //         "L",centerX,centerY,
        //         "L",st.x,st.y,
        //     ].join(" ");
        //     svgPth.setAttribute('d',d);
        //     svgPth.setAttribute('fill','white');
        //     return svgPth;
        // }
        //asta este echivalentul ca si grade a 1% pe grafic
        let smallestPerc = 3.599;
        let svgBox = document.createElementNS('http://www.w3.org/2000/svg','svg');
        svgBox.setAttribute('width',radius*2);
        svgBox.setAttribute('height',radius*2);
        let initialAdjust = 0;
    
        for(let i=0;i<this.data.length;i++){
            let pth = document.createElementNS('http://www.w3.org/2000/svg','path');
            let end = polarToCartesian(centerX,centerY,radius,0,initialAdjust);
            let start = polarToCartesian(centerX,centerY,radius,this.data[i].percent*smallestPerc,initialAdjust);
            let midEnd = polarToCartesian(centerX,centerY,holeRadius,0,initialAdjust);
            let midStart = polarToCartesian(centerX,centerY,holeRadius,this.data[i].percent*smallestPerc,initialAdjust);
            initialAdjust += this.data[i].percent*smallestPerc;
            let arcSweep = (this.data[i].percent*smallestPerc - 0 <= 180) ? "0" : "1"; 
            let arcPth = [
                "M",start.x,start.y,
                "A",radius,radius,0,arcSweep,0,end.x,end.y,
                "L",midEnd.x,midEnd.y,
                "A",holeRadius,holeRadius,0,arcSweep,1,midStart.x,midStart.y,
                "L",start.x,start.y,
            ].join(" ");
            pth.setAttribute("d",arcPth);
            pth.setAttribute("fill",this.colors[i]);
            this.elements.push([pth,this.data[i],this.colors[i]]);
            svgBox.appendChild(pth);
        }
        // let hole = document.createElementNS('http://www.w3.org/2000/svg','path');
        // this.innerCircle = createInnerCircle(centerX,centerY,holeRadius);
        // svgBox.appendChild(this.innerCircle);
        document.body.addEventListener('mouseover',eventOver);
        this.innerCircle = svgBox;
        return svgBox;
    } 

}


class GraphFactory{
    constructor(type){
        if(type === 'PieChart'){
            return new PieChart();
        }else if(type === 'DonutChart'){
            return new DonutChart();
        }else if(type === 'NailChart'){
            return new NailChart();
        }else if(type === 'Legend'){
            return new Legend();
        }else{
            return undefined;
        }
    }
}
let el;
//DONUT
// el = new DonutChart();
// el.loadData(testObj);
// el.setConfiguration({cX:200,cY:200,r:200});
// document.body.appendChild(el.draw());


//PIE
el = new GraphFactory('DonutChart');
el.loadData(testObj);
el.setConfiguration({cX:200,cY:200,r:200,holeRadius:150});
// el.setConfiguration({orientation:'horizontal',h:100,w:500});
// el.setConfiguration({cX:200,cY:200,r:200});
document.body.appendChild(el.draw());

//NAIL
// el = new NailChart();
// el.loadData(testObj);
// document.body.appendChild(el.draw('vertical',400,100));

//LEGEND
// el = new Legend();
// el.loadData(testObj);
// document.body.appendChild(el.draw());
