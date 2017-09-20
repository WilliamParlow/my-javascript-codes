document.querySelector('#canvas').setAttribute("width", window.innerWidth);
document.querySelector('#canvas').setAttribute("height", window.innerHeight);



window.onresize = ()  => {
   document.querySelector('#canvas').setAttribute("width", window.innerWidth);
   document.querySelector('#canvas').setAttribute("height", window.innerHeight);

   endX = window.innerWidth - LIMIT_X;
   endY = window.innerHeight - LIMIT_Y;

   appStart();
}