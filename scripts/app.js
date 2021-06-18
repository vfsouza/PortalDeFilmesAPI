const TMDB_ENDPOINT = "https://api.themoviedb.org/3";
const API_KEY = "a812957cbbeeecf7b27c9ea2160cb39d";
const pt_BR = "&language=pt-BR";
const IMG_PREFIX = 'https://image.tmdb.org/t/p/w500';
var filmeCarrousel, filmeCards, filmesPesquisa;

function carregaCardsFilmes() {
   let xhr = new XMLHttpRequest();

   xhr.open ('GET', TMDB_ENDPOINT + '/movie/popular?api_key=' + API_KEY + pt_BR);
   xhr.onload = exibeCardsFilmes;
   xhr.send();
}

function exibeCardsFilmes(evento) {
   $('#cards-index').html('');
   filmeCards = JSON.parse(evento.target.responseText);
   for(let i = 0; i < 4; i++) {
      let data = filmeCards.results[i].release_date;
      data = data.split('-').reverse('').join('/');
      $('#cards-index').append(`
      <div class="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3">  
         <div class="card mx-auto" style="width: 95%; ">
            <img src="${IMG_PREFIX + filmeCards.results[i].poster_path}" class="card-img-top">
            <div class="card-body">
            <h5 class="card-title">${filmeCards.results[i].title}</h5>
            <p class="card-text">Nota: ${filmeCards.results[i].vote_average}</p>
            <p class="card-text">Data de lançamento: ${data}</p>
            <button type="button" id="${filmeCards.results[i].id}" class="btn btn-dark" onclick="abrirPag(this.id)">Detalhes</button>
            </div>
         </div>
      </div>`);
   }
}

function carregaCarrouselFilmes() {
   let xhr = new XMLHttpRequest();

   xhr.open ('GET', TMDB_ENDPOINT + '/movie/upcoming?api_key=' + API_KEY + pt_BR);
   xhr.onload = exibeCarrouselFilmes;
   xhr.send();
}

function exibeCarrouselFilmes(evento) {
   $('#carrousel-index').html('');
   filmeCarrousel = JSON.parse(evento.target.responseText);
   for(let i = 0; i < 3; i++) {
      let data = filmeCarrousel.results[i].release_date;
      data = data.split('-').reverse('').join('/');
      if(i == 0) {
         $('#carrousel-index').append(`
         <div class="carousel-item active">
            <div class="row slide mx-auto">
               <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6 d-flex justify-content-center">
                  <img src="${IMG_PREFIX + filmeCarrousel.results[i].poster_path}" style="width: 300px">
               </div>
               <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6">
                  <h1>${filmeCarrousel.results[i].title}</h1>
                  <p><b>Sinopse:</b> ${filmeCarrousel.results[i].overview}
                  </p>
                  <p><b>Nota:</b> ${filmeCards.results[i].vote_average}</p>
                  <button type="button" id="${filmeCarrousel.results[i].id}" class="btn btn-dark" onclick="abrirPag(this.id)">Detalhes</button>
               </div>
            </div>
         </div>`);
      }
      else {    
         $('#carrousel-index').append(`
         <div class="carousel-item">
            <div class="row slide mx-auto">
               <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6 d-flex justify-content-center">
                  <img src="${IMG_PREFIX + filmeCarrousel.results[i].poster_path}" style="width: 300px">
               </div>
               <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6">
                  <h1>${filmeCarrousel.results[i].title}</h1>
                  <p><b>Sinopse:</b> ${filmeCarrousel.results[i].overview}
                  </p>
                  <p><b>Nota:</b> ${filmeCards.results[i].vote_average}</p>
                  <button type="button" id="${filmeCarrousel.results[i].id}" class="btn btn-dark" onclick="abrirPag(this.id)">Detalhes</button>
               </div>
            </div>
         </div>`);
      }
   }
}

function abrirPag(id) {
   for(let i = 0; i < filmeCards.results.length; i++) {
      if(id == filmeCards.results[i].id) {
         localStorage.setItem('filmeAtual', JSON.stringify(filmeCards.results[i]))
         console.log('DEBUG: ', filmeCards.results[i])
      }
   }
   for(let i = 0; i < filmeCarrousel.results.length; i++) {
      if(id == filmeCarrousel.results[i].id) {
         localStorage.setItem('filmeAtual', JSON.stringify(filmeCarrousel.results[i]))
         console.log('DEBUG: ', filmeCarrousel.results[i])
      }
   }
   for(let i = 0; i < filmesPesquisa.results.length; i++) {
      if(id == filmesPesquisa.results[i].id) {
         localStorage.setItem('filmeAtual', JSON.stringify(filmesPesquisa.results[i]))
         console.log('DEBUG: ', filmesPesquisa.results[i])
      }
   }
   exibeFilmeAtual();
}


function exibeFilmeAtual() {
   let filme = JSON.parse(localStorage.getItem('filmeAtual'))
   $('#carrousel-index').html('');
   $('#cards-index').html('');
   $('#cards-index').append(`
      <div class="col-12">
         <div class="col-12 mb-5 mt-5">
            <img src="${IMG_PREFIX + filme.poster_path}" style="width: 300px">
         </div>
         <div class="col-12">
            <h1>${filme.title}</h1>
         </div>
         <div class="col-12 mt-4">
            <p><b>Sinopse:</b> </p>
            <p>${filme.overview}</p>
         </div>
         <div class="col-12 mt-4">
            <p><b>Data de lançamento:</b> ${filme.release_date.split('-').reverse('').join('/')}</p>
         </div>
         <div class="col-12 mt-4">
            <p><b>Nota:</b> ${filme.vote_average}</p>
         </div>
      </div>`);
};

function pesquisaFilmes() {
   let xhr = new XMLHttpRequest();

   let query = document.getElementById('inputPesquisa').value;

   xhr.open ('GET', TMDB_ENDPOINT + '/search/movie?api_key=' + API_KEY + '&query=' + query + pt_BR);
   xhr.onload = exibeCardsPesquisa;
   xhr.send();
}

function exibeCardsPesquisa(evento2) {
   $('#carrousel-index').html('');
   $('#cards-index').html('');
   let textoHTML = '';
   filmesPesquisa = JSON.parse(evento2.target.responseText);
   console.log('DEBUG: ', filmesPesquisa);

   for (let i = 0; i < filmesPesquisa.results.length; i++) {
       let data = filmesPesquisa.results[i].release_date;
       data = data.split('-').reverse('').join('/');
       textoHTML += `
       <div class="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3">  
          <div class="card mx-auto" style="width: 95%; ">
             <img src="${IMG_PREFIX + filmesPesquisa.results[i].poster_path}" class="card-img-top">
             <div class="card-body">
             <h5 class="card-title">${filmesPesquisa.results[i].title}</h5>
             <p class="card-text">Nota: ${filmesPesquisa.results[i].vote_average}</p>
             <p class="card-text">Data de lançamento: ${data}</p>
             <button type="button" id="${filmesPesquisa.results[i].id}" class="btn btn-dark" onclick="abrirPag(this.id)">Detalhes</button>
             </div>
          </div>
       </div>`
      console.log('DEBUG: ', textoHTML);
   }

   document.getElementById('cards-index').innerHTML = textoHTML;
}