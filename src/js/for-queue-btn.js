import { videoapi } from './api-service';
import { addToQueue, removeFromQueue } from './for-queue-localstorage';
import { load } from './storage';
import getRefs from './refs';
import { renderCard } from './init-gallery';
import { fonLibrary, setFon } from './fon-library';
import { setBgSnow, deleteCanvas } from './library';
import { hidePagination, showPagination } from './pagination';
const { TRENDING, QUEUE, SEARCH, WATCHED } = videoapi.keys;
const refs = getRefs();
const refsGallery = refs.gallery;
const perPage = 9;

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
  let ourFilm = {};

  const isFilmInQueue = load(QUEUE)?.find(film => film.id === movieId);
  const isFilmInWatched = load(WATCHED)?.find(film => film.id === movieId);
  const isFilmInTrendingWeek = load(TRENDING.WEEK)?.results.find(
    film => film.id === movieId,
  );
  const isFilmInSearch = load(SEARCH)?.results.find(
    film => film.id === movieId,
  );
  const isFilmInTrendingDay = load(TRENDING.DAY)?.results.find(
    film => film.id === movieId,
  );

  if (isFilmInQueue) {
    ourFilm = isFilmInQueue;
  } else if (isFilmInWatched) {
    ourFilm = isFilmInWatched;
  } else if (isFilmInTrendingWeek) {
    ourFilm = isFilmInTrendingWeek;
  } else if (isFilmInSearch) {
    ourFilm = isFilmInSearch;
  } else if (isFilmInTrendingDay) {
    ourFilm = isFilmInTrendingDay;
  }

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
}
