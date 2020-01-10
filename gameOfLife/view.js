function TextView(){
    let gameView;
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

    function updateSize(zoomed){
        if(zoomed === 1){
            gameView = document.createElement('p');
            gameView.style.fontSize = '11px';
        }else if(zoomed === 2){
            gameView = document.createElement('p');
            gameView.style.fontSize = '5px';
        }else if(zoomed === 3){
            gameView = document.createElement('p');
            gameView.style.fontSize = '2px';
        }else if(zoomed === 4){
            gameView = document.createElement('p');
            gameView.style.fontSize = '1px';
        }
    }

    function getView(){
        return gameView;
    }

    return {
        createView:createView,
        updateView:updateView,
        getView:getView,
        updateSize:updateSize
    }
}

function DOMView(){
    function createView() {
        gameView = document.createElement('div');
        gameView.style.width = '500px';
        gameView.style.height = '500px';
        gameView.style.position = 'relative';
        createGameMatrix(1);
    }

    function createGameMatrix(zoom){
        gameMatrixView = [];
        for (let i = 0; i < 50*zoom; i++) {
            gameMatrixView.push([]);
            for (let j = 0; j < 50*zoom; j++) {
                let el = document.createElement('div');
                el.style.width = `${9/zoom}px`;
                el.style.height = `${9/zoom}px`;
                el.style.backgroundColor = 'white';
                el.style.border = `${1/zoom}px solid black`;
                el.style.position = 'absolute';
                el.style.top = i * 10/zoom + 'px';
                el.style.left = j * 10/zoom + 'px';
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

    function updateSize(zoomed){
        createGameMatrix(zoomed);
    }

    function getView(){
        return gameView;
    }

    return {
        createView:createView,
        updateView:updateView,
        getView:getView,
        updateSize:updateSize
    }
}

function SVGView(){
    function createView() {
        createGameMatrix(1);
    }

    function createGameMatrix(zoom){
        let svngs = 'http://www.w3.org/2000/svg';
        gameView = document.createElementNS(svngs, 'svg');
        gameView.setAttribute('width', '500');
        gameView.setAttribute('height', '500');
        gameView.setAttribute('viewBox', '0 0 500 500');
        gameMatrixView = [];
        for (let i = 0; i < 50*zoom; i++) {
            gameMatrixView.push([]);
            for (let j = 0; j < 50*zoom; j++) {
                let rect = document.createElementNS(svngs, 'rect');
                rect.setAttributeNS(null, 'x', (j * 10 + 1)/zoom);
                rect.setAttributeNS(null, 'y', (i * 10 + 1)/zoom);
                rect.setAttributeNS(null, 'height', `${10/zoom}`);
                rect.setAttributeNS(null, 'width', `${10/zoom}`);
                rect.setAttributeNS(null, 'fill', 'white');
                rect.setAttributeNS(null, 'stroke', 'black');
                rect.setAttributeNS(null, 'stroke-width', `${1/zoom}`);
                rect.setAttributeNS(null, 'stroke-linecap', 'butt');
                gameView.appendChild(rect);
                gameMatrixView[i].push(rect);
            }
        }
    }

    function updateSize(zoomed){
        createGameMatrix(zoomed);
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
        getView:getView,
        updateSize:updateSize
    }
}

function CanvasView(){

    let zoom = 1;
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
                ctx.fillRect((j * 10)/zoom, (i * 10)/zoom, 9/zoom, 9/zoom);
            }
        }
    }

    function updateSize(zoomed){
        zoom = zoomed;
    }

    function getView(){
        return gameView;
    }

    return {
        createView:createView,
        updateView:updateView,
        getView:getView,
        updateSize:updateSize
    }

}

function view() {

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

    function updateSize(zoomed){
        viewObject.updateSize(zoomed);
    }

    function getView() {
        return viewObject.getView();
    }

    return {
        createView: createView,
        updateView: updateView,
        getView: getView,
        updateSize:updateSize
    }
}