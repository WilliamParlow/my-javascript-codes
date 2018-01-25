let wormMovement = {

   // Stopped
   s: function() {
      console.log('Move!');
   },

   // Up
   u: function() {
      worm.yPosition--;
   },

   // Down
   d: function() {
      worm.yPosition++;
   },

   // Left
   l: function() {
      worm.xPosition--;
   },

   // Right
   r: function() {
      worm.xPosition++;
   }

}