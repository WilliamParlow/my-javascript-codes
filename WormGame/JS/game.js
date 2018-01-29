/**
 * 
 * 
 */
function gameController() {

   clearWindow();

   if (isWormInsideOfArena()) {
      wormMovement[worm.direction]();
   } else {
      gameOver();
   }


   worm.balls.forEach(function (ball) {
      game.beginPath();
      game.arc(ball.xPosition, ball.yPosition, worm.size, 0, 2 * Math.PI);
      game.fill();
   });

}


/**
 * 
 * 
 */
function initGame() {

   worm.balls = [];

   wormPosition = {
      xPosition: gameWindow.width / 2,
      yPosition: gameWindow.height / 2
   };

   worm.balls.push({
      xPosition: wormPosition.xPosition - parseFloat(String(wormPosition.xPosition).charAt(String(wormPosition.xPosition).length - 1)),
      yPosition: wormPosition.yPosition - parseFloat(String(wormPosition.yPosition).charAt(String(wormPosition.yPosition).length - 1))
   });

   createMenuEvent();

}


/**
 * 
 * 
 */
function gameOver() {

   clearInterval(gameWormMoveInterval);
   worm.direction = 's';
   worm.isAlive = false;
   setTimeout(initGame, 10);

}


/**
 * 
 * 
 */
function clearWindow() {
   game.clearRect(0, 0, gameWindow.width, gameWindow.height);
}