import { load } from './storage';
import * as watched from './for-watched-localstorage';

const KEY = 'filmoteka-trending-week';

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
  const filmOfWeek = await load(KEY).results;
  const currentMovie = filmOfWeek.find(movie => movie.id === movieId);

  if (refWatchedBtn.dataset.action === 'add-to-watched') {
    return watched.addToWatch(refWatchedBtn, currentMovie);
  }
  return watched.removeFromWatched(refWatchedBtn, currentMovie);
}
