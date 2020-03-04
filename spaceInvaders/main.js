function main(){
    let gameBoard = new GameBoard();
    gameBoard.createAliens();
    gameBoard.displayInvaders();
    gameBoard.createShields();
    gameBoard.displayShields();
    gameBoard.setupShip();
    gameBoard.gameCycle();
}

main();