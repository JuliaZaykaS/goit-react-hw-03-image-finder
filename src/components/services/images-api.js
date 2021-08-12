const BASE_URL = 'https://pixabay.com/api/';
const KEY = '22169948-cc9572b9e3579c1f2dd268170';

// https://pixabay.com/api/?q=что_искать&page=номер_страницы&key=твой_ключ&image_type=photo&orientation=horizontal&per_page=12

// function getImages(value) {
//     const url = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=${this.perPage}&key=${KEY}`;
    
// }

// function fetchImages(searchQuery) {
//   // const url = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${searchQuery}&page=${page}&per_page=${perPage}&key=${KEY}`;
//   const url = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${searchQuery}&key=${KEY}`;
//   return fetch(url)
//     .then(response => {
//     if (response.ok) {
//       return response.json();
//     }

//     return Promise.reject(new Error(`Нет изображений по данному запросу ${searchQuery}`));
//   });
// }

// const apiImg = {
//   fetchImages
// }
// export default apiImg
export default class ImagesAPIService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.perPage = 12;
  }

  fetchImages() {
    const url = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=${this.perPage}&key=${KEY}`;

    return fetch(url)
        .then(response => {
            if (response.ok) {
               return response.json()
            }
            return Promise.reject(new Error(`Нет изображений по данному запросу ${this.searchQuery}`));

      })
      .then((images) => {

        this.incrementPage();
        return images;
      });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

 
}