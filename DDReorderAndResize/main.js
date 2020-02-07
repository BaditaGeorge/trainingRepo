let a = new SVGShape();
a.draw({startX:0,startY:0,endX:100,endY:100,color:'red'});
let svgBox = document.createElementNS('http://www.w3.org/2000/svg','svg');
svgBox.setAttribute('width',1600);
svgBox.setAttribute('height',1600);
document.body.appendChild(svgBox);
svgBox.appendChild(a.svgPth);
a.resize({startX:0,startY:0,endX:200,endY:200});
// a.move({x:0,y:0});
let isOn = false;
a.dragDrop(svgBox);
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