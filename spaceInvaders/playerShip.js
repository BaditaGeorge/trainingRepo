function PlayerShip(board, leftLimit, rightLimit) {
    let playerShip;
    let bullet = BulletFactory().createBullet('player');
    let bulletIsReady = false;
    let isDying = 3;
    let num = 0;
    let sound = document.createElement('audio');

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

    this.removeShip = function() {
        if (playerShip.html !== undefined) {
            board.removeChild(playerShip.html);
        }
    }

    this.died = function() {
        console.log(playerShip.hitCount, playerShip.hitLimit);
        if (playerShip.hitCount === playerShip.hitLimit) {
            return true;
        }
        return false;
    }

    this.createShip = function() {
        playerShip = createPlayerShipObject();
        playerShip.html = document.createElement('div');
        playerShip.html.classList.add(playerShip.className);
        playerShip.html.style.top = '750px';
        playerShip.html.style.left = '400px';
        playerShip.xP = 0;
        sound.src = './sounds/shoot.wav';
        sound.setAttribute('preload', 'auto');
        sound.setAttribute('controls', 'none');
        sound.style.display = 'none';
        document.body.appendChild(sound);
    }

    this.fireRequest = function() {
        if (bullet.fired === false) {
            return true;
        }
        return false;
    }

    this.createBullet = function() {
        bulletIsReady = true;
        bullet.html = undefined;
        bullet.fired = true;
        bullet.html = document.createElement('div');
        bullet.yP = 0;
        bullet.html.style.left = parseInt(playerShip.html.style.left) + playerShip.xP + playerShip.width / 2 + 'px';
        bullet.html.style.top = parseInt(playerShip.html.style.top) - playerShip.height + 'px';
        bullet.html.classList.add(bullet.className);
        sound.play();
    }

    this.getBullet = function() {
        bulletIsReady = false;
        return bullet;
    }

    this.bulletReady = function() {
        return bulletIsReady;
    }

    this.getShipPosition = function() {
        return parseInt(playerShip.html.style.left) + playerShip.xP;
    }

    this.displayShip = function() {
        board.appendChild(playerShip.html);
        this.controlShip();
    }

    this.isHit = function(bulletLft, bulletTop) {
        let lft = parseInt(playerShip.html.style.left) + playerShip.xP;
        let rght = parseInt(playerShip.html.style.left) + playerShip.xP + playerShip.width;
        let top = parseInt(playerShip.html.style.top);
        let btm = parseInt(playerShip.html.style.top) + playerShip.height;
        if (bulletLft >= lft && bulletLft <= rght && bulletTop >= top && bulletTop <= btm) {
            return true;
        }
        return false;
    }

    this.deadTransition = function() {
        isDying = 0;
        playerShip.hitCount += 1;
    }

    this.controlShip = function() {
        let keyDown = false;
        let timeOut = undefined;
        let keyD = undefined;

        let redrawFunction = () => {
            if (keyDown === true) {
                requestAnimationFrame(() => {
                    playerShip.html.style.transform = 'translateX(' + playerShip.xP + 'px)';
                    redrawFunction();
                });
            }
        }

        let intervalFunction = () => {
            if (isDying > 2) {
                if (keyDown === true) {
                    let toAdd = 0;
                    if (keyD === 'ArrowRight') {
                        toAdd = 5;
                    } else if (keyD === 'ArrowLeft') {
                        toAdd -= 5;
                    }
                    if (playerShip.xP + toAdd >= leftLimit && playerShip.xP + toAdd < rightLimit) {
                        playerShip.xP += toAdd;
                        playerShip.html.style.transform = 'translateX(' + playerShip.xP + 'px)';
                    }
                }
            } else {
                num++;
                if (num === 10) {
                    isDying++;
                    if (isDying <= 2) {
                        if (isDying === 1) {
                            playerShip.html.classList.remove(playerShip.className);
                        } else {
                            playerShip.html.classList.remove(playerShip.className + 'Dead' + (isDying - 1));
                        }
                        playerShip.html.classList.add(playerShip.className + 'Dead' + isDying);
                    } else {
                        playerShip.html.classList.remove(playerShip.className + 'Dead' + (isDying - 1));
                        playerShip.html.classList.add(playerShip.className);
                    }
                    num = 0;
                }
            }
        }

        timeOut = setInterval(intervalFunction, 10);

        document.body.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                keyDown = true;
                keyD = e.key;
            } else if (e.key === 'ArrowRight') {
                keyDown = true;
                keyD = e.key;
            } else if (e.key === ' ') {
                if (this.fireRequest() === true) {
                    this.createBullet();
                }
            }
        });

        document.body.addEventListener('keyup', (e) => {
            keyDown = false;
        });
    }

}