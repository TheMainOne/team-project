import getRefs from './refs';
import tingle from 'tingle.js';
import 'tingle.js/src/tingle.css';
import { load } from './storage';
import { videoapi } from '../index';

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

refs.gallery.addEventListener('click', event => {
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  modal.setContent(contentModal());
  modal.open();
  onCloseModal();
});

function onCloseModal() {
  const btnClose = document.querySelector('.btnClose');
  btnClose.addEventListener('click', () => {
    modal.close();
  });
}

function contentModal() {
  const tingleModal = document.querySelector('.tingle-modal');
  tingleModal.style.cursor = 'default';

  const key = videoapi.checkType();

  return `
<div class="modal-window">
    <div class="movie movie__container">
    <button class="btnClose">
    <svg class="close-btn" width="30" height="30" data-action="close-btn">
                        <use href="./images/optimsprite.svg#icon-close" data-action="close-btn"></use>
                    </svg>
    </button>
    <div class="movie__container--left-side">
       <img class="movie__img" src="images/Rectangle 18.jpg" alt="заглушка">
    </div>


<div class="movie__container--rigth-side">
    <h1 class="movie__title">A FISTFUL OF LEAD</h1>

    <table class="movie__info" >
        <tbody>
        <tr class="movie__info-rows">
            <td class="movie__info-name">Vote / Votes</td>
            <td class="movie__info-rating">
                <span class="movie__info-rating-value movie__info-rating--accent">7.3 </span>
                <span class="movie__info-rating-slash">/</span>
                <span class="movie__info-rating-value">1260</span>
            </td>
        </tr>
        <tr class="movie__info-rows">
            <td class="movie__info-name">Popularity</td>
            <td class="movie__info-numbers">100.2</td>
        </tr>
        <tr class="movie__info-rows">
            <td class="movie__info-name">Original Title</td>
            <td class="movie__info-value">A FISTFUL OF LEAD</td>
        </tr>
        <tr class="movie__info-rows movie__info-rows--last">
            <td class="movie__info-name">Genre</td>
            <td class="movie__info-value">Western</td>
        </tr>
        </tbody>
    </table>

    <h2 class="movie__about-title">About</h2>
    <p class="movie__about-text">Four of the West’s most infamous outlaws assemble to steal a huge stash of gold from the most corrupt settlement of the
    gold rush towns. But not all goes to plan one is killed and the other three escapes with bags of gold hide out in the
    abandoned gold mine where they happen across another gang of three – who themselves were planning to hit the very same
    bank! As tensions rise, things go from bad to worse as they realise the bags of gold are filled with lead... they’ve
    been double crossed – but by who and how?</p>

    <div class="movie__btn-container">
    <button type="submit" class="movie__btn btn btn--accent"> add to Watched </button>
    <button type="submit" class="movie__btn btn "> add to queue </button>
    </div>


</div>
</div>
</div>`;
}
