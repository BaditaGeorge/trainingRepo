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
            let val = Math.floor(Math.random() * 10 + 5);
            arr[i].div.style.width = val + 'px';
            arr[i].div.style.height = val + 'px';
            arr[i].div.style.background = 'blue';
            arr[i].div.style.borderRadius = '50%';
            arr[i].div.style.position = 'absolute';
            arr[i].div.style.border = '0.1em solid black';
            arr[i].posX = window.innerWidth + 5;
            arr[i].posY = window.innerHeight + 5;
            arr[i].acc = -2;
            arr[i].dirX = Math.floor(Math.random() * 10 - 5);
            arr[i].incX = arr[i].dirX / 5;
            arr[i].speed = 0;
        }
    }

    function doStuffsWithBubbles(mouseX, mouseY) {
        for (let i = 0; i < 100; i++) {
            if ((arr[i].posY > window.innerHeight) && mouseX > 0 && mouseY > 0) {
                arr[i].posX = mouseX;
                arr[i].posY = mouseY;
                let val2 = Math.floor(Math.random() * 50 + 30);
                arr[i].posX += arr[i].dirX;
                arr[i].speed = val2;
                arr[i].posY -= arr[i].speed;
                arr[i].div.style.transform = `translate3d(${arr[i].posX}px,${arr[i].posY}px,0px)`;
                document.getElementsByTagName('body')[0].appendChild(arr[i].div);
            } else {
                let val2 = Math.floor(Math.random() * 10 - 5);
                arr[i].posX += arr[i].dirX;
                arr[i].speed += arr[i].acc;
                arr[i].posY -= arr[i].speed;
                console.log(arr[i].posY,arr[i].speed);
                arr[i].div.style.transform = `translate3d(${arr[i].posX}px,${arr[i].posY}px,0px)`;
                //console.log(window.innerHeight,window.innerWidth);
                //console.log(arr[i].startL < Math.floor(arr[i].posY) && arr[i].startL > Math.floor(arr[i].posY)-50);
                ok1 = 1;
            }
        }
        requestAnimationFrame(getMp);
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