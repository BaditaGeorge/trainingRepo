function SVGShape() {

}

mixin(SVGShape.prototype, Shape.prototype);

//funcita care se ocupa cu desenarea elementului pe baza unui obeict ce tine 4 intregi, capetele stanga sus si dreapta jos
SVGShape.prototype.draw = function(confDraw) {
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
    this.originalX = confDraw.startX;
    this.height = Math.abs(confDraw.endY - confDraw.startY);
    this.width = Math.abs(confDraw.endX - confDraw.startX);
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
    this.svgPth.setAttribute('transform', 'translate(0,0)');
    if (this.translated === true) {
        this.translated = undefined;
    }
}

SVGShape.prototype.resize = function(dimObj) {
    this.draw(dimObj);
}


//functia implicita de move a elementului ce face o translatare pe axa Ox
//translatarea se face in fucntie de pozitia curenta a elementului
SVGShape.prototype.move = function(posObj) {
    // return;
    if (posObj === undefined) {
        throw new Error("Need a config object for positioning!");
    }

    if (posObj.x === undefined || posObj.y === undefined) {
        throw new Error("can't move to a position with undefined x or y-axis position!");
    }

    this.svgPth.setAttribute('transform', 'translate(' + 0 + ',' + (posObj.y - this.originalY) + ')');
    this.startY = posObj.y;
}

SVGShape.prototype.moveAtDrag = SVGShape.prototype.move;

mixin(SVGShape.prototype, Draggable.prototype);