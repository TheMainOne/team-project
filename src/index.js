import initPagination from './js/pagination';

import './sass/main.scss';
import './js/header';
import './js/modal-window';
import debounce from 'lodash/debounce';
import { Notify } from 'notiflix';

import videoAPI from './js/api-service';
import galleryCardTemplate from './js/gallery-card-template';
import getRefs from './js/refs';
import Preloader from './js/preloader';
const { info, failure, success } = Notify;
const { log, error } = console;

const DEBOUNCE_DELAY = 300;
const DEBOUNCE_OPTIONS = { leading: true, trailing: false };

const videoapi = new videoAPI();

const preloader = new Preloader({ selector: '.preloader' });

export { videoapi };

const refs = getRefs();
let pagination = null;

const renderGallery = async results => {
  try {
    const string = await Promise.all(results.map(galleryCardTemplate));
    const galleryMarkup = string.join('');

    refs.gallery.innerHTML = '';
    refs.gallery.insertAdjacentHTML('beforeend', galleryMarkup);
  } catch (err) {
    error(err);
  }
};

export { renderGallery };

const notifyStatus = (videosCount, page, totalResults) => {
  if (videosCount < 1) {
    failure('Sorry, no results. Please try another query.');
    return 1;
  }

  if (totalResults > 0 && page === 1) {
    success(`Hooray! We found ${totalResults} results.`);
    return 0;
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

    // console.log(pagination);
    // console.log('res', page, results, totalPages, totalResults);

    if (notifyStatus(results.length, page, totalResults)) return;
    await renderGallery(results);

    pagination = await initPagination({
      page,
      itemsPerPage: results.length,
      totalItems: totalResults,
    });
  } catch (err) {
    error(err);
  }
};

initGallery();

const onSubmit = async e => {
  preloader.show();
  e.preventDefault();

  try {
    const search = e.target.elements.searchQuery.value.trim();

    if (search.length === 0) {
      preloader.hide();
      return info('Please, enter search query.');
    }

    videoapi.query = search;

    /* page: 1, results: Array(20), total_pages: 1000, total_results: 20000 */
    const {
      page,
      results,
      total_pages: totalPages,
      total_results: totalResults,
    } = await videoapi.getVideos();
    preloader.hide();

    pagination.reset(totalPages);
    videoapi.type = 'videos';
    pagination.movePageTo(1);

    console.log('res', page, results, totalPages, totalResults);

    if (notifyStatus(results.length, page, totalResults)) return;

    await renderGallery(results);
  } catch (err) {
    error(err);
  }
};

const initListeners = () => {
  refs.form.addEventListener('submit', debounce(onSubmit, DEBOUNCE_DELAY, DEBOUNCE_OPTIONS));
};

initListeners();
