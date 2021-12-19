import { save, load } from './storage';
import { videoapi } from './api-service';
const { WATCHED } = videoapi.keys;

export function addToWatch(refWatchedBtn, ourFilm) {
  const filmIdOfModalWindow = Number(refWatchedBtn.closest('.movie').dataset.id);
  const lastDeletedFilm = videoapi.deletedFilm.watched;

  ourFilm = lastDeletedFilm?.id === filmIdOfModalWindow ? lastDeletedFilm : ourFilm;
  const filmsForWatched = load(WATCHED) ? [ourFilm, ...load(WATCHED)] : [ourFilm];
  save(WATCHED, filmsForWatched);

  refWatchedBtn.dataset.action = 'remove-from-watched';
  refWatchedBtn.innerHTML = 'Remove from watched';
}

export function removeFromWatched(refWatchedBtn, ourFilm) {
  videoapi.deletedFilm.watched = ourFilm;
  const filmsForWatched = load(WATCHED).filter(film => film.id !== ourFilm.id);
  save(WATCHED, filmsForWatched);

  refWatchedBtn.dataset.action = 'add-to-watched';
  refWatchedBtn.innerHTML = 'add to watched';
}

export function searchFilmInWatched(id) {
  let movieOfWatched = [];

  const loadedWatched = load(WATCHED);
  if (loadedWatched) {
    movieOfWatched = loadedWatched;
  }

  return movieOfWatched.find(movie => movie?.id === id);
}
