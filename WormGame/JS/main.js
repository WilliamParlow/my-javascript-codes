function gameController() {

   clearWindow();

   wormMovement[worm.direction]();

   game.beginPath();
   game.arc(worm.xPosition, worm.yPosition, 10, 0, 2 * Math.PI);
   game.fill();

}

function initGame() {

   worm.xPosition = gameWindow.width / 2;
   worm.yPosition = gameWindow.height / 2;

   createMenuEvent();

}