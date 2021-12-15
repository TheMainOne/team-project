import sprite from './images/svg/sprite.svg';
export { sprite };

import { listenPaginationClick, setPagination, removeTuiButtons } from './js/pagination';
import 'tui-pagination/dist/tui-pagination.min.css';

import './js/queue';
import './js/library';
import './sass/main.scss';
import './js/header';
import './js/film-in-modal-window';
import { initGallery } from './js/init-gallery';
import { removeEmptyStorageKeys } from './js/storage';
import './js/modalTeam';
import getRefs from './js/refs';
import { scrollFunction, backToTop } from './js/back-to-top-btn';
import { populateChooseTheme, onThemeToggle } from './js/change-theme';
import getHeaderRefs from './js/getHearedRefs';
import { onSubmitSearch } from './js/on-search';

const refs = getRefs();
const headerRefs = getHeaderRefs();

initGallery();

const initListeners = () => {
  const passive = { passive: true };

  window.addEventListener(
    'DOMContentLoaded',
    () => document.querySelector('body').classList.add('loaded'),
    { passive: true, once: true },
  );

  headerRefs.headerControlBox.addEventListener('click', onSubmitSearch);

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
populateChooseTheme();
