import galleryCardTemplate from './gallery-card-template';
import { videoapi } from './api-service';
import { initThemeSwitcher } from './change-theme';
import { removeTuiButtons, setPagination, forPaginationFilter, pagination } from './pagination';
import getRefs from './refs';
import { load } from './storage';
import { fonLibrary } from './fon-library';
const { log, error } = console;
const refs = getRefs();

const notifyStatus = (videosCount, page, totalResults) => {
  if (videosCount < 1) {
    return 1;
  }

  if (totalResults > 0 && page === 1) {
    return 0;
  }
};
const renderGallery = async results => {
  try {
    if (!results || results === '' || results === []) {
      refs.gallery.innerHTML = fonLibrary();
      return;
    }
    const string = await Promise.all(results.map(galleryCardTemplate));
    const galleryMarkup = string.join('');

    refs.gallery.innerHTML = '';
    refs.gallery.insertAdjacentHTML('beforeend', galleryMarkup);
    initThemeSwitcher();
    removeTuiButtons(results.length);
  } catch (err) {
    error(err);
  }
};

const initGallery = async () => {
  try {
    /* page: 1, results: Array(20), total_pages: 1000, total_results: 20000 */
    const {
      page,
      results,
      total_pages: totalPages,
      total_results: totalResults,
    } = await videoapi.getTrendingVideos();

    // console.log('res', page, results, totalPages, totalResults);

    if (notifyStatus(results.length, page, totalResults)) return;
    await renderGallery(results);

    setPagination(videoapi.keys.TRENDING.WEEK, totalResults);
  } catch (err) {
    error(err);
  }
};

const renderCard = ({ key, perPage }) => {
  const loadStorage = load(key);
  const filteredArray = forPaginationFilter(loadStorage, perPage);
  const currentPage = pagination.getCurrentPage();
  if (!loadStorage) {
    return;
  }

  renderGallery(filteredArray);
  pagination.setItemsPerPage(perPage);
  setPagination(key, loadStorage.length);
  pagination.movePageTo(currentPage);
};

export { notifyStatus, renderGallery, initGallery, renderCard };
