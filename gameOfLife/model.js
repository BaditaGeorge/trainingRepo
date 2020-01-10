function model() {
    let matrix = [];
    let nr_Rows = 50;
    let nr_Cols = 50;
    let zoom = 1;
    //here i create the matrix that will serve as the model for the animation
    function createMatrix() {
        matrix = [];
        for (let i = 0; i < nr_Rows*zoom; i++) {
            matrix.push([]);
            for (let j = 0; j < nr_Cols*zoom; j++) {
                matrix[i].push(0);
            }
        }
    }

    function copyMatrix(matrix){
        let new_matrix = [];
        for(let i=0;i<matrix.length;i++){
            new_matrix.push([]);
            for(let j=0;j<matrix[i].length;j++){
                new_matrix[i].push(matrix[i][j]);
            }
        }
        return new_matrix;
    }


    function expand(zoomed){
        let tMatrix = copyMatrix(matrix);
        console.log(tMatrix.length);
        matrix = [];
        for(let i=0;i<nr_Rows*zoomed;i++){
            matrix.push([]);
            for(let j=0;j<nr_Cols*zoomed;j++){
                if(i>=(nr_Rows*zoomed - nr_Rows*zoom)/2 && 
                i < ((nr_Rows*zoomed - nr_Rows*zoom)/2 + nr_Rows*zoom) &&
                j>=(nr_Cols*zoomed - nr_Cols*zoom)/2 &&
                j < ((nr_Cols*zoomed - nr_Cols*zoom)/2 + nr_Cols*zoom)){
                    matrix[i].push(tMatrix[i-(nr_Rows*zoomed - nr_Rows*zoom)/2][j-(nr_Cols*zoomed - nr_Cols*zoom)/2])
                }else{
                    matrix[i].push(0);
                }
            }
        }
        zoom = zoomed;
    }

    function resize(zoomed){
        let tMatrix = copyMatrix(matrix);
        matrix = [];
        for(let i=(nr_Rows*zoom - nr_Rows*zoomed)/2;i<((nr_Rows*zoom - nr_Rows*zoomed)/2 + nr_Rows*zoom);i++){
            matrix.push([]);
            for(let j=(nr_Cols*zoom - nr_Cols*zoomed)/2;j<((nr_Cols*zoom - nr_Cols*zoomed)/2 + nr_Cols*zoom);j++){
                matrix[i].push(tMatrix[i][j]);
            }
        }
        zoom = zoomed;
    }


    function updateMatrixSize(zoomed){
        if(zoomed > zoom){
            expand(zoomed);
        }else{
            resize(zoomed);
        }
    }

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
        for (let i = 0; i < nr_Rows * zoom; i++) {
            for (let j = 0; j < nr_Cols * zoom; j++) {
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
        for (let i = 0; i < nr_Rows * zoom; i++) {
            for (let j = 0; j < nr_Cols * zoom; j++) {
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
        getMatrix: getMatrix,
        updateMatrixSize:updateMatrixSize
    };
}
