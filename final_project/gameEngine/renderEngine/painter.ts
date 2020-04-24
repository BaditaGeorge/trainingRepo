//this is the main class that will be used to draw any basic shape
import { Primitive } from './primitive.js';


class Painter{
    constructor(){

    }

    //base shapes like circle,square,rectangle,polygon,ellipse
    drawShape(type:string,confObj,color:string|null){
        let shape = document.createElementNS('http://www.w3.org/2000/svg',type);
        if(type === 'circle'){
            shape.setAttributeNS(null,'cx',confObj.cx);
            shape.setAttributeNS(null,'cy',confObj.cy);
            shape.setAttributeNS(null,'r',confObj.r);
            if(color === undefined){
                shape.setAttributeNS(null,'style','fill:black');
            }else{
                shape.setAttributeNS(null,'style','fill:'+color);
            }

        }else if(type === 'square'){

        }else if(type === 'rectangle'){

        }else if(type === 'ellipse'){

        }else if(type === 'triangle'){

        }else if(type === 'polygon'){

        }

        return new Primitive(type,shape);
    }
}