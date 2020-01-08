function model() {
    let matrix = [];
    let nr_Rows = 50;
    let nr_Cols = 50;
    //here i create the matrix that will serve as the model for the animation
    function createMatrix() {
        matrix = [];
        for (let i = 0; i < nr_Rows; i++) {
            matrix.push([]);
            for (let j = 0; j < nr_Cols; j++) {
                matrix[i].push(0);
            }
        }
    }

    // function updateMatrixSize(zoomed){
    //     let tMatrix = matrix;
    //     if(zoomed)
    //     for(let i=0;i<nr_Rows*zoomed;i++){
    //         for(let j=0;j<nr_Cols*zoomed;j++){
    //             if(j>=25;j<=)
    //         }
    //     }
    // }

    //here i draw a specific form on the table, form varies by user's option
    //basically, i mark with 1 celss which are component of the initial form
    function drawModel(type) {
        type = parseInt(type);
        if (type === 0) {
            matrix[23][24] = 1;
            matrix[24][25] = 1;
            matrix[25][25] = 1;
            matrix[25][24] = 1;
            matrix[25][23] = 1;
        } else if (type === 1) {
            matrix[23][24] = 1;
            matrix[24][23] = 1;
            matrix[24][24] = 1;
            matrix[24][25] = 1;
            matrix[25][23] = 1;
            matrix[25][25] = 1;
            matrix[26][24] = 1;
        } else if (type === 2) {
            for (let i = 23; i < 28; i++) {
                matrix[i][23] = 1;
                matrix[i][27] = 1;
            }
            matrix[23][25] = 1;
            matrix[27][25] = 1;
        } else if (type === 3) {
            for (let i = 23; i < 33; i++)
                matrix[25][i] = 1;
        } else if (type === 4) {
            for (let i = 24; i <= 30; i++) {
                if (i < 26) {
                    matrix[i][23] = 1;
                    matrix[i][24] = 1;
                    matrix[i][26] = 1;
                    matrix[i][27] = 1;
                } else if (i < 27) {
                    matrix[i][24] = 1;
                    matrix[i][26] = 1;
                } else if (i < 29) {
                    matrix[i][24] = 1;
                    matrix[i][26] = 1;
                    matrix[i][22] = 1;
                    matrix[i][28] = 1;
                } else {
                    matrix[i][22] = 1;
                    matrix[i][23] = 1;
                    matrix[i][27] = 1;
                    matrix[i][28] = 1;
                }
            }
        }
    }

    //here i have two lists with directions
    //i count all neighbors for a specific cell from the matrix, and i return the number of neighbors
    function countNeighbors(x, y) {
        let dirX = [-1, 1, 0, 0, -1, -1, 1, 1];
        let dirY = [0, 0, -1, 1, 1, -1, 1, -1];
        let neighbors = 0;
        for (let i = 0; i < dirX.length; i++) {
            if (x + dirX[i] >= 0 && y + dirY[i] >= 0 && x + dirX[i] < nr_Rows && y + dirY[i] < nr_Cols) {
                if (matrix[x + dirX[i]][y + dirY[i]] === 1) {
                    neighbors++;
                }
            }
        }
        return neighbors;
    }

    //here i made a lists with coordinates of all the living cells from the matrix
    //living cells are cells marked with 1
    function getLivingCells() {
        let livings = [];
        for (let i = 0; i < nr_Rows; i++) {
            for (let j = 0; j < nr_Cols; j++) {
                if (matrix[i][j] === 1) {
                    livings.push([i, j]);
                }
            }
        }
        return livings;
    }

    //here is where the game is played
    //here i go through the matrix and update each cell by the rules of the games
    function playGame() {
        let toAdd = [];
        let toRem = [];
        for (let i = 0; i < nr_Rows; i++) {
            for (let j = 0; j < nr_Cols; j++) {
                let neighbors = countNeighbors(i, j);
                //no neighbor, cell dies
                if (neighbors <= 1) {
                    toRem.push([i, j]);
                } else if (neighbors <= 3) {
                    //2 or 3 neighbors, cell is starting to live
                    if (matrix[i][j] === 0) {
                        if (neighbors === 3) {
                            toAdd.push([i, j]);
                        }
                    }
                } else if (neighbors >= 4) {
                    //too many neighbors, cell dies
                    toRem.push([i, j]);
                }
            }
        }
        for (let i = 0; i < toAdd.length; i++) {
            matrix[toAdd[i][0]][toAdd[i][1]] = 1;
        }
        for (let i = 0; i < toRem.length; i++) {
            matrix[toRem[i][0]][toRem[i][1]] = 0;
        }
    }

    //function that returns matrix
    function getMatrix() {
        return matrix;
    }

    return {
        createMatrix: createMatrix,
        drawModel: drawModel,
        playGame: playGame,
        getMatrix: getMatrix
    };
}

//here is the view part of the application
// function view() {

//     let gameView;
//     let gameMatrixView;

//     function createTextView() {
//         gameView = document.createElement('p');
//         gameView.style.fontSize = '11px';
//     }

//     function createDOMView() {
//         gameView = document.createElement('div');
//         gameView.style.width = '500px';
//         gameView.style.height = '500px';
//         gameView.style.position = 'relative';
//         gameMatrixView = [];
//         for (let i = 0; i < 50; i++) {
//             gameMatrixView.push([]);
//             for (let j = 0; j < 50; j++) {
//                 let el = document.createElement('div');
//                 el.style.width = '9px';
//                 el.style.height = '9px';
//                 el.style.backgroundColor = 'white';
//                 el.style.border = '1px solid black';
//                 el.style.position = 'absolute';
//                 el.style.top = i * 10 + 'px';
//                 el.style.left = j * 10 + 'px';
//                 gameView.appendChild(el);
//                 gameMatrixView[i].push(el);
//             }
//         }
//     }

//     function createCanvasView() {
//         gameView = document.createElement('canvas');
//         gameView.width = 500;
//         gameView.height = 500;
//     }

//     function createSVGView() {
//         let svngs = 'http://www.w3.org/2000/svg';
//         gameView = document.createElementNS(svngs, 'svg');
//         gameView.setAttribute('width', '500px');
//         gameView.setAttribute('height', '500px');
//         gameMatrixView = [];
//         for (let i = 0; i < 50; i++) {
//             gameMatrixView.push([]);
//             for (let j = 0; j < 50; j++) {
//                 let rect = document.createElementNS(svngs, 'rect');
//                 rect.setAttributeNS(null, 'x', j * 10);
//                 rect.setAttributeNS(null, 'y', i * 10);
//                 rect.setAttributeNS(null, 'height', '9');
//                 rect.setAttributeNS(null, 'width', '9');
//                 rect.setAttributeNS(null, 'fill', 'white');
//                 rect.setAttributeNS(null, 'stroke', 'black');
//                 rect.setAttributeNS(null, 'stroke-width', '1');
//                 gameView.appendChild(rect);
//                 gameMatrixView[i].push(rect);
//             }
//         }
//     }

//     function updateSVGView(gameMatrix) {
//         for (let i = 0; i < gameMatrix.length; i++) {
//             for (let j = 0; j < gameMatrix[i].length; j++) {
//                 if (gameMatrix[i][j] === 0) {
//                     gameMatrixView[i][j].setAttributeNS(null, 'fill', 'white');
//                 } else {
//                     gameMatrixView[i][j].setAttributeNS(null, 'fill', 'red');
//                 }
//             }
//         }
//     }

//     function updateCanvasView(gameMatrix) {
//         let ctx = gameView.getContext('2d');
//         ctx.fillStyle = 'black';
//         ctx.fillRect(0, 0, 500, 500);
//         for (let i = 0; i < gameMatrix.length; i++) {
//             for (let j = 0; j < gameMatrix[i].length; j++) {
//                 if (gameMatrix[i][j] === 0) {
//                     ctx.fillStyle = 'white';
//                 } else {
//                     ctx.fillStyle = 'red';
//                 }
//                 ctx.fillRect(j * 10, i * 10, 9, 9);
//             }
//         }
//     }

//     function updateTextView(gameMatrix) {
//         let strMatrix = '';
//         // gameView.innerText = '';
//         for (let i = 0; i < gameMatrix.length; i++) {
//             for (let j = 0; j < gameMatrix[i].length; j++) {
//                 if (gameMatrix[i][j] === 1) {
//                     strMatrix += '<span class="spanStyle">1</span>';
//                 } else {
//                     strMatrix += '0';
//                 }
//                 strMatrix += ' ';
//             }
//             strMatrix += '<br>';
//         }
//         gameView.innerHTML = strMatrix;
//     }

//     function updateDOMView(gameMatrix) {
//         for (let i = 0; i < gameMatrixView.length; i++) {
//             for (let j = 0; j < gameMatrixView[i].length; j++) {
//                 if (gameMatrix[i][j] === 0) {
//                     gameMatrixView[i][j].style.backgroundColor = 'white';
//                 } else {
//                     gameMatrixView[i][j].style.backgroundColor = 'red';
//                 }
//             }
//         }
//     }

//     //here is the function where i create the view, i made html element that will reflect changes from the matrix
//     //type is the type of view that our application is going to display
//     function createView(typeOfView) {
//         typeOfView = parseInt(typeOfView);
//         if (typeOfView === 1) {
//             createTextView();
//         } else if (typeOfView === 2) {
//             createSVGView();
//         } else if (typeOfView === 3) {
//             createDOMView();
//         } else if (typeOfView === 4) {
//             createCanvasView();
//         }
//     }

//     function updateView(typeOfView, gameMatrix) {
//         typeOfView = parseInt(typeOfView);
//         if (typeOfView === 1) {
//             updateTextView(gameMatrix);
//         } else if (typeOfView === 2) {
//             updateSVGView(gameMatrix);
//         } else if (typeOfView === 3) {
//             updateDOMView(gameMatrix);
//         } else if (typeOfView === 4) {
//             updateCanvasView(gameMatrix);
//         }
//     }

//     function getView() {
//         return gameView;
//     }

//     return {
//         createView: createView,
//         updateView: updateView,
//         getView: getView
//     }
// }

//static part of the application
//controls the view 

// function controller() {
//     let mainBody;
//     let model;
//     let view;
//     let gameOn = false;
//     let gameZone;
//     let intervalTime = 500;
//     let initIntervalTime = 500;
//     let interval;
//     let bGDim = 1;
//     function setModel(mainModel) {
//         model = mainModel;
//     }

//     function setView(mainView) {
//         view = mainView;
//     }

//     function putInPage() {
//         document.querySelector('body').appendChild(mainBody);
//     }

//     function displayGame(redo) {
//         let wasUndef = false;
//         if (gameZone === undefined) {
//             gameZone = document.createElement('div');
//             gameZone.style.width = '500px';
//             gameZone.style.height = '500px';
//             wasUndef = true;
//         }
//         if (wasUndef === false) {
//             model.playGame();
//         }
//         if (wasUndef === true) {
//             view.createView(mainBody.childNodes[0].value);
//         }
//         if (wasUndef === true || redo !== undefined) {
//             model.createMatrix();
//             model.drawModel(mainBody.childNodes[1].value);
//         }
//         let matrix = model.getMatrix();
//         view.updateView(mainBody.childNodes[0].value, matrix);
//         if (wasUndef === true) {
//             gameZone.appendChild(view.getView());
//             document.querySelector('body').appendChild(gameZone);
//         }
//     }

//     function play() {
//         interval = setInterval(function () {
//             if (gameOn === true) {
//                 displayGame();
//             }
//         }, intervalTime);
//     }

//     function createController() {
//         mainBody = document.createElement('div');
//         let boardType = document.createElement('select');
//         let text = document.createElement('option');
//         let svg = document.createElement('option');
//         let dom = document.createElement('option');
//         let cnv = document.createElement('option');
//         let isDown = false;
//         text.value = 1;
//         text.innerText = 'Text';
//         svg.value = 2;
//         svg.innerText = 'SVG';
//         dom.value = 3;
//         dom.innerText = 'DOM';
//         cnv.value = 4;
//         cnv.innerText = 'Canvas';
//         boardType.appendChild(text);
//         boardType.appendChild(svg);
//         boardType.appendChild(dom);
//         boardType.appendChild(cnv);
//         let gameType = document.createElement('select');
//         let type0 = document.createElement('option');
//         let type1 = document.createElement('option');
//         let type2 = document.createElement('option');
//         let type3 = document.createElement('option');
//         let type4 = document.createElement('option');
//         type0.value = 0;
//         type0.innerText = 'Type 0';
//         type1.value = 1;
//         type1.innerText = 'Type 1';
//         type2.value = 2;
//         type2.innerText = 'Type 2';
//         type3.value = 3;
//         type3.innerText = 'Type 3';
//         type4.value = 4;
//         type4.innerText = 'Type 4';
//         gameType.appendChild(type0);
//         gameType.appendChild(type1);
//         gameType.appendChild(type2);
//         gameType.appendChild(type3);
//         gameType.appendChild(type4);
//         let actionBtn = document.createElement('button');
//         let playBtn = document.createElement('button');
//         actionBtn.addEventListener('click', function () {
//             displayGame();
//         });
//         gameType.addEventListener('change', function () {
//             displayGame(true);
//         });
//         boardType.addEventListener('change', function () {
//             document.querySelector('body').removeChild(gameZone);
//             gameZone = undefined;
//             if (parseInt(boardType.value) === 4) {
//                 zoom.style.visibility = 'visible';
//             } else {
//                 zoom.style.visibility = 'hidden';
//             }
//             displayGame();
//         });
//         playBtn.addEventListener('click', function () {
//             if (playBtn.innerText === 'Start') {
//                 playBtn.innerText = 'Stop';
//                 gameOn = true;
//             } else {
//                 playBtn.innerText = 'Start';
//                 gameOn = false;
//             }
//         });
//         let speed = document.createElement('input');
//         speed.addEventListener('mousedown', function () {
//             isDown = true;
//         });
//         speed.addEventListener('mouseup', function () {
//             if (isDown === true) {
//                 intervalTime = initIntervalTime - parseInt(speed.value) * 10;
//                 gameOn = false;
//                 clearInterval(interval);
//                 play();
//                 gameOn = true;
//                 isDown = false;
//             }
//         });
//         speed.type = 'range';
//         speed.min = 10;
//         speed.max = 50;
//         speed.step = 5;
//         speed.value = 10;
//         speed.tile = 'speed dial';
//         let zoom = document.createElement('input');
//         zoom.addEventListener('mousedown', function () {
//             isDown = true;
//         });
//         zoom.addEventListener('mouseup', function () {
//             if (isDown === true) {
//                 bGDim = parseInt(zoom.value);
//             }
//         });
//         zoom.type = 'range';
//         zoom.min = 1;
//         zoom.max = 4;
//         zoom.step = 1;
//         zoom.value = 1;
//         zoom.title = 'grid size';
//         actionBtn.innerText = 'Next';
//         playBtn.innerText = 'Start';
//         mainBody.appendChild(boardType);
//         mainBody.appendChild(gameType);
//         mainBody.appendChild(actionBtn);
//         mainBody.appendChild(playBtn);
//         mainBody.appendChild(speed);
//         mainBody.appendChild(zoom);
//         zoom.style.visibility = 'hidden';
//     }

//     function getMain() {
//         return mainBody;
//     }

//     return {
//         createController: createController,
//         getMain: getMain,
//         setModel: setModel,
//         setView: setView,
//         putInPage: putInPage,
//         displayGame: displayGame,
//         play: play
//     };
// }

// let gameModel = new model();
// let gameView = new view();
// let ctrl = new controller();
// ctrl.setModel(gameModel);
// ctrl.setView(gameView);
// ctrl.createController();
// ctrl.putInPage();
// ctrl.displayGame();
// ctrl.play();
// mnb.childNodes[2].innerText = 'Stop';