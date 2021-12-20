import getRefs from './refs';
import { videoapi } from './api-service';
import { addToQueue, removeFromQueue } from './for-queue-localstorage';
import { renderCard } from './init-gallery';
import { setFon } from './fon-library';
import { filmFinder } from './finderOfFilm';
import { renderCarousel, setSnowIfEmptyCarousels } from './carousel';
import carouselRefs from './get-carousel-refs';

const { QUEUE } = videoapi.keys;
const refs = getRefs();
const refsGallery = refs.gallery;
const perPage = 9;
const { carousel, carouselListQueue, carouselQueue, gifQueue } = carouselRefs();

export function queueAddEventListener() {
  const queue = document.querySelector('#queue-btn');
  queue.addEventListener('click', onClickBtnQueue);
}

export function queueRemoveEventListener() {
  const queue = document.querySelector('#queue-btn');
  queue.removeEventListener('click', onClickBtnQueue);
}

export async function onClickBtnQueue(e) {
  const inQueuePage = refsGallery.dataset.gallery === 'queue';
  const refQueueBtn = e.target;
  const isClickOnAdd = refQueueBtn.dataset.action === 'add-to-queue';
  const movieId = Number(refQueueBtn.closest('.movie').dataset.id);
  const ourFilm = filmFinder(movieId);
  const inLibrary = refsGallery.dataset.gallery === 'library';

  if (isClickOnAdd) {
    addToQueue(refQueueBtn, ourFilm);
  } else {
    removeFromQueue(refQueueBtn, ourFilm);
  }

  if (inQueuePage) {
    refsGallery.innerHTML = '';
    setFon();
    await renderCard({ key: QUEUE, perPage });
  }

  if (inLibrary) {
    renderCarousel(QUEUE, carouselListQueue, carouselQueue, gifQueue);
    carousel.classList.remove('is-hidden');
    setSnowIfEmptyCarousels();
  }
}
