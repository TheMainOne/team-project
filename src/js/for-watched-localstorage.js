import { save, load } from './storage';
import { videoapi } from './api-service';
const { WATCHED } = videoapi.keys;

export function addToWatch(refWatchedBtn, currentMovie) {
  let movieForWatched = [];

  const loadedWatched = load(WATCHED);
  if (loadedWatched) {
    movieForWatched = loadedWatched;
  }

  movieForWatched = [currentMovie, ...movieForWatched];

  save(WATCHED, movieForWatched);

  refWatchedBtn.dataset.action = 'remove-from-watched';
  refWatchedBtn.innerHTML = 'Remove from watched';
}

export function removeFromWatched(refWatchedBtn, currentMovie) {
  const movieOfWatched = load(WATCHED);
  const newWatched = movieOfWatched.filter(
    movie => movie.id !== currentMovie.id,
  );
  save(WATCHED, newWatched);

  refWatchedBtn.dataset.action = 'add-to-watched';
  refWatchedBtn.innerHTML = 'add to watched';
}

export function searchFilmInWatched(id) {
  let movieOfWatched = [];

  const loadedWatched = load(WATCHED);
  if (loadedWatched) {
    movieOfWatched = loadedWatched;
  }

  return movieOfWatched.find(movie => movie.id === id);
}
