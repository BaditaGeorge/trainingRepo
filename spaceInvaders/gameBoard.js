function GameBoard() {
    const alienFactory = AlienFactory();
    const shieldFactory = ShieldFactory();
    const numberOfInvaders = 50;
    const invadersOnRow = 10;
    const rowsNumber = numberOfInvaders / invadersOnRow;
    let alienBlockSize = 50;
    let invadersMatrix = [];
    const board = document.getElementsByClassName('board')[0];
    let shieldsRows = 4;
    let shieldCols = 3;
    let numberOfShields = 4;
    let aliveRows = 5;
    let aliveCols = 10;
    let boardWidth = 756;
    let boardHeight = 802;
    let playerShip = undefined;
    const alienHeight = 24;
    let aliensPerCol = [5, 5, 5, 5, 5, 5, 5, 5, 5, 5]
    let shields = [];
    let bullets = [];

    this.createAliens = function () {
        for (let i = 0; i < rowsNumber; i++) {
            invadersMatrix.push([]);
            for (let j = 0; j < invadersOnRow; j++) {
                let alien;
                if (i === 0) {
                    alien = alienFactory.createAlien('small');
                } else if (i >= 1 && i <= 2) {
                    alien = alienFactory.createAlien('medium');
                } else {
                    alien = alienFactory.createAlien('big');
                }
                invadersMatrix[i].push(alien);
                // console.log(invadersMatrix[i][j]);
                invadersMatrix[i][j].html = document.createElement('div');
                invadersMatrix[i][j].html.style.left = j * alienBlockSize + 'px';
                invadersMatrix[i][j].html.style.top = i * alienBlockSize + 'px';
                invadersMatrix[i][j].html.classList.add(invadersMatrix[i][j].className + invadersMatrix[i][j].state);
                invadersMatrix[i][j].xP = 0;
                invadersMatrix[i][j].yP = 0;
            }
        }
        // console.log(invadersMatrix);
    }

    this.createShields = function () {
        let deplasare = 0;
        for (let i = 0; i < numberOfShields; i++) {
            shields.push(shieldFactory.createShield('shield'));
            shields[i].html = document.createElement('div');
            shields[i].html.style.left = 110 + deplasare + 'px';
            deplasare += 160;
            shields[i].html.style.top = '650px';
            for (let j = 0; j < shieldsRows; j++) {
                shields[i].blocks.push([]);
                for (let k = 0; k < shieldCols; k++) {
                    if (j === 0 && k === 0) {
                        shields[i].blocks[j].push(shieldFactory.createShield('upLeft'))
                    } else if (j === shieldsRows - 2 && k === 1) {
                        shields[i].blocks[j].push(shieldFactory.createShield('down'));
                    } else if (j === 0 && k === shieldCols - 1) {
                        shields[i].blocks[j].push(shieldFactory.createShield('upRight'))
                    } else if (j === shieldsRows - 1 && k === 1) {
                        shields[i].blocks[j].push(shieldFactory.createShield('none'));
                    } else {
                        shields[i].blocks[j].push(shieldFactory.createShield('n'));
                    }
                    shields[i].blocks[j][k].html = document.createElement('div');
                    shields[i].blocks[j][k].html.style.top = parseInt(shields[i].html.style.top) + j * 12 + 'px';
                    shields[i].blocks[j][k].html.style.left = parseInt(shields[i].html.style.left) + k * 18 + 'px';
                    shields[i].blocks[j][k].html.classList.add(shields[i].blocks[j][k].className);
                    shields[i].html.appendChild(shields[i].blocks[j][k].html);
                }
            }
        }
    }

    this.displayInvaders = function () {
        // invadersMatrix[0][0].html.style.left = '5px';
        // invadersMatrix[0][0].html.style.top = '5px';
        // document.body.getElementsByClassName('board')[0].appendChild(invadersMatrix[0][0].html);
        for (let i = 0; i < invadersMatrix.length; i++) {
            for (let j = 0; j < invadersMatrix[i].length; j++) {
                board.appendChild(invadersMatrix[i][j].html);
            }
        }
    }

    this.createAlienBullet = function () {
        let alienBullet = BulletFactory().createBullet('alien');
        let colInd = Math.floor(Math.random() * 10);
        while (aliensPerCol[colInd] === 0) {
            colInd = Math.floor(Math.random() * 10);
        }
        let rowIndex = aliveRows - 1;
        while (invadersMatrix[rowIndex][colInd].display !== true) {
            rowIndex--;
        }
        alienBullet.html = document.createElement('div');
        alienBullet.html.classList.add(alienBullet.className + alienBullet.state);
        alienBullet.html.style.top = parseInt(invadersMatrix[rowIndex][colInd].html.style.top) + invadersMatrix[rowIndex][colInd].height + 'px';
        alienBullet.html.style.left = parseInt(invadersMatrix[rowIndex][colInd].html.style.left) + invadersMatrix[rowIndex][colInd].xP + invadersMatrix[rowIndex][colInd].width / 2 + 'px';
        bullets.push(alienBullet);
        board.appendChild(alienBullet.html);
    }

    this.biggest = function (colIndex) {
        let maxi = -1;
        for (let i = 0; i < aliveRows; i++) {
            if (invadersMatrix[i][colIndex].width > maxi && invadersMatrix[i][colIndex].display === true) {
                maxi = invadersMatrix[i][colIndex].width;
            }
        }
        return maxi;
    }

    this.descending = function () {
        for (let i = 0; i < aliveRows; i++) {
            for (let j = 0; j < aliveCols; j++) {
                // invadersMatrix[i][j].html.style.transform = 'translateY(' + invadersMatrix[i][j].yP + 'px)';
                invadersMatrix[i][j].html.style.top = parseInt(invadersMatrix[i][j].html.style.top) + invadersMatrix[i][j].height + 'px';
                // invadersMatrix[i][j].yP += invadersMatrix[i][j].height;
            }
        }
    }

    this.checkIfCloseToRightBorder = function () {
        let alienWidth = this.biggest(aliveCols - 1);
        console.log(alienWidth);
        for (let i = 0; i < aliveRows; i++) {
            if (parseInt(invadersMatrix[i][aliveCols - 1].html.style.left) + invadersMatrix[i][aliveCols - 1].xP + alienWidth + 10 >= boardWidth) {
                return true;
            }
        }
        return false;
    }

    this.checkIfCloseToLeftBorder = function () {
        let alienWidth = this.biggest(0);
        for (let i = 0; i < aliveRows; i++) {
            if (parseInt(invadersMatrix[i][0].html.style.left) + invadersMatrix[i][0].xP - 10 < 0) {
                return true;
            }
        }
        return false;
    }

    this.moveAliens = function () {
        let direction = 1;
        let goDown = false;
        let oldDirection = 0;
        let timeInterval = setInterval(() => {
            if (goDown === true) {
                this.descending();
                goDown = false;
            }
            if (direction === 1) {
                if (this.checkIfCloseToRightBorder() === true) {
                    direction = -1;
                    goDown = true;
                }
            } else {
                if (this.checkIfCloseToLeftBorder() === true) {
                    direction = 1;
                    goDown = true;
                }
            }
            this.createAlienBullet();
            for (let i = 0; i < aliveRows; i++) {
                for (let j = aliveCols - 1; j >= 0; j--) {
                    if (invadersMatrix[i][j].display === true) {
                        if (invadersMatrix[i][j].state === 1) {
                            invadersMatrix[i][j].html.classList.remove(invadersMatrix[i][j].className + invadersMatrix[i][j].state);
                            invadersMatrix[i][j].state++;
                            invadersMatrix[i][j].html.classList.add(invadersMatrix[i][j].className + invadersMatrix[i][j].state);
                        } else {
                            invadersMatrix[i][j].html.classList.remove(invadersMatrix[i][j].className + invadersMatrix[i][j].state);
                            invadersMatrix[i][j].state--;
                            invadersMatrix[i][j].html.classList.add(invadersMatrix[i][j].className + invadersMatrix[i][j].state);
                        }
                        invadersMatrix[i][j].html.style.transform = 'translateX(' + invadersMatrix[i][j].xP + 'px)';
                        invadersMatrix[i][j].xP += 10 * direction;
                    } else if (invadersMatrix[i][j].display === 'explosion') {
                        console.log('s');
                        invadersMatrix[i][j].html.classList.remove(invadersMatrix[i][j].className);
                        invadersMatrix[i][j].html.classList.add('explosion');
                        invadersMatrix[i][j].html.style.transform = 'translateX(' + invadersMatrix[i][j].xP + 'px)';
                        invadersMatrix[i][j].display = 'disappear';
                    } else if (invadersMatrix[i][j].display === 'disappear') {
                        board.removeChild(invadersMatrix[i][j].html);
                        invadersMatrix[i][j].display = false;
                    }
                }
            }
        }, 500);
    }

    this.damageOnShield = function (k) {
        for (let i = 0; i < shields.length; i++) {
            for (let j = 0; j < shields[i].blocks.length; j++) {
                for (let t = 0; t < shields[i].blocks[j].length; t++) {
                    if (shields[i].blocks[j][t].display === true) {
                        let up = parseInt(shields[i].blocks[j][t].html.style.top);
                        // console.log(parseInt(shields[i].blocks[j][t].html.style.top),parseInt(shields[i].html.style.top));
                        let down = up + shields[i].blocks[j][t].height;
                        let lft = parseInt(shields[i].blocks[j][t].html.style.left);
                        let rght = lft + shields[i].blocks[j][t].width;
                        let bulletLft = parseInt(bullets[k].html.style.left);
                        let bulletBtm = parseInt(bullets[k].html.style.top);
                        // console.log(up,down,lft,rght,bulletLft,bulletBtm);
                        if (bulletLft >= lft && bulletLft < rght && bulletBtm >= up && bulletBtm < down && bullets[k].direction !== 0 && shields[i].blocks[j][t].display === true) {
                            if (shields[i].blocks[j][t].hitCount + 1 < shields[i].blocks[j][t].hitLimit) {
                                if (shields[i].blocks[j][t].hitCount === 0) {
                                    shields[i].blocks[j][t].html.classList.remove(shields[i].blocks[j][t].className)
                                } else {
                                    shields[i].blocks[j][t].html.classList.remove(shields[i].blocks[j][t].className + 'Hit' + shields[i].blocks[j][t].hitCount);
                                }
                                shields[i].blocks[j][t].hitCount += 1;
                                shields[i].blocks[j][t].html.classList.add(shields[i].blocks[j][t].className + 'Hit' + shields[i].blocks[j][t].hitCount);
                            } else {
                                shields[i].blocks[j][t].display = false;
                                shields[i].html.removeChild(shields[i].blocks[j][t].html);
                            }
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }

    this.damageOnPlayer = function (k) {
        return playerShip.isHit(parseInt(bullets[k].html.style.left), parseInt(bullets[k].html.style.top));
    }

    this.damageOnInvaders = function (k) {
        let bulletLft = parseInt(bullets[k].html.style.left);
        let bulletTop = parseInt(bullets[k].html.style.top);
        for (let i = 0; i < aliveRows; i++) {
            for (let j = 0; j < aliveCols; j++) {
                if (invadersMatrix[i][j].display === true) {
                    let lft = parseInt(invadersMatrix[i][j].html.style.left) + invadersMatrix[i][j].xP;
                    let rght = parseInt(invadersMatrix[i][j].html.style.left) + invadersMatrix[i][j].xP + invadersMatrix[i][j].width;
                    let top = parseInt(invadersMatrix[i][j].html.style.top);
                    let btm = parseInt(invadersMatrix[i][j].html.style.top) + invadersMatrix[i][j].height;
                    if (lft <= bulletLft && rght >= bulletLft && top <= bulletTop && bulletTop <= btm) {
                        // invadersMatrix[i][j].html.classList.remove(invadersMatrix[i][j].className);
                        // invadersMatrix[i][j].html.classList.add('explosion');
                        invadersMatrix[i][j].display = 'explosion';
                        return true;
                    }
                }
            }
        }
    }

    this.manageBullets = function () {
        let indexesForBulletsOut = [];
        for (let i = 0; i < bullets.length; i++) {
            bullets[i].html.style.top = parseInt(bullets[i].html.style.top) + bullets[i].speed * bullets[i].direction + 'px';
            if (bullets[i].numberOfStates > 1) {
                bullets[i].html.classList.remove(bullets[i].className + bullets[i].state);
                if (bullets[i].state === 1) {
                    bullets[i].state = 2;
                } else {
                    bullets[i].state = 1;
                }
                bullets[i].html.classList.add(bullets[i].className + bullets[i].state);
            }
            if (this.damageOnShield(i) === true) {
                indexesForBulletsOut.push(i);
                board.removeChild(bullets[i].html);
                bullets[i].fired = false;
            }
            if (this.damageOnInvaders(i) === true) {
                indexesForBulletsOut.push(i);
                board.removeChild(bullets[i].html);
                bullets[i].fired = false;
            }
            // if(this.damageOnPlayer(i) === true){
            //     playerShip.deadTransition();
            // }
            if (parseInt(bullets[i].html.style.top) + 10 * bullets[i].direction < 0 || parseInt(bullets[i].html.style.top) + 10 * bullets[i].direction > boardHeight) {
                // board.removeChild(bullets[i].html);
                board.removeChild(bullets[i].html);
                bullets[i].fired = false;
                indexesForBulletsOut.push(i);
            }
        }
        let deSc = 0;
        for (let i = 0; i < indexesForBulletsOut.length; i++) {
            bullets.splice(indexesForBulletsOut[i] - deSc, 1);
            deSc++;
        }
    }

    this.environmentChanges = function () {
        let envInterval = setInterval(() => {
            if (playerShip.bulletReady() === true) {
                bullets.push(playerShip.getBullet());
                board.appendChild(bullets[bullets.length - 1].html);
            }
            this.manageBullets();
            // this.damageOnObject();
        }, 10);
    }

    this.gameCycle = function () {
        this.moveAliens();
        this.environmentChanges();
    }

    this.displayShields = function () {
        for (let i = 0; i < shields.length; i++) {
            board.appendChild(shields[i].html);
        }
    }

    this.setupShip = function () {
        playerShip = new PlayerShip(board, -400, 316);
        playerShip.createShip();
        playerShip.displayShip();
    }

    // console.log(document.getElementsByClassName('board')[0].offsetWidth);
    // console.log(document.getElementsByClassName('board')[0].offsetHeight);
}