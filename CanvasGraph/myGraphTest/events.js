canvas.setAttribute("width", window.innerWidth);
canvas.setAttribute("height", window.innerHeight);
canvasHover.setAttribute("width", window.innerWidth);
canvasHover.setAttribute("height", window.innerHeight);



window.onresize = function() {
   canvas.setAttribute("width", window.innerWidth);
   canvas.setAttribute("height", window.innerHeight);
   canvasHover.setAttribute("width", window.innerWidth);
   canvasHover.setAttribute("height", window.innerHeight);

   endX = window.innerWidth - LIMIT_X;
   endY = window.innerHeight - LIMIT_Y;

   appStart();
}

canvasHover.onmousemove = function(event) {

   // every -> need to return a boolean value. False will break the loop
   Object.keys(graphBarMap).every(function(bar) {

      if (isMousePositionBetweenBar(event, graphBarMap[bar])) {

         clearInfoBox(contextHover);
         drawInfoBox(event, `Value: ${graphBarMap[bar]['value']}`, contextHover);
         return false;

      } else {

         clearInfoBox(contextHover);

      }

      return true;

   })

}