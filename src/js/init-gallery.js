import galleryCardTemplate from './gallery-card-template';
import { videoapi } from './api-service';
import { setPagination, forPaginationFilter, pagination } from './pagination';
import getRefs from './refs';
import { load } from './storage';
import { hideGif } from './fon-library';
import { renderWatchedVideos } from './render-watched';
const { log, error } = console;
const refs = getRefs();
const { TRENDING, WATCHED, QUEUE } = videoapi.keys;
import { changeCardsTitle } from './change-theme';
import { deleteCanvas } from './library';

const notifyOptions = {
  timeout: 2000,
  clickToClose: true,
};
export { notifyOptions };

const notifyStatus = (videosCount, page, totalResults) => {
  if (videosCount < 1) {
    return 1;
  }

  if (totalResults > 0 && page === 1) {
    hideGif();
    deleteCanvas();
    return 0;
  }
};

const isWatched = load(WATCHED);
const renderGallery = async results => {
  try {
    refs.gallery.innerHTML = '';
    if (!results || !results.length) {
      return;
    }
    const string = await Promise.all(results?.map(galleryCardTemplate));
    const galleryMarkup = string.join('');

    refs.gallery.innerHTML = galleryMarkup;
    await changeCardsTitle();
  } catch (err) {
    error(err);
  }
};

const renderTrendingVideos = async () => {
  const perPage = 20;
  try {
    const {
      page,
      results,
      total_pages: totalPages,
      total_results: totalResults,
    } = await videoapi.getTrendingVideos();
    if (notifyStatus(results.length, page, totalResults)) return;
    await renderGallery(results);
    await setPagination(TRENDING.DAY, totalResults, 20);
  } catch (err) {
    error(err);
  }
};

const initGallery = async () => {
  renderTrendingVideos();
};

const renderCard = async ({ key, perPage = 9 }) => {
  const loadedLS = load(key);
  const loadStorage = loadedLS?.results ? loadedLS.results : loadedLS;

  const filteredArray = forPaginationFilter(loadStorage, perPage);
  let currentPage = 1;
  currentPage = pagination.getCurrentPage();

  await renderGallery(loadStorage);
  await setPagination(key, loadStorage?.length, perPage);

  // надо условие
  // pagination.movePageTo(currentPage);
  // pagination.reset();

  // console.log('renderCard ~ currentPage', currentPage);
};

const onBtnClickInLibraryRender = async hasDataAttr => {
  const perPage = 9;
  if (hasDataAttr === 'queue') {
    videoapi.type = QUEUE;
    await setPagination(QUEUE, load(QUEUE)?.length, perPage);
  }

  if (hasDataAttr === 'watched') {
    videoapi.type = WATCHED;
    renderWatchedVideos();
  }
};

export { notifyStatus, renderGallery, initGallery, renderCard, onBtnClickInLibraryRender };
