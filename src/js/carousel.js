import { load } from './storage';
import { videoapi } from './api-service';
import getCarouselRefs from './get-carousel-refs';
import getHeaderRefs from './getHearedRefs';
import getRefs from './refs';
import galleryCardTemplate from './gallery-card-template';
import { changeCardsTitle } from './change-theme';
import { fonLibrary, setFon } from './fon-library';
import { setBgSnow, deleteCanvas } from './library';

const { WATCHED, QUEUE } = videoapi.keys;
const {
  carousel,
  carouselQueue,
  carouselWatched,
  carouselListQueue,
  carouselListWatched,
  gifQueue,
  gifWatched,
} = getCarouselRefs();
const { libraryBtn } = getHeaderRefs();
const { gallery, pagination } = getRefs();

libraryBtn.addEventListener('click', onLibraryBtnClick);

function removeCarouselListeners(selector) {
  selector.removeEventListener('click', onCarouselArrowClick);
}

function onLibraryBtnClick() {
  gallery.innerHTML = '';
  hideGalleryAndPagination();
  gallery.dataset.gallery = 'library';
  carousel.classList.remove('is-hidden');

  if (
    (!load(QUEUE) || load(QUEUE).length === 0) &&
    (!load(WATCHED) || load(WATCHED).length === 0)
  ) {
    hideGalleryAndPagination();
    carousel.classList.add('is-hidden');
    deleteCanvas();
    setBgSnow();
    return;
  }

  renderCarousel(WATCHED, carouselListWatched, carouselWatched, gifWatched);
  renderCarousel(QUEUE, carouselListQueue, carouselQueue, gifQueue);
}

function hideGalleryAndPagination() {
  gallery.classList.add('is-hidden');
  pagination.classList.add('is-hidden');
}

function renderCarousel(localStorageKey, carouselList, carouselSelector, gifSelector) {
  const items = load(localStorageKey);

  if (items && items.length > 0) {
    deleteCanvas();
    gallery.innerHTML = '';
    gifSelector.classList.add('is-hidden');
    carouselSelector.classList.remove('is-hidden');
    renderCarouselItems(items, carouselList);
    hideCarouselQueueItemsArrows(items, carouselSelector);
    carouselSelector.addEventListener('click', onCarouselArrowClick);
  } else {
    carouselSelector.classList.add('is-hidden');
    gifSelector.classList.remove('is-hidden');
    showCarouselGif(gifSelector);
    carouselSelector.removeEventListener('click', onCarouselArrowClick);
  }
}

function showCarouselGif(gifFrame) {
  gifFrame.innerHTML = '';
  const gif = fonLibrary();
  gifFrame.insertAdjacentHTML('afterbegin', gif);
  const video = gifFrame.querySelector('video');
  video.setAttribute('width', '300');
  video.setAttribute('height', '300');
  video.removeAttribute('class');
}

// Render cards for Carousel
async function renderCarouselItems(items, gallery) {
  const string = await Promise.all(items?.map(galleryCardTemplate));
  const galleryMarkup = string.join('');
  gallery.innerHTML = '';
  gallery.insertAdjacentHTML('beforeend', galleryMarkup);
  await changeCardsTitle();
}

// handler for Carousel Queue arrows click
function onCarouselArrowClick(e) {
  const currentArrow = e.target.closest('.carousel__arrow');
  if (!currentArrow) return;
  if (currentArrow.closest('[data-action="carousel-queue"]')) {
    if (currentArrow.dataset.action === 'js-arrow-prev') {
      replaceItemToEndOfList(carouselListQueue);
      return;
    }

    if (currentArrow.dataset.action === 'js-arrow-next') {
      replaceItemToStartOfList(carouselListQueue);
      return;
    }
  }

  if (currentArrow.closest('[data-action="carousel-watched"]')) {
    if (currentArrow.dataset.action === 'js-arrow-prev') {
      replaceItemToEndOfList(carouselListWatched);
      return;
    }

    if (currentArrow.dataset.action === 'js-arrow-next') {
      replaceItemToStartOfList(carouselListWatched);
      return;
    }
  }
}

function replaceItemToEndOfList(listSelector) {
  const replaceItem = listSelector.firstElementChild;
  listSelector.append(replaceItem);
}

function replaceItemToStartOfList(listSelector) {
  const replaceItem = listSelector.lastElementChild;
  listSelector.prepend(replaceItem);
}

// Controls Queue arrows disappearance
function hideCarouselQueueItemsArrows(queueItems, currentCarousel) {
  const desktopMedia = window.matchMedia('(min-width: 1024px)').matches;
  const tabletMedia = window.matchMedia('(max-width: 1023px)').matches;
  const mobileMedia = window.matchMedia('(max-width: 767px)').matches;
  const arrows = currentCarousel.querySelectorAll('.carousel__arrow');
  if (mobileMedia) {
    if (!queueItems || queueItems.length < 2) {
      arrows.forEach(arrow => arrow.classList.add('is-disabled'));
    } else {
      arrows.forEach(arrow => arrow.classList.remove('is-disabled'));
    }
    return;
  }

  if (tabletMedia) {
    if (!queueItems || queueItems.length < 3) {
      arrows.forEach(arrow => arrow.classList.add('is-disabled'));
    } else {
      arrows.forEach(arrow => arrow.classList.remove('is-disabled'));
    }
    return;
  }

  if (desktopMedia) {
    if (!queueItems || queueItems.length < 4) {
      arrows.forEach(arrow => arrow.classList.add('is-disabled'));
    } else {
      arrows.forEach(arrow => arrow.classList.remove('is-disabled'));
    }
    return;
  }
}

function setSnowIfEmptyCarousels() {
  const inLibraryPage = gallery.dataset.gallery === 'library';
  if (inLibraryPage) {
    if (
      (!load(QUEUE) || load(QUEUE).length === 0) &&
      (!load(WATCHED) || load(WATCHED).length === 0)
    ) {
      gallery.innerHTML = '';
      hideCarousels();
      setFon();
    }
  }
}

function hideCarousels() {
  gallery.classList.remove('is-hidden');
  carousel.classList.add('is-hidden');
  removeCarouselListeners(carouselWatched);
  removeCarouselListeners(carouselQueue);
}

export { onLibraryBtnClick, hideCarousels, renderCarousel, setSnowIfEmptyCarousels };
