let wormMovement = {

   // Stopped
   s: function () {
      
   },

   // Up
   u: function () {
      this.moveBalls();
      worm.balls[0].yPosition -= worm.size;
   },

   // Down
   d: function () {
      this.moveBalls();
      worm.balls[0].yPosition += worm.size;
   },

   // Left
   l: function () {
      this.moveBalls();
      worm.balls[0].xPosition -= worm.size;
   },

   // Right
   r: function () {
      this.moveBalls();
      worm.balls[0].xPosition += worm.size;
   },

   // Move all worm balls
   moveBalls: function() {
      for (let i = worm.balls.length - 1; i > 0; i--) {
         worm.balls[i].yPosition = worm.balls[i-1].yPosition;
         worm.balls[i].xPosition = worm.balls[i-1].xPosition;
      }
   }

};



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



/**
 * 
 * 
 * @returns
 */
function isWormSelfBumped() {

   let x = worm.balls[0].xPosition;
   let y = worm.balls[0].yPosition;
   let wormSize = worm.size / 2;

   let wormBumpState = false;

   for (let i = 1; i < worm.balls.length; i++) {

      let pos = worm.balls[i];

      if ((x >= pos.xPosition && x <= pos.xPosition) && (y >= pos.yPosition && y <= pos.yPosition)) {
         wormBumpState = true;
      }

   }

   return wormBumpState;

}