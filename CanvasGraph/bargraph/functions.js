function getHighVal(vals) {

   let highVals = [];
   
   for (let i = 0; i < vals.length; i++) {
      highVals.push(Math.max(...vals[i]));
   }

   return Math.max(...highVals);

}




function drawBar(x, y, width, height, color, context) {

   color = color || "#888dff";

   context.fillStyle = color;
   context.fillRect(x, y, width, height - y);

}




function drawStroke(x, y, width, height, color, context) {

   color = color || "#FFF";

   context.strokeStyle = color;
   context.strokeRect(x, y, width, height - y);

}




function drawText(x, y, text, size, fontConfig, color, isToRotate, context) {

   fontConfig = fontConfig || "Arial 12px";
   color = color || "black";

   context.save();

   context.font = fontConfig;
   context.fillStyle = color;

   context.translate(x + (size / 2), y);

   if (isToRotate) {
      context.rotate(-Math.PI / 2);
   }

   context.fillText(text, 0, 0);

   context.restore();

}




function drawHelpers(context) {

   context.strokeStyle = 'black';

   let limit = LIMIT_Y / 2;

   context.beginPath();
   context.moveTo(startX, startY - limit);
   context.lineTo(startX, endY);
   context.lineTo(canvas.width * 0.99, endY);
   context.stroke();

}




function map(x, in_min, in_max, out_min, out_max) {

   return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;

}




function isMousePositionBetweenBar(event, bar) {

   let mouseX = event.clientX;
   let mouseY = event.clientY;

   return (mouseX > bar.startX && mouseX < bar.finalX) && (mouseY > bar.startY && mouseY < bar.finalY);

}




function drawInfoBox(event, value, context) {

   let posStartX = event.clientX - 20;
   let posStartY = event.clientY - 50;
   let size = 100;
   let height = 50;

   context.fillStyle = 'darkgreen';
   context.stroke = 'darkgreen';

   drawBox(posStartX, posStartY, size, height, undefined, context);
   drawText(posStartX - 45, posStartY + 30, value, size, undefined, undefined, false, context);

}




function drawBox(x, y, size, height, color, context) {
   
   color = color || '#FFF';

   context.fillStyle = color;
   context.fillRect(x, y, size, height);
   context.fillRect(x, y, size, height);

   context.strokeStyle = '#000';
   context.strokeRect(x, y, size, height)

}




function clearInfoBox(context) {
   
   context.clearRect(0, 0, canvas.width, canvas.height);

}