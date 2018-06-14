const KNN = 10;

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

function isStringSimilar(searchString, searchTarget) {

   searchString = searchString.toLowerCase();
   searchTarget = searchTarget.toLowerCase();

   let score = 0;

   let index = {
      start: 0,
      final: 2,
      incrementAll: () => {
         this.start++;
         this.final++;
      }
   }

   searchString.split('').forEach(charBase => {

      searchTarget.split('').forEach(charTarget => {

         if (charBase == charTarget) score++;

      });

   });

   if (score > searchString.length || searchString.includes(searchTarget)) return true;

   return false;

}

function searchByScore(objectIndex, searchString) {

   searchString = searchString.toLowerCase();

   let scoredProducts = [];

   getProducts().then(res => {

      res.forEach(product => {

         product.score = 0;

         if (Array.isArray(product[objectIndex])) {

            product[objectIndex].forEach(tag => {

               searchString.split('').forEach(searchChar => {

                  Object.keys(tag).forEach(tagKey => {

                     tag[tagKey].toLowerCase().split('').forEach(targetChar => {

                        if (searchChar == targetChar) product.score++;

                     });

                  });

               });

            });

         } else {

            searchString.split('').forEach(searchChar => {

               product[objectIndex].toLowerCase().split('').forEach(targetChar => {

                  if (searchChar == targetChar) product.score++;

               });

            });

         }

         scoredProducts.push(product);

      });

      buildTableByScore(scoredProducts);

   });

}

function buildTableByScore(products) {

   products = products.sort((a, b) => {
      if (a.score > b.score) {
         return -1;
      } else if (a.score < b.score) {
         return 1;
      }

      return 0;
   });

   console.log(products);

   buildTable(products);

}

function createTable(products) {

   if (products) {
      buildTable(products);

   } else {
      getProducts().then(res => {
         buildTable(res);

      });

   }

}

function buildTable(products) {

   tableBody.innerHTML = '';

   products.forEach(product => {

      let tr = document.createElement('tr');

      tr.innerHTML = `
         <td>${product.id}</td>
         <td>${product.nome}</td>
         <td>${product.categoria}</td>
         <td>${product.tags.map(tag => `${tag.tipo}, ${tag.cor}<span> | </span>`).join('')}</td>
      `;

      tableBody.appendChild(tr);

   });

   bodyRows = Array.from(tableBody.rows);

}