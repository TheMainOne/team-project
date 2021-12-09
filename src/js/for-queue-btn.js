import { addToQueue, removeFromQueue } from './for-queue-localstorage';
import { load } from './storage';
import { videoapi } from './api-service';
// const { TRENDING } = videoapi.keys
const {TRENDING_WEEK} = videoapi.keys

import { Notify } from 'notiflix';



export function queueAddEventListener() {
  const queue = document.querySelector("#queue-btn");
    queue.addEventListener('click', onClickBtnQuequ);
  }


export function queueRemoveEventListener() {
  const queue = document.querySelector("#queue-btn");
    queue.removeEventListener('click', onClickBtnQuequ);
}


export async function onClickBtnQuequ(e) {
    const refQueueBtn = e.currentTarget;
    const movieId = Number(document.querySelector('.movie').dataset.id);
  // const filmOfWeek = await load(TRENDING.WEEK).results;
   const filmOfWeek = await load(TRENDING_WEEK).results;
    const ourFilm = filmOfWeek.find(film => film.id === movieId);
  
  if (!ourFilm) {
  return Notify.failure("Ooooppps! Houston, we have a problem!")
}
    

  if (refQueueBtn.dataset.action === 'add-to-queue') {
        return addToQueue(refQueueBtn, ourFilm)
    };    
        return removeFromQueue(refQueueBtn, ourFilm);
  };