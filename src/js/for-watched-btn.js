import { load } from './storage';
import * as watched from './for-watched-localstorage';
import { videoapi } from './api-service';

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
  console.log(`trending`, filmOfWeek);
  let currentMovie = filmOfWeek.find(movie => movie.id === movieId);

  if (!currentMovie) {
    filmOfWeek = await load(WATCHED);
    if (filmOfWeek === true) {
      currentMovie = filmOfWeek.find(movie => movie.id === movieId);
      console.log(`watched`, currentMovie);
    }
  }

  if (!currentMovie) {
    filmOfWeek = await load(SEARCH);
    console.log(`search-result`, filmOfWeek);
    if (filmOfWeek != undefined) {
      currentMovie = filmOfWeek.results.find(movie => movie.id === movieId);
      console.log(`search`, currentMovie);
    }
  }

  if (refWatchedBtn.dataset.action === 'add-to-watched') {
    return watched.addToWatch(refWatchedBtn, currentMovie);
  } else {
    console.log(`remove`, currentMovie);
    return await watched.removeFromWatched(refWatchedBtn, currentMovie);
  }
}
