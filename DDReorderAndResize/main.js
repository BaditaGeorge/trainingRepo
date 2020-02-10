let a = new SVGShape();
a.draw({startX:0,startY:0,endX:100,endY:100,color:'red'});
let svgBox = document.createElementNS('http://www.w3.org/2000/svg','svg');
svgBox.setAttribute('width',1600);
svgBox.setAttribute('height',1600);
// a.resize({startX:20,startY:20,endX:170,endY:120});
document.body.appendChild(svgBox);
let lst = new ListView(svgBox);
lst.addElement(a);
a = new SVGShape();
a.draw({startX:0,startY:110,endX:100,endY:210,color:'red'});
lst.addElement(a);
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