import { videoapi } from './api-service';
import { addToQueue, removeFromQueue } from './for-queue-localstorage';
import { load } from './storage';
import getRefs from './refs';
import { renderGallery } from './init-gallery';
import { setPagination } from './pagination';

const { TRENDING, QUEUE, SEARCH, WATCHED } = videoapi.keys;
const refs = getRefs();
const refsGallery = refs.gallery;

export function queueAddEventListener() {
  const queue = document.querySelector('#queue-btn');
  queue.addEventListener('click', onClickBtnQueue);
}

export function queueRemoveEventListener() {
  const queue = document.querySelector('#queue-btn');
  queue.removeEventListener('click', onClickBtnQueue);
}





export async function onClickBtnQueue(e) {

  const gallaryData = refs.gallery.dataset.gallery;
  const refQueueBtn = e.currentTarget;
  const movieId = Number(document.querySelector('.movie').dataset.id);
  const filmOfWeek = await load(TRENDING.WEEK).results;
  let ourFilm = filmOfWeek.find(film => film.id === movieId);

   if (!ourFilm) {
     const arrayOfFilms = load(SEARCH).results
     ourFilm = arrayOfFilms.find(film => film.id === movieId);  
    } 
  
  
  
  if (refQueueBtn.dataset.action === 'add-to-queue') {
        addToQueue(refQueueBtn, ourFilm);
        return
  } else {
        removeFromQueue(refQueueBtn, ourFilm);
    }    
  
  
  if (gallaryData === "queue") {
    refsGallery.innerHTML = ''
    renderGallery(load(QUEUE));
    setPagination(QUEUE, load(QUEUE).length)
  };

  }

//   if (galleryData === 'queue') {
//     refsGallery.innerHTML = '';
//     const loadedQueue = load(QUEUE);
//     if (loadedQueue) {
//       renderGallery(loadedQueue);
//       setPagination(QUEUE, loadedQueue.length);
//     }
//   }
// }
