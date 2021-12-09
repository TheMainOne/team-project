import { save, load } from './storage';
import { videoapi } from './api-service';
const {QUEUE} = videoapi.keys



export function addToQueue(refQueueBtn, ourFilm) {
      
      let filmsForQueue = [];

      if (load(QUEUE)) {
        filmsForQueue = load(QUEUE);
      };
  
      filmsForQueue = [
        ourFilm,
        ...filmsForQueue,
      ];

      save(QUEUE, filmsForQueue);
    
      refQueueBtn.dataset.action = 'remove-from-queue';
      refQueueBtn.innerHTML = "Remove from queue"
    }


export  function removeFromQueue(refQueueBtn, ourFilm) {
      
  const filmsOfQueue =  load(QUEUE);
  let indexOfFilm = null;

   filmsOfQueue.forEach((element, index) => {
      if (element.id === ourFilm.id) {
          return indexOfFilm = index;     
      }
  })

  filmsOfQueue.splice(indexOfFilm, 1);
  save(QUEUE, filmsOfQueue);
  
  refQueueBtn.dataset.action = 'add-to-queue';
  refQueueBtn.innerHTML = "add to queue";

  }


export  function searchFilmInQueue(id) {

  let filmsOfQueue = [];

  if (load(QUEUE)) {
    filmsOfQueue = load(QUEUE);
  };

 return filmsOfQueue.find(element => element.id === id);
}
  


   
