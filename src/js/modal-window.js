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
