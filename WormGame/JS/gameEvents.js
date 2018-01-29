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

   gameWormMoveInterval = setInterval(gameController, worm.velocity);

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
 * @returns 
 */
function isWormFood() {

   let x = worm.balls[0].xPosition;
   let y = worm.balls[0].yPosition;
   let wormSize = worm.size / 2;

   return ((x >= food.xPosition && x <= food.xPosition + food.size) && (y >= food.yPosition && y <= food.yPosition + food.size))

}