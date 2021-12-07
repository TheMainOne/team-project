import '../sass/main.scss';
// import '../partials/modal-window';
// import '../../src/index';
function changeTheme() {

    const Theme = {
    LIGHT: 'light-theme',
    DARK: 'dark-theme',
    };
    const { LIGHT, DARK } = Theme;
    
    const themSwitcher = document.querySelector(".theme-switch__control");
    const themeToggle = document.querySelector('.theme-switch__toggle');
    const bgColor = document.querySelector("body");
    // const movie = document.querySelector(".movie");
    // const movieBtnContainer = document.querySelector(".movie__btn-container");
    // const movieBtn = movieBtnContainer.childNodes[3]; 
    const menuList = document.querySelector('.js-menu');
    // console.log(queue);
    themSwitcher.addEventListener("change", onControlThemeSwitch);
    populateChooseTheme();
    
    
    function onControlThemeSwitch(event) {
      if (event.target.checked) {
          bgColor.classList.remove(LIGHT);
          bgColor.classList.add(DARK);
        //   movie.classList.remove(LIGHT);
        //   movie.classList.add(DARK);
        //   movieBtn.classList.remove(LIGHT);
        //   movieBtn.classList.add(DARK);
          localStorage.setItem("theme", DARK);
      } else {
          bgColor.classList.remove(DARK);
          bgColor.classList.add(LIGHT);
        //   movie.classList.remove(DARK);
        //   movie.classList.add(LIGHT);
        //   movieBtn.classList.remove(DARK);
        //   movieBtn.classList.add(LIGHT);
          localStorage.setItem("theme", LIGHT);
      }
    };
    
    function populateChooseTheme(event) {
      const currentTheme = localStorage.getItem("theme");
    
      if (currentTheme) {
          bgColor.classList.toggle(currentTheme);
        //   movie.classList.toggle(currentTheme);
        //   movieBtn.classList.toggle(currentTheme);
      }
    
      if (currentTheme === DARK) {
          // themeToggle.setAttribute('checked', 'event.target.checked');
          themeToggle.checked = true;
      }
    }
    };
    changeTheme();