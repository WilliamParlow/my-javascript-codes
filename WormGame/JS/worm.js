let wormMovement = {

   // Stopped
   s: function () {
      
   },

   // Up
   u: function () {
      worm.balls[0].yPosition -= worm.size;
   },

   // Down
   d: function () {
      worm.balls[0].yPosition += worm.size;
   },

   // Left
   l: function () {
      worm.balls[0].xPosition -= worm.size;
   },

   // Right
   r: function () {
      worm.balls[0].xPosition += worm.size;
   }

}


/**
 * 
 * 
 * @returns 
 */
function isWormInsideOfArena() {
   
   let x = worm.balls[0].xPosition;
   let y = worm.balls[0].yPosition;
   let wormSize = worm.size / 2;

   return (x > wormSize && x < gameWindow.width - wormSize) && (y > wormSize && y < gameWindow.height - wormSize);

}