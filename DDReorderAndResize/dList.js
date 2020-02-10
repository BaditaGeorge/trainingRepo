function ListView(container){
    this.container = container;
    this.padding = 10;
    this.dotManager = new DotManager();
}


ListView.prototype.addElement = function(element){
    if(this.elements === undefined){
        this.elements = [];
    }
    element.dragDrop(this.container);
    this.elements.push(element);
    this.container.appendChild(element.svgPth);
    // this.container.addEventListener('mousedown',)
}

ListView.prototype.removeElement = function(index){
    this.container.removeChild(this.elements[index].svgPth);
    this.elements.splice(index,1);
}

ListView.prototype.setPadding = function(value){
    this.padding = value;
}

ListView.prototype.setDotManagerConfig = function(configObject){
    this.dotManager.create(configObject);
}



