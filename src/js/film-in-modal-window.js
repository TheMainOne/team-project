import getRefs from './refs';
import tingle from 'tingle.js';
import 'tingle.js/src/tingle.css';
import { videoapi } from './api-service';
import { load } from './storage';
import { getImageUrl, getGenres } from './gallery-card-template';
import { createMarkup, createPoster } from './markup-of-modal';
import * as queue from './for-queue-btn';
import * as watched from './for-watched-btn';
import { searchFilmInQueue } from './for-queue-localstorage';
import { searchFilmInWatched } from './for-watched-localstorage';
import { darkThemeForModal } from './change-theme';

import { enableTrailerLink } from './trailer';
import { renderGallery } from './init-gallery';
import { pagination, setPagination, lalala } from './pagination';

const refs = getRefs();
const { QUEUE, WATCHED, TRENDING, SEARCH } = videoapi.keys;

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

    lalala();

  },
});

refs.gallery.addEventListener('click', async event => {
  const li = event.target.closest('.gallery__item');
  if (!li) return;

  const id = Number(li.dataset.id);

  modal.setContent(await contentModal(id));
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
  btnClose.addEventListener('click', () => {
    modal.close();
    }, { once: true, passive: true },
  );
}

async function contentModal(idOfFilm) {
  try {
    const galleryData = refs.gallery.dataset.gallery;

    let arrayOfFilms = [];
    let ourFilm = {};

    if (galleryData === 'queue') {
      arrayOfFilms = load(QUEUE);
    } else if (galleryData === 'watch') {
      arrayOfFilms = load(WATCHED);
    } else if (galleryData === 'home') {
      arrayOfFilms = load(TRENDING.WEEK).results;
    } else if (galleryData === 'search') {
      arrayOfFilms = load(SEARCH).results;
    }

    ourFilm = arrayOfFilms.find(film => film.id === idOfFilm);

    const {
      id,
      title,
      overview,
      popularity,
      poster_path: posterPath,
      genre_ids: genreIds,
      original_title: originalTitle,
      vote_average: voteAverage,
      vote_count: voteCount,
    } = ourFilm;

    const posterUrl = getImageUrl(posterPath);
    const genresJoined = await getGenres(genreIds);
    const poster = createPoster(posterUrl, title);
    const isFilmInQueue = searchFilmInQueue(idOfFilm);
    const isFilmInWatched = searchFilmInWatched(id);

    const makrup = createMarkup({
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
      genresJoined,
    });

    return makrup;
  } catch (error) {
    console.log(error);
  }
}
