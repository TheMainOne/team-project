import { save, load } from './storage';
import { videoapi } from './api-service';
const { QUEUE } = videoapi.keys;

export function addToQueue(refQueueBtn, ourFilm) {
  const filmIdOfModalWindow = Number(refQueueBtn.closest('.movie').dataset.id);
  const lastDeletedFilm = videoapi.deletedFilm.queue;

  ourFilm = lastDeletedFilm?.id === filmIdOfModalWindow ? lastDeletedFilm : ourFilm;
  const filmsForQueue = load(QUEUE) ? [ourFilm, ...load(QUEUE)] : [ourFilm];
  save(QUEUE, filmsForQueue);

  refQueueBtn.dataset.action = 'remove-from-queue';
  refQueueBtn.innerHTML = 'Remove from queue';
}

export function removeFromQueue(refQueueBtn, ourFilm) {
  videoapi.deletedFilm.queue = ourFilm;
  const filmsForQueue = load(QUEUE).filter(film => film.id !== ourFilm.id);
  save(QUEUE, filmsForQueue);

  refQueueBtn.dataset.action = 'add-to-queue';
  refQueueBtn.innerHTML = 'add to queue';
}

export function searchFilmInQueue(id) {
  return load(QUEUE) ? load(QUEUE).find(element => element?.id === id) : undefined;
}
