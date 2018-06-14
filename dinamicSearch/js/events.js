let $ = document.querySelector.bind(document);
let tableBody = $('#productsListBody');
let selectBox = $('#findBy');
let inputSearch = $('#search');
let bodyRows = [];

window.onload = function () {

   createTable();

}

$('#search').onkeyup = function () {

   let searchString = inputSearch.value;
   let objectIndex = selectBox.selectedOptions[0].textContent.toLowerCase()

   // Use to search by score if score has value more high then searched chars
   //
   // let searchIndex = parseInt(selectBox.value) + 1;
   //
   // bodyRows.forEach(tr => {
   //
   //    let searchVal = tr.children[searchIndex].textContent;
   //
   //    if (isStringSimilar(searchString, searchVal)) {
   //       tr.classList.remove('hide');
   //    } else {
   //       tr.classList.add('hide');
   //    }
   //
   // });

   if (searchString) {
      searchByScore(objectIndex, searchString);
   } else {
      getProducts().then(res => {
         createTable(res);
      });
   }

}