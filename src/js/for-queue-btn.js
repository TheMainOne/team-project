import { addToQueue, removeFromQueue } from './for-queue-localstorage';
import { load } from './storage';

const LOCAL_STORAGE_WEEK = 'filmoteka-trending-week';
const queue = document.querySelector("#queue-btn");

export function queueAddEventListener(){
    queue.addEventListener('click', onClickBtnQuequ);
  }


export function queueRemoveEventListener() {
    queue.removeEventListener('click', onClickBtnQuequ);
}


export async function onClickBtnQuequ(e) {
    const refQueueBtn = e.currentTarget;
    const movieId = Number(document.querySelector('.movie').dataset.id);
    const filmOfWeek = await load(LOCAL_STORAGE_WEEK).results;
    const ourFilm = filmOfWeek.find(film => film.id === movieId);
    

  if (refQueueBtn.getAttribute('data-action') === 'add-to-queue') {
        return addToQueue(refQueueBtn, ourFilm)
    };    
        return removeFromQueue(refQueueBtn, ourFilm);
  };