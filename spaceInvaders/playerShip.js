function PlayerShip(board,leftLimit,rightLimit) {
    let playerShip;

    function createPlayerShipObject() {
        return {
            className: 'battleShip',
            width: 39,
            height: 24,
            display: true,
            hitCount: 0,
            hitLimit: 3,
            deadStates: 2
        };
    }

    this.createShip = function () {
        playerShip = createPlayerShipObject();
        playerShip.html = document.createElement('div');
        playerShip.html.classList.add(playerShip.className);
        playerShip.html.style.top = '750px';
        playerShip.html.style.left = '400px';
        playerShip.xP = 0;
    }

    this.displayShip = function(){
        board.appendChild(playerShip.html);
        this.controlShip();
    }

    this.controlShip = function(){
        let keyDown = false;
        let timeOut = undefined;
        let keyD = undefined;

        let redrawFunction = ()=>{
            if(keyDown === true){
                requestAnimationFrame(()=>{
                    playerShip.html.style.transform = 'translateX(' + playerShip.xP + 'px)';
                    redrawFunction();
                });
            }
        }

        let intervalFunction = ()=>{
            if(keyDown === true){
                let toAdd = 0;
                if(keyD === 'ArrowRight'){
                    toAdd = 5;
                }else if(keyD === 'ArrowLeft'){
                    toAdd -= 5;
                }
                if(playerShip.xP + toAdd >= leftLimit && playerShip.xP + toAdd < rightLimit){
                    playerShip.xP += toAdd;
                    playerShip.html.style.transform = 'translateX(' + playerShip.xP + 'px)';
                }
            }
        }

        document.body.addEventListener('keydown',(e)=>{
            if(e.key === 'ArrowLeft'){
                keyDown = true;
                keyD = e.key;
            }else if(e.key === 'ArrowRight'){
                keyDown = true;
                keyD = e.key;
            }
            if(timeOut === undefined){
                timeOut = setInterval(intervalFunction,10);
            }
        });

        document.body.addEventListener('keyup',(e)=>{
            keyDown = false;
            clearInterval(timeOut);
            timeOut = undefined;
        });
    }

}