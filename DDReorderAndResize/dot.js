function DotShape(){

}

mixin(DotShape.prototype,SVGShape.prototype);
mixout(DotShape.prototype,Draggable.prototype);
//direction va putea fi x,y,d
//dotManager-ul va seta valoarea acestui atribut, si pe baza lui, vom valida in move daca se poate sau nu face miscarea in directia respectiva
DotShape.prototype.direction = undefined;
DotShape.prototype.resize = undefined;
DotShape.prototype.move = function(posObj){
    if(posObj === undefined){
        throw new Error("Need a config object for positioning!");
    }

    if(posObj.x === undefined || posObj.y === undefined){
        throw new Error("can't move to a position with undefined x or y-axis position!");
    }

    if(this.direction === 'x'){
        this.svgPth.setAttribute('transform','translate(' + posObj.x + ',' + this.startY + ')');
        this.startX = posObj.x;
    }else if(this.direction === 'y'){
        this.svgPth.setAttribute('transform','translate(' + this.startX + ',' + posObj.y + ')');
        this.startY = posObj.y;
    }else if(this.direction === 'd'){
        this.svgPth.setAttribute('transform','translate(' + posObj.x + ',' + posObj.y + ')');
        this.startX = posObj.x;
        this.startY = posObj.y;
    }
    // this.startX = posObj.x;
    // this.startY = posObj.y;
}

//obiectul de configurare pentru DotManager va avea urmatoarea forma
// configObj = {number:4(numarul de puncte),data:[{position:'lr',color:'green'},..]}
//data va contine un array cu number obiecte, fiecare descriind cate un punct
//utilizatorul nu trebuie sa calculeze coordonatele punctelor, vom folosi 8 codificari string pentru a sti la ce pozitie se refera
// l - left, r - right, u - up, d - down(vor fi puse pe mijlocul laturilor), ur - up right, ul - up left, dl - down left, dr - down right (vor fi puse pe colturi, denumirea descrie pozitionarea)

function DotManager(){

}

DotManager.prototype.create = function(configObj){
    this.dots = [];
    for(let i=0;i<configObj.number;i++){
        this.dots.push(configObj.data[i]);
    }
}

DotManager.prototype.putOnElement = function(container,element){
    let x = element.startX;
    let y = element.startY;
    let h = element.height;
    let w = element.width;
    let size = 20;

    function computePosition(stringPos){
        if(stringPos === 'l'){ return [x,y+h/2-size/2]; }
        else if(stringPos === 'r'){ return [x+w,y+h/2-size/2]; }
        else if(stringPos === 'u'){ return [x+w/2-size/2,y]; }
        else if(stringPos === 'd'){ return [x+w/2-size/2,y+h]; }
        else if(stringPos === 'ul'){ return [x-size/2,y]; }
        else if(stringPos === 'ur'){ return [x+w-size/2,y]; }
        else if(stringPos === 'dl'){ return [x-size/2,y+h]; }
        else if(stringPos === 'dr'){ return [x+w-size/2,y+h]; }
        else {return [];}
    }

    for(let i=0;i<this.dots.length;i++){
        let newSquare = new DotShape();
        let positions = computePosition(this.dots[i].position);
        newSquare.draw({startX:positions[0],startY:positions[1],endX:positions[0]+size,endY:positions[1]+size,color:this.dots[i].color});
        this.dots[i] = newSquare;
    }
}
