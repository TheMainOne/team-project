import { load, save } from './storage';
import * as watched from './for-watched-localstorage';
import { videoapi } from './api-service';

import getRefs from './refs';
import { renderGallery } from './init-gallery';
import { renderWatchedVideos } from './render-watched';
import { setPagination } from './pagination';

const refs = getRefs();
let isWatched = refs.gallery.dataset.gallery;

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
  const refWatchedBtn = e.currentTarget;
  const movieId = Number(document.querySelector('.movie').dataset.id);

  let filmOfWeek = await load(TRENDING.WEEK).results;
  let currentMovie = filmOfWeek.find(movie => movie.id === movieId);

  if (!currentMovie) {
    filmOfWeek = await load(WATCHED);
    if (filmOfWeek) {
      currentMovie = filmOfWeek.find(movie => movie.id === movieId);
    }
  }

  if (!currentMovie) {
    filmOfWeek = await load(SEARCH);

    if (filmOfWeek) {
      currentMovie = filmOfWeek.results.find(movie => movie.id === movieId);
    }
  }

  const rerenderWatchGallery = () => {
    isWatched === 'watch' ? renderWatchedVideos() : null;
  };

  if (refWatchedBtn.dataset.action === 'add-to-watched') {
    watched.addToWatch(refWatchedBtn, currentMovie);
    rerenderWatchGallery();
  } else {
    watched.removeFromWatched(refWatchedBtn, currentMovie);
    rerenderWatchGallery();
  }
}
