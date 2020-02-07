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
        this.svgPth.setAttribute('transform','translate(' + posObj.x + ',' + startY + ')');
    }else if(this.direction === 'y'){
        this.svgPth.setAttribute('transform','translate(' + this.startX + ',' + posObj.y + ')');
    }else if(this.direction === 'd'){
        this.svgPth.setAttribute('transform','translate(' + posObj.x + ',' + posObj.y + ')');
    }
    // this.startX = posObj.x;
    this.startY = posObj.y;
}
