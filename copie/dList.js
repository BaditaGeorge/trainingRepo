function ListView(container, dotConfig) {
    this.container = container;
    this.padding = 80;
    this.inferiorLimit = 50;
    this.lastLimit = 50;
    this.dotManager = new DotManager(dotConfig);
}


ListView.prototype.addElement = function(confObj) {
    if (this.elements === undefined) {
        this.elements = [];
    }
    let element = new SVGShape();

    confObj.startY = this.lastLimit;
    confObj.endY += this.lastLimit;

    element.draw(confObj);
    this.lastLimit = confObj.endY + this.padding;
    element.dragDrop(this.container, {
        eventDrag: {
            type: 'drag'
        },
        eventDrop: {
            type: 'drop',
            target: this
        }
    });
    this.elements.push(element);
    this.container.appendChild(element.svgPth);

}

ListView.prototype.reorder = function() {
    let firstDropY = this.inferiorLimit;
    let indexOf;
    let lastDropIndex;
    let firstToMove = false;
    if (this.straightLine === undefined) {
        return;
    }
    let tempDropY = this.element.dropY;

    if (this.up === 0) {

        firstDropY = this.lastLimit;
        let indexOfFirst = undefined;
        for (let i = this.elements.length - 1; i >= 0; i--) {
            if (this.elements[i] !== this.element) {
                if (this.elements[i].dropY > tempDropY && (this.elements[i].dropY < this.element.startY || (this.elements[i].dropY < this.element.startY + this.element.height && this.elements[i].height < this.element.height))) {
                    if (firstToMove === false) {
                        indexOfFirst = i;
                        firstDropY -= (this.element.height + this.padding);
                        this.element.dropY = this.elements[i].dropY;
                        firstToMove = true;
                        lastDropIndex = i;
                    }

                    firstDropY -= (this.elements[i].height + this.padding);

                    this.elements[i].move({ x: this.elements[i].startX, y: firstDropY });
                    this.elements[i].dropY = firstDropY;

                } else {
                    firstDropY -= (this.elements[i].height + this.padding);
                }
            } else {
                indexOf = i;
            }
        }
        this.element.dropY = this.element.dropY - (this.element.height - this.elements[indexOfFirst].height);
    } else {
        firstDropY = this.inferiorLimit;
        for (let i = 0; i < this.elements.length; i++) {
            if (this.elements[i] !== this.element) {
                if (this.elements[i].dropY < tempDropY && (this.elements[i].dropY + this.elements[i].height > this.element.startY + this.element.height ||
                        (this.elements[i].dropY > this.element.startY && this.elements[i].height < this.element.height))) {
                    if (firstToMove === false) {
                        firstDropY += (this.element.height + this.padding);
                        this.element.dropY = this.elements[i].dropY;
                        firstToMove = true;
                        lastDropIndex = i;
                    }
                    this.elements[i].move({ x: this.elements[i].startX, y: firstDropY });
                    this.elements[i].dropY = firstDropY;
                    firstDropY += (this.elements[i].height + this.padding);
                } else {
                    firstDropY += (this.elements[i].height + this.padding);
                }
            } else {
                indexOf = i;
            }
        }
    }
    this.elements.splice(indexOf, 1);
    this.elements.splice(lastDropIndex, 0, this.element);
}


ListView.prototype.checkHitBox = function(svgPth, positionY, dropY, height) {

    let bounderies = [];
    let len = this.elements.length;
    for (let i = 0; i < this.elements.length - 1; i++) {
        bounderies.push({ up: this.elements[i].startY + this.elements[i].height, down: this.elements[i + 1].startY, h1: this.elements[i].height, h2: this.elements[i + 1].height });
    }

    if (positionY < this.elements[0].startY && this.elements[0].svgPth !== svgPth) {
        return [this.elements[0].startY, 1];
    }

    if (positionY > this.elements[len - 1].startY + this.elements[len - 1].height && this.elements[len - 1].svgPth !== svgPth) {
        return [(this.elements[len - 1].startY + this.elements[len - 1].height), 0];
    }

    for (let i = 0; i < bounderies.length; i++) {
        if ((bounderies[i].up < positionY && positionY + height > bounderies[i].down && positionY + height < bounderies[i].down + bounderies[i].h2) ||
            (bounderies[i].up > positionY && positionY + height > bounderies[i].up && positionY + height < bounderies[i].down)) {
            if (dropY < bounderies[i].up) {
                return [(bounderies[i].up + this.padding / 2), 0];
            } else {
                return [(bounderies[i].up + this.padding / 2), 1];
            }
        }
    }

    return [-1];
}


ListView.prototype.addLine = function(positionY) {
    this.straightLine = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    let positionX = 0;
    this.lineY = positionY;

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

ListView.prototype.removeLine = function() {
    if (this.straightLine !== undefined) {
        this.container.removeChild(this.straightLine);
        this.straightLine = undefined;
    }
}

ListView.prototype.addListeners = function() {
    let indexOfElement = (target) => {
        for (let i = 0; i < this.elements.length; i++) {
            if (this.elements[i].svgPth === target) {
                return i;
            }
        }
        return -1;
    }

    let indexOfDot = (target) => {
        if (this.dotManager.dots[0][1] !== undefined) {
            for (let i = 0; i < this.dotManager.dots.length; i++) {
                if (this.dotManager.dots[i][1].svgPth === target) {
                    return i;
                }
            }
        }
        return -1;
    }

    this.mouseDown = false;
    this.target;

    this.nr = 0;
    this.container.addEventListener('mousedown', (e) => {
        let indexOfOcc = indexOfElement(e.target);
        this.clickedEl = e.target;

        if (indexOfOcc !== -1) {
            this.target = this.elements[indexOfOcc].svgPth;
            this.element = this.elements[indexOfOcc];
            this.container.removeChild(this.element.svgPth);

            this.container.appendChild(this.element.svgPth);
            if (this.nr === 0) {
                this.dotManager.putOnElement(this.container, this.element);
            }
            this.nr++;
        } else {
            let indexOf = indexOfDot(e.target);
            if (indexOf !== -1) {
                eventTarget.addListener('resize', this.dotManager.dots[indexOf][1].resizeElement);
                this.dotManager.dots[indexOf][1].dragDrop(this.container, {
                    eventDrag: {
                        type: 'resize',
                        target: this.dotManager.dots[indexOf][1],
                        data: {
                            element: this.element,
                            container: this.container,
                            dotManager: this.dotManager,
                            list: this
                        }
                    },
                    eventDrop: {}
                }, false);
            } else {
                if (this.dotManager.elementsOn !== undefined) {
                    this.dotManager.removeElements(this.container);
                }
            }
        }
        this.mouseDown = true;
    });

    this.container.addEventListener('mouseup', (e) => {
        this.mouseDown = false;
        if (indexOfElement(this.clickedEl) !== -1) {
            this.target = undefined;
            this.dotManager.moveElements(this.element);
            this.removeLine();

        } else {
            let indexOf = indexOfDot(this.clickedEl);
            if (indexOf !== -1) {
                eventTarget.removeListener('resize');
            }
        }
    });

    this.noDotClicked = function() {
        if (this.dotManager.dots[0][1] === undefined) {
            return true;
        }
        for (let i = 0; i < this.dotManager.dots.length; i++) {
            if (this.dotManager.dots[i][1].resizing === true) {
                return false;
            }
        }
        return true;
    }

    this.container.addEventListener('mousemove', (e) => {
        if (this.mouseDown === true) {
            if (this.element !== undefined && this.noDotClicked() === true) {
                let checkHitBoxValue = this.checkHitBox(this.element.svgPth, this.element.startY, this.element.dropY, this.element.height);
                let hitBoxBorder = checkHitBoxValue[0];
                if (hitBoxBorder !== -1) {
                    this.up = checkHitBoxValue[1];
                    if (this.straightLine === undefined) {
                        this.addLine(hitBoxBorder);
                    }
                } else {
                    this.removeLine();
                }

                if (indexOfElement(this.clickedEl) !== -1) {
                    this.dotManager.moveElements(this.element);
                }
            }
        }
    });

    eventTarget.addListener('drop', this.reorder);
    eventTarget.addListener('pushAtResize', this.pushElements);
}

ListView.prototype.pushElements = function(configObject) {
    let border = configObject.border;
    let up = configObject.up;

    let mustBeModified = false;
    if (up !== 0) {
        this.element.move({ x: this.element.startX, y: this.element.dropY });
        this.dotManager.moveElements(this.element);
        border = this.element.startY + this.element.height;
    }

    for (let i = 0; i < this.elements.length; i++) {
        if (this.elements[i].startY > this.element.oldY + this.element.oldHeight || mustBeModified === true) {

            this.elements[i].move({ x: this.elements[i].startX, y: this.elements[i].startY + this.padding - (this.elements[i].startY - border) });

            border = this.elements[i].startY + this.elements[i].height;
            this.elements[i].dropY = this.elements[i].startY;
            mustBeModified = true;
        }
    }
    this.lastLimit = this.elements[this.elements.length - 1].dropY + this.elements[this.elements.length - 1].height + this.padding;
}

ListView.prototype.removeElement = function(index) {
    this.container.removeChild(this.elements[index].svgPth);
    this.elements.splice(index, 1);
}

ListView.prototype.setPadding = function(value) {
    this.padding = value;
}

ListView.prototype.setDotManagerConfig = function(configObject) {
    this.dotManager.create(configObject);
}