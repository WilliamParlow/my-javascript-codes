let $ = document.querySelector.bind(document);
let tableBody = $('#productsListBody');
let selectBox = $('#findBy');
let bodyRows = [];

window.onload = function() {

   getProducts().then(res => {

      res.forEach(product => {

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

   })
   
}

$('#search').onkeyup = function() {

   let searchIndex = parseInt(selectBox.value) + 1;
   console.log(searchIndex);
   

   bodyRows.forEach(tr => {

      let searchVal = tr.children[searchIndex];

      if (isStringSimilar(searchVal)) {
         tr.classList.add('hide');
      } else {
         tr.classList.remove('hide');
      }

   });

}

