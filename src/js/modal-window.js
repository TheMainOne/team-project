import getRefs from './refs';
import tingle from 'tingle.js';
import 'tingle.js/src/tingle.css';
import { createMarkup, createPoster } from './markup-of-modal';

import { load } from './storage';
import { videoapi } from './api-service';
import { getImageUrl, getGenres } from './gallery-card-template';

const refs = getRefs();

var modal = new tingle.modal({
  footer: false,
  stickyFooter: false,
  closeMethods: ['overlay', 'escape'],
  closeLabel: 'Close',
  cssClass: ['custom-class-1', 'custom-class-2'],
});

refs.gallery.addEventListener('click', async event => {
  const li = event.target.closest('.gallery__item');
  if (!li) return;

  const { idx } = li?.dataset;
  modal.setContent(await contentModal(idx));
  modal.open();
  
  const searchTrailer = document.querySelector('.search-for-trailer');
  searchTrailer.addEventListener('click', trailerLink)

  // =================
  const theme = localStorage.getItem('theme')
  const modalForTheme = modal.modalBoxContent.children[0].children[0];
  const butInModal = modal.modalBoxContent.children[0].children[0].children[2].children[4].children[1];
  console.log(modal);
 
  
  if (theme === 'dark-theme') {
    modalForTheme.style.backgroundColor = '#202124';
    modalForTheme.style.color = '#ffffff';
    butInModal.style.color = '#ffffff';
    butInModal.style.borderColor = '#ffffff';
  }
  // =================

  onCloseModal();
});

function onCloseModal() {
  const btnClose = document.querySelector('.btnClose');
  btnClose.addEventListener('click', () => {
    modal.close();
  });
}

async function contentModal(idx) {
  try {
    const key = videoapi.checkType();

    const {
      title,
      overview,
      popularity,
      poster_path: posterPath,
      genre_ids: genreIds,
      original_title: originalTitle,
      vote_average: voteAverage,
      vote_count: voteCount,
    } = load(key).results[idx];

    const posterUrl = getImageUrl(posterPath);
    const genresJoined = await getGenres(genreIds);
    const poster = createPoster(posterUrl, title);

    const makrup = createMarkup({
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

//==========TRAILER============//

function trailerLink() {
  const movieName = document.querySelector('.movie__title').textContent;
  const trailerLinkRef = document.querySelector('.trailer-link');
  const trailerTextRef = document.querySelector('.trailer-link__text');
  const searchTrailer = document.querySelector('.search-for-trailer');
  searchTrailer.classList.add('unable');
  trailerLinkRef.classList.add('enable');

  const youtubeKeyApi = 'AIzaSyCrnGnV2GS29bGv6ktcqjAdI_UxuU_ESyQ';
  const baseYoutubeUrl = `https://www.googleapis.com/youtube/v3/search?q=${movieName}+official+trailer&key=${youtubeKeyApi}&part=snippet,id&kind='youtube#video'order=date&maxResults=1`;
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

