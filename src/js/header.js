import getHeaderRefs from './getHearedRefs';
import { videoapi } from './api-service';
import { sprite } from '../index';
import { onBtnClickInLibraryRender, renderCard, renderGallery } from './init-gallery';
import { renderWatchedVideos } from './render-watched';
import { setPagination } from './pagination';
import getRefs from './refs';
import { load } from './storage';
import { deleteCanvas, addListenerOnLibrary } from './library';
import { hideGif, setFon } from './fon-library';

const mainRefs = getRefs();
const iconSearch = `${sprite}#icon-search`;
const { TRENDING, QUEUE, WATCHED } = videoapi.keys;
const refs = getHeaderRefs();

renderSearchForm();
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
    refs.headerControlBox.removeEventListener('focusin', onInputFocusIn);
  }

  if (hasDataAttr === 'js-home') {
    setHomeBackground();
    renderSearchForm();
    refs.headerControlBox.removeEventListener('click', onLibraryButtonClick);
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
  // onBtnClickInLibraryRender(hasDataAttr);

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

function onInputFocusIn(e) {
  const input = e.target;
  if (input.classList.contains('input')) {
    const form = input.closest('[data-action="js-form"]');
    form.style.borderBottom = '0.5px solid var(--accent-color)';
    input.addEventListener('blur', onInputFocusOut, { once: true });
  }
}

function onInputFocusOut(e) {
  const input = e.target;
  const form = input.closest('[data-action="js-form"]');
  form.removeAttribute('style');
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
      <input class="input" id="searchQuery" type="text" name="searchQuery" autocomplete="off" placeholder=" "/>
      <label class="header__search-label" for="searchQuery">Enter the title of the movie</label>
    </div>
    <button class="search-button" type="submit" name="submitSearch">
      <svg class="search-icon"> <use href="${iconSearch}"></use> </svg>
    </button>
  </form>
  `;
  refs.headerControlBox.addEventListener('focusin', onInputFocusIn);
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
  mainRefs.gallery.dataset.gallery = 'home';
  videoapi.type = TRENDING.WEEK;

  deleteCanvas();
  // hideGif();
  const videos = await videoapi.getTrendingVideos();
  if (videos.results.length === 0) return;
  await renderGallery(videos.results);
  await setPagination(TRENDING.WEEK, videos.total_results, 20);
});
