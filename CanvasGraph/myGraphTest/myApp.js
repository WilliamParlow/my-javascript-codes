function appStart() {

   if (!chartConfig) {
      chartConfig = getConfig();
   }

   drawGraph(chartConfig);

}

function drawGraph(chartConf) {

   let x = startX;
   let highVal = getHighVal(chartConf.values);

   for (let i = 0; i < chartConf.values.length; i++) {

      for (let j = 0; j < chartConf.values[i].length; j++) {

         let value = chartConf.values[i][j];

         let y = (endY - map(value, 0, highVal, startY, endY)) + LIMIT_Y;
         let size = endX / totalValues;
         let height = endY;

         drawHelpers();
         drawBar(x, y, size, height);
         drawStroke(x, y, size, height);
         drawText(x, y, `${value.toLocaleString('pt-br')}`, size, "bold 12px Arial");

         x += size;

      }

   }

}

appStart();