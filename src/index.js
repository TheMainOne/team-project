import 'tui-pagination/dist/tui-pagination.min.css';
import sprite from './images/svg/sprite.svg';
export { sprite };
import './sass/main.scss';
import './js/header';
import './js/queue';
import './js/library';
import './js/film-in-modal-window';
import './js/modalTeam';
import { initGallery } from './js/init-gallery';
import { onSubmitSearch } from './js/on-search';
import { populateChooseTheme, onThemeToggle } from './js/change-theme';
import { listenPaginationClick } from './js/pagination';
import { scrollFunction, backToTop } from './js/back-to-top-btn';
import { removeEmptyStorageKeys } from './js/storage';
import getRefs from './js/refs';
import getHeaderRefs from './js/get-header-refs';

const refs = getRefs();
const headerRefs= getHeaderRefs();

initGallery();

const initListeners = () => {
  const passive = { passive: true };
  const passonce = { passive: true, once: true };

  window.addEventListener(
    'DOMContentLoaded',
    () => refs.body.classList.add('loaded'),
    passonce,
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
// changeTheme();
populateChooseTheme();
