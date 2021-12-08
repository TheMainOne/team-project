import initPagination from './js/pagination';

import './js/change-theme';
import './sass/main.scss';
import './js/header';
import './js/modal-window';
import debounce from 'lodash/debounce';
import { Notify } from 'notiflix';
import { videoapi } from './js/api-service';

import galleryCardTemplate from './js/gallery-card-template';
import './js/modalTeam';
import getRefs from './js/refs';
import { scrollFunction, backToTop } from './js/back-to-top-btn';
const { info, failure, success } = Notify;
const { log, error } = console;

const DEBOUNCE_DELAY = 300;
const DEBOUNCE_OPTIONS = { leading: true, trailing: false };
const mybutton = document.querySelector('.btn-back-to-top');

const refs = getRefs();
let pagination = null;

const renderGallery = async results => {
  try {
    const string = await Promise.all(results.map(galleryCardTemplate));
    const galleryMarkup = string.join('');

    refs.gallery.innerHTML = '';
    refs.gallery.insertAdjacentHTML('beforeend', galleryMarkup);
  } catch (err) {
    error(err);
  }
};

export { renderGallery };

const notifyStatus = (videosCount, page, totalResults) => {
  if (videosCount < 1) {
    failure('Sorry, no results. Please try another query.');
    return 1;
  }

  if (totalResults > 0 && page === 1) {
    success(`Hooray! We found ${totalResults} results.`);
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
//==========mine========
const libraryBtnRef = document.querySelector('[data-action="js-library"]');
console.log(libraryBtnRef);
libraryBtnRef.addEventListener('click', onLibraryBtnClick);
function onLibraryBtnClick() {
  refs.gallery.innerHTML = '';
  const pagesRef = document.querySelector('#pagination');
  pagesRef.innerHTML = '';
  if(localStorage.getItem('watched') === null) {
    console.log('click');
  const canvas = document.querySelector("#sky");
  canvas.style.display = "block";
  const sectionRef = document.querySelector('section');
sectionRef.classList.add('section__js');
    const markup = `<h1 class="title__library">Add a movie</h1>
    <a href="../index.html"><button class="glow-on-hover" type="button">GO BACK</button></a>`; //и при клике на батон надо будет повесить слушателя идти домой
   sectionRef.insertAdjacentHTML("afterbegin", markup);
   function fl(){
    //get and store canvas & context
      var canvas = document.getElementById("sky");
      var ctx    = canvas.getContext("2d");
      var h     = window.innerHeight;
      var w     = window.innerWidth;
    //set dims to window
      canvas.height = h;
      canvas.width  = w;
    // Generate snowflakes 
      var mf = 100; // max flakes
      var flakes = [];
     // loop through the empty flakes 
      for(var i = 0; i < mf; i++){
        
        flakes.push({
          x: Math.random()*w,
          y: Math.random()*h,
          r: Math.random()*5+2, //min of 2px and max 7px
          d: Math.random() + 1  // density of flakes
          })
      }
      //draw flakes 
      function drawFlakes(){
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = "white";
        ctx.beginPath();
        for(var i = 0; i < mf; i++){
           var f = flakes[i];
          ctx.moveTo(f.x, f.y);
          ctx.arc(f.x, f.y, f.r, 0, Math.PI*2, true);
        }
        ctx.fill();
        moveFlakes();
      }
     //animate the flakes
      var angle = 0;
      function moveFlakes(){
        angle += 0.01;
        for(var i = 0; i < mf; i++){
          //store the current flake
          var f = flakes[i];
          //Upadte Y and X coordinate of each snow
          f.y += Math.pow(f.d, 2) + 1;
          f.x += Math.sin(angle) * 2;
          //if the snow reach to the bottom send it to the top again
          if(f.y > h){
            flakes[i] = {x: Math.random()*w, y: 0, r: f.r, d: f.d};
            }
          }
        }
      setInterval(drawFlakes, 25);
      }
      fl();
  }
  
}
