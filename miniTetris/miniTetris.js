function makeControls(){
    let btn = document.createElement('button');
    let txtBox = document.createElement('input');
    let txtBox2 = document.createElement('input');
    let txtBox3 = document.createElement('input');
    let newDiv = document.createElement('div');
    txtBox.value = 'Number of Lines';
    txtBox2.value = 'Number of Columns';
    txtBox3.value = 'Game speed';
    btn.innerText = 'Play';
    txtBox.style.display='block';
    txtBox2.style.display='block';
    txtBox3.style.display='block';
    txtBox2.style.marginTop = '5px';
    txtBox3.style.marginTop = '5px';
    txtBox3.style.marginBottom = '5px';
    btn.addEventListener('click',function(){
        if(!isNaN(txtBox.value) && !isNaN(txtBox2.value) && !isNaN(txtBox3.value)){
            generateGame(parseInt(txtBox.value),parseInt(txtBox2.value));
        }
    });
    newDiv.appendChild(txtBox);
    newDiv.appendChild(txtBox2);
    newDiv.appendChild(txtBox3);
    newDiv.appendChild(btn);
    document.body.appendChild(newDiv);
}
let squares = [];
let matrix = [];
let gameBoard;
let posX = 0 , posY = 0;
let lastX,lastY = 0;
let lastY_2 = 0;
let gameIt = 0;
let keyDown = false;
let add = 0;
function startGame(squares,rows,cols,time){
    // setTimeout(()=>{
    //     if(posX !== 0 && posX !== rows){
    //         console.log(matrix[posX][posY]);
    //         if(lastX !== rows - 1 || matrix[posX][posY] === 0){
    //             squares[lastX][lastY].style.visibility = 'hidden';
    //             matrix[lastX][lastY] = 0;
    //         }else{
    //             console.log('bounce');
    //         }
    //     }
    //     if(posX === rows){
    //         posX = 0;
    //     }else{
    //         if(matrix[posX][posY] === 1){
    //             posX = 0;
    //         }
    //     }
    //     squares[posX][posY].style.visibility = 'visible';
    //     matrix[posX][posY] = 1;
    //     lastX = posX;
    //     lastY = posY;
    //     if(keyDown === false){
    //         posX += 1;
    //     }
    //     if(currGameIt === gameIt){
    //         startGame(squares,rows,cols,currGameIt,time);
    //     }
    // },time);
    setInterval(()=>{
        if(posX !== 0 && posX !== rows){
            if(lastX === rows - 2){
                console.log(matrix[posX][posY]);
            }
            if(lastX !== rows - 1 && matrix[posX][posY] === 0){
                squares[lastX][lastY].style.visibility = 'hidden';
                matrix[lastX][lastY] = 0;
            }
        }
        if(posX === rows){
            posX = 0;
        }else{
            if(matrix[posX][posY] === 1){
                posX = 0;
            }
        }
        squares[posX][posY].style.visibility = 'visible';
        matrix[posX][posY] = 1;
        lastX = posX;
        lastY = posY;
        if(keyDown === false){
            posX += 1;
        }
        posY = posY + add;
        add = 0;
    },time);
}
function generateGame(rows,cols){
    if(gameBoard !== undefined){
        squares = [];
        matrix = [];
        gameBoard.style.display = 'none';
    }
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
        keyDown = true;
        if(add === 0){
            if(e.keyCode === 37){
                if(posY - 1 >= 0){
                    if(matrix[posX][posY-1] === 0){
                        add = -1;
                    }
                }
            }else if(e.keyCode === 39){
                if(posY + 1 < cols){
                    if(matrix[posX][posY+1] === 0){
                        add = 1;
                    }
                }
            }
        }
    });
    document.body.addEventListener('keyup',function(e){
        keyDown = false;
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
    startGame(squares,rows,cols,250);
}
makeControls();