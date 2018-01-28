/**
 * 
 * 
 */
function createMenuEvent() {

   removeWormMoveEvent();
   clearWindow();

   let x = gameWindow.width / 4;
   let y = gameWindow.height / 3;
   let width = gameWindow.width / 2;
   let height = gameWindow.height / 3;

   game.strokeStyle = 'red';
   game.lineWidth = 5;
   game.strokeRect(x, y, width, height);

   game.font =  `${width / 8}px Arial`;
   game.fillText("Start Game!", x + width / 6, y + height / 1.6 - (x / 6));

   gameWindow.onclick = function (e) {

      let mouseX = e.clientX;
      let mouseY = e.clientY;

      if ((mouseX >= x && mouseX <= x + width) && (mouseY >= y && mouseY <= y + height)) {

         removeMenuEvent();
         clearWindow();
         startWormGame();

      }

   }

}


/**
 * 
 * 
 */
function removeMenuEvent() {
   gameWindow.onclick = null;
}