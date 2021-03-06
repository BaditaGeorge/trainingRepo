function controller() {
    let mainBody;
    let model;
    let view;
    let gameOn = false;
    let gameZone;
    let intervalTime = 500;
    let initIntervalTime = 500;
    let interval;
    function setModel(mainModel) {
        model = mainModel;
    }

    function setView(mainView) {
        view = mainView;
    }

    function putInPage() {
        document.querySelector('body').appendChild(mainBody);
    }

    function displayGame(redo) {
        let wasUndef = false;
        if (gameZone === undefined) {
            gameZone = document.createElement('div');
            gameZone.style.width = '500px';
            gameZone.style.height = '500px';
            wasUndef = true;
        }
        if (wasUndef === false) {
            model.playGame();
        }
        if (wasUndef === true) {
            view.createView(mainBody.childNodes[0].value);
            model.updateMatrixSize(1);
            mainBody.childNodes[5].value = 1;
        }
        if (wasUndef === true || redo !== undefined) {
            model.createMatrix();
            model.drawModel(mainBody.childNodes[1].value);
        }
        let matrix = model.getMatrix();
        view.updateView(matrix);
        if (wasUndef === true) {
            gameZone.appendChild(view.getView());
            document.querySelector('body').appendChild(gameZone);
        }
    }

    function play() {
        interval = setInterval(function () {
            if (gameOn === true) {
                displayGame();
            }
        }, intervalTime);
    }

    function createController() {
        mainBody = document.createElement('div');
        let boardType = document.createElement('select');
        let text = document.createElement('option');
        let svg = document.createElement('option');
        let dom = document.createElement('option');
        let cnv = document.createElement('option');
        let isDown = false;
        text.value = 1;
        text.innerText = 'Text';
        svg.value = 2;
        svg.innerText = 'SVG';
        dom.value = 3;
        dom.innerText = 'DOM';
        cnv.value = 4;
        cnv.innerText = 'Canvas';
        boardType.appendChild(text);
        boardType.appendChild(svg);
        boardType.appendChild(dom);
        boardType.appendChild(cnv);
        let gameType = document.createElement('select');
        let type0 = document.createElement('option');
        let type1 = document.createElement('option');
        let type2 = document.createElement('option');
        let type3 = document.createElement('option');
        let type4 = document.createElement('option');
        type0.value = 0;
        type0.innerText = 'Type 0';
        type1.value = 1;
        type1.innerText = 'Type 1';
        type2.value = 2;
        type2.innerText = 'Type 2';
        type3.value = 3;
        type3.innerText = 'Type 3';
        type4.value = 4;
        type4.innerText = 'Type 4';
        gameType.appendChild(type0);
        gameType.appendChild(type1);
        gameType.appendChild(type2);
        gameType.appendChild(type3);
        gameType.appendChild(type4);
        let actionBtn = document.createElement('button');
        let playBtn = document.createElement('button');
        actionBtn.addEventListener('click', function () {
            displayGame();
        });
        gameType.addEventListener('change', function () {
            displayGame(true);
        });
        boardType.addEventListener('change', function () {
            document.querySelector('body').removeChild(gameZone);
            gameZone = undefined;
            displayGame();
        });
        playBtn.addEventListener('click', function () {
            if (playBtn.innerText === 'Start') {
                playBtn.innerText = 'Stop';
                gameOn = true;
            } else {
                playBtn.innerText = 'Start';
                gameOn = false;
            }
        });
        let speed = document.createElement('input');
        speed.addEventListener('mousedown', function () {
            isDown = true;
        });
        speed.addEventListener('mouseup', function () {
            if (isDown === true) {
                intervalTime = initIntervalTime - parseInt(speed.value) * 10;
                gameOn = false;
                clearInterval(interval);
                play();
                gameOn = true;
                isDown = false;
            }
        });
        speed.type = 'range';
        speed.min = 10;
        speed.max = 50;
        speed.step = 5;
        speed.value = 10;
        speed.tile = 'speed dial';
        let zoom = document.createElement('input');
        zoom.addEventListener('mousedown', function () {
            isDown = true;
        });
        zoom.addEventListener('mouseup', function () {
            model.updateMatrixSize(parseInt(zoom.value));
            view.updateSize(zoom.value);
            let matrix = model.getMatrix();
            let selection = parseInt(boardType.options[boardType.selectedIndex].value);
            if(selection === 1 || selection === 2){
                console.log('updated view!');
                document.querySelector('body').removeChild(gameZone);
                gameZone = undefined;
                gameZone = document.createElement('div');
                gameZone.style.width = '500px';
                gameZone.style.height = '500px';
                document.querySelector('body').appendChild(gameZone);
                gameZone.appendChild(view.getView());
            }
            displayGame();
        });
        zoom.type = 'range';
        zoom.min = 1;
        zoom.max = 4;
        zoom.step = 1;
        zoom.value = 1;
        zoom.title = 'grid size';
        actionBtn.innerText = 'Next';
        playBtn.innerText = 'Start';
        mainBody.appendChild(boardType);
        mainBody.appendChild(gameType);
        mainBody.appendChild(actionBtn);
        mainBody.appendChild(playBtn);
        mainBody.appendChild(speed);
        mainBody.appendChild(zoom);
    }

    function getMain() {
        return mainBody;
    }

    return {
        createController: createController,
        getMain: getMain,
        setModel: setModel,
        setView: setView,
        putInPage: putInPage,
        displayGame: displayGame,
        play: play
    };
}