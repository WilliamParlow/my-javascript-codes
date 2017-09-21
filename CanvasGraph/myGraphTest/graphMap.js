function mapObject(x, y, size, height, value) {

   graphBarMap[`bar${Math.round(x)}`] = {};

   graphBarMap[`bar${Math.round(x)}`]['startX'] = Math.round(x);
   graphBarMap[`bar${Math.round(x)}`]['finalX'] = Math.round(x + size);
   graphBarMap[`bar${Math.round(x)}`]['startY'] = Math.round(y);
   graphBarMap[`bar${Math.round(x)}`]['finalY'] = Math.round((height + y) - y);
   graphBarMap[`bar${Math.round(x)}`]['value'] = value;

}