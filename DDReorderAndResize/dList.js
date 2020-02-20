function ListView(container, dotConfig) {
    this.container = container;
    this.padding = 80;
    this.inferiorLimit = 10;
    this.lastLimit = 10;
    this.dotManager = new DotManager(dotConfig);
}


ListView.prototype.addElement = function (confObj) {
    if (this.elements === undefined) {
        this.elements = [];
    }
    let element = new SVGShape();
    // console.log(this.lastLimit);
    confObj.startY = this.lastLimit;
    confObj.endY += this.lastLimit;
    // console.log(confObj.startY, confObj.endY);
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
    // this.container.addEventListener('mousedown',)
}

ListView.prototype.reorder = function(){
    let firstDropY = this.inferiorLimit;
    let indexOf;
    let lastDropIndex;
    let firstToMove = false;
    if (this.straightLine === undefined) {
        return;
    }

    if (this.up === 0) {
        for (let i = 0; i < this.elements.length; i++) {
            if (this.elements[i] !== this.element) {
                if (this.elements[i].dropY > this.element.dropY && this.elements[i].dropY < this.element.startY) {
                    let tempValue = this.elements[i].dropY;
                    this.elements[i].move({ x: this.elements[i].startX, y: firstDropY });
                    this.elements[i].dropY = firstDropY;
                    firstDropY = tempValue;
                    lastDropIndex = i;
                }else{
                    firstDropY += (this.elements[i].dropY + this.padding);
                }
            } else {
                indexOf = i;
            }
        }
    } else {
        for (let i = this.elements.length - 1; i >= 0; i--) {
            if (this.elements[i] !== this.element) {
                if (this.elements[i].dropY < this.element.dropY && this.elements[i].dropY + this.elements[i].height > this.element.startY + this.element.height) {
                    let tempValue = this.elements[i].dropY;
                    this.elements[i].move({ x: this.elements[i].startX, y: firstDropY });
                    this.elements[i].dropY = firstDropY;
                    firstDropY = tempValue;
                    lastDropIndex = i;
                }
            } else {
                indexOf = i;
            }
        }
    }
    this.elements.splice(indexOf, 1);
    this.elements.splice(lastDropIndex, 0, this.element);
    this.element.dropY = firstDropY;
}

ListView.prototype.reorder = function () {
    let firstDropY = this.element.dropY;
    let indexOf;
    let lastDropIndex;
    if (this.straightLine === undefined) {
        return;
    }

    if (this.up === 0) {
        for (let i = 0; i < this.elements.length; i++) {
            if (this.elements[i] !== this.element) {
                if (this.elements[i].dropY > this.element.dropY && this.elements[i].dropY < this.element.startY) {
                    let tempValue = this.elements[i].dropY;
                    this.elements[i].move({ x: this.elements[i].startX, y: firstDropY });
                    this.elements[i].dropY = firstDropY;
                    firstDropY = tempValue;
                    lastDropIndex = i;
                }
            } else {
                indexOf = i;
            }
        }
    } else {
        for (let i = this.elements.length - 1; i >= 0; i--) {
            if (this.elements[i] !== this.element) {
                if (this.elements[i].dropY < this.element.dropY && this.elements[i].dropY + this.elements[i].height > this.element.startY + this.element.height) {
                    let tempValue = this.elements[i].dropY;
                    this.elements[i].move({ x: this.elements[i].startX, y: firstDropY });
                    this.elements[i].dropY = firstDropY;
                    firstDropY = tempValue;
                    lastDropIndex = i;
                }
            } else {
                indexOf = i;
            }
        }
    }
    this.elements.splice(indexOf, 1);
    this.elements.splice(lastDropIndex, 0, this.element);
    this.element.dropY = firstDropY;
}

ListView.prototype.checkHitBox = function (svgPth, positionY, dropY, height) {
    // console.log(positionY);
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
        if ((bounderies[i].up < positionY && positionY + height > bounderies[i].down && positionY + height < bounderies[i].down + bounderies[i].h2)
            || (bounderies[i].up > positionY && positionY + height > bounderies[i].up && positionY + height < bounderies[i].down)) {
            if (dropY < bounderies[i].up) {
                return [(bounderies[i].up + this.padding / 2), 0];
            } else {
                return [(bounderies[i].up + this.padding / 2), 1];
            }
        }
    }

    return [-1];
}

ListView.prototype.addLine = function (positionY) {
    this.straightLine = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    let positionX = 0;
    this.lineY = positionY;
    // positionY += this.padding / 2;
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

    this.container.addEventListener('mousedown', (e) => {
        let indexOfOcc = indexOfElement(e.target);

        if (indexOfOcc !== -1) {
            this.target = this.elements[indexOfOcc].svgPth;
            this.element = this.elements[indexOfOcc];
            this.container.removeChild(this.element.svgPth);
            // console.log(this.element.svgPth);
            this.container.appendChild(this.element.svgPth);
            this.dotManager.putOnElement(this.container, this.element);
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
                            list:this
                        }
                    },
                    eventDrop: {
                    }
                }, false);
            } else {
                this.dotManager.removeElements(this.container);
            }
        }
        this.mouseDown = true;
    });

    this.container.addEventListener('mouseup', (e) => {
        if (indexOfElement(e.target) !== -1) {
            this.mouseDown = false;
            this.target = undefined;
            this.dotManager.moveElements(this.element);
            this.removeLine();
            // this.element = undefined;
        } else {
            let indexOf = indexOfDot(e.target);
            if (indexOf !== -1) {
                eventTarget.removeListener('resize', this.dotManager.dots[indexOf][1].resizeElement);
            }
        }
    });

    this.container.addEventListener('mousemove', (e) => {
        if (this.mouseDown === true) {
            if (this.element !== undefined) {
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

                this.dotManager.moveElements(this.element);
            }
        }
    });

    eventTarget.addListener('drop', this.reorder);
    eventTarget.addListener('pushAtResize',this.pushElements);
    // eventTarget.addListener('resize',this.dotManager)
}

ListView.prototype.pushElements = function(configObject){
    let border = configObject.border;
    let up = configObject.up;
    // let svgPth = configObject.svgPth;
    let mustBeModified = false;
    console.log(border);
    if(up === 0){
        for(let i=0;i<this.elements.length;i++){
            if(this.elements[i].startY > border || mustBeModified === true){
                // this.elements[i].moveByOrigin = this.padding - (this.elements[i].startY - border);
                this.elements[i].move({x:this.elements[i].startX,y:this.elements[i].startY + this.padding - (this.elements[i].startY - border)});
                // this.elements[i].originalY = this.elements[i].startY;
                border = this.elements[i].startY + this.elements[i].height;
                this.elements[i].dropY = this.elements[i].startY;
                mustBeModified = true;
            }
        }
    }else{
        for(let i=this.elements.length - 1; i>=0; i--){
            if(this.elements[i].startY < border){
                this.elements[i].move({x:this.elements[i].startX,y:this.elements[i].startY + this.padding - (this.elements[i].startY + this.elements[i].height - border)});
            }
        }
    }
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



