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
    let keyDown = false;
    let shields = [];

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

    this.biggest = function(colIndex){
        let maxi = -1;
        for(let i=0;i<aliveRows;i++){
            if(invadersMatrix[i][colIndex].width > maxi && invadersMatrix[i][colIndex].display === true){
                maxi = invadersMatrix[i][colIndex].width;
            }
        }
        return maxi;
    }

    this.descending = function(){
        for(let i=0;i<aliveRows;i++){
            for(let j=0;j<aliveCols;j++){
                // invadersMatrix[i][j].html.style.transform = 'translateY(' + invadersMatrix[i][j].yP + 'px)';
                invadersMatrix[i][j].html.style.top = parseInt(invadersMatrix[i][j].html.style.top) + invadersMatrix[i][j].height + 'px';
                // invadersMatrix[i][j].yP += invadersMatrix[i][j].height;
            }
        }
    }

    this.moveAliens = function () {
        let direction = 0;
        let goDownLeft = false;
        let goDownRight = false;
        let oldDirection = 0;
        let timeInterval = setInterval(() => {
            let alienWidth = this.biggest(aliveCols-1);

            if (direction === 0) {
                for (let i = 0; i < aliveRows; i++) {
                    for (let j = aliveCols - 1; j >= 0; j--) {
                        if(direction === oldDirection && goDownLeft === true){
                            this.descending();
                            goDownLeft = false;
                        }
                        oldDirection = direction;
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
                        if (parseInt(invadersMatrix[i][j].html.style.left) + invadersMatrix[i][j].xP + alienWidth + 18.7 >= boardWidth) {
                            direction = 1 - direction;
                            goDownRight = true;
                        }
                        invadersMatrix[i][j].xP += 10;
                    }
                }
            } else {
                if(direction === oldDirection && goDownRight === true){
                    this.descending();
                    goDownRight = false;
                }
                oldDirection = direction;
                for (let i = 0; i < aliveRows; i++) {
                    for (let j = 0; j < aliveCols; j++) {
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
                        if (parseInt(invadersMatrix[i][j].html.style.left) + invadersMatrix[i][j].xP - 15 < 0) {
                            oldDirection = direction;
                            direction = 1 - direction;
                            goDownLeft = true;
                        }
                        invadersMatrix[i][j].xP -= 10;
                    }
                }
            }

        }, 500);
    }

    this.gameCycle = function () {
        this.moveAliens();
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