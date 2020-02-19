// let a = new SVGShape();
// a.draw({startX:10,startY:10,endX:110,endY:100,color:'red'});
let eventTarget = new EventTarget();
a = {startX:10,startY:0,endX:110,endY:100,color:'red'};
let svgBox = document.createElementNS('http://www.w3.org/2000/svg','svg');
svgBox.setAttribute('width',1600);
svgBox.setAttribute('height',1000);
// a.resize({startX:20,startY:20,endX:170,endY:120});
document.body.appendChild(svgBox);
let dotConfig = {number:8,data:[{position:'l',color:'black'},{position:'r',color:'black'},{position:'u',color:'black'},{position:'d',color:'black'},{position:'ul',color:'black'},{position:'ur',color:'black'},{position:'dl',color:'black'},{position:'dr',color:'black'}]};
let lst = new ListView(svgBox,dotConfig);
lst.addElement(a);
a = {startX:10,startY:0,endX:110,endY:100,color:'blue'};
// a.draw({startX:10,startY:120,endX:110,endY:210,color:'red'});
lst.addElement(a);
a = {startX:10,startY:0,endX:110,endY:100,color:'green'};
lst.addElement(a);
a = {startX:10,startY:0,endX:110,endY:100,color:'black'};
lst.addElement(a);
lst.addListeners();
// lst.removeElement(0);
// lst.elements[0].resize({startX:20,startY:20,endX:170,endY:120});



// svgBox.appendChild(a.svgPth);
// a.dragDrop(svgBox);
// svgBox.addEventListener('mousedown',(e)=>{
//     if(e.target === a.svgPth){
//         isOn = true;
//     }
// });
// svgBox.addEventListener('mousemove',(e)=>{
//     if(isOn === true){
//         a.drag(e);
//     }
// });
// svgBox.addEventListener('mouseup',(e)=>{
//     isOn = false;
// });