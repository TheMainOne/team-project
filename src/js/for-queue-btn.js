import { addToQueue, removeFromQueue } from './for-queue-localstorage';
import { load } from './storage';
import getRefs from './refs';
import { videoapi } from './api-service';
import { renderGallery } from '..';
const {TRENDING, QUEUE} = videoapi.keys
const refs = getRefs();
const refsGallery = refs.gallery;





export function queueAddEventListener() {
  const queue = document.querySelector("#queue-btn");
    queue.addEventListener('click', onClickBtnQuequ);
  }


export function queueRemoveEventListener() {
  const queue = document.querySelector("#queue-btn");
    queue.removeEventListener('click', onClickBtnQuequ);
}


export async function onClickBtnQuequ(e) {
  const gallaryData = refs.gallery.dataset.gallery;
  const refQueueBtn = e.currentTarget;
  const movieId = Number(document.querySelector('.movie').dataset.id);
  const filmOfWeek = await load(TRENDING.WEEK).results;
  const ourFilm = filmOfWeek.find(film => film.id === movieId);
  

  if (refQueueBtn.dataset.action === 'add-to-queue') {
        addToQueue(refQueueBtn, ourFilm);
        return
  } else {
        removeFromQueue(refQueueBtn, ourFilm);
    }    
  
  
  if (gallaryData === "queue") {
    refsGallery.innerHTML = ''
    renderGallery(load(QUEUE));
  };

  };