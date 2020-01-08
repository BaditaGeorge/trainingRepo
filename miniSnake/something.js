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
                        //s-a muscat
                        gameMatrix[snakeCellPosition.x - toChangePosition[0]][snakeCellPosition.y - toChangePosition[1]] = 0;
                        gameDivs[snakeCellPosition.x - toChangePosition[0]][snakeCellPosition.y - toChangePosition[1]].style.backgroundColor = 'green';
                    } else {
                        //am mutat coada
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
                    if ((snakeCellPosition.dir === 'u' && newDir !== 'd') ||
                        (snakeCellPosition.dir === 'd' && newDir !== 'u') ||
                        (snakeCellPosition.dir === 'l' && newDir !== 'r') ||
                        (snakeCellPosition.dir === 'r' && newDir !== 'l')) {
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