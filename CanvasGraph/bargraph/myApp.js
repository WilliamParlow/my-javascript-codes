function appStart() {

   if (!chartConfig) {
      chartConfig = getConfig();
   }

   graphBarMap = {};

   drawGraph(chartConfig);

}

function drawGraph(chartConf) {

   let x = startX;
   let highVal = getHighVal(chartConf.values);

   for (let i = 0; i < chartConf.values.length; i++) {

      for (let j = 0; j < chartConf.values[i].length; j++) {

         let value = chartConf.values[i][j];

         let y = (endY - map(value, 0, highVal, startY, endY)) + LIMIT_Y;
         let size = Math.round(endX / totalValues * 0.95);
         let height = endY;

         drawHelpers(mainContext);
         drawBar(x, y, size, height, undefined, mainContext);
         drawStroke(x, y, size, height, undefined, mainContext);
         mapObject(x, y, size, height, value, mainContext);
         drawText(x, y, `${value.toLocaleString('pt-br')}`, size, "bold 12px Arial", undefined, true, mainContext);

         x += size;

      }

   }

}

appStart();