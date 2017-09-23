// Global Vars
var chartConfig;

var canvas = document.querySelector('#canvas');
var canvasHover = document.querySelector('#canvasHover');
var mainContext = canvas.getContext('2d');
var contextHover = canvasHover.getContext('2d');

var totalValues = 0;
var graphBarMap = {};

const LIMIT_X = 100;
const LIMIT_Y = 100;

var startX = LIMIT_X;
var endX = window.innerWidth - LIMIT_X;
var startY = LIMIT_Y;
var endY = window.innerHeight - LIMIT_Y;
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

   totalValues = 0;

   let values = [];
   let length = interval || Math.ceil(Math.random() * 6);

   for (let i = 0; i < length; i++) {
      values.push(Number((Math.random() * 10000).toFixed(2)));
      values[i] = getSubValues(5);
   }

   return values;
}

function getSubValues(interval) {

   let values = [];
   let length = interval || Math.ceil(Math.random() * 10);

   for (let i = 0; i < length; i++) {
      values.push(Number((Math.random() * 10000).toFixed(2)));
      totalValues++;
   }

   return values;
}