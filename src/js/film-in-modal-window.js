import getRefs from './refs';
import tingle from 'tingle.js';
import 'tingle.js/src/tingle.css';
import { videoapi } from './api-service';
import { filmFinder } from './finderOfFilm';
import { getImageUrl, getGenreName } from './gallery-card-template';
import { createMarkup, createPoster, isFalse } from './markup-of-modal';

import * as queue from './for-queue-btn';
import * as watched from './for-watched-btn';
import { searchFilmInQueue } from './for-queue-localstorage';
import { searchFilmInWatched } from './for-watched-localstorage';

import { darkThemeForModal } from './change-theme';
import { enableTrailerLink } from './trailer';
import carouselRefs from './get-carousel-refs';

const { carousel } = carouselRefs();
const refs = getRefs();

const modal = new tingle.modal({
  footer: false,
  stickyFooter: false,
  closeMethods: ['overlay', 'escape'],
  closeLabel: 'Close',
  cssClass: ['custom-class-1', 'custom-class-2'],
  onOpen: function () {
    darkThemeForModal(modal);
    queue.queueAddEventListener();
    watched.watchedAddEventListener();
  },
  onClose: function () {
    queue.queueRemoveEventListener();
    watched.watchedRemoveEventListener();

    // onPaginationPageLibrary();
  },
});

refs.gallery.addEventListener('click', async event => {
  const li = event.target.closest('.gallery__item');
  if (!li) return;

  const id = Number(li.dataset.id);

  modal.setContent(await contentModal(id));
  isFalse(id);
  modal.open();

  // ===trailer
  const searchRef = document.querySelector('.search-for-trailer');
  searchRef.addEventListener('click', enableTrailerLink);
  // ========

  onBtnCloseModal();
});

carousel.addEventListener('click', async event => {
  const li = event.target.closest('.gallery__item');
  if (!li) return;

  const id = Number(li.dataset.id);

  modal.setContent(await contentModal(id));
  isFalse(id);
  modal.open();

  // ===trailer
  const searchRef = document.querySelector('.search-for-trailer');
  searchRef.addEventListener('click', enableTrailerLink);
  // ========

  onBtnCloseModal();
});

// ===================== функции для модалки ===============

function onBtnCloseModal() {
  const btnClose = document.querySelector('.btnClose');
  btnClose.addEventListener(
    'click',
    () => {
      modal.close();
    },
    { once: true, passive: true },
  );
}

async function contentModal(idOfFilm) {
  try {
    const ourFilm = await filmFinder(idOfFilm);

    const {
      id = 0,
      title = 'no found',
      overview = '-',
      popularity = '-',
      poster_path: posterPath = '',
      genre_ids: genreIds = ['no found'],
      original_title: originalTitle = 'no found',
      vote_average: voteAverage = '-',
      vote_count: voteCount = '-',
    } = ourFilm;

    const posterUrl = getImageUrl(posterPath);
    const getGenreNames = (await Promise.all(genreIds.map(getGenreName))).join(', ');
    const poster = createPoster(posterUrl, title);
    const isFilmInQueue = searchFilmInQueue(idOfFilm);
    const isFilmInWatched = searchFilmInWatched(id);

    const markup = createMarkup({
      isFilmInQueue,
      isFilmInWatched,
      id,
      poster,
      title,
      overview,
      popularity,
      posterPath,
      originalTitle,
      voteAverage,
      voteCount,
      getGenreNames,
    });

    return markup;
  } catch (error) {
    console.log(error);
  }
}
