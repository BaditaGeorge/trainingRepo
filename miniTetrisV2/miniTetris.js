
function tetrisGame(){
    let rowNum;
    let colNum;
    let tetrisGameBoard;
    let tetrisMatrix;
    let matrix;
    let textRowNum;
    let textColsNum;
    let gameSpeed;
    let sqPosX;
    let sqPosY;

    function createGameBoard(){
        tetrisGameBoard = document.createElement('div');
        tetrisGameBoard.style.width = `${parseInt(textColsNum.value)*30}px`;
        tetrisGameBoard.style.height = `${parseInt(textRowNum.value)*30}px`;
        tetrisGameBoard.style.position = 'relative';
        tetrisGameBoard.style.backgroundColor = 'black';
        console.log(tetrisGameBoard);
        tetrisMatrix = [];
        metrix = [];
        for(let i=0;i<parseInt(textRowNum.value);i++){
            tetrisMatrix.push([]);
            matrix.push([]);
            for(let j=0;j<parseInt(textColsNum.value);j++){
                let square = document.createElement('div');
                square.style.width = '29px';
                square.style.height = '29px';
                square.style.position = 'absolute';
                square.style.backgroundColor = 'white';
                square.style.border = '1px solid black';
                square.style.top = `${i*30}px`;
                square.style.left = `${j*30}px`;
                tetrisMatrix[i].push(square);
                matrix[i].push(0);
                tetrisGameBoard.appendChild(square);
            }
        }
        console.log(tetrisMatrix[0][0]);
        document.querySelector('body').appendChild(tetrisGameBoard);
    }

    function playGame(){

    }

    function makeControls(){
        textRowNum = document.createElement('input');
        textColsNum = document.createElement('input');
        gameSpeed = document.createElement('input');
        textRowNum.style.display = 'block';
        textColsNum.style.display = 'block';
        gameSpeed.style.display = 'block';
        textRowNum.value = 'Number of rows';
        textColsNum.value = 'Number of cols';
        gameSpeed.value = 'Game speed';
        document.querySelector('body').appendChild(textRowNum);
        document.querySelector('body').appendChild(textColsNum);
        document.querySelector('body').appendChild(gameSpeed);
        let btnCr = document.createElement('button');
        btnCr.style.display = 'block';
        btnCr.innerText = 'Create Tetris!';
        btnCr.addEventListener('click',function(){
            if(tetrisGameBoard !== undefined){
                document.querySelector('body').removeChild(tetrisGameBoard);
            }
            createGameBoard();
        });
        document.querySelector('body').appendChild(btnCr);
    }

    return {
        makeControls:makeControls
    };
}

new tetrisGame().makeControls();