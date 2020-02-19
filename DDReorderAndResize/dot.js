function DotShape() {

}

mixin(DotShape.prototype, SVGShape.prototype);
mixin(DotShape.prototype, Resizable.prototype);
// mixout(DotShape.prototype, Draggable.prototype);
//direction va putea fi x,y,d
//dotManager-ul va seta valoarea acestui atribut, si pe baza lui, vom valida in move daca se poate sau nu face miscarea in directia respectiva
DotShape.prototype.direction = undefined;
DotShape.prototype.resize = undefined;
DotShape.prototype.size = 15; //fixed value for dot
DotShape.prototype.moveAtDrag = function (posObj) {
    if (posObj === undefined) {
        throw new Error("Need a config object for positioning!");
    }

    if (posObj.x === undefined || posObj.y === undefined) {
        throw new Error("can't move to a position with undefined x or y-axis position!");
    }

    if (this.direction === 'x') {
        this.svgPth.setAttribute('transform', 'translate(' + (posObj.x - this.originalX) + ',' + 0 + ')');
        this.startX = posObj.x;
    } else if (this.direction === 'y') {
        this.svgPth.setAttribute('transform', 'translate(' + 0 + ',' + (posObj.y - this.originalY) + ')');
        this.startY = posObj.y;
    } else if (this.direction === 'd') {
        this.svgPth.setAttribute('transform', 'translate(' + (posObj.x - this.originalX) + ',' + (posObj.y - this.originalY) + ')');
        this.startX = posObj.x;
        this.startY = posObj.y;
    }
    // this.startX = posObj.x;
    // this.startY = posObj.y;
}

//obiectul de configurare pentru DotManager va avea urmatoarea forma
// configObj = {number:4(numarul de puncte),data:[{position:'lr',color:'green'},..]}
//data va contine un array cu number obiecte, fiecare descriind cate un punct
//utilizatorul nu trebuie sa calculeze coordonatele punctelor, vom folosi 8 codificari string pentru a sti la ce pozitie se refera
// l - left, r - right, u - up, d - down(vor fi puse pe mijlocul laturilor), ur - up right, ul - up left, dl - down left, dr - down right (vor fi puse pe colturi, denumirea descrie pozitionarea)

function DotManager(configObj) {
    this.dots = [];
    for (let i = 0; i < configObj.number; i++) {
        this.dots.push([configObj.data[i]]);
    }
    this.isCreate = false;
}

// DotManager.prototype.create = function(configObj){
//     this.dots = [];
//     for(let i=0;i<configObj.number;i++){
//         this.dots.push(configObj.data[i]);
//     }
// }

DotManager.prototype.removeElements = function (container) {
    for (let i = 0; i < this.dots.length; i++) {
        if (this.dots[i].length > 1) {
            container.removeChild(this.dots[i][1].svgPth);
            this.dots[i].pop();
        }
    }
}

DotManager.prototype.computePosition = function (stringPos, element) {

    let x = element.startX;
    let y = element.startY;
    let h = element.height;
    let w = element.width;
    let size = 15;

    if (stringPos === 'l') { return [x - size / 2, y + h / 2 - size / 2]; }
    else if (stringPos === 'r') { return [x + w - size / 2, y + h / 2 - size / 2]; }
    else if (stringPos === 'u') { return [x + w / 2 - size / 2, y - size / 2]; }
    else if (stringPos === 'd') { return [x + w / 2 - size / 2, y + h - size / 2]; }
    else if (stringPos === 'ul') { return [x - size / 2, y - size / 2]; }
    else if (stringPos === 'ur') { return [x + w - size / 2, y - size / 2]; }
    else if (stringPos === 'dl') { return [x - size / 2, y + h - size / 2]; }
    else if (stringPos === 'dr') { return [x + w - size / 2, y + h - size / 2]; }
    else { return []; }
}

DotManager.prototype.moveElements = function (element) {
    if (this.dots[0].length > 1) {
        for (let i = 0; i < this.dots.length; i++) {
            this.dots[i][1].move({ x: 0, y: this.computePosition(this.dots[i][0].position, element)[1] });
        }
    }
}

DotManager.prototype.computeOrientation = function (stringPos) {
    if (stringPos === 'l' || stringPos === 'r') {
        return 'x';
    } else if (stringPos === 'u' || stringPos === 'd') {
        return 'y';
    } else {
        return 'd';
    }
}

DotManager.prototype.putOnElement = function (container, element) {

    // function computePosition(stringPos){
    //     if(stringPos === 'l'){ return [x,y+h/2-size/2]; }
    //     else if(stringPos === 'r'){ return [x+w,y+h/2-size/2]; }
    //     else if(stringPos === 'u'){ return [x+w/2-size/2,y]; }
    //     else if(stringPos === 'd'){ return [x+w/2-size/2,y+h]; }
    //     else if(stringPos === 'ul'){ return [x-size/2,y]; }
    //     else if(stringPos === 'ur'){ return [x+w-size/2,y]; }
    //     else if(stringPos === 'dl'){ return [x-size/2,y+h]; }
    //     else if(stringPos === 'dr'){ return [x+w-size/2,y+h]; }
    //     else {return [];}
    // }
    let size = 15;
    this.removeElements(container);

    // if (eventObject === undefined) {
    //     eventObject = {
    //         eventDrag:{},
    //         eventDrop:{}
    //     };
    // }

    for (let i = 0; i < this.dots.length; i++) {
        let newSquare = new DotShape();
        let positions = this.computePosition(this.dots[i][0].position, element);
        newSquare.draw({ startX: positions[0], startY: positions[1], endX: positions[0] + size, endY: positions[1] + size, color: this.dots[i][0].color });
        this.dots[i].push(newSquare);
        this.dots[i][1].direction = this.computeOrientation(this.dots[i][0].position);
        this.dots[i][1].position = this.dots[i][0].position;
        // this.dots[i][1].dragDrop(container, eventObject, false);
        container.appendChild(this.dots[i][1].svgPth);
    }
}
