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
import addToLocalStorage from './add-to-local-storage';

const refs = getRefs();
const gallaryData = refs.gallery.dataset.gallery;
const { QUEUE, WATCHED, TRENDING_WEEK, SEARCH } = videoapi.keys
// const {QUEUE, WATCHED, TRENDING, SEARCH} = videoapi.keys



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

  // =====нужно потом удалить
  const { idx } = li?.dataset;
  modal.setContent(await contentModal(id));
  modal.open();
  const searchRef = document.querySelector('.search-for-trailer');
  searchRef.addEventListener('click', enableTrailerLink);
  // ================= Дима исправь код!
  addToLocalStorage(idx);
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
    let arrayOfFilms = [];
    let ourFilm = {};

    if (gallaryData === "queue") {
      arrayOfFilms = load(QUEUE);
       console.log("~ arrayOfFilms1", arrayOfFilms)
    } else if (gallaryData === "watch") {
      arrayOfFilms = load(WATCHED);
       console.log("~ arrayOfFilms2", arrayOfFilms)
    } else if (gallaryData === "home") {
      arrayOfFilms = load(TRENDING_WEEK)?.results;
      console.log("~ arrayOfFilms3", arrayOfFilms)
    }
    console.log("~ arrayOfFilms4", arrayOfFilms)
    ourFilm = arrayOfFilms.find(film => film.id === Number(idOfFilm));
    
    if (!ourFilm) {
      arrayOfFilms = load(SEARCH)
      console.log("~ arrayOfFilms5", arrayOfFilms)
      ourFilm = arrayOfFilms.find(film => film.id === Number(idOfFilm));
    } 
    
  
 
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



//======trailer======//

function enableTrailerLink() {
  const targetName = document.querySelector('.movie__title').textContent;
  const trailerLinkRef = document.querySelector('.trailer-link');
  const trailerTextRef = document.querySelector('.trailer-link__text');
  const searchRef = document.querySelector('.search-for-trailer');
  searchRef.classList.add('unable')
  trailerLinkRef.classList.add('enable');

  const youtubeKeyApi = 'AIzaSyCrnGnV2GS29bGv6ktcqjAdI_UxuU_ESyQ';
  const baseYoutubeUrl = `https://www.googleapis.com/youtube/v3/search?q=${targetName}+official+trailer&key=${youtubeKeyApi}&part=snippet,id&kind='youtube#video'order=date&maxResults=1`;
  fetch(baseYoutubeUrl)
    .then(response => {
      if (!response.ok) {
          trailerLinkRef.target = '_self';
          trailerTextRef.textContent = 'Sorry, CURRENTLY UNAVAILABLE';
          trailerLinkRef.title='The request cannot be completed because the youtube quota is exceeded';
          return;
      }

      return response.json();
    })
    .then(data => {
      const movieId = data.items[0].id.videoId;
      return movieId;
    })
    .then(data => {
      trailerLinkRef.addEventListener('click', function () {
      trailerLinkRef.href = `https://www.youtube.com/embed/${data}?enablejsapi=1`;
      });
    });
}

