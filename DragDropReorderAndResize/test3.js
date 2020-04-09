let a = document.createElementNS('http://www.w3.org/2000/svg','path');
d = [
    'M',10,10,
    'L',100,10,
    'L',100,110,
    'L',10,110,
    'L',10,10
].join(' ');
let svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
svg.setAttribute('width',1000);
svg.setAttribute('height',1000);
a.setAttribute('d',d);
a.setAttribute('fill','blue');
// a.setAttribute('viewbox','-250 -250 500 750');
document.body.appendChild(svg);
svg.appendChild(a);
console.log(a);