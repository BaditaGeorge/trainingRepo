function polarToCartesian(centerX, centerY, radius, angleInDegrees){
    let angleInRadians = (angleInDegrees) * Math.PI / 180.0;
    return {
        x:centerX + (radius*Math.cos(angleInRadians)),
        y:centerY + (radius*Math.sin(angleInRadians))
    };
}
function describeArc(x,y,radius,startAngle,endAngle){
    let start = polarToCartesian(x,y,radius,endAngle);
    let end = polarToCartesian(x,y,radius,startAngle);
    let arcSweep = endAngle - startAngle <= 180 ? '0':'1';
    let d = [
        'M', start.x, start.y,
        'A', radius, radius, 0, arcSweep, 0, end.x, end.y,
        'L', x, y,
        'L', start.x, start.y
    ].join(' ');
    return d;
}
let ns = 'http://www.w3.org/2000/svg';
let div = document.getElementById('drawing');
let svg = document.createElementNS(ns,'svg');
let pth = document.createElementNS(ns,'path');
svg.setAttributeNS(null,'width','100%');
svg.setAttributeNS(null,'height','100%');
pth.setAttributeNS(null,'fill','orange');
div.style.width = '1000px';
div.style.height = '1000px';
svg.appendChild(pth);
div.appendChild(svg);
let arc = describeArc(100,100,100,0,270);
pth.setAttribute('d',arc);