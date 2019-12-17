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
let gameIt = 0;
let keyDown = false;
let add = 0;
let lastFull = 0;
let pause = false;
let lTime = undefined;
let fullRows = 0;
function startGame(squares,rows,cols,time){
    function resetGame(){
        for(let i=0;i<rows;i++){
            for(let j=0;j<cols;j++){
                squares[i][j].style.backgroundColor = 'black';
                squares[i][j].style.border = '1px solid white';
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
        let Fr = 0;
        for(let it = 0; it < rows; it++){
            counter = 0;
            for(let i=0;i<cols;i++){
                if(matrix[it][i] === 2){
                    counter += 1;
                }
            }
            if(counter === cols){
                Fr++;
                if(Fr > fullRows){
                    fullRows = Fr;
                    label.innerText = 'Completed rows: ' + fullRows.toString();
                }
            }
        }
    }

    function cleanGrid(){
        for(let i=0;i<rows;i++){
            for(let j=0;j<cols;j++){
                if(matrix[i][j] === 1){
                    matrix[i][j] = 0;
                    squares[i][j].style.backgroundColor = 'black';
                    squares[i][j].style.border = '1px solid white';
                }
            }
        }
    }

    function colorGrid(){
        for(let i=0;i<rows;i++){
            for(let j=0;j<cols;j++){
                if(matrix[i][j] > 0){
                    squares[i][j].style.backgroundColor = 'white';
                    squares[i][j].style.border = '1px solid black';
                }
            }
        }
    }

    document.addEventListener('keyup',function(e){
        keyDown = false;
        if(lTime !== undefined){
            time = lTime;
            lTime = undefined;
        }
    });

    document.addEventListener('keydown',function(e){
        let prPosY = posY;
        let prPosX = posX;
        if(keyDown === false && posX < rows){
            keyDown = true;
            if(e.keyCode === 37){
                if(posY - 1 >= 0){
                    if(matrix[posX][posY-1] === 0){
                        posY -= 1
                    }
                }
            }else if(e.keyCode === 39){
                if(posY + 1 < cols){
                    if(matrix[posX][posY+1] === 0){
                        posY += 1;
                    }
                }
            }else if(e.keyCode === 40){
                if(posX + 1 < rows){
                    if(matrix[posX+1][posY] === 0){
                        posX += 1;
                    }
                }
            }
        }
        if(keyDown === true){
            window.requestAnimationFrame(()=>{
                cleanGrid();
                if(posX < rows && posY < cols){
                    if(matrix[prPosX][prPosY] != 2 && matrix[posX][posY] == 0){
                        matrix[prPosX][prPosY] = 0;
                        squares[prPosX][prPosY].style.backgroundColor = 'black';
                        squares[prPosX][prPosY].style.border = '1px solid white';
                        matrix[posX][posY] = 1;
                        squares[posX][posY].style.backgroundColor = 'white';
                        squares[posX][posY].style.border = '1px solid black';
                    }
                }
                keyDown = false;
            });
        }
    });

    setInterval(()=>{
        if(isPaused === false){
            if(posX === 0 && matrix[posX][posY] === 2){
                resetGame();
            }
            if(posX === rows){
                matrix[posX-1][posY] = 2;
                posX = 0;
                countRows();
            }
            else{
                if(matrix[posX][posY] === 2){
                    matrix[posX-1][posY] = 2;
                    // squares[posX-1][posY].style.backgroundColor = 'white';
                    // squares[posX-1][posY].style.border = '1px solid black';
                    colorGrid();
                    countRows();
                    posX = 0;
                }else{
                    cleanGrid();
                    matrix[posX][posY] = 1;
                    colorGrid();
                    // squares[posX][posY].style.backgroundColor = 'white';
                    // squares[posX][posY].style.border = '1px solid black';
                    posX++;
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
    // document.addEventListener('keydown',function(e){
    //     let prPosY = posY;
    //     if(e.keyCode === 37){
    //         if(posY - 1 >= 0){
    //             posY -= 1;
    //         }
    //     }else if(e.keyCode === 39){
    //         if(posY + 1 < rows){
    //             posY += 1;
    //         }
    //     }
    //     window.requestAnimationFrame(()=>{
    //         matrix[posX][prPosY] = 0;
    //         squares[posX][prPosY].style.backgroundColor = 'black';
    //         squares[posX][prPosY].style.border = '1px solid white';
    //         matrix[posX][posY] = 1;
    //         squares[posX][posY].style.backgroundColor = 'white';
    //         squares[posX][posY].style.border = '1px solid black';
    //     });
    // });
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
            square.style.border = '1px solid white';
            square.style.backgroundColor = 'black';
            squares[i].push(square);
            matrix[i].push(0);
            gameBoard.appendChild(square);
        }
    }
    startGame(squares,rows,cols,250/speed);
}
makeControls();