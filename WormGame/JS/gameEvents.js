window.onload = function () {

   containerSize = {
      width: document.querySelector('.container').clientWidth,
      height: document.querySelector('.container').clientHeight
   };

   Object.assign(containerSize, {
      'pixelsRemaining': {
         width: getBase10Positions(containerSize.width),
         height: getBase10Positions(containerSize.height)
      }
   });

   gameWindow.width = containerSize.width - 20 - containerSize.pixelsRemaining.width;
   gameWindow.height = containerSize.height - 20 - containerSize.pixelsRemaining.height;

   initGame();

};




/**
 * 
 * 
 */
function startWormGame() {

   worm.isAlive = true;
   worm.color = '#000';
   resetGameScores();
   foodGenerator();

   gameWormMoveInterval = setInterval(gameController, worm.velocity);
   gameTimeInterval = setInterval(timeController, 100);

   document.onkeydown = function (e) {

      if (e.keyCode == keyCodes.left) {
         worm.direction = 'l';
      } else if (e.keyCode == keyCodes.up) {
         worm.direction = 'u';
      } else if (e.keyCode == keyCodes.right) {
         worm.direction = 'r';
      } else if (e.keyCode == keyCodes.down) {
         worm.direction = 'd';
      }

   }

}


/**
 * 
 * 
 */
function removeWormMoveEvent() {
   document.onkeydown = null;
}




/**
 * 
 * 
 */
function timeController() {

   gameStatus.gameTime.microseconds++;

   if (gameStatus.gameTime.microseconds >= 10) {

      gameStatus.gameTime.seconds++;
      gameStatus.gameTime.microseconds = 0;

      if (gameStatus.gameTime.seconds >= 60) {

         gameStatus.gameTime.minutes++;
         gameStatus.gameTime.seconds = 0;

      }

   }

}



/**
 * 
 * 
 * @returns 
 */
function getFormatedTime() {

   function getTimeLessThen10Formated(value) {
      return (parseFloat(value) <= 9) ? `0${value}` : value;
   }

   let hours = getTimeLessThen10Formated(gameStatus.gameTime.minutes);
   let minutes = getTimeLessThen10Formated(gameStatus.gameTime.seconds);
   let seconds = getTimeLessThen10Formated(gameStatus.gameTime.microseconds);

   let time = `${hours}:${minutes}:${seconds}`;

   return time;

}



/**
 * 
 * 
 * @returns 
 */
function isWormFood() {

   let x = worm.balls[0].xPosition;
   let y = worm.balls[0].yPosition;

   return ((x >= food.xPosition && x + worm.size <= food.xPosition + food.size) && (y >= food.yPosition && y + worm.size <= food.yPosition + food.size));

}