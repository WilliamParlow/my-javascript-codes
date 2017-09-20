function getHighVal(vals) {

   let highVals = [];

   for (let i = 0; i < vals.length; i++) {
      highVals.push(Math.max(...vals[i]));
   }

   return Math.max(...highVals);

}




function drawBar(x, y, width, height, color) {

   color = color || "#888dff";

   context.fillStyle = color;
   context.fillRect(x, y, width, height - y);

}




function drawStroke(x, y, width, height, color) {

   color = color || "#FFF";

   context.strokeStyle = color;
   context.strokeRect(x, y, width, height);

}




function drawText(x, y, text, size, fontConfig, color) {

   fontConfig = fontConfig || "Arial 12px";
   color = color || "black";

   context.save();

   context.font = fontConfig;
   context.fillStyle = color;

   context.translate(x + (size / 2), y);
   context.rotate(-Math.PI / 2);

   context.fillText(text, 0, 0);

   context.restore();

}




function drawHelpers() {

   context.strokeStyle = 'black';

   let limit = LIMIT_Y / 2;

   context.beginPath();
   context.moveTo(startX, startY - limit);
   context.lineTo(startX, endY);
   context.lineTo(endX + limit, endY);
   context.stroke();

}




function map(x, in_min, in_max, out_min, out_max) {

   return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;

}