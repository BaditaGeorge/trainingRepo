function PlayerShip(board,leftLimit,rightLimit) {
    let playerShip;
    let bullet = BulletFactory().createBullet('player');
    let bulletIsReady = false;

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

    this.fireRequest = function(){
        if(bullet.fired === false){
            return true;
        }
        return false;
    }

    this.createBullet = function(){
        bulletIsReady = true;
        bullet.html = undefined;
        bullet.fired = true;
        bullet.html = document.createElement('div');
        bullet.yP = 0;
        bullet.html.style.left = parseInt(playerShip.html.style.left) + playerShip.xP + playerShip.width/2 + 'px';
        bullet.html.style.top = parseInt(playerShip.html.style.top) - playerShip.height + 'px';
        bullet.html.classList.add(bullet.className);
    }

    this.getBullet = function(){
        bulletIsReady = false;
        return bullet;
    }

    this.bulletReady = function(){
        return bulletIsReady;
    }

    this.getShipPosition = function(){
        return parseInt(playerShip.html.style.left) + playerShip.xP;
    }

    this.displayShip = function(){
        board.appendChild(playerShip.html);
        this.controlShip();
    }

    this.isHit = function(bulletLft,bulletTop){
        let lft = parseInt(playerShip.html.style.left) + playerShip.xP;
        let rght = parseInt(playerShip.html.style.left) + playerShip.xP + playerShip.width;
        let top = parseInt(playerShip.html.style.top);
        let btm = parseInt(playerShip.html.style.top) + playerShip.height;
        if(bulletLft >= lft && bulletLft <= rght && bulletTop >= top && bulletTop <= btm){
            return true;
        }
        return false;
    }

    this.deadTransition = function(){
        playerShip.html.classList.remove(playerShip.className);
        for(let i=0;i<2;i++){
            if(i>0){
                playerShip.html.classList.remove(playerShip.className + 'Dead' + i);
            }
            playerShip.html.classList.add(playerShip.className + 'Dead' + (i+1));
        }
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
            }else if(e.key === ' '){
                if(this.fireRequest() === true){
                    this.createBullet();
                }
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