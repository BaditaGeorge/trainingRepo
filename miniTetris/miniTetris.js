let isPaused = false;
let label;
function makeControls(){
    let btn = document.createElement('button');
    let btn2 = document.createElement('button');
    let txtBox = document.createElement('input');
    let txtBox2 = document.createElement('input');
    let txtBox3 = document.createElement('input');
    let newDiv = document.createElement('div');
    label = document.createElement('label');
    label.innerText = 'Completed rows: 0';
    txtBox.value = 'Number of Lines';
    txtBox2.value = 'Number of Columns';
    txtBox3.value = 'Game speed';
    btn.innerText = 'Start';
    btn2.innerText = 'Play/Pause';
    txtBox.style.display='block';
    txtBox2.style.display='block';
    txtBox3.style.display='block';
    txtBox2.style.marginTop = '5px';
    label.style.display = 'block';
    txtBox3.style.marginTop = '5px';
    txtBox3.style.marginBottom = '5px';
    btn.addEventListener('click',function(){
        if(!isNaN(txtBox.value) && !isNaN(txtBox2.value) && !isNaN(txtBox3.value)){
            generateGame(parseInt(txtBox.value),parseInt(txtBox2.value),parseInt(txtBox3.value));
        }
    });
    btn2.addEventListener('click',function(){
        if(isPaused === false){
            isPaused = true;
        }else{
            isPaused = false;
        }
    });
    newDiv.appendChild(txtBox);
    newDiv.appendChild(txtBox2);
    newDiv.appendChild(txtBox3);
    newDiv.appendChild(btn);
    newDiv.appendChild(btn2);
    newDiv.appendChild(label);
    document.body.appendChild(newDiv);
}
let squares = [];
let matrix = [];
let gameBoard;
let posX = 0 , posY = 0;
let lastX = 0,lastY = 0;
let lastY_2 = 0;
let gameIt = 0;
let keyDown = false;
let add = 0;
let lastFull = 0;
let pause = false;
let fullRows = 0;
function startGame(squares,rows,cols,time){
    function resetGame(){
        for(let i=0;i<rows;i++){
            for(let j=0;j<cols;j++){
                squares[i][j].style.visibility = 'hidden';
                matrix[i][j] = 0;
            }
        }
        posX = 0;
        posY = 0;
        fullRows = 0;
        lastFull = rows - 1;
        label.innerText = 'Completed rows: 0';
    }
    function countRows(){
        let counter = 0;
        for(let i=0;i<cols;i++){
            if(matrix[lastFull][i] === 1){
                counter += 1;
            }
        }
        if(counter === cols){
            lastFull = lastFull - 1;
            fullRows += 1;
            label.innerText = 'Completed rows: ' + fullRows.toString();
        }
    }
    setInterval(()=>{
        if(keyDown === false && isPaused === false){
            if(posX === rows){
                posX = 0;
                countRows();
                if(matrix[posX][posY] === 1){
                    resetGame();
                }
            }
            if(matrix[posX][posY] === 1){
                posX = 0;
                countRows();
                if(matrix[posX][posY] === 1){
                    resetGame();
                }
            }else{
                if(matrix[posX][posY] === 0){
                    if(posX > 0){
                        squares[posX-1][posY].style.visibility = 'hidden';
                        matrix[posX-1][posY] = 0;
                    }
                    squares[posX][posY].style.visibility = 'visible';
                    matrix[posX][posY] = 1;
                    posX += 1;
                }
            }
        }
    },time);
}
function prepare(rows){
    posX++;
    keyDown = false;
}
function generateGame(rows,cols,speed){
    if(gameBoard !== undefined){
        squares = [];
        matrix = [];
        gameBoard.style.display = 'none';
    }
    lastFull = rows-1;
    posX = 0;
    posY = 0;
    gameBoard = document.createElement('div');
    gameBoard.style.height = (rows*20 + 2) + 'px';
    gameBoard.style.width = (cols*20 + 2) + 'px';
    gameBoard.style.position = 'relative';
    gameBoard.style.backgroundColor = 'black';
    gameBoard.style.marginLeft = '200px';
    gameBoard.style.marginTop = '-100px';
    document.body.addEventListener('keydown',function(e){
        if(keyDown === false){
            if((e.keyCode === 37 && posY - 1 >= 0)){
                if(matrix[posX][posY-1] === 0){
                    keyDown = true;
                    posX--;
                    squares[posX][posY].style.visibility = 'hidden';
                    matrix[posX][posY] = 0;
                }
            }else if((e.keyCode === 39 && posY + 1 < cols)){
                if(matrix[posX][posY+1] === 0){
                    keyDown = true;
                    posX--;
                    squares[posX][posY].style.visibility = 'hidden';
                    matrix[posX][posY] = 0;
                }
            }else if(e.keyCode === 40 && posX < rows){
                if(matrix[posX][posY] === 0){
                    keyDown = true;
                    posX--;
                    squares[posX][posY].style.visibility = 'hidden';
                    matrix[posX][posY] = 0;
                }
            }
        }
        
        if(keyDown === true){
            if(e.keyCode === 37){
                if(posY - 1 >= 0){
                    if(matrix[posX][posY-1] === 0){
                        requestAnimationFrame(()=>{
                            squares[posX][posY].style.visibility = 'hidden';
                            matrix[posX][posY] = 0;
                            squares[posX][posY-1].style.visibility = 'visible';
                            matrix[posX][posY-1] = 1;
                            posY -= 1;
                        });
                    }else{
                        prepare(rows);
                    }
                }else{
                    prepare(rows);
                }
            }else if(e.keyCode === 39){
                if(posY + 1 < cols){
                    if(matrix[posX][posY+1] === 0){
                        requestAnimationFrame(()=>{
                            squares[posX][posY].style.visibility = 'hidden';
                            matrix[posX][posY] = 0;
                            squares[posX][posY+1].style.visibility = 'visible';
                            matrix[posX][posY+1] = 1;
                            posY += 1;
                        });
                    }else{
                        prepare(rows);
                    }
                }else{
                    prepare(rows);
                }
            }else if(e.keyCode === 40){
                if(posX + 1 < rows){
                    if(matrix[posX+1][posY] === 0){
                        requestAnimationFrame(()=>{
                            squares[posX][posY].style.visibility = 'hidden';
                            matrix[posX][posY] = 0;
                            squares[posX+1][posY].style.visibility = 'visible';
                            matrix[posX+1][posY] = 1;
                            posX += 1;
                        });
                    }else{
                        prepare(rows);
                    }
                }else{
                    prepare(rows);
                }
            }
        }
    });
    document.body.addEventListener('keyup',function(e){
        if(keyDown === true){
            posX += 1;
            keyDown = false;
        }
    });
    document.querySelector('body').appendChild(gameBoard);
    for(let i=0;i<rows;i++){
        squares.push([]);
        matrix.push([]);
        for(let j=0;j<cols;j++){
            let square = document.createElement('div');
            square.style.position = 'absolute';
            square.style.height = 20 + 'px';
            square.style.width = 20 + 'px';
            square.style.top = i*20 + 'px';
            square.style.left = j*20 + 'px';
            square.style.border = '1px solid black';
            square.style.backgroundColor = 'white';
            square.style.visibility = 'hidden';
            squares[i].push(square);
            matrix[i].push(0);
            gameBoard.appendChild(square);
        }
    }
    gameIt++;
    startGame(squares,rows,cols,250/speed);
}
makeControls();