let list_Of_positions = [{x:15,y:15,t:'s',l:50},{x:37,y:55,t:'s',l:48},{x:450,y:380,t:'c',l:35},{x:470,y:400,t:'c',l:15},{x:140,y:200,t:'s',l:50},{x:183,y:200,t:'s',l:43}]

function draw_Shapes(){
    for(let elem of list_Of_positions){
        let x = document.createElement('div');
        x.style.width = elem.l + 'px';
        x.style.height = elem.l + 'px';
        x.style.position = 'absolute';
        x.style.top = elem.x + 'px';
        x.style.left = elem.y + 'px';
        x.style.border = '2px solid black';
        if(elem.t === 'c'){
            x.style.borderRadius = '50%';
        }
        elem.ref = x;
        document.getElementsByTagName('body')[0].appendChild(x);
    }
}

function log_and_paint(el1,el2){
    console.log(el1.x,el1.y,el2.x,el2.y,'Suprapunere');
    el1.ref.style.backgroundColor = 'yellow';
}

function check_square_overlaping(){
    for(let i=0; i<list_Of_positions.length; i++){
        let el1 = list_Of_positions[i];
        if(el1.t === 's'){
            for(let j=i+1; j<list_Of_positions.length; j++){
                let el2 = list_Of_positions[j];
                if(!(el1.x + el1.l < el2.x || el1.y + el1.l < el2.y || el2.x + el2.l < el1.x || el2.y + el2.l < el1.y)){
                    log_and_paint(el1,el2);
                }
            }
        }
    }
}

function check_circles_overlaping(){
    for(let i=0; i<list_Of_positions.length; i++){
        let el1 = list_Of_positions[i];
        if(el1.t === 'c'){
            for(let j=i+1; j<list_Of_positions.length; j++){
                let el2 = list_Of_positions[j];
                if(el2.t === 'c'){
                    let middleX = (el1.x + (el1.l/2));
                    let middleY = (el1.y + (el1.l/2));
                    let middleX_2 = (el2.x + (el2.l/2));
                    let middleY_2 = (el2.y + (el2.l/2));
                    let distSqr = (middleX - middleX_2)*(middleX - middleX_2) + (middleY - middleY_2)*(middleY - middleY_2);
                    let sumOfRadiuses = ((el1.l/2) + (el2.l/2))*((el1.l/2) + (el2.l/2));
                    if(sumOfRadiuses > distSqr){
                        log_and_paint(el1,el2);
                    }
                }
            }
        }
    }
}


draw_Shapes();
check_square_overlaping();
check_circles_overlaping();