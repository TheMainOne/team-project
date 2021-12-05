import getHeaderRefs from './getHearedRefs';
import '../images/optimsprite.svg';

const refs = getHeaderRefs();

refs.navbar.addEventListener('click', onTopNavBtnClick);

// Для работы с кнопками watched и queue слушатель вешать на этот контейнер refs.headerControlBox и отлавливать через e.target.dataset.action
refs.headerControlBox.addEventListener('click', onLibraryButtonClick);

renderSearchForm();

function onTopNavBtnClick(e) {
  const nextButton = e.target;
  const hasDataAttr = nextButton.dataset.action;
  if (!hasDataAttr) return;

  const prevButton = refs.navbar.querySelector('.is-active');
  if (prevButton) {
    prevButton.classList.remove('is-active');
  }

  nextButton.classList.add('is-active');

  if (hasDataAttr === 'js-library') {
    setLibraryBackground();
    renderLibraryButtons();
  }

  if (hasDataAttr === 'js-home') {
    setHomeBackground();
    renderSearchForm();
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

  const prevButton = refs.headerControlBox.querySelector('.is-active');
  if (prevButton) {
    prevButton.classList.remove('is-active');
  }

  nextButton.classList.add('is-active');
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
  refs.headerControlBox.innerHTML =
    '<form class="header__search" id="search-form" data-action="js-form"><input class="input" type="text" name="searchQuery" autocomplete="off" placeholder="Поиск фильмов" /><button class="search-button" type="submit" data-action="search"><svg class="icon" width="12" height="12"><use href="./images/optimsprite.svg#icon-search"></use></svg></button></form>';
}

function renderLibraryButtons() {
  refs.headerControlBox.innerHTML =
    '<div class="header__library-controls" data-library-buttons"><button class="button is-active" data-action="watched">watched</button><button class="button"data-action="queue">queue</button></div>';
}
