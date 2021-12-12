import galleryCardTemplate from './gallery-card-template';
import { videoapi } from './api-service';
import { changeCardsTitle } from './change-theme';
import {
  setPagination,
  forPaginationFilter,
  pagination,
  hidePagination,
  showPagination,
} from './pagination';
import getRefs from './refs';
import { load } from './storage';
import { fonLibrary, setFon } from './fon-library';
import { renderWatchedVideos } from './render-watched';
const { log, error } = console;
const refs = getRefs();

const notifyOptions = {
  timeout: 2000,
  clickToClose: true,
};
export { notifyOptions };

const { TRENDING, WATCHED, QUEUE } = videoapi.keys;

const notifyStatus = (videosCount, page, totalResults) => {
  if (videosCount < 1) {
    return 1;
  }

  if (totalResults > 0 && page === 1) {
    return 0;
  }
};

const renderGallery = async results => {
  // console.log('results', results);
  try {
    // console.log('results', results);

    if (!results || results === '' || results.length === 0) {
      refs.gallery.innerHTML = '';
      setFon();
      return;
    }
    const string = await Promise.all(results.map(galleryCardTemplate));
    const galleryMarkup = string.join('');

    refs.gallery.innerHTML = '';
    refs.gallery.insertAdjacentHTML('beforeend', galleryMarkup);
    await changeCardsTitle();
  } catch (err) {
    error(err);
  }
};

const initGallery = async () => {
  try {
    const {
      page,
      results,
      total_pages: totalPages,
      total_results: totalResults,
    } = await videoapi.getTrendingVideos();

    if (notifyStatus(results.length, page, totalResults)) return;

    await renderGallery(results);

    setPagination(TRENDING.WEEK, totalResults);
  } catch (err) {
    error(err);
  }
};

const renderCard = ({ key, perPage = 9 }) => {
  const loadStorage = load(key);
  const filteredArray = forPaginationFilter(loadStorage, perPage);
  const currentPage = pagination.getCurrentPage();
  hidePagination();

  if (!loadStorage || loadStorage.length === 0) {
    refs.gallery.innerHTML = fonLibrary();
    return;
  }

  renderGallery(filteredArray);
  pagination.setItemsPerPage(perPage);
  setPagination(key, loadStorage?.length, perPage);
  pagination.movePageTo(currentPage);
  if (loadStorage?.length > perPage) {
    console.log('renderCard ~ loadStorage?.length', loadStorage?.length);
    showPagination();
  } else {
    hidePagination();
  }
};

const getPage = hasDataAttr => {
  videoapi.currentPage = hasDataAttr;
};

const onLibraryClickRenderQueue = hasDataAttr => {
  const perPage = 9;
  // getPage(hasDataAttr);
  renderCard({ key: QUEUE, perPage });
};

const onBtnClickInLibraryRender = hasDataAttr => {
  if (hasDataAttr === 'queue') {
    videoapi.type = QUEUE;
    if (load(QUEUE)?.length > 9) {
      setPagination(QUEUE, load(QUEUE)?.length, 9);
      showPagination();
    } else {
      hidePagination();
    }
  }

  if (hasDataAttr === 'watched') {
    videoapi.type = WATCHED;

    renderWatchedVideos();
  }
};

export {
  notifyStatus,
  renderGallery,
  initGallery,
  renderCard,
  onLibraryClickRenderQueue,
  onBtnClickInLibraryRender,
  getPage,
};
