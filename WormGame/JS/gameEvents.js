window.onload = function () {

   containerSize = {
      width: document.querySelector('.container').clientWidth,
      height: document.querySelector('.container').clientHeight
   };

   Object.assign(containerSize, {
      'pixelsRemaining': {
         width: parseFloat(String(containerSize.width).charAt(String(containerSize.width).length - 1)),
         height: parseFloat(String(containerSize.height).charAt(String(containerSize.height).length - 1))
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