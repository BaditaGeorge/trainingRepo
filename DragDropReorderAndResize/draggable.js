function Draggable() {

}

Draggable.prototype.mouseDown = false;

Draggable.prototype.drag = function(e, eventObject) {
    if (this.mouseDown === true) {
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