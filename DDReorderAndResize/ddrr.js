function mixin(receiver, supplier) {
    let keys = Object.keys(supplier);
    for (let i = 0; i < keys.length; i++) {
        receiver[keys[i]] = supplier[keys[i]];
    }
}

function mixout(receiver, supplier) {
    let keys = Object.keys(supplier);
    for (let i = 0; i < keys.length; i++) {
        receiver[keys[i]] = undefined;
    }
}

function Shape() {
}
Shape.prototype = {
    //confDraw este un obiect care tine date despre dimensiunea si culoarea formei
    draw: function (confDraw) {
        throw new Error("Not overwritten!");
    },

    //un obiect cu noile pozitii, toate cele 4 pozitii ale formei
    resize: function (dimObj) {
        throw new Error("Not overwritten resize function!");
    },

    //noua mozitie unde a fost mutat elementul - posObj
    move: function (posObj) {
        throw new Error("Not overwritten move function!");
    }
}

function Draggable() {

}

Draggable.prototype.mouseDown = false;

Draggable.prototype.drag = function (e) {
    if (this.mouseDown === true) {
        // console.log(this.width,this.height);
        let pX = e.clientX - this.width / 2;
        let pY = e.clientY - this.height / 2;
        this.move({ x: pX, y: pY });
    }
}

Draggable.prototype.drop = function (container) {
    this.mouseDown = false;
    // container.removeChild(this.shadow);
    // this.shadow = undefined;
}

Draggable.prototype.dragDrop = function (container,eventTarget) {
    let superThis = this;
    container.addEventListener('mousedown', (e) => {
        if (e.target === superThis.svgPth) {
            superThis.mouseDown = true;
            // this.shadow = this.drawShadow();
            // container.appendChild(this.shadow);
        }
    });

    container.addEventListener('mousemove', (e) => {
        this.drag(e);
    });
    
    container.addEventListener('mouseup', (e) => {
        this.drop(container);
    });
}

function SVGShape() {

}

mixin(SVGShape.prototype, Shape.prototype);

SVGShape.prototype.draw = function (confDraw) {
    if (confDraw === undefined) {
        throw new Error("Need an config object for drawing!");
    }
    if (confDraw.startX === undefined || confDraw.startY === undefined || confDraw.endX === undefined || confDraw.endY === undefined) {
        throw new Error('Cannot draw without positions!');
    }
    if (this.svgPth === undefined) {
        this.svgPth = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    }
    this.startX = confDraw.startX;
    this.startY = confDraw.startY;
    this.originalY = confDraw.startY;
    this.height = Math.abs(confDraw.endY - confDraw.startY);
    this.width = Math.abs(confDraw.endX - confDraw.startX);
    // console.log(this.startX,this.startY,this.height,this.width);
    let arcPth = [
        'M', confDraw.startX, confDraw.startY,
        'L', confDraw.endX, confDraw.startY,
        'L', confDraw.endX, confDraw.endY,
        'L', confDraw.startX, confDraw.endY,
        'L', confDraw.startX, confDraw.startY,
    ].join(" ");
    this.svgPth.setAttribute('d', arcPth);
    if (confDraw.color !== undefined) {
        this.svgPth.setAttribute('fill', confDraw.color);
    }
}

SVGShape.prototype.drawShadow = function () {
    let shadow = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    let arcPth = [
        'M', this.startX, this.startY,
        'L', this.startX + this.width, this.startY,
        'L', this.startX + this.width, this.startY + this.height,
        'L', this.startX, this.startY + this.height,
        'L', this.startX, this.startY,
    ].join(' ');
    shadow.setAttribute('d', arcPth);
    shadow.setAttribute('fill', 'grey');
    return shadow;
}

SVGShape.prototype.resize = function (dimObj) {
    this.draw(dimObj);
}

SVGShape.prototype.move = function (posObj) {
    if (posObj === undefined) {
        throw new Error("Need a config object for positioning!");
    }

    if (posObj.x === undefined || posObj.y === undefined) {
        throw new Error("can't move to a position with undefined x or y-axis position!");
    }

    this.svgPth.setAttribute('transform', 'translate(' + 0 + ',' + (posObj.y - this.originalY) + ')');
    // this.startX = posObj.x;
    this.startY = posObj.y;
}

mixin(SVGShape.prototype, Draggable.prototype);