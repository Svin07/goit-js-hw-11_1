import Notiflix from 'notiflix';

import { getPhoto } from './pix';


const form = document.querySelector('#search-form');
const list = document.querySelector('.js-list');
const loadMore = document.querySelector('.load-more');

loadMore.addEventListener('click', hendlerBtn);

form.addEventListener('submit', hendlerSubmit);

let currentPage = 1;
let searchQuery = '';
const page = 1;

async function hendlerSubmit(evt) {
  evt.preventDefault();
  

  searchQuery = evt.currentTarget.elements[0].value.trim();
  
if (searchQuery === "") {
  Notiflix.Report.info("Please enter your request");
}
else {
  currentPage = 1;
  try{
   const resp = await getPhoto(searchQuery, page);

   const { hits, totalHits } = resp.data;

   
    (list.innerHTML = createMarkup(hits));
    const totalPage = Math.ceil(totalHits / 40)
      if (totalPage > 1) {
        loadMore.style.display="block";
        }
          if (totalPage === 0 || totalPage === 1) {
            loadMore.style.display = "none";
          Notiflix.Report.info("Sorry, there are no images matching your search query. Please try again.");
  }
  }
catch(err)  {Notiflix.Report.failure(err)};
console.log(err)
}
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

async function hendlerBtn() {
  currentPage += 1;

  try {
    const resp = await getPhoto(searchQuery, currentPage);

    const { hits, totalHits } = resp.data;
    (list.insertAdjacentHTML('beforeend', createMarkup(hits)));
    const totalPage = Math.ceil(totalHits / 40);
    if (currentPage === totalPage) {
        loadMore.style.display = "none";
         Notiflix.Report.info("We're sorry, but you've reached the end of search results.")
          }
        }
  
  catch(err) {Notiflix.Report.failure(err)}

      }