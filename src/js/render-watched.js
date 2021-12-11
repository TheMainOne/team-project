import { videoapi } from './api-service';
import { renderGallery } from './init-gallery';
import { setPagination } from './pagination';
import { fonLibrary } from './fon-library';
import getRefs from './refs';
import { load } from './storage';

const refs = getRefs();

const { WATCHED } = videoapi.keys;

const renderWatchedVideos = () => {
  const loadWatched = load(WATCHED);
  if (!loadWatched || loadWatched.length === 0) {
    refs.gallery.innerHTML = fonLibrary();
    return;
  }

  videoapi.type = WATCHED;
  const { page } = videoapi;
  const perPage = 20;

  const filtered = loadWatched.filter(
    (item, index) => index >= perPage * (page - 1) && index < perPage * page,
  );

  console.log('renderWatchedVideos ~ filtered', filtered);
  renderGallery(filtered);
  setPagination(WATCHED, loadWatched.length);
};

export { renderWatchedVideos };
