import { save, load } from './storage';
import { videoapi } from './api-service';

const addToLocalStorage = idx => {
  const modalAddToWatchBtn = document.querySelector('.add-to-watch');
  const madalAddToQueneBtn = document.querySelector('.add-to-quene');

  let key = videoapi.checkType();
  let currentMovie = load(key).results[idx];
  let watched = [];
  let quene = [];
  let id = 'id';
  load('watched') ? (watched = load('watched')) : null;
  load('quene') ? (quene = load('quene')) : null;

  const onClickModalAddToWatchButton = e => {
    e.preventDefault();
    watched.push(currentMovie);
    const uniqueWatched = [...new Map(watched.map(video => [video[id], video])).values()];
    console.log(uniqueWatched);
    save('watched', uniqueWatched);
  };

  const onClickModalAddToQueneButton = e => {
    e.preventDefault();
    quene.push(currentMovie);
    const uniqueQuene = [...new Map(quene.map(video => [video[id], video])).values()];
    save('quene', uniqueQuene);
  };

  modalAddToWatchBtn.addEventListener('click', onClickModalAddToWatchButton);
  madalAddToQueneBtn.addEventListener('click', onClickModalAddToQueneButton);
};

export default addToLocalStorage;
