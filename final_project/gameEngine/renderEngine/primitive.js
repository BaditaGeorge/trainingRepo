"use strict";
exports.__esModule = true;
var Primitive = /** @class */ (function () {
    function Primitive(type, element) {
        this.type = type;
        this.element = element;
    }
    Primitive.prototype.getGraphicElement = function () {
        return this.element;
    };
    Primitive.prototype.setColor = function (color) {
        //here will change color of the SVG element
    };
    return Primitive;
}());
exports.Primitive = Primitive;
