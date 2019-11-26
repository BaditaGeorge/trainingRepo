// function createAtMouse(){

// }
// createAtMouse();
function main() {
    let posX = -1, posY = -1;
    let arr = new Array(1000);
    let poses = [];
    let last = 0;
    requestAnimationFrame(getMp);

    function createBubbles() {
        for (let i = 0; i < 500; i++) {
            arr[i] = {};
            arr[i].div = document.createElement('div');
            let val = Math.floor(Math.random() * 22);
            arr[i].div.style.width = val + 'px';
            arr[i].div.style.height = val + 'px';
            arr[i].div.style.background = 'blue';
            arr[i].div.style.borderRadius = '50%';
            arr[i].div.style.position = 'absolute';
            arr[i].div.style.border = '0.1em solid black';
            arr[i].posX = -1;
            arr[i].posY = -1;
            arr[i].use = false;
            arr[i].t = Math.floor(Math.random() * 5) + 1;
            arr[i].A = Math.floor(Math.random() * 7) + 1;
            arr[i].cont = 0;
        }
    }


    function doHarmonic(ob) {
        // x = Math.floor(Math.random() * 35);
        return ob.A * Math.sin(ob.t + ob.cont);
    }

    function doStuffsWithBubbles(mouseX, mouseY) {
        let ok = 0;
        let ok1 = 0;
        for (let i = 0; i < 500; i++) {
            if ((arr[i].posX < 0 || arr[i].posY < 0) && ok == 0 && mouseX > 0 && mouseY > 0) {
                console.log('a');
                arr[i].posX = mouseX;
                arr[i].posY = mouseY;
                arr[i].div.style.left = mouseX + 'px';
                arr[i].div.style.top = mouseY + 'px';
                document.getElementsByTagName('body')[0].appendChild(arr[i].div);
                ok = 1;
            } else {
                arr[i].div.style.top = (arr[i].posY - 3) + 'px';
                let val = doHarmonic(arr[i]);
                arr[i].div.style.left = (arr[i].posX + val) + 'px';
                arr[i].cont += (Math.random()/5);
                arr[i].posY -= 3;
                arr[i].posX = arr[i].posX + val;
                ok1 = 1;
            }
        }
        if (ok == 1 || ok1 == 1) {
            requestAnimationFrame(getMp);
        }
    }

    document.addEventListener('mouseover', function (e) {
        posX = e.clientX;
        posY = e.clientY;
        //doStuffsWithBubbles(e.clientX,e.clientY);
        //console.log(e.clientX,e.clientY);
        // posX = e.clientX;
        // posY = e.clientY;
        // arr[last].style.left = e.clientX+'px';
        // arr[last].style.top = e.clientY+'px';
        // poses.push([e.clientX,e.clientY]);
        // document.getElementsByTagName('body')[0].appendChild(arr[last]);
        // last++;
    });
    document.addEventListener('mousemove', function (e) {
        posX = e.clientX;
        posY = e.clientY;
        //doStuffsWithBubbles(e.clientX,e.clientY);
        // console.log(e.clientX,e.clientY);
        // posX = e.clientX;
        // posY = e.clientY;
        // arr[last].style.left = e.clientX+'px';
        // arr[last].style.top = e.clientY+'px';
        // poses.push([e.clientX,e.clientY]);
        // document.getElementsByTagName('body')[0].appendChild(arr[last]);
        // last++;
    });
    document.addEventListener('mouseleave', function (e) {
        posX = -1;
        posY = -1;
        console.log('left');
    });
    function getMp() {
        doStuffsWithBubbles(posX, posY);
        //doStuffsWithBubbles(posX,posY);
        //doStuffsWithBubbles(posX,posY);
        //doStuffsWithBubbles(posX,posY);
        // if(posX !== -1 && posY !== -1){
        //     let x1 = posX,y1 = posY;
        //     if(posX === x1 && posY === y1){
        //         console.log('Bb!');
        //     }
        // }
    }
    createBubbles();
}
main();