import { videoapi } from './api-service';
import { addToQueue, removeFromQueue } from './for-queue-localstorage';
import { load } from './storage';
import getRefs from './refs';
import { renderGallery } from './init-gallery';
import { setPagination } from './pagination';

const { TRENDING, QUEUE, SEARCH, WATCHED } = videoapi.keys;
const refs = getRefs();
const refsGallery = refs.gallery;

export function queueAddEventListener() {
  const queue = document.querySelector('#queue-btn');
  queue.addEventListener('click', onClickBtnQueue);
}

export function queueRemoveEventListener() {
  const queue = document.querySelector('#queue-btn');
  queue.removeEventListener('click', onClickBtnQueue);
}

export async function onClickBtnQueue(e) {
  const galleryData = refs.gallery.dataset.gallery;
  const refQueueBtn = e.currentTarget;
  const movieId = Number(document.querySelector('.movie').dataset.id);
  let ourFilm = null;

  const filmOfWeek = await load(TRENDING.WEEK);
  if (filmOfWeek) {
    ourFilm = filmOfWeek.results.find(film => film.id === movieId);
  }

  const loadedSearch = load(SEARCH);
  if (!ourFilm && loadedSearch) {
    ourFilm = loadedSearch.results.find(film => film.id === movieId);
  }

  const loadedWatched = load(WATCHED);
  if (!ourFilm && loadedWatched) {
    ourFilm = loadedWatched.find(film => film.id === movieId);
  }

  const loadedQueue = load(QUEUE);
  if (!ourFilm && loadedQueue) {
    ourFilm = loadedQueue.find(film => film.id === movieId);
  }

  if (refQueueBtn.dataset.action === 'add-to-queue') {
    addToQueue(refQueueBtn, ourFilm);
    return;
  } else {
    console.log('remove', { ourFilm });
    removeFromQueue(refQueueBtn, ourFilm);
  }

  if (galleryData === 'queue') {
    refsGallery.innerHTML = '';
    const loadedQueue = load(QUEUE);
    if (loadedQueue) {
      renderGallery(loadedQueue);
      setPagination(QUEUE, loadedQueue.length);
    }
  }
}
