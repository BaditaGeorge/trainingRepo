function TextView(){
    let gameView;
    let boardSize;
    function createView() {
            gameView = document.createElement('p');
            gameView.style.fontSize = '11px';
    }

    function updateView(gameMatrix) {
        let strMatrix = '';
        // gameView.innerText = '';
        for (let i = 0; i < gameMatrix.length; i++) {
            for (let j = 0; j < gameMatrix[i].length; j++) {
                if (gameMatrix[i][j] === 1) {
                    strMatrix += '<span class="spanStyle">1</span>';
                } else {
                    strMatrix += '0';
                }
                strMatrix += ' ';
            }
            strMatrix += '<br>';
        }
        gameView.innerHTML = strMatrix;
    }

    function getView(){
        return gameView;
    }

    function updateBoardSize(newBoardSize){
        boardSize = newBoardSize;
    }

    return {
        createView:createView,
        updateView:updateView,
        getView:getView
    }
}
function DOMView(){
    function createView() {
        gameView = document.createElement('div');
        gameView.style.width = '500px';
        gameView.style.height = '500px';
        gameView.style.position = 'relative';
        gameMatrixView = [];
        for (let i = 0; i < 50; i++) {
            gameMatrixView.push([]);
            for (let j = 0; j < 50; j++) {
                let el = document.createElement('div');
                el.style.width = '9px';
                el.style.height = '9px';
                el.style.backgroundColor = 'white';
                el.style.border = '1px solid black';
                el.style.position = 'absolute';
                el.style.top = i * 10 + 'px';
                el.style.left = j * 10 + 'px';
                gameView.appendChild(el);
                gameMatrixView[i].push(el);
            }
        }
    }

    function updateView(gameMatrix) {
        for (let i = 0; i < gameMatrixView.length; i++) {
            for (let j = 0; j < gameMatrixView[i].length; j++) {
                if (gameMatrix[i][j] === 0) {
                    gameMatrixView[i][j].style.backgroundColor = 'white';
                } else {
                    gameMatrixView[i][j].style.backgroundColor = 'red';
                }
            }
        }
    }

    function getView(){
        return gameView;
    }

    return {
        createView:createView,
        updateView:updateView,
        getView:getView
    }
}
function SVGView(){
    function createView() {
        let svngs = 'http://www.w3.org/2000/svg';
        gameView = document.createElementNS(svngs, 'svg');
        gameView.setAttribute('width', '500');
        gameView.setAttribute('height', '500');
        gameView.setAttribute('viewBox', '0 0 500 500');
        gameMatrixView = [];
        for (let i = 0; i < 50; i++) {
            gameMatrixView.push([]);
            for (let j = 0; j < 50; j++) {
                let rect = document.createElementNS(svngs, 'rect');
                rect.setAttributeNS(null, 'x', j * 10 + 1);
                rect.setAttributeNS(null, 'y', i * 10 + 1);
                rect.setAttributeNS(null, 'height', '10');
                rect.setAttributeNS(null, 'width', '10');
                rect.setAttributeNS(null, 'fill', 'white');
                rect.setAttributeNS(null, 'stroke', 'black');
                rect.setAttributeNS(null, 'stroke-width', '1');
                rect.setAttributeNS(null, 'stroke-linecap', 'butt');
                gameView.appendChild(rect);
                gameMatrixView[i].push(rect);
            }
        }
    }

    function updateView(gameMatrix) {
        for (let i = 0; i < gameMatrix.length; i++) {
            for (let j = 0; j < gameMatrix[i].length; j++) {
                if (gameMatrix[i][j] === 0) {
                    gameMatrixView[i][j].setAttributeNS(null, 'fill', 'white');
                } else {
                    gameMatrixView[i][j].setAttributeNS(null, 'fill', 'red');
                }
            }
        }
    }

    function getView(){
        return gameView;
    }

    return {
        createView:createView,
        updateView:updateView,
        getView:getView
    }
}
function CanvasView(){

    function createView() {
        gameView = document.createElement('canvas');
        gameView.width = 500;
        gameView.height = 500;
    }
    
    function updateView(gameMatrix) {
        let ctx = gameView.getContext('2d');
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, 500, 500);
        for (let i = 0; i < gameMatrix.length; i++) {
            for (let j = 0; j < gameMatrix[i].length; j++) {
                if (gameMatrix[i][j] === 0) {
                    ctx.fillStyle = 'white';
                } else {
                    ctx.fillStyle = 'red';
                }
                ctx.fillRect(j * 10, i * 10, 9, 9);
            }
        }
    }

    function getView(){
        return gameView;
    }

    return {
        createView:createView,
        updateView:updateView,
        getView:getView
    }

}
function view() {

    let gameView;
    let gameMatrixView;
    let viewObject;

    //here is the function where i create the view, i made html element that will reflect changes from the matrix
    //type is the type of view that our application is going to display
    function createView(typeOfView) {
        typeOfView = parseInt(typeOfView);
        if (typeOfView === 1) {
            viewObject = new TextView();
        } else if (typeOfView === 2) {
            viewObject = new SVGView();
        } else if (typeOfView === 3) {
            viewObject = new DOMView();
        } else if (typeOfView === 4) {
            viewObject = new CanvasView();
        }
        viewObject.createView();
    }

    function updateView(gameMatrix) {
        viewObject.updateView(gameMatrix);
    }

    function getView() {
        return viewObject.getView();
    }

    return {
        createView: createView,
        updateView: updateView,
        getView: getView
    }
}