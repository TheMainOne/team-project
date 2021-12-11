import { videoapi } from './api-service';
import { renderGallery } from './init-gallery';
import { setPagination } from './pagination';
import getRefs from './refs';
import { load } from './storage';

const refs = getRefs();

const { WATCHED } = videoapi.keys;

const renderWatchedVideos = () => {
  const loadWatched = load(WATCHED);
  if (!loadWatched || loadWatched.legth === 0) {
    console.log('🚀 ~ file: queue.js ~ line 30 ~ loadWatched', loadWatched);
    document.querySelectorAll('.tui-page-btn').forEach(button => button.remove());
  }
  refs.gallery.dataset.gallery = 'watch';
  refs.gallery.innerHTML = '';
  if (!loadWatched) return;

  videoapi.type = WATCHED;
  const { page } = videoapi;
  const perPage = 20;

  const filtered = loadWatched.filter(
    (item, index) => index >= perPage * (page - 1) && index < perPage * page,
  );

  renderGallery(filtered);
  setPagination(WATCHED, loadWatched.length);
};

export { renderWatchedVideos };
