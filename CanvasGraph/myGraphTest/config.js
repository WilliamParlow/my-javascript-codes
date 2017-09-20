// Global Vars
var chartConfig;

var canvas = document.querySelector('#canvas');
var context = canvas.getContext('2d');

var startX = 100;
var endX = window.innerWidth - 100;
var startY = 100;
var endY = window.innerHeight - 100;
// Global Vars

function getConfig() {

   return getRandomData();

}

function getRandomData() {

   return {
      'values': getValues(),
   }

}

function getValues(interval) {

   let values = [];
   let length = interval || Math.ceil(Math.random() * 12);

   for (let i = 0; i < length; i++) {
      values.push(Number((Math.random() * 1000).toFixed(2)));
      values[i] = getSubValues(5);
   }

   return values;
}

function getSubValues(interval) {

   let values = [];
   let length = interval || Math.ceil(Math.random() * 10);

   for (let i = 0; i < length; i++) {
      values.push(Number((Math.random() * 1000).toFixed(2)));
   }

   return values;
}