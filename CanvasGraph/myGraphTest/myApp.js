function appStart() {

   chartConf = getConfig();

   drawGraph(chartConf);

}

function drawGraph(chartConf) {

   let x = startX;
   let highVal = getHighVal(chartConf.values);

   for (let i = 0; i < chartConf.values.length; i++) {

      for (let j = 0; j < chartConf.values[i].length; j++) {

         let value = chartConf.values[i][j];

         let y = map(value, 0, highVal, startY, endY);
         let size = endX / 12;
         let height = endY - 15;

         drawHelpers();
         drawBar(x, y, size, height);
         drawText(x, y, `${value}`, "12px Arial");

         x += size;

      }

   }

}

function getHighVal(vals) {

   let highVals = [];

   for (let i = 0; i < vals.length; i++) {
      highVals.push(Math.max(...vals[i]));
   }

   return Math.max(...highVals);

}

function drawBar(x, y, width, height) {

   context.fillStyle = "red";
   context.fillRect(x, y, width, height);

}

function drawText(x, y, text, fontConfig, color) {

   fontConfig = fontConfig || "Arial 12px";
   color = color || "black";

   context.font = fontConfig;
   context.fillStyle = color;
   context.fillText(text, x, y);

}

function drawHelpers() {

   context.fillStyle = 'black';

   context.fillRect(startX - 5, startY + 5, 5, endY);
   context.fillRect(startX - 5, window.innerHeight - 4, endX, 5);

}

function map(x, in_min, in_max, out_min, out_max) {
  
   return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;

}

appStart();