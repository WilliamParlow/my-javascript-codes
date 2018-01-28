let wormMovement = {

   // Stopped
   s: function () {
      
   },

   // Up
   u: function () {
      worm.balls = worm.balls.map(function(positions) {
         return {
            xPosition: positions.xPosition,
            yPosition: positions.yPosition - worm.size * 2
         };
      });
   },

   // Down
   d: function () {
      worm.balls = worm.balls.map(function(positions) {
         return {
            xPosition: positions.xPosition,
            yPosition: positions.yPosition + worm.size * 2
         };
      });
   },

   // Left
   l: function () {
      worm.balls = worm.balls.map(function(positions) {
         return {
            xPosition: positions.xPosition - worm.size * 2,
            yPosition: positions.yPosition
         };
      });
   },

   // Right
   r: function () {
      worm.balls = worm.balls.map(function(positions) {
         return {
            xPosition: positions.xPosition + worm.size * 2,
            yPosition: positions.yPosition
         };
      });
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

   return (x > worm.size && x < gameWindow.width - worm.size) && (y > worm.size && y < gameWindow.height - worm.size);

}