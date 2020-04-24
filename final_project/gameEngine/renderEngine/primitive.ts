class Primitive{
    type:string;
    element:object;
    constructor(type:string,element:object){
        this.type = type;
        this.element = element;
    }
    
    getGraphicElement(){
        return this.element;
    }

    setColor(color:string){
        //here will change color of the SVG element
    }
}

export {Primitive};