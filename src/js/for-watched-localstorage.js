import { save, load } from './storage';
import { videoapi } from './api-service';
const { WATCHED } = videoapi.keys;

export function addToWatch(refWatchedBtn, currentMovie) {
  let movieForWatched = [];

  if (load(WATCHED)) {
    movieForWatched = load(WATCHED);
  }

  movieForWatched = [currentMovie, ...movieForWatched];

  save(WATCHED, movieForWatched);

  refWatchedBtn.dataset.action = 'remove-from-watched';
  refWatchedBtn.innerHTML = 'Remove from watched';
}

export function removeFromWatched(refWatchedBtn, currentMovie) {
  const movieOfWatched = load(WATCHED);
  let indexOfMovie = null;

  movieOfWatched.forEach((element, index) => {
    if (element.id === currentMovie.id) {
      return (indexOfMovie = index);
    }
  });

  movieOfWatched.splice(indexOfMovie, 1);
  save(WATCHED, movieOfWatched);

  refWatchedBtn.dataset.action = 'add-to-watched';
  refWatchedBtn.innerHTML = 'add to watched';
}

export function searchFilmInWatched(id) {
  let movieOfWatched = [];

  if (load(WATCHED)) {
    movieOfWatched = load(WATCHED);
  }

  return movieOfWatched.find(movie => movie.id === id);
}
