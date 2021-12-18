import { save, load } from './storage';
import { videoapi } from './api-service';
import { success, warning, notifyOptions } from './on-search';

const { WATCHED } = videoapi.keys;

export function addToWatch(refWatchedBtn, ourFilm) {
  const filmIdOfModalWindow = Number(refWatchedBtn.closest('.movie').dataset.id);
  const lastDeletedFilm = videoapi.deletedFilm.watched;

  ourFilm = lastDeletedFilm?.id === filmIdOfModalWindow ? lastDeletedFilm : ourFilm;
  const loadedWatched = load(WATCHED);
  const filmsForWatched = loadedWatched ? [ourFilm, ...loadedWatched] : [ourFilm];
  save(WATCHED, filmsForWatched);

  refWatchedBtn.dataset.action = 'remove-from-watched';
  refWatchedBtn.innerHTML = 'Remove from watched';
  success('In watched', notifyOptions(1000));
}

export function removeFromWatched(refWatchedBtn, ourFilm) {
  const loadedWatched = load(WATCHED);
  if (!ourFilm || !loadedWatched) {
    return warning('No film id or not in watched', notifyOptions(2100));
  }

  videoapi.deletedFilm.watched = ourFilm;
  const filmsForWatched = loadedWatched.filter(film => film.id !== ourFilm.id);
  save(WATCHED, filmsForWatched);

  refWatchedBtn.dataset.action = 'add-to-watched';
  refWatchedBtn.innerHTML = 'add to watched';
  success('Removed from watched', notifyOptions(1000));
}

export function searchFilmInWatched(id) {
  const loadedWatched = load(WATCHED);
  return loadedWatched ? loadedWatched.find(movie => Number(movie?.id) === Number(id)) : undefined;
}
