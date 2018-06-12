async function getProducts() {

   return new Promise(res => {

      let req = new XMLHttpRequest();

      req.onreadystatechange = function () {

         if (req.readyState == 4 && req.status == 200) {
            res(JSON.parse(req.responseText));
         }

      }

      req.open('GET', '../json/products.json', true);
      req.send();

   });

}

function isStringSimilar(searchString) {

   let score = 0;
   
   let index = {
      start: 0,
      final: 2,
      incrementAll: () => {
         this.start++;
         this.final++;
      }
   }

   if (score > 3) return true;

   return false;

}