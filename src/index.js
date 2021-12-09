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
import { notifyStatus, renderGallery, initGallery } from './js/init-gallery';
import { save, load } from './js/storage';

import './js/modalTeam';
import getRefs from './js/refs';
import { scrollFunction, backToTop } from './js/back-to-top-btn';
import { changeTheme, onThemeToggle } from './js/change-theme';
const { info } = Notify;
const { log, error } = console;

const refs = getRefs();

initGallery();

const onSubmit = async e => {
  e.preventDefault();
  try {
    e.target.elements.submitSearch.disabled = true;
    setTimeout(() => (e.target.elements.submitSearch.disabled = false), 1000);

    const search = e.target.elements.searchQuery.value.trim();

    if (search.length === 0) {
      return info('Please, enter search query.');
    }

    videoapi.query = search;
    videoapi.type = videoapi.keys.SEARCH;

    /* page: 1, results: Array(20), total_pages: 1000, total_results: 20000 */
    const {
      page,
      results,
      total_pages: totalPages,
      total_results: totalResults,
    } = await videoapi.getVideos();

    setPagination(videoapi.keys.SEARCH, totalPages);

    // console.log('res', page, results, totalPages, totalResults);

    if (notifyStatus(results.length, page, totalResults)) return;

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

  refs.form.addEventListener('submit', debounce(onSubmit, DELAY, OPTIONS));

  refs.themeSwitcher.addEventListener('change', onThemeToggle, passive);

  refs.backToTopBtn.addEventListener('click', backToTop, passive);

  listenPaginationClick();
};

initListeners();

// ====== функционал отвечающий за кнопку и прокрутку в вверх страницы ======
window.onscroll = function (backToTopBtn) {
  scrollFunction(backToTopBtn);
};
// ======смена темы============
changeTheme();
