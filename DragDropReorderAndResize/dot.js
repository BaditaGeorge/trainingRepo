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
DotShape.prototype.thisDotClicked = false;
DotShape.prototype.moveAtDrag = function(posObj) {
    if (posObj === undefined) {
        throw new Error("Need a config object for positioning!");
    }

    if (posObj.x === undefined || posObj.y === undefined) {
        throw new Error("can't move to a position with undefined x or y-axis position!");
    }

    // if (this.direction === 'x') {
    //     this.svgPth.setAttribute('transform', 'translate(' + (posObj.x - this.originalX) + ',' + 0 + ')');
    //     this.startX = posObj.x;
    // } else if (this.direction === 'y') {
    //     this.svgPth.setAttribute('transform', 'translate(' + 0 + ',' + (posObj.y - this.originalY) + ')');
    //     this.startY = posObj.y;
    // } else if (this.direction === 'd') {
    //     this.svgPth.setAttribute('transform', 'translate(' + (posObj.x - this.originalX) + ',' + (posObj.y - this.originalY) + ')');
    //     this.startX = posObj.x;
    //     this.startY = posObj.y;
    // }
    if (this.direction === 'x') {
        this.svgPth.setAttributeNS(null, 'x', posObj.x - this.originalX);
        this.startX = posObj.x;
    } else if (this.direction === 'y') {
        this.svgPth.setAttributeNS(null, 'y', posObj.y - this.originalY);
        this.startY = posObj.y;
    } else if (this.direction === 'd') {
        this.svgPth.setAttributeNS(null, 'x', posObj.x - this.originalX);
        this.svgPth.setAttributeNS(null, 'y', posObj.y - this.originalY);
        this.startX = posObj.x;
        this.startY = posObj.y;
    }
}

DotShape.prototype.drag = function(e, eventObject) {
    if (this.mouseDown === true) {
        eventTarget.fire(eventObject);
        let pX = e.pageX - this.width / 2;
        let pY = e.pageY - this.height / 2;
        this.moveAtDrag({ x: pX, y: pY });
    }
    // console.log('drag');
    // if (this.mouseDown === true) {
    //     eventTarget.fire(eventObject);
    //     // console.log(this.width,this.height);
    //     let pX = e.pageX - this.width / 2;
    //     let pY = e.pageY - this.height / 2;
    //     // console.log('PageY',e.pageY);
    //     this.moveAtDrag({ x: pX, y: pY });
    // }
}

DotShape.prototype.dragDrop = function(container, events, moveAtDrop) {
    let superThis = this;

    // let checkIfDrag = setInterval(() => {

    // }, 500);

    if (moveAtDrop === undefined) {
        this.moveAtDrop = true;
    } else {
        this.moveAtDrop = moveAtDrop;
    }
    if (this.dropY === undefined) {
        this.dropY = this.startY;
    }

    let onMDown = (e) => {
        if (e.target === superThis.svgPth) {
            superThis.mouseDown = true;
        }
    }

    let onMMove = (e) => {
        if (events.eventDrag.data !== undefined) {
            events.eventDrag.data.mouseX = e.pageX;
            events.eventDrag.data.mouseY = e.pageY;
        }

        this.drag(e, events.eventDrag);
    }

    let onMUp = (e) => {
        this.drop(container, events.eventDrop);
    }

    container.addEventListener('mousedown', onMDown);

    container.addEventListener('mousemove', onMMove);

    container.addEventListener('mouseup', onMUp);
}

DotShape.prototype.drop = function(container, eventObject) {
    // console.log('drop');
    if (this.mouseDown === true) {
        this.mouseDown = false;
        if (eventObject !== undefined) {
            eventTarget.fire(eventObject);
        }

        if (this.isDotUp !== undefined && this.border !== undefined) {
            eventTarget.fire({
                type: 'pushAtResize',
                target: this.list,
                data: {
                    border: this.border,
                    up: this.isDotUp
                }
            });
        }

        this.startToDrag = undefined;

        if (this.resizing !== undefined) {
            this.resizing = undefined;
        }

        if (this.moveAtDrop === true && this.isDotUp === undefined) {
            this.moveAtDrag({ x: this.startX, y: this.dropY });
        }

        // this.dropY = this.startY;
    }
}

DotShape.prototype.draw = function(confObj) {
    if (confObj === undefined) {
        throw new Error("Need an config object for drawing!");
    }
    if (confObj.startX === undefined || confObj.startY === undefined || confObj.endX === undefined || confObj.endY === undefined) {
        throw new Error('Cannot draw without positions!');
    }
    if (this.svgPth === undefined) {
        this.svgPth = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    }
    this.startX = confObj.startX;
    this.startY = confObj.startY;
    this.originalY = confObj.startY;
    this.originalX = confObj.startX;
    this.height = Math.abs(confObj.endY - confObj.startY);
    this.width = Math.abs(confObj.endX - confObj.startX);
    this.svgPth = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    this.svgPth.setAttributeNS(null, 'x', confObj.startX);
    this.svgPth.setAttributeNS(null, 'y', confObj.startY);
    this.svgPth.setAttributeNS(null, 'height', '15');
    this.svgPth.setAttributeNS(null, 'width', '15');
    this.svgPth.setAttributeNS(null, 'fill', confObj.color);
    if (this.translated === true) {
        this.translated = undefined;
    }
    // document.getElementById('svgOne').appendChild(rect);
}

DotShape.prototype.moveOut = function(posV) {
    this.svgPth.setAttribute('transform', 'translate(' + posV.x + ',' + posV.y + ')');
}

DotShape.prototype.reposition = function(configObj) {
    // this.svgPth.setAttributeNS(null, 'x', configObj.startX);
    // this.svgPth.setAttribute(null, 'y', configObj.startY);
    // this.svgPth.setAttribute(null, 'y', configObj.startY);

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

//aceasta functie sterge punctele de pe element, se apeleaza in momentul in care este schimbat focusul
//sau in momentul in care dam click in afara oricarui element
DotManager.prototype.removeElements = function(container) {
    for (let i = 0; i < this.dots.length; i++) {
        // if (this.dots[i].length > 1) {
        //     container.removeChild(this.dots[i][1].svgPth);
        //     this.dots[i].pop();
        // }
        if (this.dots[i][1] !== undefined) {
            if (this.dots[i][1].svgPth !== undefined) {
                this.dots[i][1].reposition({ startY: 100 });
            }
        }
    }
    this.elementsOn = undefined;
}

//calculez pozitiile unde se va afla dot-ul pe element, sunt 8 pozitii posibile
//string-urile sunt cele din conditii, fiecare semnifica o pozitie (sus,jos,stanga-sus,dreapta-sus, etc)
DotManager.prototype.computePosition = function(stringPos, element) {

    let x = element.startX;
    let y = element.startY;
    let h = element.height;
    let w = element.width;
    let size = 15;

    if (stringPos === 'l') { return [x - size / 2, y + h / 2 - size / 2]; } else if (stringPos === 'r') { return [x + w - size / 2, y + h / 2 - size / 2]; } else if (stringPos === 'u') { return [x + w / 2 - size / 2, y - size / 2]; } else if (stringPos === 'd') { return [x + w / 2 - size / 2, y + h - size / 2]; } else if (stringPos === 'ul') { return [x - size / 2, y - size / 2]; } else if (stringPos === 'ur') { return [x + w - size / 2, y - size / 2]; } else if (stringPos === 'dl') { return [x - size / 2, y + h - size / 2]; } else if (stringPos === 'dr') { return [x + w - size / 2, y + h - size / 2]; } else { return []; }
}

//functia ce modifica pozitia tuturor punctelor
//folosesc aceeasi functie move din elementul normal pentru a muta si punctele
//punctele se translateaza odata cu elementul pentru ca altfel ar ramane in aer
DotManager.prototype.moveElements = function(element) {
    if (this.dots[0].length > 1) {
        for (let i = 0; i < this.dots.length; i++) {
            this.dots[i][1].move({ x: 0, y: this.computePosition(this.dots[i][0].position, element)[1] });
        }
    }
}

//pentru a determina mai clar directia (x,y,d) -> care din cele 2 axe sau diagonala
DotManager.prototype.computeOrientation = function(stringPos) {
    if (stringPos === 'l' || stringPos === 'r') {
        return 'x';
    } else if (stringPos === 'u' || stringPos === 'd') {
        return 'y';
    } else {
        return 'd';
    }
}

//functia ce pune punctele pe un element, functie ce actioneaza la click
//adica in momentul in care utilizatorul a facut click pe un anumit element
DotManager.prototype.putOnElement = function(container, element) {
    let size = 15;
    this.elementsOn = true;
    console.log('apelata');
    for (let i = 0; i < this.dots.length; i++) {
        let positions = this.computePosition(this.dots[i][0].position, element);
        console.log(this.dots[i][1]);
        if (this.dots[i][1] !== undefined) {
            console.log('repozitionare');
            return;
            this.dots[i][1].reposition({ startX: positions[0], startY: positions[1], endX: positions[0] + size, endY: positions[1] + size, color: this.dots[i][0].color });
            this.dots[i][1].direction = this.computeOrientation(this.dots[i][0].position);
        } else {
            console.log('desenare');
            let newSquare = new DotShape();
            newSquare.draw({ startX: positions[0], startY: positions[1], endX: positions[0] + size, endY: positions[1] + size, color: this.dots[i][0].color });
            this.dots[i].push(newSquare);
            this.dots[i][1].direction = this.computeOrientation(this.dots[i][0].position);
            this.dots[i][1].position = this.dots[i][0].position;
            container.appendChild(this.dots[i][1].svgPth);
        }
    }
}