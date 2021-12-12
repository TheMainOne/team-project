import { load } from './storage';
import { videoapi } from './api-service';
import refs from './refs';
import { hidePagination } from './pagination';
const { WATCHED, QUEUE } = videoapi.keys;

const gallery = document.querySelector('.gallery__list');

export const fonLibrary = () => {
  return `<video src="https://media1.giphy.com/media/U8FvqfxkzxoSpokGaW/giphy.mp4?cid=790b76114676f878c20b3d67078e0c372fe00f9bb644f63d&rid=giphy.mp4&ct=g" width="" height="" class="fon-library" autoplay=true loop="true"></video>`;
};

export const setFon = () => {
  const isWatched = load(WATCHED);
  const isQueue = load(QUEUE);
  // console.log('setfon');
  // console.log(`watched length`, isWatched);
  // console.log('isQueue', isQueue);

  hidePagination();

  if (!isWatched) return;

  if (isWatched.length > 0 && (!isQueue || isQueue.length === 0)) {
    // console.log('watched > 0');
    gallery.innerHTML = fonLibrary();
  }
};
