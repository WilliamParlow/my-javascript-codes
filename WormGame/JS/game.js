/**
 * 
 * 
 */
function gameController() {

   clearWindow();

   if (isWormInsideOfArena() && !isWormSelfBumped()) {
      wormMovement[worm.direction]();
   } else {
      gameOver();
   }

   if (isWormFood()) {
      gameStatus.score += 100;
      pushWormBall();
      foodGenerator();
   }

   worm.balls.forEach(function (ball) {
      game.beginPath();
      game.arc(ball.xPosition, ball.yPosition, worm.size, 0, 2 * Math.PI);
      game.fill();
   });

   game.beginPath();
   game.arc(food.xPosition, food.yPosition, food.size, 0, 2 * Math.PI);
   game.fill();

}


/**
 * 
 * 
 */
function initGame(text='') {

   worm.balls = [];

   wormPosition = {
      xPosition: gameWindow.width / 2,
      yPosition: gameWindow.height / 2
   };

   worm.balls.push({
      xPosition: wormPosition.xPosition - 10 - getBase10Positions(wormPosition.xPosition),
      yPosition: wormPosition.yPosition - getBase10Positions(wormPosition.yPosition)
   });

   createMenuEvent(text);

}


/**
 * 
 * 
 */
function gameOver() {

   clearInterval(gameWormMoveInterval);
   worm.direction = 's';
   worm.isAlive = false;
   setTimeout(initGame, 10, (isWormSelfBumped()) ? 'You eated yourself, you\'re dead :(' : 'Worm is out of arena. You died :(');

}


/**
 * 
 * 
 */
function clearWindow() {
   game.clearRect(0, 0, gameWindow.width, gameWindow.height);
}



/**
 * 
 * 
 */
function foodGenerator() {

   let x = Math.round(Math.random() * gameWindow.width);
   let y = Math.round(Math.random() * gameWindow.height);

   food.xPosition = x - getBase10Positions(x)
   food.yPosition = y - getBase10Positions(y)

}



/**
 * 
 * 
 * @param {Number} value 
 * @returns 
 */
function getBase10Positions(value) {

   return parseFloat(String(value).charAt(String(value).length - 1));

}



/**
 * 
 * 
 */
function pushWormBall() {

   let x = Math.abs(worm.balls[worm.balls.length - 1] - worm.balls[worm.balls.length - 2]);
   let y = Math.abs(worm.balls[worm.balls.length - 1] - worm.balls[worm.balls.length - 2]);

   worm.balls.push({
      xPosition: x,
      yPosition: y
   });

}