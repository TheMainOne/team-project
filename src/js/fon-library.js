import { load } from './storage';
import { videoapi } from './api-service';
import refs from './refs';
import { deleteCanvas, setBgSnow } from './library';
const { WATCHED, QUEUE } = videoapi.keys;
const gallery = document.querySelector('.gallery__list');

export const fonLibrary = () => {
  return `<video src="https://media1.giphy.com/media/U8FvqfxkzxoSpokGaW/giphy.mp4?cid=790b76114676f878c20b3d67078e0c372fe00f9bb644f63d&rid=giphy.mp4&ct=g" width="" height="" class="fon-library" autoplay=true loop="true"></video>`;
};

// 3 проверки -
// 1. queue есть watched нет
// 2. watched есть queue нет
// 3. watched и queue нет, тогда елки;

const showGif = () => {
  document.querySelector('.notify-gif').classList.remove('is-hidden');
};

const hideGif = () => {
  document.querySelector('.notify-gif').classList.add('is-hidden');
};
export { showGif, hideGif };

export const setFon = () => {
  const inQueuePage = gallery.dataset.gallery === 'queue';
  const inWatchedPage = gallery.dataset.gallery === 'watch';

  gallery.innerHTML = '';
  hideGif();
  deleteCanvas();

  const isWatched = load(WATCHED);
  const isQueue = load(QUEUE);

  const onlyInQueue =
    isQueue?.length > 0 && (!isWatched || isWatched.length === 0);

  const onlyInWatched =
    isWatched?.length > 0 && (!isQueue || isQueue.length === 0);

  if (inQueuePage) {
    if (onlyInWatched) {
      showGif();
    } else {
      hideGif();
    }
  } else if (inWatchedPage) {
    if (onlyInQueue) {
      showGif();
    } else {
      hideGif();
    }
  }

  deleteCanvas();
  gallery.innerHTML = setBgSnow();
};
