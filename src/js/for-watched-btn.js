import { load, save } from './storage';
import * as watched from './for-watched-localstorage';
import { videoapi } from './api-service';

import getRefs from './refs';
import { renderGallery } from './init-gallery';
import { renderWatchedVideos } from './render-watched';
import { setPagination } from './pagination';
let dataGallery = getRefs().gallery.dataset.gallery;

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
  console.log('onClickBtnWatched ~ refWatchedBtn', refWatchedBtn);
  const movieId = Number(document.querySelector('.movie').dataset.id);
  console.log('onClickBtnWatched ~ movieId', movieId);

  let filmOfWeek = await load(TRENDING.WEEK).results;
  console.log(`trending`, filmOfWeek);
  let currentMovie = filmOfWeek.find(movie => movie.id === movieId);
  console.log('onClickBtnWatched ~ currentMovie', currentMovie);

  if (!currentMovie) {
    filmOfWeek = await load(WATCHED);
    if (filmOfWeek) {
      currentMovie = filmOfWeek.find(movie => movie.id === movieId);
      console.log('onClickBtnWatched ~ currentMovie', currentMovie);
    }
  }

  if (!currentMovie) {
    filmOfWeek = await load(SEARCH);
    console.log('onClickBtnWatched ~ filmOfWeek', filmOfWeek);

    if (filmOfWeek) {
      currentMovie = filmOfWeek.results.find(movie => movie.id === movieId);
      console.log(`search`, currentMovie);
    }
  }

  if (refWatchedBtn.dataset.action === 'add-to-watched') {
    console.log('add', currentMovie);
    return watched.addToWatch(refWatchedBtn, currentMovie);
  } else {
    console.log('remove', { currentMovie });
    watched.removeFromWatched(refWatchedBtn, currentMovie);
    renderWatchedVideos();
  }
}
