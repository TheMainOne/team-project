import getHeaderRefs from './getHearedRefs';
import { videoapi } from './api-service';
import { sprite } from '../index';
import {
  onBtnClickInLibraryRender,
  onLibraryClickRenderQueue,
  renderGallery,
} from './init-gallery';
import { renderWatchedVideos } from './render-watched';
import { setPagination } from './pagination';
import getRefs from './refs';
import { load } from './storage';
import { deleteCanvas, addListenerOnLibrary } from './library';
const mainRefs = getRefs();
const iconSearch = `${sprite}#icon-search`;
const { TRENDING, QUEUE, WATCHED } = videoapi.keys;
const refs = getHeaderRefs();

renderSearchForm();
refs.headerControlBox.addEventListener('click', onInputFocus);
refs.navbar.addEventListener('click', onTopNavBtnClick);
// Для работы с кнопками watched и queue слушатель вешать на этот контейнер refs.headerControlBox и отлавливать через e.target.dataset.action

function onTopNavBtnClick(e) {
  const nextButton = e.target;
  const hasDataAttr = nextButton.dataset.action;
  if (!hasDataAttr) return;

  videoapi.currentPage = hasDataAttr;

  const prevButton = refs.navbar.querySelector('.is-active');

  if (prevButton) {
    prevButton.classList.remove('is-active');
  }

  nextButton.classList.add('is-active');

  if (hasDataAttr === 'js-library') {
    setLibraryBackground();
    renderLibraryButtons();
    refs.headerControlBox.addEventListener('click', onLibraryButtonClick);
    refs.headerControlBox.removeEventListener('click', onInputFocus);
    onLibraryClickRenderQueue(hasDataAttr);
  }

  if (hasDataAttr === 'js-home') {
    setHomeBackground();
    renderSearchForm();
    refs.headerControlBox.removeEventListener('click', onLibraryButtonClick);
    refs.headerControlBox.addEventListener('click', onInputFocus);
  }

  if (hasDataAttr === 'logo') {
    nextButton.classList.remove('is-active');
    refs.homeBtn.classList.add('is-active');
    setHomeBackground();
    renderSearchForm();
  }
}

function onLibraryButtonClick(e) {
  const nextButton = e.target;
  const hasDataAttr = nextButton.dataset.action;

  if (!hasDataAttr) return;
  onBtnClickInLibraryRender(hasDataAttr);

  if (hasDataAttr === 'queue') {
    videoapi.type = QUEUE;
  }

  if (hasDataAttr === 'watched') {
    videoapi.type = WATCHED;

    renderWatchedVideos();
  }

  const prevButton = refs.headerControlBox.querySelector('.is-active');
  if (prevButton) {
    prevButton.classList.remove('is-active');
  }

  nextButton.classList.add('is-active');
}

function onInputFocus(e) {
  const input = e.target;
  if (input.classList.contains('input')) {
    input.addEventListener('blur', onInputChange);
    console.log('повесили слушателя');
  }
  const selector = input.closest('[data-action="js-form"]');

  if (selector.dataset.action !== 'js-form') return;
  selector.setAttribute('style', 'border-bottom: 0.5px solid var(--accent-color)');
  // selector.style.borderBottom = '';
}

function onInputChange(e) {
  console.log('ушёл фокус');
  console.log(e.target);
  const selector = e.target.closest('[data-action="js-form"]');
  selector.removeAttribute('style');
  // selector.style.borderBottom = '0.5px solid var(--main-text-color)';
  console.log(selector);
  console.log('снять слушателя');
  // e.target.removeEventListener('blur', onInputChange);
}

// Функции подмены background
function setLibraryBackground() {
  refs.headerBackground.classList.remove('header--home');
  refs.headerBackground.classList.add('header--library');
}

function setHomeBackground() {
  refs.headerBackground.classList.remove('header--library');
  refs.headerBackground.classList.add('header--home');
}

// Функции подмены разметки поиска и кнопок библиотерки
function renderSearchForm() {
  refs.headerControlBox.innerHTML = `
  <form class="header__search" id="search-form" data-action="js-form">
    <div class="form-field">
      <input class="input" id="searchQuery" type="text" name="searchQuery" autocomplete="off"/>
      <label class="header__search-label" for="searchQuery">Enter the title of the movie</label>
    </div>
    <button class="search-button" type="submit" name="submitSearch">
      <svg class="search-icon"> <use href="${iconSearch}"></use> </svg>
    </button>
  </form>
  `;
}

function renderLibraryButtons() {
  refs.headerControlBox.innerHTML = `
  <div class="header__library-controls" data-library-buttons">
    <button class="button" data-action="watched">Watched</>
    <button class="button is-active" data-action="queue">Queue</button>
  </div>
  `;
}

// Cлушатель событий на кнопке home для возврата на главную страницу
refs.homeBtn.addEventListener('click', async () => {
  // window.location = './';
  deleteCanvas();
  addListenerOnLibrary();
  videoapi.type = TRENDING.WEEK;
  const videos = await videoapi.getTrendingVideos();
  mainRefs.gallery.dataset.gallery = 'home';
  if (videos.results.length === 0) return;
  renderGallery(videos.results);
  setPagination(TRENDING.WEEK, videos.total_results);
});
