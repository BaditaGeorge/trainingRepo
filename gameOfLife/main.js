let gameModel = new model();
let gameView = new view();
let ctrl = new controller();
ctrl.setModel(gameModel);
ctrl.setView(gameView);
ctrl.createController();
ctrl.putInPage();
ctrl.displayGame();
ctrl.play();