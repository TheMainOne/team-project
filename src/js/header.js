// import getHeaderRefs from './getHearedRefs';

const refs = {
  headerBackground: document.querySelector('.js-header'),
  navbar: document.querySelector('[data-action-controls]'),
  logo: document.querySelector('[data-action="logo"]'),
  homeBtn: document.querySelector('[data-action="js-home"]'),
  libraryBtn: document.querySelector('[data-action="js-library"]'),
  headerControlBox: document.querySelector('[data-header-controls]'),
  // searchButton: document.querySelector('[data-action="search"]'),
  headerForm: document.querySelector('[data-action="js-form"]'),
  headerLibraryButtons: document.querySelector('[data-action="library-buttons"]'),
};

refs.navbar.addEventListener('click', onTopNavBtnClick);

renderSearchForm();

function onTopNavBtnClick(e) {
  const nextButton = e.target;

  if (!nextButton.dataset.action) return;

  const prevButton = refs.navbar.querySelector('.is-active');
  if (prevButton) {
    prevButton.classList.remove('is-active');
  }

  nextButton.classList.add('is-active');

  if (nextButton.dataset.action === 'js-library') {
    setLibraryBackground();
    renderLibraryButtons();
    const buttons = document.querySelector('[data-header-controls]');
    console.log(buttons);
  }

  if (nextButton.dataset.action === 'js-home') {
    setHomeBackground();
    renderSearchForm();
  }

  if (nextButton.dataset.action === 'logo') {
    nextButton.classList.remove('is-active');
    refs.homeBtn.classList.add('is-active');
    setHomeBackground();
    renderSearchForm();
  }
}

function onLibraryButtonClick(e) {
  console.log(e.target);
}

function setLibraryBackground() {
  refs.headerBackground.classList.remove('header--home');
  refs.headerBackground.classList.add('header--library');
}

function setHomeBackground() {
  refs.headerBackground.classList.remove('header--library');
  refs.headerBackground.classList.add('header--home');
}

function renderSearchForm() {
  refs.headerControlBox.innerHTML =
    '<form class="header__search" id="search-form" data-action="js-form"><input class="input" type="text" name="searchQuery" autocomplete="off" placeholder="Поиск фильмов" /><button class="search-button" type="submit"  data-action="search"></button></form>';
}

function renderLibraryButtons() {
  refs.headerControlBox.innerHTML =
    '<div class="header__library-controls" data-action="library-buttons"><button class="button is-active" data-action="watched">watched</button><button class="button"data-action="queue">queue</button></div>';
}
