import { videoapi } from './api-service';
import { fonLibrary } from './fon-library';
import { load } from './storage';
import { renderCard } from './init-gallery';
import { setBgSnow, deleteCanvas } from './library';
import getRefs from './refs';

const refs = getRefs();

const { WATCHED, QUEUE } = videoapi.keys;

const renderWatchedVideos = () => {
  refs.gallery.dataset.gallery = 'watch';

  const loadWatched = load(WATCHED);
  if (!loadWatched || loadWatched.legth === 0) {
    document.querySelector('.tui-pagination').classList.add('is-hidden');
    refs.gallery.innerHTML = '';
    return;
  }

  if (!loadWatched) return;

  const perPage = 9;
  document.querySelector('.tui-pagination').classList.remove('is-hidden');

  renderCard({ key: WATCHED, perPage });

  if (load(QUEUE) && load(QUEUE).length > 0) {
    refs.gallery.innerHTML = fonLibrary();
  } else {
    deleteCanvas();
    document.querySelector('.tui-pagination').classList.add('is-hidden');
    refs.gallery.innerHTML = setBgSnow();
  }
};

export { renderWatchedVideos };
