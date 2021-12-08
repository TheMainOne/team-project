import getHeaderRefs from './getHearedRefs';

import icon from '../images/optimsprite.svg';
import { videoapi } from './api-service';

const refs = getHeaderRefs();

refs.navbar.addEventListener('click', onTopNavBtnClick);

// Для работы с кнопками watched и queue слушатель вешать на этот контейнер refs.headerControlBox и отлавливать через e.target.dataset.action

renderSearchForm();
refs.headerControlBox.addEventListener('click', onInputFocus);

function onTopNavBtnClick(e) {
  const nextButton = e.target;
  const hasDataAttr = nextButton.dataset.action;
  if (!hasDataAttr) return;

  videoapi.currentPage = hasDataAttr;
  console.log('onTopNavBtnClick ~ videoapi.currentPage', videoapi.currentPage);

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

  videoapi.type = hasDataAttr;
  console.log('onLibraryButtonClick ~ videoapi.type', videoapi.type);

  const prevButton = refs.headerControlBox.querySelector('.is-active');
  if (prevButton) {
    prevButton.classList.remove('is-active');
  }

  nextButton.classList.add('is-active');
}

function onInputFocus(e) {
  const selector = e.target.parentNode;
  if (selector.dataset.action !== 'js-form') return;
  selector.style.borderBottom = '0.5px solid var(--accent-color)';
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
  refs.headerControlBox.innerHTML = `<form class="header__search" id="search-form" data-action="js-form"><input class="input" type="text" name="searchQuery" autocomplete="off" placeholder="Поиск фильмов" /><button class="search-button" type="submit" data-action="search"><svg class="search-icon" data-action="search"><use href="${icon}#icon-search" data-action="search"></use></svg></button></form>`;
}

function renderLibraryButtons() {
  refs.headerControlBox.innerHTML =
    '<div class="header__library-controls" data-library-buttons"><button class="button" data-action="watched">watched</button><button class="button  is-active" data-action="queue">queue</button></div>';
}

// Cлушатель событий на кнопке home для возврата на главную страницу
refs.homeBtn.addEventListener('click', () => { window.location = './' });
