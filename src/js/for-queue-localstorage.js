import { save, load } from './storage';
import { videoapi } from './api-service';
import { warning, success, notifyOptions } from './on-search';

const { QUEUE } = videoapi.keys;

export function addToQueue(refQueueBtn, ourFilm) {
  const filmIdOfModalWindow = Number(refQueueBtn.closest('.movie').dataset.id);
  const lastDeletedFilm = videoapi.deletedFilm.queue;

  ourFilm = lastDeletedFilm?.id === filmIdOfModalWindow ? lastDeletedFilm : ourFilm;
  const loadedQueue = load(QUEUE);
  const filmsForQueue = loadedQueue ? [ourFilm, ...loadedQueue] : [ourFilm];
  save(QUEUE, filmsForQueue);

  refQueueBtn.dataset.action = 'remove-from-queue';
  refQueueBtn.innerHTML = 'Remove from queue';
  success('In queue', notifyOptions(1000));
}

export function removeFromQueue(refQueueBtn, ourFilm) {
  const loadedQueue = load(QUEUE);
  if (!ourFilm || !loadedQueue) {
    return warning('No film id or not in queue', notifyOptions(2100));
  }

  videoapi.deletedFilm.queue = ourFilm;
  const filmsForQueue = loadedQueue.filter(film => film.id !== ourFilm.id);
  save(QUEUE, filmsForQueue);
  refQueueBtn.dataset.action = 'add-to-queue';
  refQueueBtn.innerHTML = 'add to queue';
  success('Removed from queue', notifyOptions(1000));
}

export function searchFilmInQueue(id) {
  const loadedQueue = load(QUEUE);
  return loadedQueue ? loadedQueue.find(film => Number(film.id) === Number(id)) : undefined;
}
