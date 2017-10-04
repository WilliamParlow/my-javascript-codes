var lista = {
   item1: {
      nome: "William",
      rating: parseInt(Math.random() * 5)
   },
   item2: {
      nome: "Anderson",
      rating: parseInt(Math.random() * 5)
   },
   item3: {
      nome: "Richard",
      rating: parseInt(Math.random() * 5)
   },
   item4: {
      nome: "Leonardo",
      rating: parseInt(Math.random() * 5)
   },
   item5: {
      nome: "Macarrão",
      rating: parseInt(Math.random() * 5)
   },
   item6: {
      nome: "Wesley",
      rating: parseInt(Math.random() * 5)
   },
   item7: {
      nome: "Amanda",
      rating: parseInt(Math.random() * 5)
   },
   item8: {
      nome: "Amaral",
      rating: parseInt(Math.random() * 5)
   },
   item9: {
      nome: "Leandro",
      rating: parseInt(Math.random() * 5)
   },
   item10: {
      nome: "Carimbo",
      rating: parseInt(Math.random() * 5)
   }
}

$(searchInput).keyup(function () {

   let searchVal = $(this).val();

   if (searchVal == "") {
      $(listContainer).children().removeClass('search-active');
      $(listContainer).removeClass('listContainer-active');

   } else {

      $(listContainer).addClass('listContainer-active');

      $(listContainer).children().each(function (index, element) {

         if ($(element).data('name').includes(searchVal)) {
            $(element).removeClass('search-active');

         } else {
            $(element).addClass('search-active');

         }


      });

   }

});

$(document).ready(function () {

   Object.keys(lista).forEach(function (key) {

      $(listContainer).append(`
      
      <div class="item" data-name="${lista[key].nome}">
         <div class="name">${lista[key].nome}</div>
         <div class="rate">Rate: ${lista[key].rating}</div>
      </div>
      
      `);

   });

});