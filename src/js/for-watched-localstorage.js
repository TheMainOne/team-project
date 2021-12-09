import { save, load } from './storage';
import { videoapi } from './api-service';
const {WATCHED} = videoapi.keys
const LOCAL_STORAGE_WATCHED = WATCHED;

export function addToWatch(refWatchedBtn, currentMovie) {
  let movieForWatched = [];

  if (load(LOCAL_STORAGE_WATCHED)) {
    movieForWatched = load(LOCAL_STORAGE_WATCHED);
  }

  movieForWatched = [currentMovie, ...movieForWatched];

  save(LOCAL_STORAGE_WATCHED, movieForWatched);

  refWatchedBtn.dataset.action = 'remove-from-watched';
  refWatchedBtn.innerHTML = 'Remove from watched';
}

export function removeFromWatched(refWatchedBtn, currentMovie) {
  const movieOfWatched = load(LOCAL_STORAGE_WATCHED);
  let indexOfMovie = null;

  movieOfWatched.forEach((element, index) => {
    if (element.id === currentMovie.id) {
      return (indexOfMovie = index);
    }
  });

  movieOfWatched.splice(indexOfMovie, 1);
  save(LOCAL_STORAGE_WATCHED, movieOfWatched);

  refWatchedBtn.dataset.action = 'add-to-watched';
  refWatchedBtn.innerHTML = 'add to watched';
}

export function searchFilmInWatched(id) {
  let movieOfWatched = [];

  if (load(LOCAL_STORAGE_WATCHED)) {
    movieOfWatched = load(LOCAL_STORAGE_WATCHED);

  }

  return movieOfWatched.find(movie => movie.id === id);
 
}
