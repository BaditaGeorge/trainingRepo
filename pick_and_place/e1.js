function MiniGame() {
    let stillDown = false;
    let positionX;
    let positionY;
    let cln;
    let fG_obj = {}; // fG stands for first_Grid
    function fillGrid(posX, posY, inX, color, grid) {
        let childs = [];
        for (let i = 0; i < 5; i++) {
            posX = inX
            for (let j = 0; j < 5; j++) {
                let el = document.createElement('div');
                el.style.width = '40px';
                el.style.height = '40px';
                el.style.position = 'absolute';
                el.style.top = posY + 'px';
                el.style.left = posX + 'px';
                el.style.backgroundColor = color;
                el.style.userSelect = 'none';
                if (color === 'blue') {
                    el.innerHTML = i + ' ' + j;
                }
                posX += 50;
                childs.push(el);
                grid.appendChild(el);
            }
            posY += 50;
        }
        return childs;
    }

    function makeGrid(upX, upY, downX, downY, color) {
        let grid = document.createElement('div');
        grid.style.width = (downX - upX) + 'px';
        grid.style.height = (downY - upY) + 'px';
        grid.style.position = 'absolute';
        grid.style.top = upY + 'px';
        grid.style.left = upX + 'px';
        grid.style.backgroundColor = color;
        document.getElementsByTagName('body')[0].appendChild(grid);
        return grid;
    }

    document.addEventListener('mousemove', function (e) {
        if (stillDown === true) {
            window.requestAnimationFrame(() => {
                if (cln !== undefined) {
                    cln.style.top = e.pageY + 5 + 'px';
                    cln.style.left = e.pageX + 5 + 'px';
                }
            });
        }
    });

    document.addEventListener('mouseup', function (e) {
        stillDown = false;
        if (cln !== undefined) {
            fG_obj[cln.innerHTML].style.opacity = '1';
            cln.style.display = 'none';
            cln = undefined;
        }
    });

    this.initialize = function () {
        let first_childs = [];
        let second_childs = [];
        let posY = 0;
        let posX = 0;
        let first_grid = makeGrid(10, 10, 260, 260, 'black');
        let second_grid = makeGrid(360, 10, 610, 260, 'red');
        first_grid.addEventListener('mousedown', function (e) {
            if (e.eventPhase !== 2) {
                cln = e.target.cloneNode(true);
                e.target.style.opacity = '0';
                cln.style.top = e.pageY + 5 + 'px';
                cln.style.left = e.pageX + 5 + 'px';
                positionX = e.pageX + 5;
                positionY = e.pageY + 5;
                stillDown = true;
                document.body.appendChild(cln);
                fG_obj[cln.innerHTML] = e.target;
            }
        }, true);
        second_grid.addEventListener('mouseup', function (e) {
            stillDown = false;
            if (e.eventPhase !== 2) {
                if (cln != undefined) {
                    if (e.target.innerHTML === '') {
                        cln.style.top = e.target.style.top;
                        cln.style.left = e.target.style.left;
                        e.currentTarget.appendChild(cln);
                        cln = undefined;
                    } else {
                        fG_obj[cln.innerHTML].style.opacity = '1';
                        cln.style.display = 'none';
                        cln = undefined;
                    }
                }
            } else {
                if (cln !== undefined) {
                    fG_obj[cln.innerHTML].style.opacity = '1';
                    cln.style.display = 'none';
                    cln = undefined;
                }
            }
        });
        second_grid.addEventListener('click', function (e) {
            if (e.eventPhase !== 2) {
                if (e.target.innerHTML !== '') {
                    fG_obj[e.target.innerHTML].style.opacity = '1';
                    e.target.style.display = 'none';
                }
            }
        });
        first_childs = fillGrid(posX, posY, 0, 'blue', first_grid);
        posX = 0;
        second_childs = fillGrid(posX, posY, 0, 'black', second_grid);
    }
}

let mG = new MiniGame();
mG.initialize();