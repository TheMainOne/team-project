import { load } from './storage';
import * as watched from './for-watched-localstorage';
import { videoapi } from './api-service';
import getRefs from './refs';
import { renderWatchedVideos } from './render-watched';

const refs = getRefs();
refs.gallery.dataset.gallery;

const { TRENDING, QUEUE, SEARCH, WATCHED } = videoapi.keys;

export function watchedAddEventListener() {
  const watchedBtn = document.querySelector('#watched-btn');
  watchedBtn.addEventListener('click', onClickBtnWatched);
}

export function watchedRemoveEventListener() {
  const watchedBtn = document.querySelector('#watched-btn');
  watchedBtn.removeEventListener('click', onClickBtnWatched);
}

export async function onClickBtnWatched(e) {
  const isWachedGallery = refs.gallery.dataset.gallery === 'watch';
  const refWatchedBtn = e.currentTarget;
  const movieId = Number(document.querySelector('.movie').dataset.id);
  let film = await load(TRENDING.WEEK).results;
  let currentMovie = film.find(movie => movie.id === movieId);

  if (!currentMovie) {
    film = await load(WATCHED);
    if (film) {
      currentMovie = film.find(movie => movie.id === movieId);
    }
  }

  if (!currentMovie) {
    film = await load(SEARCH);
    if (film) {
      currentMovie = film.results.find(movie => movie.id === movieId);
    }
  }

  if (refWatchedBtn.dataset.action === 'add-to-watched') {
    watched.addToWatch(refWatchedBtn, currentMovie);
    if (isWachedGallery) {
      renderWatchedVideos();
    }
  } else {
    watched.removeFromWatched(refWatchedBtn, currentMovie);
    if (isWachedGallery) {
      renderWatchedVideos();
    }
  }
}
