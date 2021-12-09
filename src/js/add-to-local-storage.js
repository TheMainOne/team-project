import { save, load } from './storage';
import { videoapi } from './api-service';

const addToLocalStorage = idx => {
 
 
 try {
   const modalAddToWatchBtn = document.querySelector('.add-to-watch');
  // const madalAddToQueueBtn = document.querySelector('.add-to-queue');

  let key = videoapi.checkType();
  let currentMovie = load(key).results[idx];
  let watched = [];
  // let queue = [];
  let id = 'id';
  load('watched') ? (watched = load('watched')) : null;
  // load('queue') ? (queue = load('queue')) : null;

  const onClickModalAddToWatchButton = e => {
    e.preventDefault();
    watched.push(currentMovie);
    const uniqueWatched = [...new Map(watched.map(video => [video[id], video])).values()];
    console.log(uniqueWatched);
    save('watched', uniqueWatched);
  };

  // const onClickModalAddToQueueButton = e => {
  //   e.preventDefault();
  //   queue.push(currentMovie);
  //   const uniqueQueue = [...new Map(queue.map(video => [video[id], video])).values()];
  //   save('queue', uniqueQueue);
  // };

  modalAddToWatchBtn.addEventListener('click', onClickModalAddToWatchButton);
  // madalAddToQueueBtn.addEventListener('click', onClickModalAddToQueueButton);
 } catch (error) {
 console.log("~ error", error)
   
 }
 
  
};

export default addToLocalStorage;
