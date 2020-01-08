let gameBoard;
let gameDivs = [];
let gameMatrix = [];
let snake = [];
let dir = 'd';
let rows_Nr = 18;
let cols_Nr = 36;
let bonusX, bonusY;
const UP = 'u';
const DOWN = 'd';
const LEFT = 'l';
const RIGHT = 'r';

function createBoardGame() {
    gameBoard = document.createElement('div');
    gameBoard.style.position = 'relative';
    gameBoard.style.backgroundColor = 'green';
    gameBoard.style.width = '1800px';
    gameBoard.style.height = '900px';
    gameDivs = [];
    for (let i = 0; i <= rows_Nr + 1; i++) {
        gameDivs.push([]);
        gameMatrix.push([]);
        for (let j = 0; j <= cols_Nr + 1; j++) {
            gameDiv = document.createElement('div');
            if (i == 0 || i == rows_Nr + 1 || j == 0 || j == cols_Nr + 1) {
                gameDiv.style.backgroundColor = 'white';
                gameMatrix[i].push(-1);
            } else {
                gameDiv.style.backgroundColor = 'green';
                gameMatrix[i].push(0);
            }
            gameDiv.style.position = 'absolute';
            gameDiv.style.width = '50px';
            gameDiv.style.height = '50px';
            gameDiv.style.top = `${i * 50}px`;
            gameDiv.style.left = j * 50 + 'px';
            gameDivs[i].push(gameDiv);
            gameBoard.appendChild(gameDivs[i][j]);
        }
    }
    // gameDivs[rows_Nr-1][cols_Nr-1].style.backgroundColor = 'red';
    document.querySelector('body').appendChild(gameBoard);
}

function positionsChange(dir) {
    if (dir === DOWN) {
        return [1, 0];
    } else if (dir === UP) {
        return [-1, 0];
    } else if (dir === LEFT) {
        return [0, -1];
    } else if (dir === RIGHT) {
        return [0, 1];
    }
}

function addBonus() {
    if (bonusX === undefined && bonusY === undefined || gameMatrix[bonusX][bonusY] !== 2) {
        bonusX = Math.floor(Math.random() * rows_Nr) + 1;
        bonusY = Math.floor(Math.random() * cols_Nr) + 1;
        while (gameMatrix[bonusX][bonusY] !== 0) {
            bonusX = Math.floor(Math.random() * rows_Nr) + 1;
            bonusY = Math.floor(Math.random() * cols_Nr) + 1;
        }
        gameMatrix[bonusX][bonusY] = 2;
        gameDivs[bonusX][bonusY].style.backgroundColor = 'yellow';
    }
}

function gameCycle(time) {
    setInterval(() => {
        addBonus();
        let length = snake.length;
        for (let index = 0; index < length; index++) {
            let snakeCellPosition = snake[index];
            let toChangePosition;
            if (snakeCellPosition.dir !== undefined) {
                toChangePosition = positionsChange(snakeCellPosition.dir);
            }
            if (gameMatrix[snakeCellPosition.x][snakeCellPosition.y] === 0 ||
                gameMatrix[snakeCellPosition.x][snakeCellPosition.y] === 2 ||
                gameMatrix[snakeCellPosition.x][snakeCellPosition.y] === 'd' ||
                gameMatrix[snakeCellPosition.x][snakeCellPosition.y] === 'u' ||
                gameMatrix[snakeCellPosition.x][snakeCellPosition.y] === 'l' ||
                gameMatrix[snakeCellPosition.x][snakeCellPosition.y] === 'r') {
                if (gameMatrix[snakeCellPosition.x - toChangePosition[0]][snakeCellPosition.y - toChangePosition[1]] !== -1) {
                    if (gameMatrix[snakeCellPosition.x - toChangePosition[0]][snakeCellPosition.y - toChangePosition[1]] === 1) {
                        //mut un element din corpul snake-ului daca pozitia anterioara este tot o parte din corpul snake-ului
                        gameMatrix[snakeCellPosition.x - toChangePosition[0]][snakeCellPosition.y - toChangePosition[1]] = 0;
                        gameDivs[snakeCellPosition.x - toChangePosition[0]][snakeCellPosition.y - toChangePosition[1]].style.backgroundColor = 'green';
                    } else {
                        //daca pozitia anterioara nu este o parte din corpul snake-ului, facem o operatie doar daca ne aflam la coada snake-ului
                        if (index === length - 1) {
                            gameMatrix[snakeCellPosition.x - toChangePosition[0]][snakeCellPosition.y - toChangePosition[1]] = 0;
                            gameDivs[snakeCellPosition.x - toChangePosition[0]][snakeCellPosition.y - toChangePosition[1]].style.backgroundColor = 'green';
                        }
                    }
                }
                if (gameMatrix[snakeCellPosition.x][snakeCellPosition.y] === 0 || 
                    gameMatrix[snakeCellPosition.x][snakeCellPosition.y] === 2) {
                    if (gameMatrix[snakeCellPosition.x][snakeCellPosition.y] === 2 || snake.length < 3) {
                        //let positionsCh = positionsChange(snake[leng-1].dir);
                        snake.push({ x: snake[length - 1].x, 
                            y: snake[length - 1].y,
                            dir: snake[length - 1].dir });
                    }
                    gameMatrix[snakeCellPosition.x][snakeCellPosition.y] = 1;
                    gameDivs[snakeCellPosition.x][snakeCellPosition.y].style.backgroundColor = 'blue';
                    snakeCellPosition.x += toChangePosition[0];
                    snakeCellPosition.y += toChangePosition[1];
                } else {
                    gameDivs[snakeCellPosition.x][snakeCellPosition.y].style.backgroundColor = 'blue';
                    let newDir = gameMatrix[snakeCellPosition.x][snakeCellPosition.y];
                    if ((snakeCellPosition.dir === UP && newDir !== DOWN) ||
                        (snakeCellPosition.dir === DOWN && newDir !== UP) ||
                        (snakeCellPosition.dir === LEFT && newDir !== RIGHT) ||
                        (snakeCellPosition.dir === RIGHT && newDir !== LEFT)) {
                        snakeCellPosition.dir = newDir;
                    } else {
                        gameMatrix[snakeCellPosition.x][snakeCellPosition.y] = 1;
                    }
                    toChangePosition = positionsChange(snakeCellPosition.dir);
                    snakeCellPosition.x += toChangePosition[0];
                    snakeCellPosition.y += toChangePosition[1];
                }
            } else  {
                resetGame();
                break;
            }
        }
    }, time);
}

function resetGame() {
    gameMatrix = [];
    for (let i = 0; i < rows_Nr; i++) {
        for (let j = 0; j < cols_Nr; j++) {
            gameDivs[i][j].style.display = 'none';
        }
    }
    gameDivs = [];
    gameBoard.style.display = 'none';
    gameBoard = undefined;
    snake = [];
    snakey();
    createBoardGame();
    
}


document.querySelector('body').addEventListener('keydown', function (e) {
    if (gameMatrix[snake[0].x][snake[0].y] !== -1) {
        if (e.keyCode === 37) {
            gameMatrix[snake[0].x][snake[0].y] = LEFT;
        } else if (e.keyCode === 38) {
            gameMatrix[snake[0].x][snake[0].y] = UP;
        } else if (e.keyCode === 39) {
            gameMatrix[snake[0].x][snake[0].y] = RIGHT;
        } else if (e.keyCode === 40) {
            gameMatrix[snake[0].x][snake[0].y] = DOWN;
        }
    }
});

function snakey() {
    snake.push({ x: 1, y: 7, dir: 'd' });
}


createBoardGame();
snakey();
gameCycle(100);