"use strict";
//add-on -> pentru proiect emberJS ca EmberWelcomePage
//incep cu configurarea ember-ului peste typescript
exports.__esModule = true;
//this is the main class that will be used to draw any basic shape
var primitive_js_1 = require("./primitive.js");
var Painter = /** @class */ (function() {
    function Painter() {}
    //base shapes like circle,square,rectangle,polygon,ellipse
    Painter.prototype.drawShape = function(type, confObj, color) {
        var shape = document.createElementNS('http://www.w3.org/2000/svg', type);
        if (type === 'circle') {
            shape.setAttributeNS(null, 'cx', confObj.cx);
            shape.setAttributeNS(null, 'cy', confObj.cy);
            shape.setAttributeNS(null, 'r', confObj.r);
            if (color === undefined) {
                shape.setAttributeNS(null, 'style', 'fill:black');
            } else {
                shape.setAttributeNS(null, 'style', 'fill:' + color);
            }
        } else if (type === 'square') {} else if (type === 'rectangle') {} else if (type === 'ellipse') {} else if (type === 'triangle') {} else if (type === 'polygon') {}
        return new primitive_js_1.Primitive(type, shape);
    };
    return Painter;
}());