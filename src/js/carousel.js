import { save, load } from './storage';
import { videoapi } from './api-service';
import getCarouselRefs from './get-carousel-refs';
import getHeaderRefs from './getHearedRefs';
import getRefs from './refs';
import galleryCardTemplate from './gallery-card-template';
import fonLibrary from './fon-library';

const { WATCHED, QUEUE } = videoapi.keys;
const { carousel, carouselQueue, carouselWatched, carouselListQueue, carouselListWatched } =
  getCarouselRefs();
const { libraryBtn } = getHeaderRefs();
const { gallery, pagination } = getRefs();

const queueItems = load(QUEUE);
const watchedItems = load(WATCHED);
console.log(queueItems);
console.log(watchedItems);

libraryBtn.addEventListener('click', onLinraryBtnClick);

function onLinraryBtnClick() {
  console.log('клик в библиотеку');
  gallery.classList.add('is-hidden');
  pagination.classList.add('is-hidden');
  carousel.classList.remove('is-hidden');

  rengerCarousels();
}

// Carousel rendering
function rengerCarousels() {
  if (queueItems) {
    addQueueCarousel();
    hideCarouselQueueItemsArrows();
    carouselQueue.addEventListener('click', onCarouselQueueArrowClick);
  } else {
    console.log('нет в очереди');
    hideCarouselQueueItemsArrows();
  }

  if (watchedItems) {
    addWatchedCarousel();
    hideCarouselWatchedItemsArrows();
    carouselWatched.addEventListener('click', onCarouselArrowWatchedClick);
  } else {
    console.log('нет в просмотренных');
    hideCarouselWatchedItemsArrows();
  }
}

// add Queue carousel murkup
// and add EventListener
function addQueueCarousel() {
  renderCarouselItems(queueItems, carouselListQueue);
  const carouselQueueItems = carouselListQueue.querySelectorAll('.gallery__item');
  addClassListsForCarouselItems(carouselQueueItems, 'js-item-queue');
}

// add Warched carousel murkup
// and add EventListener
function addWatchedCarousel() {
  renderCarouselItems(watchedItems, carouselListWatched);
  const carouselWatchedItems = carouselListWatched.querySelectorAll('.gallery__item');
  addClassListsForCarouselItems(carouselWatchedItems, 'js-item-watched');
}

// add unique class for carousel cards
function addClassListsForCarouselItems(items, newClass) {
  items.forEach(item => item.classList.add(newClass));
}

// Render cards for Carousel
async function renderCarouselItems(items, gallery) {
  const string = await Promise.all(items?.map(galleryCardTemplate));
  const galleryMarkup = string.join('');
  gallery.insertAdjacentHTML('beforeend', galleryMarkup);
}

// handler for Carousel Queue arrows click
function onCarouselQueueArrowClick(e) {
  const currentArrow = e.target.closest('.carousel__arrow');

  if (currentArrow.closest('[data-action="carousel-queue"]')) {
    if (currentArrow.dataset.action === 'js-arrow-prev') {
      const replaceItem = carouselListQueue.firstElementChild;
      carouselListQueue.append(replaceItem);
    }

    if (currentArrow.dataset.action === 'js-arrow-next') {
      const replaceItem = carouselListQueue.lastElementChild;
      carouselListQueue.prepend(replaceItem);
    }
  }
}

// handler for carousel Watched arrows click
function onCarouselArrowWatchedClick(e) {
  const currentArrow = e.target.closest('.carousel__arrow');

  if (currentArrow.closest('[data-action="carousel-watched"]')) {
    if (currentArrow.dataset.action === 'js-arrow-prev') {
      const replaceItem = carouselListWatched.firstElementChild;
      carouselListWatched.append(replaceItem);
    }

    if (currentArrow.dataset.action === 'js-arrow-next') {
      const replaceItem = carouselListWatched.lastElementChild;
      carouselListWatched.prepend(replaceItem);
    }
  }
}

// Controls Queue arrows disappearance
function hideCarouselQueueItemsArrows() {
  if (!queueItems || queueItems.length < 4) {
    const arrows = carouselQueue.querySelectorAll('.carousel__arrow');
    arrows.forEach(arrow => arrow.classList.add('is-disabled'));
  }
}

// Controls Watched arrows disappearance
function hideCarouselWatchedItemsArrows() {
  if (!watchedItems || watchedItems.length < 4) {
    const arrows = carouselWatched.querySelectorAll('.carousel__arrow');
    arrows.forEach(arrow => arrow.classList.add('is-disabled'));
  }
}

function hideCarousels() {
  console.log('валим с библиотеки на дискотеку!');
  gallery.classList.remove('is-hidden');
  // pagination.classList.remove('is-hidden');
  carousel.classList.add('is-hidden');
  // libraryBtn.removeEventListener('click', onLinraryBtnClick);
}

export { onLinraryBtnClick, hideCarousels };
