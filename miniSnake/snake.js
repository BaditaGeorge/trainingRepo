let gameBoard;
let gameDivs = [];
let gameMatrix = [];
let snake = [];
let dir = 'd';
let rows_Nr = 18;
let cols_Nr = 36;
let bonusX,bonusY;

function createBoardGame(){
    gameBoard = document.createElement('div');
    gameBoard.style.position = 'relative';
    gameBoard.style.backgroundColor = 'green';
    gameBoard.style.width = '1800px';
    gameBoard.style.height = '900px';
    gameDivs = [];
    for(let i=0;i<=rows_Nr+1;i++){
        gameDivs.push([]);
        gameMatrix.push([]);
        for(let j=0;j<=cols_Nr+1;j++){
            gameDiv = document.createElement('div');
            if(i == 0 || i == rows_Nr + 1 || j == 0 || j == cols_Nr + 1){
                gameDiv.style.backgroundColor = 'white';
                gameMatrix[i].push(-1);
            }else{
                gameDiv.style.backgroundColor = 'green';
                gameMatrix[i].push(0);
            }
            gameDiv.style.position = 'absolute';
            gameDiv.style.width = '50px';
            gameDiv.style.height = '50px';
            gameDiv.style.top = i*50 + 'px';
            gameDiv.style.left = j*50 + 'px';
            gameDivs[i].push(gameDiv);
            gameBoard.appendChild(gameDivs[i][j]);
        }
    }
    // gameDivs[rows_Nr-1][cols_Nr-1].style.backgroundColor = 'red';
    document.querySelector('body').appendChild(gameBoard);
}

function positionsChange(dir){
    if(dir === 'd'){
        return [1,0];
    }else if(dir === 'u'){
        return [-1,0];
    }else if(dir === 'l'){
        return [0,-1];
    }else if(dir === 'r'){
        return [0,1];
    }
}

function gameCycle(time){
    setInterval(()=>{
        if(bonusX === undefined && bonusY === undefined || gameMatrix[bonusX][bonusY] !== 2){
            bonusX = Math.floor(Math.random() * rows_Nr) + 1;
            bonusY = Math.floor(Math.random() * cols_Nr) + 1;
            while(gameMatrix[bonusX][bonusY] !== 0){
                bonusX = Math.floor(Math.random() * rows_Nr) + 1;
                bonusY = Math.floor(Math.random() * cols_Nr) + 1;
            }
            gameMatrix[bonusX][bonusY] = 2;
            gameDivs[bonusX][bonusY].style.backgroundColor = 'yellow';
        }
        let leng = snake.length;
        for(let index = 0; index < leng; index++){
            let cell = snake[index];
            let pC;
            if(cell.dir !== undefined){
                pC = positionsChange(cell.dir);
            }
            if(gameMatrix[cell.x][cell.y] === 0 || gameMatrix[cell.x][cell.y] === 2 || gameMatrix[cell.x][cell.y] === 'd' || gameMatrix[cell.x][cell.y] === 'u' || gameMatrix[cell.x][cell.y] === 'l' || gameMatrix[cell.x][cell.y] === 'r'){
                if(gameMatrix[cell.x-pC[0]][cell.y - pC[1]] !== -1){
                    if(gameMatrix[cell.x-pC[0]][cell.y - pC[1]] === 1){
                        gameMatrix[cell.x-pC[0]][cell.y-pC[1]] = 0;
                        gameDivs[cell.x - pC[0]][cell.y - pC[1]].style.backgroundColor = 'green';
                    }else{
                        if(index === leng - 1){
                            gameMatrix[cell.x - pC[0]][cell.y - pC[1]] = 0;
                            gameDivs[cell.x - pC[0]][cell.y - pC[1]].style.backgroundColor = 'green';
                        }
                    }
                }
                if(gameMatrix[cell.x][cell.y] === 0 || gameMatrix[cell.x][cell.y] === 2){
                    if(gameMatrix[cell.x][cell.y] === 2 || snake.length < 3){
                        //let positionsCh = positionsChange(snake[leng-1].dir);
                        snake.push({x:snake[leng-1].x,y:snake[leng-1].y,dir:snake[leng-1].dir});
                    }
                    gameMatrix[cell.x][cell.y] = 1;
                    gameDivs[cell.x][cell.y].style.backgroundColor = 'blue';
                    cell.x += pC[0];
                    cell.y += pC[1];
                }else{
                    gameDivs[cell.x][cell.y].style.backgroundColor = 'blue';
                    let newDir = gameMatrix[cell.x][cell.y];
                    if((cell.dir === 'u' && newDir !== 'd') || (cell.dir === 'd' && newDir !== 'u') || (cell.dir === 'l' && newDir !== 'r') || (cell.dir === 'r' && newDir !== 'l')){
                        cell.dir = newDir;
                    }else{
                        gameMatrix[cell.x][cell.y] = 1;
                    }
                    pC = positionsChange(cell.dir);
                    cell.x += pC[0];
                    cell.y += pC[1];
                }
            }else{
                gameMatrix = [];
                for(let i=0;i<rows_Nr;i++){
                    for(let j=0;j<cols_Nr;j++){
                        gameDivs[i][j].style.display = 'none';
                    }
                }
                gameDivs = [];
                gameBoard.style.display = 'none';
                gameBoard = undefined;
                snake = [];
                snakey();
                createBoardGame();
                break;
            }
        }
    },time);
}

document.querySelector('body').addEventListener('keydown',function(e){
    let pC = positionsChange(snake[0].dir);
    if(gameMatrix[snake[0].x][snake[0].y] !== -1){
        if(e.keyCode === 37){
            gameMatrix[snake[0].x][snake[0].y] = 'l';
        }else if(e.keyCode === 38){
            gameMatrix[snake[0].x][snake[0].y] = 'u';
        }else if(e.keyCode === 39){
            gameMatrix[snake[0].x][snake[0].y] = 'r';
        }else if(e.keyCode === 40){
            gameMatrix[snake[0].x][snake[0].y] = 'd';
        }
    }
});

function snakey(){
    snake.push({x:1,y:7,dir:'d'});
}


createBoardGame();
snakey();
gameCycle(100);