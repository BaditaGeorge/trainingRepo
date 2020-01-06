function model() {
    let matrix = [];
    let nr_Rows = 50;
    let nr_Cols = 50;
    function createMatrix() {
        for (let i = 0; i < nr_Rows; i++) {
            matrix.push([]);
            for (let j = 0; j < nr_Cols; j++) {
                matrix[i].push(0);
            }
        }
    }

    function drawModel(type) {
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
            for (let i = 23; i <= 28; i++) {
                matrix[i][23] = 1;
                matrix[i][27] = 1;
            }
            matrix[23][25] = 1;
            matrix[28][25] = 1;
        } else if (type === 3) {
            for (let i = 23; i <= 33; i++)
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

    function getLivingCells() {
        let livings = [];
        for (let i = 0; i < nr_Rows; i++) {
            for (let j = 0; j < nr_Cols; j++) {
                if (matrix[i][j] === 1) {
                    livings.push([i,j]);
                }
            }
        }
        return livings;
    }

    function playGame() {
        for (let i = 0; i < nr_Rows; i++) {
            for (let j = 0; j < nr_Cols; j++) {
                let neighbors = countNeighbors(i, j);
                if (neighbors <= 1) {
                    matrix[i][j] = 0;
                } else if (neighbors <= 3) {
                    if (matrix[i][j] === 0) {
                        if (neighbors === 3) {
                            matrix[i][j] = 1;
                        }
                    }
                } else if (neighbors >= 4) {
                    matrix[i][j] = 0;
                }
            }
        }
    }

    function getMatrix() {
        return matrix;
    }

    return {
        createMatrix: createMatrix,
        drawModel: drawModel,
        playGame: playGame
    };
}

function view() {

    function createView(type) {
        if (type === 0) {
            let board = document.createElement('div');

        }
    }
}