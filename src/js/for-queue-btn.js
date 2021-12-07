import {addToQueue, removeFromQueue} from './for-queue-localstorage';
const LOCAL_STORAGE_WEEK = 'filmoteka-trending-week';




export function queueAddEventListener(){
      const queue = document.querySelector("#queue-btn");
      queue.addEventListener('click', onClickBtnQuequ);
  }




export function queueRemoveEventListener() {
        const queue = document.querySelector("#queue-btn");
    queue.removeEventListener('click', onClickBtnQuequ);
}




export async function onClickBtnQuequ(e) {
    const refQueueBtn = e.currentTarget;
    const movieIndex = document.querySelector('.movie').dataset.idx
    const filmOfWeek = await JSON.parse(localStorage.getItem(LOCAL_STORAGE_WEEK)).results;
    const ourFilm = filmOfWeek[movieIndex];

  if (refQueueBtn.getAttribute('data-action') === 'add-to-queue') {
        return addToQueue(refQueueBtn, ourFilm)
    };    
        return removeFromQueue(refQueueBtn, ourFilm);
  };