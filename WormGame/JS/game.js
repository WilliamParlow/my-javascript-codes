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
   })

}


/**
 * 
 * 
 */
function initGame() {

   worm.balls = [];

   worm.balls.push({
      xPosition: gameWindow.width / 2,
      yPosition: gameWindow.height / 2
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
   setTimeout(initGame, 10);

}


/**
 * 
 * 
 */
function clearWindow() {
   game.clearRect(0, 0, gameWindow.width, gameWindow.height);
}