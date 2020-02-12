function ListView(container, dotConfig) {
    this.container = container;
    this.padding = 10;
    this.lastLimit = 10;
    this.dotManager = new DotManager(dotConfig);
    this.eventTarget = new EventTarget();
}


ListView.prototype.addElement = function (confObj) {
    if (this.elements === undefined) {
        this.elements = [];
    }
    let element = new SVGShape();
    console.log(this.lastLimit);
    confObj.startY = this.lastLimit;
    confObj.endY += this.lastLimit;
    console.log(confObj.startY, confObj.endY);
    element.draw(confObj);
    this.lastLimit = confObj.endY + this.padding;
    element.dragDrop(this.container);
    this.elements.push(element);
    this.container.appendChild(element.svgPth);
    // this.container.addEventListener('mousedown',)
}

ListView.prototype.reorder = function () {

}

ListView.prototype.checkHitBox = function (svgPth, positionY, height) {
    for (let i = 0; i < this.elements.length; i++) {
        if (this.elements[i].svgPth !== svgPth) {
            if (this.elements[i].startY + this.elements[i].height / 2 <= positionY && positionY + height < this.elements[i].startY + this.elements[i].height * 2) {
                return this.elements[i].startY + this.elements[i].height;
            }
        }
    }
    return -1;
}

ListView.prototype.addLine = function (positionY) {
    this.straightLine = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    let positionX = 0;
    positionY += this.padding / 2;
    let lineLength = 500;
    let arcPth = [
        'M', positionX, positionY,
        'L', positionX + lineLength, positionY,
        'L', positionX + lineLength, positionY + 1,
        'L', positionX, positionY + 1,
        'L', positionX, positionY,
    ].join(' ');
    this.straightLine.setAttribute('d', arcPth);
    this.straightLine.setAttribute('fill', 'blue');
    this.container.appendChild(this.straightLine);
}

ListView.prototype.removeLine = function () {
    if (this.straightLine !== undefined) {
        this.container.removeChild(this.straightLine);
        this.straightLine = undefined;
    }
}

ListView.prototype.addListeners = function () {
    let indexOfElement = (target) => {
        for (let i = 0; i < this.elements.length; i++) {
            if (this.elements[i].svgPth === target) {
                return i;
            }
        }
        return -1;
    }

    this.mouseDown = false;
    this.target;

    this.container.addEventListener('mousedown', (e) => {
        let indexOfOcc = indexOfElement(e.target);

        if (indexOfOcc !== -1) {
            this.target = this.elements[indexOfOcc].svgPth;
            this.dotManager.putOnElement(this.container, this.elements[indexOfOcc]);
        } else {
            this.dotManager.removeElements(this.container);
        }
        this.mouseDown = true;
    });

    this.container.addEventListener('mouseup', (e) => {
        this.mouseDown = false;
        this.target = undefined;
    });

    this.container.addEventListener('mousemove', (e) => {
        if (this.mouseDown === true) {
            let indexOfOcc = indexOfElement(this.target);

            if (indexOfOcc !== -1) {
                
                let hitBoxBorder = this.checkHitBox(this.elements[indexOfOcc].svgPth, this.elements[indexOfOcc].startY, this.elements[indexOfOcc].height);
                
                if (hitBoxBorder !== -1) {
                    if (this.straightLine === undefined) {
                        this.addLine(hitBoxBorder);
                    }
                } else {
                    this.removeLine();
                }

                this.dotManager.moveElements(this.elements[indexOfOcc]);
            }
        }
    });
}

ListView.prototype.removeElement = function (index) {
    this.container.removeChild(this.elements[index].svgPth);
    this.elements.splice(index, 1);
}

ListView.prototype.setPadding = function (value) {
    this.padding = value;
}

ListView.prototype.setDotManagerConfig = function (configObject) {
    this.dotManager.create(configObject);
}



