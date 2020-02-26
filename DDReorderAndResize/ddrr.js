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

Draggable.prototype.drag = function (e, eventObject) {
    if (this.mouseDown === true) {
        eventTarget.fire(eventObject);
        // console.log(this.width,this.height);
        let pX = e.pageX - this.width / 2;
        let pY = e.pageY - this.height / 2;
        // console.log('PageY',e.pageY);
        this.moveAtDrag({ x: pX, y: pY });
    }
}

Draggable.prototype.drop = function (container, eventObject) {
    if (this.mouseDown === true) {
        this.mouseDown = false;
        if (eventObject !== undefined) {
            eventTarget.fire(eventObject);
        }

        if(this.isDotUp !== undefined && this.border !== undefined){
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
        
        if(this.resizing !== undefined){
            this.resizing = undefined;
        }

        if (this.moveAtDrop === true && this.isDotUp === undefined) {
            this.moveAtDrag({ x: this.startX, y: this.dropY });
        }

        // this.dropY = this.startY;
    }
}

//functia de dragDrop cu ajutorul caruia setez listenerii
//important in aceasta fucntie este setarea elementului moveAtDrop care imi indica faptul ca elementul este draggable
Draggable.prototype.dragDrop = function (container, events, moveAtDrop) {
    let superThis = this;

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

function Resizable() {

}

//functia ce se ocupa de partea de resize a elementului
//toata clasa Resizable e legata doar de punctele de pe marginile si colturile elementului, dots-urile practic
//in momentul in care aceste puncte se misca, elementul isi face resize
//resize-ul consta in redesenarea la fiecare pas, adica, resetez coordonatele elementului de coltul caruia trag, si redesenez elementul cu noile coordonate
//apelul acestei functii este prins in mouseMove-ul din functia de drag, este apelata cu ajutorul eventTarget-ului, prin functia fire
Resizable.prototype.resizeElement = function (valueObject) {

    let element = valueObject.element;
    let dotManager = valueObject.dotManager;

    let configurationObject = {};

    //o functie care se ocupa de setarea acestui obiect de configurare, pe care il trimit care functia de desenare a obiectului, la finalul logicii din cadrul functiei mari
    
    function setFields(startX, startY, endX, endY) {
        configurationObject.startX = startX;
        configurationObject.startY = startY;
        configurationObject.endX = endX;
        configurationObject.endY = endY;
    }

    if(this.startToDrag === undefined){
        element.oldY = element.startY;
        element.oldHeight = element.height;
        this.startToDrag = true;
    }

    this.list = valueObject.list;

    //vad pe ce axa se misca elementul, pe x treaba e simpla, pur si simplu obiectul se redimensioneaza la stanga sau la dreapta
    if (this.direction === 'x') {
        if (this.position === 'r') {
            if (element.startX < this.startX + this.size / 2) {
                setFields(element.startX, element.startY, this.startX + this.size / 2, element.startY + element.height);
            }
        } else if (this.position === 'l') {
            if (this.startX + this.size / 2 < element.startX + element.width) {
                setFields(this.startX + this.size / 2, element.startY, element.startX + element.width, element.startY + element.height);
            }
        }
    } else if (this.direction === 'y') {
        //pe y este ceva mai complicat, deoarece sunt 6 puncte de care pot trage, si bineinteles, trebuie sa mut elementele de sub elementul caruia ii modific marimea
        //border este practic noua limita superioara a elementului, limita superioara adica limita care e mai departe de partea de sus a ecranului(in partea de sus fiind coordonate 0 pe y)
        //o folosesc pentru a sti de unde incep sa mut elementele, si a face mai usor recalcularile noilor limite
        if (this.position === 'd') {
            if (element.startY < this.startY + this.size / 2) {
                setFields(element.startX, element.startY, element.startX + element.width, this.startY + this.size / 2);
                this.border = configurationObject.endY;
                this.isDotUp = 0;
                
            }
        } else if (this.position === 'u') {
            if (this.startY + this.size / 2 < element.startY + element.height) {
                setFields(element.startX, this.startY + this.size / 2, element.startX + element.width, element.startY + element.height);
                this.border = configurationObject.startY;
                this.isDotUp = 1;
               
            }
        }

    } else {
        if (this.position === 'ul') {
            if (this.startX + this.size / 2 < element.startX + element.width && this.startY + this.size / 2 < element.startY + element.height) {
                setFields(this.startX + this.size / 2, this.startY + this.size / 2, element.startX + element.width, element.startY + element.height);
                this.border = configurationObject.startY;
                this.isDotUp = 1;
                
            }
        } else if (this.position === 'ur') {
            if (this.startY + this.size / 2 < element.startY + element.height && this.startX + this.size / 2 > element.startX) {
                setFields(element.startX, this.startY + this.size / 2, this.startX + this.size / 2, element.startY + element.height);
                this.border = configurationObject.startY;
                this.isDotUp = 1;
               
            }
        } else if (this.position === 'dl') {
            if (this.startX + this.size / 2 < element.startX + element.width && element.startY < this.startY + this.size / 2) {
                setFields(this.startX + this.size / 2, element.startY, element.startX + element.width, this.startY + this.size / 2);
                this.border = configurationObject.endY;
                this.isDotUp = 0;
                
            }
        } else if (this.position === 'dr') {
            if (this.startX + this.size / 2 > element.startX && this.startY + this.size / 2 > element.startY) {
                setFields(element.startX, element.startY, this.startX + this.size/2 , this.startY + this.size / 2);
                this.border = configurationObject.endY;
                this.isDotUp = 0;
                
            }
        }

    }

    this.oldX = valueObject.mouseX;
    this.oldY = valueObject.mouseY;
    //elementul nu se redeseneaza decat daca s-a facut o redimensionare
    if (configurationObject.startX !== undefined && configurationObject.startY !== undefined && configurationObject.endX !== undefined && configurationObject.endY !== undefined) {
        this.resizing = true;
        element.draw(configurationObject);
    }

    dotManager.putOnElement(valueObject.container, valueObject.element);
}


function SVGShape() {

}

mixin(SVGShape.prototype, Shape.prototype);

//funcita care se ocupa cu desenarea elementului pe baza unui obeict ce tine 4 intregi, capetele stanga sus si dreapta jos
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


//functia implicita de move a elementului ce face o translatare pe axa Ox
//translatarea se face in fucntie de pozitia curenta a elementului
SVGShape.prototype.move = function (posObj) {
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