import Notiflix from 'notiflix';

import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "38721058-dcc1021070edf740dd0c7c82a";

const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "38721058-dcc1021070edf740dd0c7c82a";

const form = document.querySelector('#search-form');
const list = document.querySelector('.js-list');
const loadMore = document.querySelector('.load-more');

loadMore.addEventListener('click', hendlerBtn);

form.addEventListener('submit', hendlerSubmit);

let currentPage = 1;
let searchQuery = '';

function hendlerSubmit(evt) {
  evt.preventDefault();
  

  searchQuery = evt.currentTarget.elements[0].value;
  


  getPhoto(searchQuery, page = 1)
    .then(data => {
    (list.innerHTML = createMarkup(data.hits));
    if (data.totalHits > 1) {
      loadMore.style.display="block";
      }
        if (data.totalHits === 0) {
          loadMore.style.display = "none";
        Notiflix.Report.info("Sorry, there are no images matching your search query. Please try again.");
      }
  }).catch(err => Notiflix.Report.failure(err));

  

 
}


async function getPhoto(params, page) {
     const resp = await fetch(`${BASE_URL}?key=${API_KEY}&q=${params}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`);
    if (!resp.ok) {
        throw new Error(resp.statusText);
    }
    return resp.json();
}

function createMarkup(arr) {
    return arr.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => `<li><div class="photo-card">
    <img src="${webformatURL}" alt="${tags}" loading="lazy" />
    <div class="info">
      <p class="info-item">
        <b>Likes:${likes}</b>
      </p>
      <p class="info-item">
        <b>Views:${views}</b>
      </p>
      <p class="info-item">
        <b>Comments:${comments}</b>
      </p>
      <p class="info-item">
        <b>Downloads:${downloads}</b>
      </p>
    </div>
  </div></li>`).join("");
}

function hendlerBtn() {
  currentPage += 1;
  
  getPhoto(searchQuery, currentPage).then(data => {
    (list.insertAdjacentHTML('beforeend', createMarkup(data.hits)));
    const totalPage = Math.ceil(data.total / 40)
  console.log(totalPage);
if (currentPage === totalPage) {
  loadMore.style.display = "none";
   Notiflix.Report.info("We're sorry, but you've reached the end of search results.")
    }
  })
    .catch(err => Notiflix.Report.failure(err));
  }