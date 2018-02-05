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

   game.beginPath();
   game.fillStyle = food.color;
   game.arc(food.xPosition, food.yPosition, food.size, 0, 2 * Math.PI);
   game.fill();

   game.fillStyle = worm.color;

   worm.balls.forEach(function (ball) {
      game.beginPath();
      game.arc(ball.xPosition, ball.yPosition, worm.size, 0, 2 * Math.PI);
      game.fill();
   });

   game.fillStyle = '#000';
   drawScoreboard();

}


/**
 * 
 * 
 */
function initGame(text = '') {

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
   clearInterval(gameTimeInterval);
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

   food.color = '#C00';   

   do {

      let x = Math.round(Math.random() * gameWindow.width);
      let y = Math.round(Math.random() * gameWindow.height);

      food.xPosition = x - getBase10Positions(x);
      food.yPosition = y - getBase10Positions(y);

      food.xPosition = getMinimumMaximumPosition(food.xPosition, 20, gameWindow.height - 10);
      food.yPosition = getMinimumMaximumPosition(food.yPosition, 20, gameWindow.width - 10);

   } while (isFoodInsideWorm());

}


/**
 * 
 * 
 * @returns 
 */
function isFoodInsideWorm() {

   let isInsideWorm = false;
   let x = food.xPosition;
   let y = food.yPosition;

   for (let i = 0; i < worm.balls.length; i++) {

      let wx = worm.balls[i].xPosition;
      let wy = worm.balls[i].yPosition;

      if ((x >= wx && x + food.size <= wx + worm.size) && ((y >= wy && y + food.size <= wy + worm.size))) {
         isInsideWorm = true;
         break;
      }

   }

   return isInsideWorm;

}



/**
 * 
 * 
 * @param {any} position 
 * @param {any} min 
 * @param {any} max 
 * @returns 
 */
function getMinimumMaximumPosition(position, min, max) {

   if (position < min) {
      return min;
   } else if (position > max) {
      return max;
   }

   return position;

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



/**
 * 
 * 
 */
function drawScoreboard() {
   
   let width = 20;

   game.font = `${width}px Arial`;
   game.fillText(`Timer: ${getFormatedTime()}`, 0, width);
   game.fillText(`Score: ${gameStatus.score}`, 0, width+ width);

}



/**
 * 
 * 
 */
function getRandomRBG() {

   return `rgb(${Math.round(Math.random()) * 255}, ${Math.round(Math.random()) * 255}, ${Math.round(Math.random()) * 255})`;

}