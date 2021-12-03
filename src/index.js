import './sass/main.scss';

import './js/header';
import debounce from 'lodash/debounce';
import { Notify } from 'notiflix';
import videoAPI from './js/api-service';
import galleryCardTemplate from './js/gallery-card-template';
import getRefs from './js/refs';
const { info, failure, success } = Notify;
const { log, error } = console;

const DEBOUNCE_DELAY = 300;
const DEBOUNCE_OPTIONS = { leading: true, trailing: false };
const NOTIFY_CONFIG = { timeout: 3500 };

const videoapi = new videoAPI();

const refs = getRefs();

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

const notifyStatus = (videosCount, page, totalResults) => {
  if (videosCount < 1) {
    failure('Sorry, no results. Please try another query.', NOTIFY_CONFIG);
    return 1;
  }

  if (totalResults > 0 && page === 1) {
    success(`Hooray! We found ${totalResults} results.`, NOTIFY_CONFIG);
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

    // console.log('res', page, results, totalPages, totalResults);

    if (notifyStatus(results.length, page, totalResults)) return;

    await renderGallery(results);
  } catch (err) {
    error(err);
  }
};

initGallery();

const onSubmit = async e => {
  e.preventDefault();

  try {
    const search = e.target.elements.searchQuery.value.trim();

    if (search.length === 0) {
      return info('Please, enter search query.', NOTIFY_CONFIG);
    }

    videoapi.query = search;

    /* page: 1, results: Array(20), total_pages: 1000, total_results: 20000 */
    const {
      page,
      results,
      total_pages: totalPages,
      total_results: totalResults,
    } = await videoapi.getVideos();

    // console.log('res', page, results, totalPages, totalResults);

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
