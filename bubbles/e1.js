function main() {
    let posX = -1, posY = -1;
    let arr = new Array(1000);
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
        return ob.A * Math.sin(ob.t + ob.cont);
    }

    function doStuffsWithBubbles(mouseX, mouseY) {
        let ok = 0;
        let ok1 = 0;
        for (let i = 0; i < 500; i++) {
            if ((arr[i].posX < 0 || arr[i].posY < 0) && ok == 0 && mouseX > 0 && mouseY > 0) {
                arr[i].posX = mouseX;
                arr[i].posY = mouseY;
                let val = doHarmonic(arr[i]);
                arr[i].div.style.transform = `translate3d(${arr[i].posX + val}px,${arr[i].posY - 3}px,0px)`;
                document.getElementsByTagName('body')[0].appendChild(arr[i].div);
                ok = 1;
            } else {
                let val = doHarmonic(arr[i]);
                arr[i].div.style.transform = `translate3d(${arr[i].posX + val}px,${arr[i].posY - 3}px,0px)`;
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
    });
    document.addEventListener('mousemove', function (e) {
        posX = e.clientX;
        posY = e.clientY;
    });
    document.addEventListener('mouseleave', function (e) {
        posX = -1;
        posY = -1;
    });
    function getMp() {
        doStuffsWithBubbles(posX, posY);
    }
    createBubbles();
}
main();