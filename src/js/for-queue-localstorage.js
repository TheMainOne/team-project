import { save, load } from './storage';

const LOCAL_STORAGE_QUEUE = 'filmoteka-queue';


export function addToQueue(refQueueBtn, ourFilm) {
      
      let filmsForQueue = [];

      if (load(LOCAL_STORAGE_QUEUE)) {
        filmsForQueue = load(LOCAL_STORAGE_QUEUE);
      };
  
      filmsForQueue = [
        ourFilm,
        ...filmsForQueue,
      ];

      save(LOCAL_STORAGE_QUEUE, filmsForQueue);
    
      refQueueBtn.dataset.action = 'remove-from-queue';
      refQueueBtn.innerHTML = "Remove from queue"
    }


export  function removeFromQueue(refQueueBtn, ourFilm) {
      
  const filmsOfQueue =  load(LOCAL_STORAGE_QUEUE);
  let indexOfFilm = null;

   filmsOfQueue.forEach((element, index) => {
      if (element.id === ourFilm.id) {
          return indexOfFilm = index;     
      }
  })

  filmsOfQueue.splice(indexOfFilm, 1);
  save(LOCAL_STORAGE_QUEUE, filmsOfQueue);
  
  refQueueBtn.dataset.action = 'add-to-queue';
  refQueueBtn.innerHTML = "add to queue";

  }


export  function searchFilmInQueue(id) {

  let filmsOfQueue = [];

  if (load(LOCAL_STORAGE_QUEUE)) {
    filmsOfQueue = load(LOCAL_STORAGE_QUEUE);
  };

 return filmsOfQueue.find(element => element.id === id);
}
  


   
