import { videoapi } from './api-service';
import { setFon } from './fon-library';
import { renderCard } from './init-gallery';
import getRefs from './refs';

const refs = getRefs();

const { WATCHED } = videoapi.keys;

const renderWatchedVideos = async () => {
  refs.gallery.innerHTML = '';
  refs.gallery.dataset.gallery = 'watch';
  const perPage = 9;

  videoapi.page = 1;

  setFon();
  await renderCard({ key: WATCHED, perPage });
};

export { renderWatchedVideos };
