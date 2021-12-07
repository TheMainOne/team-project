import { save, load } from './storage';

const LOCAL_STORAGE_QUEUE = 'filmoteka-queue';


export async function addToQueue(refQueueBtn, ourFilm) {
      
      let filmsForQueue = [];

      if (load(LOCAL_STORAGE_QUEUE)) {
        filmsForQueue = await load(LOCAL_STORAGE_QUEUE);
      };
  
      filmsForQueue = [
        ourFilm,
        ...filmsForQueue,
      ];

      save(LOCAL_STORAGE_QUEUE, filmsForQueue);
    
      refQueueBtn.dataset.action = 'remove-from-queue';
      refQueueBtn.innerHTML = "Remove from queue"
    }


export async function removeFromQueue(refQueueBtn, ourFilm) {
      
  const filmsOfQueue = await load(LOCAL_STORAGE_QUEUE);
  let indexOfFilm = null;

  await filmsOfQueue.forEach((element, index) => {
      if (element.id === ourFilm.id) {
          return indexOfFilm = index;     
      }
  })

  if (indexOfFilm === null) {
    return
  }

  await filmsOfQueue.splice(indexOfFilm, 1);
  save(LOCAL_STORAGE_QUEUE, filmsOfQueue);
  
  refQueueBtn.dataset.action = 'add-to-queue';
  refQueueBtn.innerHTML = "add to queue";

  }


export  function searchFilmInQueue(ourFilm) {
  let isFind = false;
  let filmsOfQueue = [];

  if (load(LOCAL_STORAGE_QUEUE)) {
    filmsOfQueue = load(LOCAL_STORAGE_QUEUE);
  };

  filmsOfQueue.forEach(element => {
    if (element.id === ourFilm.id) {
      return isFind = true
    };
  });

  return isFind;  
}
  


   
