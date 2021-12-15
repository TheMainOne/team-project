import * as watched from './for-watched-localstorage';
import getRefs from './refs';
import { renderWatchedVideos } from './render-watched';
import { filmFinder } from './finderOfFilm';

const refs = getRefs();
refs.gallery.dataset.gallery;

export function watchedAddEventListener() {
  const watchedBtn = document.querySelector('#watched-btn');
  watchedBtn.addEventListener('click', onClickBtnWatched);
}

export function watchedRemoveEventListener() {
  const watchedBtn = document.querySelector('#watched-btn');
  watchedBtn.removeEventListener('click', onClickBtnWatched);
}

export function onClickBtnWatched(e) {
  const isWachedGallery = refs.gallery.dataset.gallery === 'watch';
  const refWatchedBtn = e.target;
  const movieId = Number(document.querySelector('.movie').dataset.id);
  const currentMovie = filmFinder(movieId);

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
