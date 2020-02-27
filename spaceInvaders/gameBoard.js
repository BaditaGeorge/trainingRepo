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
                console.log(invadersMatrix[i][j]);
                invadersMatrix[i][j].html = document.createElement('div');
                invadersMatrix[i][j].html.style.left = j * alienBlockSize + 'px';
                invadersMatrix[i][j].html.style.top = i * alienBlockSize + 'px';
                invadersMatrix[i][j].html.classList.add(invadersMatrix[i][j].className + invadersMatrix[i][j].state);
            }
        }
        // console.log(invadersMatrix);
    }

    this.createShields = function(){
        for(let i=0;i<numberOfShields;i++){
            shields.push(shieldFactory.createShield('shield'));
            shields[i].html = document.createElement('div');
            shields[i].html.style.left = '20px';
            shields[i].html.style.top = '450px';
            for(let j=0;j<shieldsRows;j++){
                shields[i].blocks.push([]);
                for(let k=0;k<shieldCols;k++){
                    if(j === 0 && k === 0){
                        shields[i].blocks[j].push(shieldFactory.createShield('upLeft'))
                    }else if(j === shieldsRows - 2 && k === 1){
                        shields[i].blocks[j].push(shieldFactory.createShield('down'));
                    }else if(j === 0 && k === shieldCols - 1){
                        shields[i].blocks[j].push(shieldFactory.createShield('upRight'))
                    }else if(j === shieldsRows - 1 && k === 1){
                        shields[i].blocks[j].push(shieldFactory.createShield('none'));
                    }else{
                        shields[i].blocks[j].push(shieldFactory.createShield('n'));
                    }
                    shields[i].blocks[j][k].html = document.createElement('div');
                    shields[i].blocks[j][k].html.style.top = parseInt(shields[i].html.style.top) + j*12 + 'px';
                    shields[i].blocks[j][k].html.style.left = parseInt(shields[i].html.style.left) + k*18 + 'px';
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

    this.displayShields = function(){

        
        document.body.appendChild(shields[0].html);
        // for(let i=0;i<shields.length;i++){
            
        // }

    }

    // console.log(document.getElementsByClassName('board')[0].offsetWidth);
    // console.log(document.getElementsByClassName('board')[0].offsetHeight);
}