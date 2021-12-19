const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

const { LIGHT, DARK } = Theme;

const footer = document.querySelector('.footer');
const themeSwitcher = document.querySelector('.theme-switch__control');
const themeToggle = document.querySelector('.theme-switch__toggle');
const bgColor = document.querySelector('body');
const teamRef = document.querySelector('.team__modal');
const lightThemeIcon = themeSwitcher.previousElementSibling;
const darkThemeIcon = themeSwitcher.nextElementSibling;
const theme = localStorage.getItem('theme');
const getCardTitles = async () => document.querySelectorAll('.card__title');
// const getCarouselCardsTitles = async () => document.querySelectorAll('.js-item-watched');

themeSwitcher.addEventListener('change', onControlThemeSwitch);
teamRef.addEventListener('click', onTeamThemeToggle);

// change theme when clicking on the radio button
function onControlThemeSwitch(event) {
  if (event.target.checked) {
    darkThemeStyles();
  } else {
    lightThemStyles();
  }
}

// set theme on site load
function populateChooseTheme() {
  const currentTheme = localStorage.getItem('theme');

  lightThemeIcon.addEventListener('click', onIconClick);
  darkThemeIcon.addEventListener('click', onIconClick);

  if (currentTheme) {
    bgColor.classList.toggle(currentTheme);
    footer.classList.toggle(currentTheme);
  }

  if (currentTheme === DARK) {
    themeToggle.checked = true;
    setDarkThemeIcon();
  }
}

function lightThemStyles() {
  bgColor.classList.remove(DARK);
  bgColor.classList.add(LIGHT);
  footer.classList.remove(DARK);
  footer.classList.add(LIGHT);
  setLightThemeIcon();
  localStorage.setItem('theme', LIGHT);
  onPageThemeToggle();
}

function darkThemeStyles() {
  bgColor.classList.remove(LIGHT);
  bgColor.classList.add(DARK);
  footer.classList.remove(LIGHT);
  footer.classList.add(DARK);
  setDarkThemeIcon();
  localStorage.setItem('theme', DARK);
  onPageThemeToggle();
}

// change icon color of the toggler
function setLightThemeIcon() {
  darkThemeIcon.classList.remove('is-active');
  lightThemeIcon.classList.add('is-active');
}

function setDarkThemeIcon() {
  lightThemeIcon.classList.remove('is-active');
  darkThemeIcon.classList.add('is-active');
}

// handler clicks on toggler icons
function onIconClick(e) {
  const currentIcon = e.currentTarget;

  if (currentIcon.classList.contains('sun')) {
    themeToggle.checked = false;
    lightThemStyles();
    changeCardsTitle();
    return;
  }

  themeToggle.checked = true;
  darkThemeStyles();
  changeCardsTitle();
}

// to change cards title color accoding theme
async function changeCardsTitle() {
  const cardsTitles = await getCardTitles();

  if (localStorage.getItem('theme') === 'dark-theme') {
    cardsTitles.forEach(cardTitle => {
      cardTitle.style.color = 'var(--main-text-color)';
    });
  } else {
    cardsTitles.forEach(cardTitle => {
      cardTitle.style.color = 'var(--secondary-text-color)';
    });
  }
}

// change theme of team modal
function onTeamThemeToggle() {
  setTimeout(() => {
    const teamModalWindow = document.querySelector('.dialog');
    const gitRef = document.querySelectorAll('.logo__icon-git');

    if (localStorage.getItem('theme') === 'dark-theme') {
      gitRef.forEach(git => (git.style.fill = 'var(--main-text-color)'));
      teamModalWindow.style.backgroundColor = 'var(--secondary-bg-color)';
    } else {
      gitRef.forEach(git => (git.style.fill = 'var(--secondary-text-color)'));
      teamModalWindow.style.backgroundColor = 'var(--main-bg-color)';
    }
  }, 0);
}

// change theme of film modal
function darkThemeForModal(modal) {
  const theme = localStorage.getItem('theme');
  const modalForTheme = modal.modalBoxContent.children[0].children[0];
  const btnClose = modal.modal.querySelector('.btnClose-icon');
  const butInModal =
    modal.modalBoxContent.children[0].children[0].children[2].children[4].children[1];

  if (theme === 'dark-theme') {
    modalForTheme.style.backgroundColor = 'var(--secondary-bg-color)';
    modalForTheme.style.color = 'var(--main-text-color)';
    butInModal.style.color = 'var(--main-text-color)';
    butInModal.style.borderColor = 'var(--main-text-color)';
    btnClose.style.stroke = 'var(--main-text-color)';
  }
}

// Обработчик смены цвета текста заголовков карточек галереи по клику на переключатель
const onThemeToggle = async event => {
  const cardTitles = await getCardTitles();

  if (event.target.checked) {
    cardTitles.forEach(title => (title.style.color = 'var(--main-text-color)'));
  } else {
    cardTitles.forEach(title => (title.style.color = 'var(--secondary-bg-color)'));
  }
};

// Pagination theme toggle
function onPageThemeToggle() {
  const currentTeme = localStorage.getItem('theme');
  const symbols = document.querySelectorAll('.page-symbol');

  if (currentTeme === DARK) {
    symbols.forEach(symbol => {
      symbol.classList.remove(LIGHT);
      symbol.classList.add(DARK);
    });
  } else {
    symbols.forEach(symbol => {
      symbol.classList.remove(DARK);
      symbol.classList.add(LIGHT);
    });
  }
}

// async function changeCarouselCardsTitles(params) {
//   const cards = await getCarouselCardsTitles();
//   console.log(cards);
// }

export {
  populateChooseTheme,
  onThemeToggle,
  onTeamThemeToggle,
  darkThemeForModal,
  changeCardsTitle,
  onPageThemeToggle,
  theme,
  // changeCarouselCardsTitles,
};
