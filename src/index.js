import sprite from './images/svg/sprite.svg';
export { sprite };

import { listenPaginationClick, setPagination } from './js/pagination';
import 'tui-pagination/dist/tui-pagination.min.css';

import './js/queue';
import './js/library';
import './sass/main.scss';
import './js/header';
import './js/film-in-modal-window';
import debounce from 'lodash/debounce';
import { Notify } from 'notiflix';
import { videoapi } from './js/api-service';
// prettier-ignore
import { notifyStatus, renderGallery, initGallery, notifyOptions } from './js/init-gallery';
import { save, load, removeEmptyStorageKeys } from './js/storage';

import './js/modalTeam';
import getRefs from './js/refs';
import { scrollFunction, backToTop } from './js/back-to-top-btn';
import { changeTheme, onThemeToggle } from './js/change-theme';
import getHeaderRefs from './js/getHearedRefs';
const { info } = Notify;
const { log, error } = console;
const image = document.querySelector('.notify-gif');

const refs = getRefs();
const headerRefs = getHeaderRefs();
console.log('headerRefs', headerRefs);

initGallery();

const onContainerClick = async e => {
  e.preventDefault();
  try {
    const target = e.target;

    const input = headerRefs.headerControlBox.querySelector(
      '[name="searchQuery"]',
    );

    const form = headerRefs.headerControlBox.querySelector(
      '[data-action="js-form"]',
    );

    if (target === input || target === form) return;

    const searchButton = headerRefs.headerControlBox.querySelector(
      '[name="submitSearch"]',
    );

    let searchQuery = null;
    if (searchButton === target || target.closest('[name="submitSearch"]')) {
      searchQuery = input.value.trim();

      searchButton.disabled = true;
      setTimeout(() => (searchButton.disabled = false), 1000);
    }

    if (!searchQuery || searchQuery.length === 0) {
      return info('Please, enter search query.', {
        timeout: 1000,
        clickToClose: true,
      });
    }

    videoapi.query = searchQuery;
    videoapi.type = videoapi.keys.SEARCH;

    /* page: 1, results: Array(20), total_pages: 1000, total_results: 20000 */
    const {
      page,
      results,
      total_pages: totalPages,
      total_results: totalResults,
    } = await videoapi.getVideos();

    if (totalResults === 0) {
      refs.gallery.innerHTML = '';
      image.style.display = 'block';
      return warning('Sorry, there no results found. Try searching for something else!');
    }

    setPagination(videoapi.keys.SEARCH, totalPages);

    console.log('res', page, results, totalPages, totalResults);

    if (notifyStatus(results.length, page, totalResults)) return;

    refs.gallery.dataset.gallery = 'search';
    await renderGallery(results);
  } catch (err) {
    error(err);
  }
};

const initListeners = () => {
  const DELAY = 300;
  const OPTIONS = { leading: true, trailing: false };
  const passive = { passive: true };

  window.addEventListener(
    'DOMContentLoaded',
    () => document.querySelector('body').classList.add('loaded'),
    { passive: true, once: true },
  );

  headerRefs.headerControlBox.addEventListener('click', onContainerClick);

  refs.themeSwitcher.addEventListener('change', onThemeToggle, passive);

  refs.backToTopBtn.addEventListener('click', backToTop, passive);

  listenPaginationClick();
};

initListeners();
removeEmptyStorageKeys();

// ====== функционал отвечающий за кнопку и прокрутку в вверх страницы ======
window.onscroll = function (backToTopBtn) {
  scrollFunction(backToTopBtn);
};
// ======смена темы============
changeTheme();
