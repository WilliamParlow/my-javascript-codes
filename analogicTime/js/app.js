let $ = document.querySelector.bind(document);
let canvas = $('#analogicTime');
let ctx = canvas.getContext('2d');

setInterval(function() {

   ctx.clearRect(0, 0, 300, 300);

   let date = new Date();

   ctx.strokeStyle = '#000';

   ctx.beginPath();
   ctx.fillStyle = '#000';
   ctx.arc(150, 150, 140, 0, 2 * Math.PI);
   ctx.lineWidth = 8;
   ctx.stroke();   

   ctx.font = '26px Arial';
   ctx.fillText('12', 136, 60);
   ctx.fillText('3', 250, 160);
   ctx.fillText('6', 145, 260);
   ctx.fillText('9', 40 ,160);

   // Minutos
   ctx.save();
   let minutes = date.getMinutes();
   ctx.beginPath();
   ctx.moveTo(150, 150);
   ctx.lineWidth = 7;
   ctx.lineTo(120, 240);
   ctx.stroke();
   ctx.restore();

   // horas
   ctx.save();
   let hours = date.getHours();
   ctx.beginPath();
   ctx.moveTo(150, 150);
   ctx.lineWidth = 7;
   ctx.lineTo(180, 180);
   ctx.stroke();
   ctx.restore();

   // segundos
   ctx.save();
   let seconds = date.getSeconds();
   ctx.beginPath();
   ctx.moveTo(150, 150);
   ctx.lineWidth = 4;
   ctx.lineTo(150, 240);
   ctx.strokeStyle = '#900';
   ctx.stroke();
   ctx.restore();

   ctx.beginPath();
   ctx.fillStyle = '#000';
   ctx.arc(150, 150, 10, 0, 2 * Math.PI);
   ctx.fill();

}, 1000);