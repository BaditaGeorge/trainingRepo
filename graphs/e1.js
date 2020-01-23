let ns = 'http://www.w3.org/2000/svg';
let div = document.getElementById('drawing');
console.log(div);
let svg = document.createElementNS(ns,'svg');
svg.setAttributeNS(null,'width','100%');
svg.setAttribute(null,'height','100%');
div.appendChild(svg);
let rect = document.createElementNS(ns,'rect');
rect.setAttributeNS(null,'width','100');
rect.setAttributeNS(null,'height','100');
rect.setAttributeNS(null,'fill','red');
svg.appendChild(rect);