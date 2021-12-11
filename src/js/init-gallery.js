import galleryCardTemplate from './gallery-card-template';
import { videoapi } from './api-service';
import { initThemeSwitcher } from './change-theme';
import { removeTuiButtons, setPagination, forPaginationFilter, pagination } from './pagination';
import getRefs from './refs';
import { load } from './storage';
import { fonLibrary, setFon } from './fon-library';
const { log, error } = console;
const refs = getRefs();
const { WATCHED, QUEUE } = videoapi.keys;

const notifyStatus = (videosCount, page, totalResults) => {
  if (videosCount < 1) {
    return 1;
  }

  if (totalResults > 0 && page === 1) {
    return 0;
  }
};

const renderGallery = async results => {
  console.log('results', results);
  try {
    console.log('results', results);

    if (!results || results === '' || results.length === 0) {
      refs.gallery.innerHTML = '';
      setFon();
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
  document.querySelector('.tui-pagination').classList.add('is-hidden');

  if (!loadStorage || loadStorage.length === 0) {
    refs.gallery.innerHTML = fonLibrary();
    document.querySelector('.tui-pagination').classList.remove('is-hidden');
    return;
  }

  renderGallery(filteredArray);
  pagination.setItemsPerPage(perPage);
  setPagination(key, loadStorage.length);
  pagination.movePageTo(currentPage);
  document.querySelector('.tui-pagination').classList.remove('is-hidden');
};

export { notifyStatus, renderGallery, initGallery, renderCard };
