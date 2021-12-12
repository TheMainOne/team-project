import getRefs from './refs';
import { save, load } from './storage';
import { videoapi } from './api-service';
import { setPagination } from './pagination';

const { QUEUE } = videoapi.keys;
const { WATCHED } = videoapi.keys;
const refs = getRefs();
const libraryBtnRef = document.querySelector('[data-action="js-library"]');

function addListenerOnLibrary() {
  libraryBtnRef.addEventListener('click', setBgSnow, { once: true });
}
addListenerOnLibrary();

let setIntervalID = null;

function setBgSnow() {
  if (
    (!load(QUEUE) || load(QUEUE).length === 0) &&
    (!load(WATCHED) || load(WATCHED).length === 0)
  ) {
    console.log('snow');
    const canvas = document.querySelector('#sky');
    canvas.style.display = 'block';
    const sectionRef = document.querySelector('section');
    sectionRef.classList.add('section__js');
    const markup = `<h1 class="title__library">Add a movie</h1>
    <a href="./index.html"><button class="glow-on-hover" type="button">GO BACK</button></a>`;
    sectionRef.insertAdjacentHTML('afterbegin', markup);

    const flakes = () => {
      var ctx = canvas.getContext('2d');
      var h = window.innerHeight;
      var w = window.innerWidth;
      //set dims to window
      canvas.height = h;
      canvas.width = w;
      // Generate snowflakes
      var mf = 100; // max flakes
      var flakes = [];
      // loop through the empty flakes
      for (var i = 0; i < mf; i++) {
        flakes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 5 + 2, //min of 2px and max 7px
          d: Math.random() + 1, // density of flakes
        });
      }
      //draw flakes
      function drawFlakes() {
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = 'white';
        ctx.beginPath();
        for (var i = 0; i < mf; i++) {
          var f = flakes[i];
          ctx.moveTo(f.x, f.y);
          ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2, true);
        }
        ctx.fill();
        moveFlakes();
      }
      //animate the flakes
      var angle = 0;
      function moveFlakes() {
        angle += 0.01;
        for (var i = 0; i < mf; i++) {
          //store the current flake
          var f = flakes[i];
          //Upadte Y and X coordinate of each snow
          f.y += Math.pow(f.d, 2) + 1;
          f.x += Math.sin(angle) * 2;
          //if the snow reach to the bottom send it to the top again
          if (f.y > h) {
            flakes[i] = { x: Math.random() * w, y: 0, r: f.r, d: f.d };
          }
        }
      }
      setIntervalID = setInterval(drawFlakes, 25);
    };
    flakes();
  }
  return '';
}

const deleteCanvas = () => {
  const canvas = document.querySelector('#sky');
  const sectionRef = document.querySelector('section');
  const titleRef = document.querySelector('.title__library');
  const btnRef = document.querySelector('.glow-on-hover');
  clearInterval(setIntervalID);
  if (canvas && sectionRef && titleRef && btnRef) {
    canvas.style.display = 'none';
    sectionRef.classList.remove('section__js');
    titleRef.style.display = 'none';
    btnRef.style.display = 'none';
  }
};

export { setBgSnow, deleteCanvas, addListenerOnLibrary };
