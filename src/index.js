import sprite from './images/svg/sprite.svg';
export { sprite };
// console.log('sprite', sprite);

// prettier-ignore
// const iconsArr = ['arrow-prev', 'heart', 'search', 'close', 'dots', 'film', 'placeholder', 'arrow-back-to-top', 'youtube', 'github', 'linkedin', 'moon', 'sun','arrow-next'];

// const icons = iconsArr
//   .map(icon => `<svg><use href="${sprite}#icon-${icon}"></use></svg>`)
//   .join('');
// document.body.insertAdjacentHTML('beforebegin', icons);

import initPagination from './js/pagination';
import './js/queue'
import './js/library';
import './sass/main.scss';
import './js/header';
import './js/film-in-modal-window';
import debounce from 'lodash/debounce';
import { Notify } from 'notiflix';
import { videoapi } from './js/api-service';
import { save, load } from './js/storage';

import galleryCardTemplate from './js/gallery-card-template';
import './js/modalTeam';
import getRefs from './js/refs';
import { scrollFunction, backToTop } from './js/back-to-top-btn';
import { changeTheme } from './js/change-theme';
const { info } = Notify;
const { log, error } = console;

const DEBOUNCE_DELAY = 300;
const DEBOUNCE_OPTIONS = { leading: true, trailing: false };
const themeSwitcher = document.querySelector('.theme-switch__control');
const mybutton = document.querySelector('.btn-back-to-top');

const refs = getRefs();
let pagination = null;


window.addEventListener('DOMContentLoaded',function(){
  document.querySelector('body').classList.add("loaded")  
});

const renderGallery = async results => {
  try {
    const string = await Promise.all(results.map(galleryCardTemplate));
    const galleryMarkup = string.join('');

    refs.gallery.innerHTML = '';
    refs.gallery.insertAdjacentHTML('beforeend', galleryMarkup);

    // ============
    const cardTitles = document.querySelectorAll('.card__title');
    const footer = document.querySelector('.footer');

    if (localStorage.getItem('theme') === 'dark-theme') {
      cardTitles.forEach(title => (title.style.color = '#ffffff'));
      footer.style.backgroundColor = '#202124';
      footer.style.color = '#ffffff';
    }

    themeSwitcher.addEventListener('change', event => {
      if (event.target.checked) {
        cardTitles.forEach(title => (title.style.color = '#ffffff'));
      } else {
        cardTitles.forEach(title => (title.style.color = '#000000'));
      }



      
    });
    // ============
  } catch (err) {
    error(err);
  }
};

export { renderGallery };

const notifyStatus = (videosCount, page, totalResults) => {
  if (videosCount < 1) {
    return 1;
  }

  if (totalResults > 0 && page === 1) {
    return 0;
  }
};

const initGallery = async () => {
  try {
    /* page: 1, results: Array(20), total_pages: 1000, total_results: 20000 */
    const {
      page,
      results,
      total_pages: totalPages,
      total_results: totalResults,
    } = await videoapi.getTrendingVideos();

    // console.log('res', page, results, totalPages, totalResults);

    if (notifyStatus(results.length, page, totalResults)) return;
    await renderGallery(results);

    pagination = await initPagination({
      page,
      itemsPerPage: results.length,
      totalItems: totalResults,
    });
  } catch (err) {
    error(err);
  }
};

initGallery();
galleryCardTemplate;

const setPagination = (type, totalPages) => {
  pagination.reset(totalPages);
  videoapi.type = type;
  pagination.movePageTo(1);
};

const onSubmit = async e => {
  e.preventDefault();

  try {
    const search = e.target.elements.searchQuery.value.trim();

    if (search.length === 0) {
      return info('Please, enter search query.');
    }

    videoapi.query = search;

    /* page: 1, results: Array(20), total_pages: 1000, total_results: 20000 */
    const {
      page,
      results,
      total_pages: totalPages,
      total_results: totalResults,
    } = await videoapi.getVideos();

    setPagination('videos', totalPages);

    // console.log('res', page, results, totalPages, totalResults);

    if (notifyStatus(results.length, page, totalResults)) return;

    await renderGallery(results);
  } catch (err) {
    error(err);
  }
};

const initListeners = () => {
  refs.form.addEventListener(
    'submit',
    debounce(onSubmit, DEBOUNCE_DELAY, DEBOUNCE_OPTIONS),
  );
};

initListeners();

// ====== функционал отвечающий за кнопку и прокрутку в вверх страницы =======
mybutton.addEventListener('click', backToTop);
window.onscroll = function (mybutton) {
  scrollFunction(mybutton);
};

// ======смена темы============
changeTheme();
