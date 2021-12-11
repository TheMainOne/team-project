import { videoapi } from './api-service';
import { renderGallery } from './init-gallery';
import { setPagination } from './pagination';
import { fonLibrary } from './fon-library';
import getRefs from './refs';
import { load } from './storage';
import { renderCard } from './init-gallery';

const refs = getRefs();

const { WATCHED } = videoapi.keys;

const renderWatchedVideos = () => {
  refs.gallery.dataset.gallery = 'watch';

  const loadWatched = load(WATCHED);
  if (!loadWatched || loadWatched.legth === 0) {
    document.querySelector('.tui-pagination').classList.add('is-hidden');
    refs.gallery.innerHTML = fonLibrary();
    return;
  }

  if (!loadWatched) return;

  const perPage = 9;

  renderCard({ key: WATCHED, perPage });
  document.querySelector('.tui-pagination').classList.remove('is-hidden');
};

export { renderWatchedVideos };
