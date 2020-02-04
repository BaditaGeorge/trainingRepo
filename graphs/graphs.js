function Graphs(){
    this.data = [];
    this.colors = [];

    this.draw = function(){
        throw "Draw function not overwritten!";
    }

    this.loadData = function(object){
        let cols = ['blue','red','purple','green','cyan','orange','yellow','violet','black','grey','coral','aquamarine','chartreuse','darkblue','indigo','mistyrose'];
        let keys = object['data'].length;
        this.data = object['data'];
        for(let i=0;i<keys;i++){
            this.colors.push(cols[i]);
        }
    }
}

let a = new Graphs();
a.loadData({data:[{label:'Paramount',percent:10},{label:'Universal',percent:25},{label:'Disney',percent:45},{label:'Fox',percent:10},{label:'WB',percent:5},{label:'A24',percent:5}]});

// Pie Chart
function PieChart(){

}
PieChart.prototype = a;
drawCircle = function(centerX,centerY,radius){
    //adjust ul este un numar cu care adun valoare in radieni a unghiului(angleInDegrees), pentru a putea sa mut spre stanga cu cat e este nevoie portiunea de cerc desenata
    let colors = {'red':0,'blue':0,'purple':0,'black':0,'cyan':0};
    function polarToCartesian(centerX,centerY,radius,angleInDegrees,adjust){
        let angleInRadians = (angleInDegrees + adjust) * Math.PI / 180.0;
        return {
            x: centerX + (radius * Math.cos(angleInRadians)),
            y: centerY + (radius * Math.sin(angleInRadians))
        };
    }
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
        svgBox.appendChild(pth);
        svgBox.appendChild(createLabel(mij,this.data[i].percent));
    }
    return svgBox;
}
PieChart.prototype.draw = drawCircle;
// console.log(a.colors);
// console.log(a.data);
// let el = new PieChart();
// console.log(el.colors);
// console.log(el.data);
// document.body.appendChild(el.draw(200,200,200));

//Nail Chart
function NailChart(){

}
NailChart.prototype = a;
NailChart.prototype.draw = function(orientation,w,h){
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
let el = new NailChart();
// console.log(el.data);
// console.log(el.colors);
// console.log(el.draw('vertical',100,200));
// document.body.appendChild(el.draw('horizontal',600,100));
document.body.appendChild(el.draw('vertical',100,500));
//Legend, also somekind of chart or diagram
function Legend(){

}
Legend.prototype = a;
Legend.prototype.draw = function(){

}

//Donut Chart
function DonutChart(){

}
DonutChart.prototype = a;
DonutChart.prototype.draw = function(centerX,centerY,radius){
    //adjust ul este un numar cu care adun valoare in radieni a unghiului(angleInDegrees), pentru a putea sa mut spre stanga cu cat e este nevoie portiunea de cerc desenata
    let colors = {'red':0,'blue':0,'purple':0,'black':0,'cyan':0};
    function polarToCartesian(centerX,centerY,radius,angleInDegrees,adjust){
        let angleInRadians = (angleInDegrees + adjust) * Math.PI / 180.0;
        return {
            x: centerX + (radius * Math.cos(angleInRadians)),
            y: centerY + (radius * Math.sin(angleInRadians))
        };
    }
    // function doHole(){
    //     let end = polarToCartesian(centerX,centerY,radius/1.2,0,0);
    //     let start = polarToCartesian(centerX,centerY,radius/1.2,359.9,0);
    //     return [
    //         "M",start.x,start.y,
    //         "A",radius/1.2,radius/1.2,0,"1",0,end.x,end.y,
    //         "L",centerX,centerY,
    //         "L",start.x,start.y,
    //     ].join(" ");
    // }
    //asta este echivalentul ca si grade a 1% pe grafic
    let smallestPerc = 3.599;
    let svgBox = document.createElementNS('http://www.w3.org/2000/svg','svg');
    svgBox.setAttribute('width',radius*2);
    svgBox.setAttribute('height',radius*2);
    let initialAdjust = 0;
    // console.log(this.data);
    for(let i=0;i<this.data.length;i++){
        let pth = document.createElementNS('http://www.w3.org/2000/svg','path');
        // console.log(this.data[i].percent,this.data[i].percent*smallestPerc);
        let end = polarToCartesian(centerX,centerY,radius,0,initialAdjust);
        let start = polarToCartesian(centerX,centerY,radius,this.data[i].percent*smallestPerc,initialAdjust);
        initialAdjust += this.data[i].percent*smallestPerc;
        let arcSweep = (this.data[i].percent*smallestPerc - 0 <= 180) ? "0" : "1"; 
        let arcPth = [
            "M",start.x,start.y,
            "A",radius,radius,0,arcSweep,0,end.x,end.y,
            "L",end.x,end.y,
            "L",centerX,centerY,
            // "M",centerX-50,centerY+100,
            // "L",centerX-30,centerY+100,
            // "M",start.x,start.y,
        ].join(" ");
        pth.setAttribute("d",arcPth);
        pth.setAttribute("fill",this.colors[i]);
        // pth.setAttribute("text","text");
        svgBox.appendChild(pth);
    }
    let hole = document.createElementNS('http://www.w3.org/2000/svg','path');
    // hole.setAttribute('d',doHole());
    // hole.setAttribute('fill','white');
    // svgBox.appendChild(hole);
    // console.log(doHole());
    return svgBox;
} 

// let el = new DonutChart();
// console.log(el.colors);
// console.log(el.data);
// document.body.appendChild(el.draw(200,200,200));
