"use strict";
var Primitive = /** @class */ (function() {
    function Primitive(type, element) {
        this.listeners = {};
        this.type = type;
        this.element = element;
        this.positionX = 0;
        this.positionY = 0;
        this.previewsKey = undefined;
    }

    Primitive.prototype.getGraphicElement = function() {
        return this.element;
    };

    Primitive.prototype.rotate = function(angle) {
        this.element.setAttribute('transform', 'rotate(' + angle + ')');
    }

    Primitive.prototype.setColor = function(color) {
        //here will change color of the SVG element
        this.element.setAttribute('style', 'fill:' + color);
    };

    Primitive.prototype.alterPosition = function(direction) {
        if (direction === 'r') {
            this.positionX += 4;
        } else if (direction === 'l') {
            this.positionX -= 4;
        } else if (direction === 'u') {
            this.positionY -= 4;
        } else if (direction === 'd') {
            this.positionY += 4;
        }
    }

    Primitive.prototype.moveTo = function(key, direction) {
        if (this.listeners[key] === undefined) {
            this.listeners[key] = [];
        }

        let listenerFunction = (e) => {
            if (e.key === key || e.keyCode === key) {
                this.alterPosition(direction);
                this.element.setAttribute('transform', 'translate(' + this.positionX + ',' + this.positionY + ')');
            }
        };

        // document.body.addEventListener('keydown', listenerFunction);

        this.listeners[key].push([listenerFunction, 'keydown']);
    }

    Primitive.prototype.getListeners = function() {
        return this.listeners;
    }

    return Primitive;
}());

export { Primitive };