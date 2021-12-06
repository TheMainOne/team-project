import getRefs from './refs';
import tingle from 'tingle.js';
import 'tingle.js/src/tingle.css';
import { load } from './storage';
import { videoapi } from '../index';
import { getImageUrl, getGenres } from './gallery-card-template';
const { log, error } = console;

const refs = getRefs();

var modal = new tingle.modal({
  footer: false,
  stickyFooter: false,
  closeMethods: ['overlay', 'escape'],
  closeLabel: 'Close',
  cssClass: ['custom-class-1', 'custom-class-2'],
  onOpen: function () {
    console.log('modal open');
  },
  onClose: function () {
    console.log('modal closed');
  },
  beforeClose: function () {
    // here's goes some logic
    // e.g. save content before closing the modal
    return true; // close the modal
    return false;
  },
});

refs.gallery.addEventListener('click', async event => {
  const li = event.target.closest('.gallery__item');
  if (!li) return;

  const { idx } = li?.dataset;
  modal.setContent(await contentModal(idx));
  modal.open();
  onCloseModal();
});

function onCloseModal() {
  const btnClose = document.querySelector('.btnClose');
  btnClose.addEventListener('click', () => {
    modal.close();
  });
}

async function contentModal(idx) {
  const tingleModal = document.querySelector('.tingle-modal');
  tingleModal.style.cursor = 'default';

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

  const poster = getImageUrl(posterPath);
  const genresJoined = await getGenres(genreIds);

  /*
adult: false
backdrop_path: "/ruKcAP8XimNLfrKwNl9YfAUlCGm.jpg"
genre_ids: [28, 18]
id: 763025
media_type: "movie"
original_language: "en"
original_title: "Never Back Down: Revolt"
overview: "An amateur fighter is lured by a trafficking syndicate specializing in elite underground fighting where her brutal captor forces her to fight or face certain death."
popularity: 883.027
poster_path: "/icAG01wZyy1ZpS3UEnPReph3jMV.jpg"
release_date: "2021-11-15"
title: "Never Back Down: Revolt"
video: false
vote_average: 6.5
vote_count: 21 */

  return `
<div class="modal-window">
    <div class="movie movie__container">
    <button class="btnClose">
    <svg class="close-btn" width="30" height="30" data-action="close-btn">
        <use href="./images/optimsprite.svg#icon-close" data-action="close-btn"></use>
    </svg>
    </button>
    <div class="movie__container--left-side">
       <img class="movie__img" src="${poster}" alt="${genresJoined}">
    </div>


<div class="movie__container--rigth-side">
    <h1 class="movie__title">${title}</h1>

    <table class="movie__info" >
        <tbody>
        <tr class="movie__info-rows">
            <td class="movie__info-name">Vote / Votes</td>
            <td class="movie__info-rating">
                <span class="movie__info-rating-value movie__info-rating--accent">${voteAverage} </span>
                <span class="movie__info-rating-slash">/</span>
                <span class="movie__info-rating-value">${voteCount}</span>
            </td>
        </tr>
        <tr class="movie__info-rows">
            <td class="movie__info-name">Popularity</td>
            <td class="movie__info-numbers">${popularity}</td>
        </tr>
        <tr class="movie__info-rows">
            <td class="movie__info-name">Original Title</td>
            <td class="movie__info-value">${originalTitle}</td>
        </tr>
        <tr class="movie__info-rows movie__info-rows--last">
            <td class="movie__info-name">Genre</td>
            <td class="movie__info-value">${genresJoined}</td>
        </tr>
        </tbody>
    </table>

    <h2 class="movie__about-title">About</h2>
    <p class="movie__about-text">${overview}</p>

    <div class="movie__btn-container">
    <button type="submit" class="movie__btn btn btn--accent"> add to Watched </button>
    <button type="submit" class="movie__btn btn "> add to queue </button>
    </div>


</div>
</div>
</div>`;
}
