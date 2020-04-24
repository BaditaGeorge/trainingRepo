"use strict";
//this is the main class that will be used to draw any basic shape
import { Primitive } from './primitive.js';
var Painter = /** @class */ (function() {
    function Painter() {}
    //base shapes like circle,square,rectangle,polygon,ellipse
    Painter.prototype.drawShape = function(type, confObj, color) {
        var shape = document.createElementNS('http://www.w3.org/2000/svg', type);
        if (type === 'circle') {
            shape.setAttributeNS(null, 'cx', confObj.cx);
            shape.setAttributeNS(null, 'cy', confObj.cy);
            shape.setAttributeNS(null, 'r', confObj.r);
        } else if (type === 'rect') {
            shape.setAttributeNS(null, 'x', confObj.x);
            shape.setAttributeNS(null, 'y', confObj.y);
            shape.setAttributeNS(null, 'width', confObj.w);
            shape.setAttributeNS(null, 'height', confObj.h);
            if (confObj.rx !== undefined) {
                shape.setAttributeNS(null, 'rx', confObj.rx);
            }
            if (confObj.ry !== undefined) {
                shape.setAttributeNS(null, 'ry', confObj.ry);
            }
        } else if (type === 'ellipse') {
            shape.setAttributeNS(null, 'cx', confObj.cx);
            shape.setAttributeNS(null, 'cy', confObj.cy);
            shape.setAttributeNS(null, 'rx', confObj.rx);
            shape.setAttributeNS(null, 'ry', confObj.ry);
        } else if (type === 'polygon') {
            shape = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            let points = [];
            points.push('M');
            points.push(confObj.points[0]);
            points.push(confObj.points[1]);
            for (let i = 2; i < confObj.points.length; i += 2) {
                points.push('L');
                points.push(confObj.points[i]);
                points.push(confObj.points[i + 1]);
            }
            shape.setAttribute('d', points.join(' '));
        }

        if (color === undefined) {
            shape.setAttributeNS(null, 'style', 'fill:black');
        } else {
            shape.setAttributeNS(null, 'style', 'fill:' + color);
        }

        return new Primitive(type, shape);
    };

    return Painter;
}());

let pnt = new Painter();
let svgBox = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
svgBox.setAttributeNS(null, 'width', 250);
svgBox.setAttributeNS(null, 'height', 250);
document.body.appendChild(svgBox);
// svgBox.appendChild(pnt.drawShape('circle', { cx: 50, cy: 50, r: 30 }).getGraphicElement());
// svgBox.appendChild(pnt.drawShape('rect', { x: 10, y: 10, w: 150, h: 100 }).getGraphicElement());
// svgBox.appendChild(pnt.drawShape('ellipse', { cx: 50, cy: 50, rx: 30, ry: 45 }).getGraphicElement());
// svgBox.appendChild(pnt.drawShape('polygon', { points: [150, 0, 75, 200, 225, 200] }).getGraphicElement());
let a = pnt.drawShape('polygon', { points: [150, 0, 75, 200, 225, 200] });
a.rotate(15);
// a.setColor('red');
svgBox.appendChild(a.getGraphicElement());
// a.getGraphicElement().setAttribute('transform', 'translate(100,0)');
// a.getGraphicElement().setAttribute('transform', 'translate(0,0)');
// a.moveTo('ArrowRight', 'right');
a.moveTo('ArrowRight', 'r');
a.moveTo('ArrowLeft', 'l');
a.moveTo('ArrowUp', 'u');
a.moveTo('ArrowDown', 'd');
console.log(a.getListeners()['ArrowRight']);
document.body.addEventListener(a.getListeners()['ArrowRight'][0][1], a.getListeners()['ArrowRight'][0][0]);