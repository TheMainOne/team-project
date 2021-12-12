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
    document.querySelector('.tui-pagination').classList.add('is-hidden');
    refs.gallery.innerHTML = '';
    return;
  }

  if (!loadWatched) return;

  const perPage = 9;
  renderCard({ key: WATCHED, perPage });
  if (loadWatched && loadWatched.length > 0) {
    refs.gallery.innerHTML = fonLibrary();
    if (loadWatched.length > perPage) {
      showPagination();
    } else {
      hidePagination();
    }
  } else {
    deleteCanvas();
    hidePagination();
    refs.gallery.innerHTML = setBgSnow();
  }
};

export { renderWatchedVideos };
