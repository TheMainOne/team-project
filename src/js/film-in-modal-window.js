import getRefs from './refs';
import tingle from 'tingle.js';
import 'tingle.js/src/tingle.css';
import { videoapi } from './api-service';
import { load } from './storage';
import { getImageUrl, getGenres } from './gallery-card-template';
import { createMarkup, createPoster } from './markup-of-modal';
import * as queue from './for-queue-btn'
import { searchFilmInQueue} from './for-queue-localstorage';


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
  queue.queueAddEventListener();
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




// ===================== функции для модалки ===============
  

function onCloseModal() {
  const btnClose = document.querySelector('.btnClose');
  btnClose.addEventListener('click', () => {
    modal.close();
    queue.queueRemoveEventListener();
  });
}


async function contentModal(idx) {
  try {
    const key = videoapi.checkType();
    const ourFilm = load(key)?.results[idx]
    
    const {
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
    const isFilmInQueue = searchFilmInQueue(ourFilm);
    const queueStatus = isFilmInQueue ? { data: "remove-from-queue", text: "remove from queue" } : { data: "add-to-queue", text: "add to queue" };
   
    const makrup = createMarkup({
      queueStatus,
      idx,
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
