import { videoapi } from './api-service';
import { fonLibrary } from './fon-library';
import { load } from './storage';
import { renderCard } from './init-gallery';
import { setBgSnow, deleteCanvas } from './library';
import getRefs from './refs';
import { hidePagination, showPagination } from './pagination';

const refs = getRefs();

const { WATCHED, QUEUE } = videoapi.keys;

const renderWatchedVideos = () => {
  refs.gallery.dataset.gallery = 'watch';

  const loadWatched = load(WATCHED);
  if (!loadWatched || loadWatched.length === 0) {
    hidePagination();
    refs.gallery.innerHTML = '';
    return;
  }

  if (!loadWatched) return;

  const perPage = 9;
  showPagination();

  renderCard({ key: WATCHED, perPage });

  const loadQueue = load(QUEUE);
  if (loadQueue && loadQueue.length > 0) {
    refs.gallery.innerHTML = fonLibrary();
  } else {
    deleteCanvas();
    hidePagination();
    refs.gallery.innerHTML = setBgSnow();
  }
};

export { renderWatchedVideos };
