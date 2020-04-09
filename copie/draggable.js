function Draggable() {

}

Draggable.prototype.mouseDown = false;

Draggable.prototype.drag = function(e, eventObject) {
    console.log('drag');
    if (this.mouseDown === true) {
        if (eventObject.data !== undefined) {
            if (eventObject.data.dotManager !== undefined) {
                eventObject.data.dotManager.moveElements(eventObject.data.element);
            }
        }
        eventTarget.fire(eventObject);
        // console.log(this.width,this.height);
        let pX = e.pageX - this.width / 2;
        let pY = e.pageY - this.height / 2;
        // console.log('PageY',e.pageY);
        this.moveAtDrag({ x: pX, y: pY });
    }
}

Draggable.prototype.drop = function(container, eventObject) {
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

//functia de dragDrop cu ajutorul caruia setez listenerii
//important in aceasta fucntie este setarea elementului moveAtDrop care imi indica faptul ca elementul este draggable
Draggable.prototype.dragDrop = function(container, events, moveAtDrop) {
    console.log('a');
    let superThis = this;

    if (moveAtDrop === undefined) {
        this.moveAtDrop = true;
    } else {
        this.moveAtDrop = moveAtDrop;
        // events.eventDrag.data.dotManager.moveElements(events.eventDrag.data.element);
        // events.list.moveElements(events.element);
    }
    if (this.dropY === undefined) {
        this.dropY = this.startY;
    }

    let onMDown = (e) => {
        if (e.target === superThis.svgPth) {
            console.log(superThis.svgPth);
            superThis.mouseDown = true;
            container.addEventListener('mousemove', onMMove);
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
        if (superThis.mouseDown === true) {
            this.drop(container, events.eventDrop);
            container.removeEventListener('mousedown', onMDown);
            container.removeEventListener('mousemove', onMMove);
            superThis.mouseDown = false;
        }
    }

    container.addEventListener('mousedown', onMDown);
    container.addEventListener('mouseup', onMUp);
}