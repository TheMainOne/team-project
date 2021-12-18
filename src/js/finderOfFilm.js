import { videoapi } from './api-service';

export function filmFinder(movieId) {
  if (!movieId) {
    return {};
  }
  const namesOfLocalStorage = Object.values(videoapi.keys);

  for (const nameLS of namesOfLocalStorage) {
    const ourFilm =
      typeof nameLS === 'object'
        ? getObjOfFilm(Object.values(nameLS), movieId)
        : getObjOfFilm(namesOfLocalStorage, movieId);

    if (ourFilm) {
      return ourFilm;
    }
  }
}

function getObjOfFilm(keysOfLS, id) {
  let arraysOfFilms = [];

  for (const keyOfLS of keysOfLS) {
    // const loadedStorage = load(keyOfLS);
    // arraysOfFilms = loadedStorage?.results ? loadedStorage?.results : loadedStorage;

    if (videoapi.type === keyOfLS) {
      arraysOfFilms = videoapi.rendered[keyOfLS]; // to work in memory, without call to firebase
    }

    const ourFilm = getFilmById(id, arraysOfFilms);
    if (ourFilm) {
      return ourFilm;
    }
  }
}

function getFilmById(idOfFilm, loaderStorage) {
  return loaderStorage?.find(film => film?.id === Number(idOfFilm));
}
