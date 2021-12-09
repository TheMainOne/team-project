import { videoapi } from './api-service';
import { renderGallery } from './init-gallery';
import { setPagination } from './pagination';
import getRefs from './refs';
import { load } from './storage';

const refs = getRefs();

const { WATCHED } = videoapi.keys;

const renderWatchedVideos = () => {
  refs.gallery.dataset.gallery = 'watch';
  let loadWatched = load(WATCHED);
  console.log(loadWatched);
  const filtered = loadWatched.filter(
    (item, index) => index < 20 * videoapi.page && index >= 20 * (videoapi.page - 1),
  );
  renderGallery(filtered);
  setPagination(WATCHED, loadWatched.length);
};

export const isWatched = () => {
  console.log('click');
  if (!load(WATCHED)) return;
  renderWatchedVideos();
};
