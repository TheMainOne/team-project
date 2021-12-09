import getRefs from './refs';
import tingle from 'tingle.js';
import 'tingle.js/src/tingle.css';
import { videoapi } from './api-service';
import { load } from './storage';
import { getImageUrl, getGenres } from './gallery-card-template';
import { createMarkup, createPoster } from './markup-of-modal';
import * as queue from './for-queue-btn'
import { searchFilmInQueue } from './for-queue-localstorage';
import {darkTheameForModal} from './change-theme'

// import addToLocalStorage from './add-to-local-storage';

const refs = getRefs();

const LOCAL_STORAGE_QUEUE = 'filmoteka-queue';

const modal = new tingle.modal({
  footer: false,
  stickyFooter: false,
  closeMethods: ['overlay', 'escape'],
  closeLabel: 'Close',
  cssClass: ['custom-class-1', 'custom-class-2'],
  onOpen: function () {
    queue.queueAddEventListener();
    darkTheameForModal(this);
    },
  onClose: function () {
    queue.queueRemoveEventListener();
    }
});


refs.gallery.addEventListener('click', async event => {
  const li = event.target.closest('.gallery__item');

  if (!li) return;
  const { id } = li?.dataset;

  
  modal.setContent(await contentModal(id));
  modal.open();

  // ================= Дима исправь код!
  // addToLocalStorage(idx);
  // =================
  onBtnCloseModal();
});




// ===================== функции для модалки ===============
  

function onBtnCloseModal() {
  const btnClose = document.querySelector('.btnClose');
  btnClose.addEventListener('click', () => {
    modal.close();
  });
}


async function contentModal(idOfFilm) {
  try {
    let key = videoapi.checkType();
    let arrayOfFilms = [];
    let ourFilm = {};

    if (refs.gallery.dataset.gallery === "queue") {
      key = LOCAL_STORAGE_QUEUE;
      arrayOfFilms = load(key)
    } else if (refs.gallery.dataset.gallery === "watch") {
      key = "watched";
      arrayOfFilms = load(key)
    } else {
      arrayOfFilms = load(key)?.results;
    }
 
    ourFilm = arrayOfFilms.find(film => film.id === Number(idOfFilm));
 
 
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
    const isFilmInQueue = searchFilmInQueue(id);
    
   
    const makrup = createMarkup({
      isFilmInQueue,
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

 