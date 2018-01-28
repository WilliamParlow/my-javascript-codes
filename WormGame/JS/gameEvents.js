window.onload = function () {

   gameWindow.width = document.querySelector('.container').clientWidth - 20;
   gameWindow.height = document.querySelector('.container').clientHeight - 20;

   initGame();

};


/**
 * 
 * 
 */
function startWormGame() {

   gameWormMoveInterval = setInterval(gameController, worm.velocity);

   document.onkeydown = function(e) {

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