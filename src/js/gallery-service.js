import Notiflix from 'notiflix';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '35186307-ee5a96d64e84a4118a963f69c';

export default class GalleryApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.per_page = 40;
  }
  async getImages() {
    const searchParams = new URLSearchParams({
      key: API_KEY,
      q: this.searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: this.page,
      per_page: this.per_page,
    });

    try {
      const response = await fetch(`${BASE_URL}?${searchParams.toString()}`);
      if (!response.ok) {
        throw new Error(response.status);
      }
      this.incrementPage();
      return await response.json();
    } catch (error) {
      consol.error(error);
    }
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  emptyFieldSearch() {
    Notiflix.Notify.info(
      'The search field cannot be empty. Please, enter your data to search.'
    );
  }

  emptyArray() {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }

  totalHits(total) {
    Notiflix.Notify.success(`Hooray! We found ${total} images.`);
  }

  endOfCollection() {
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
  }
}
