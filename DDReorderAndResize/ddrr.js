function mixin(receiver,supplier){
    let keys = Object.keys(supplier);
    for(let i=0;i<keys.length;i++){
        receiver[keys[i]] = supplier[keys[i]];
    }
}

function mixout(receiver,supplier){
    let keys = Object.keys(supplier);
    for(let i=0;i<keys.length;i++){
        receiver[keys[i]] = undefined;
    }
}

function Shape(){
}
Shape.prototype = {
    //confDraw este un obiect care tine date despre dimensiunea si culoarea formei
    draw:function(confDraw){
        throw new Error("Not overwritten!");
    },

    //un obiect cu noile pozitii, toate cele 4 pozitii ale formei
    resize:function(dimObj){
        throw new Error("Not overwritten resize function!");
    },

    //noua mozitie unde a fost mutat elementul - posObj
    move:function(posObj){
        throw new Error("Not overwritten move function!");
    }
}

function Draggable(){

}

Draggable.prototype.mouseDown = false;

Draggable.prototype.drag = function(e){
    if(this.mouseDown === true){
        let pX = e.clientX - this.width/2;
        let pY = e.clientY - this.height/2;
        this.move({x:pX,y:pY});
    }
}

Draggable.prototype.drop = function(){
    this.mouseDown = false;
}

Draggable.prototype.dragDrop = function(container){
    let superThis = this;
    container.addEventListener('mousedown',(e)=>{
        if(e.target === superThis.svgPth){
            superThis.mouseDown = true;
        }
    });
    container.addEventListener('mousemove',(e)=>{
        this.drag(e);
    });
    container.addEventListener('mouseup',(e)=>{
        this.drop();
    });
}

function SVGShape(){

}

mixin(SVGShape.prototype,Shape.prototype);

SVGShape.prototype.draw = function(confDraw){
    if(confDraw === undefined){
        throw new Error("Need an config object for drawing!");
    }
    if(confDraw.startX === undefined || confDraw.startY === undefined || confDraw.endX === undefined || confDraw.endY === undefined){
        throw new Error('Cannot draw without positions!');
    }
    if(this.svgPth === undefined){
        this.svgPth = document.createElementNS('http://www.w3.org/2000/svg','path');
    }
    this.startX = confDraw.startX;
    this.startY = confDraw.startY;
    this.height = confDraw.endY - confDraw.startY;
    this.width = confDraw.endX - confDraw.startX;
    let arcPth = [
        'M',confDraw.startX,confDraw.startY,
        'L',confDraw.endX,confDraw.startY,
        'L',confDraw.endX,confDraw.endY,
        'L',confDraw.startX,confDraw.endY,
        'L',confDraw.startX,confDraw.startY,
    ].join(" ");
    this.svgPth.setAttribute('d',arcPth);
    if(confDraw.color !== undefined){
        this.svgPth.setAttribute('fill',confDraw.color);
    }
}

SVGShape.prototype.resize = function(dimObj){
    this.draw(dimObj);
}

SVGShape.prototype.move = function(posObj){
    if(posObj === undefined){
        throw new Error("Need a config object for positioning!");
    }

    if(posObj.x === undefined || posObj.y === undefined){
        throw new Error("can't move to a position with undefined x or y-axis position!");
    }

    this.svgPth.setAttribute('transform','translate(' + this.startX + ',' + posObj.y + ')');
    // this.startX = posObj.x;
    this.startY = posObj.y;
}

mixin(SVGShape.prototype,Draggable.prototype);