const galleryContainer = document.querySelector('.gallery');

class Images {
  constructor(
    largeImageURL,
    webformatURL,
    tags,
    likes,
    views,
    comments,
    downloads
  ) {
    this.largeImageURL = largeImageURL;
    this.webformatURL = webformatURL;
    this.tags = tags;
    this.likes = likes;
    this.views = views;
    this.comments = comments;
    this.downloads = downloads;
  }
}

export function createGallery(images) {
  const gallery = images.map(
    ({
      largeImageURL,
      webformatURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    }) =>
      new Images(
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads
      )
  );
  return gallery;
}

export function createGalleryMarkup(gallery) {
  const galleryMarkup = gallery
    .map(hits => {
      return `<a class="gallery-item link" href="${hits.largeImageURL}" rel='noopener noreferrer nofollow'>
            <div class="gallery-card">
                <img class="gallery-image" src="${hits.webformatURL}" alt="${hits.tags}" loading="lazy" width="260" height="auto"/>
                <div class="info">
                    <p class="info-item">
                        <b>Likes: </b>${hits.likes}
                    </p>
                    <p class="info-item">
                        <b>Views: </b>${hits.views}
                    </p>
                    <p class="info-item">
                        <b>Comments: </b>${hits.comments}
                    </p>
                    <p class="info-item">
                        <b>Downloads: </b>${hits.downloads}
                    </p>
                </div>
            </div>
        </a>`;
    })
    .join('');
  galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);
}

export function clearGallery() {
  galleryContainer.innerHTML = '';
}
