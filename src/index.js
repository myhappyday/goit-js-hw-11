import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import throttle from 'lodash.throttle';
import GalleryApiService from './js/gallery-service';
import {
  createGalleryMarkup,
  createGallery,
  clearGallery,
} from './js/gallery-markup';

const THROTTLE_DELAY = 300;

const searchForm = document.querySelector('#search-form');

const loadMoreBtn = document.querySelector('[data-action="load-more"]');
const galleryApiService = new GalleryApiService();

searchForm.addEventListener('submit', throttle(onFormSubmit, THROTTLE_DELAY));

loadMoreBtn.addEventListener('click', onLoadMore);

loadMoreBtn.classList.add('is-hidden');

function onFormSubmit(event) {
  event.preventDefault();

  galleryApiService.query = event.target.elements.searchQuery.value
    .toLowerCase()
    .trim();
  fetchAndRenderPage();
}

async function fetchAndRenderPage() {
  if (!galleryApiService.query) {
    galleryApiService.emptyFieldSearch();
    searchForm.reset();
    return;
  }
  clearGallery();
  galleryApiService.resetPage();

  try {
    const response = await galleryApiService.getImages();
    if (response.hits === 0) {
      galleryApiService.emptyArray();
      return;
    }
    loadMoreBtn.classList.remove('is-hidden');
    createGalleryMarkup(response.hits);
    galleryApiService.totalHits(response.totalHits);
  } catch (error) {
    console.error(error);
  }
}

async function onLoadMore() {
  try {
    const response = await galleryApiService.getImages();
    createGalleryMarkup(response.hits);
    lightbox.refresh();
    if (response.hits.page * response.hits.per_page > response.totalHits) {
      galleryApiService.endOfCollection();
      return;
    }
  } catch (error) {
    console.error(error);
  }
}

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
