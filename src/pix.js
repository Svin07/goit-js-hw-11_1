import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = "38721058-dcc1021070edf740dd0c7c82a";

export async function getPhoto(searchQuery, page) {
  const resp = await axios.get(
    `${BASE_URL}?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`
  );
  return resp;
  
}

// export async function getPhoto(params, page) {
//     const resp = await fetch(`${BASE_URL}?key=${API_KEY}&q=${params}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`);
//    if (!resp.ok) {
//        throw new Error(resp.statusText);
//    }
//    return resp.json();
// }