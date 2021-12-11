import getRefs from './refs';
const refs = getRefs();

function changeTheme() {
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

  teamRef.addEventListener('click', () => {
    const teamModalWindow = document.querySelector('.team__wrapper');
    const teamModalWindowTwo = document.querySelector('.dialog');
    const gitRef = document.querySelectorAll('.logo__icon-git');
    if (localStorage.getItem('theme') === 'dark-theme') {
      gitRef.forEach(git => (git.style.fill = '#ffffff'));
      teamModalWindow.style.backgroundColor = '#202124';
      teamModalWindowTwo.style.backgroundColor = '#202124';
    } else {
      gitRef.forEach(git => (git.style.fill = '#000000'));
      teamModalWindow.style.backgroundColor = '#ffffff';
      teamModalWindowTwo.style.backgroundColor = '#ffffff';
    }
  });

  themeSwitcher.addEventListener('change', onControlThemeSwitch);

  populateChooseTheme();

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
    }

    if (currentTheme === DARK) {
      themeToggle.checked = true;
      setDarkThemeIcon();
    }
  }

  function lightThemStyles() {
    bgColor.classList.remove(DARK);
    bgColor.classList.add(LIGHT);
    footer.style.backgroundColor = '#f7f7f7';
    footer.style.color = '#545454';
    setLightThemeIcon();
    localStorage.setItem('theme', LIGHT);
  }

  function darkThemeStyles() {
    bgColor.classList.remove(LIGHT);
    bgColor.classList.add(DARK);
    footer.style.backgroundColor = '#202124';
    footer.style.color = '#ffffff';
    setDarkThemeIcon();
    localStorage.setItem('theme', DARK);
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

  async function onIconClick(e) {
    const currentIcon = e.currentTarget;
    await changeCardsTitle();

    if (currentIcon.classList.contains('sun')) {
      themeToggle.checked = false;
      lightThemStyles();
      return;
    }

    themeToggle.checked = true;
    darkThemeStyles();
  }

  async function changeCardsTitle() {
    const cardsTitles = await getCardTitles();

    if (localStorage.getItem('theme') === 'dark-theme') {
      cardsTitles.forEach(cardTitle => {
        cardTitle.style.color = 'var(--secondary-text-color)';
      });
    } else {
      cardsTitles.forEach(cardTitle => {
        cardTitle.style.color = 'var(--main-text-color)';
      });
    }
  }
}

function darkThemeForModal(modal) {
  const theme = localStorage.getItem('theme');
  const modalForTheme = modal.modalBoxContent.children[0].children[0];
  const btnClose = modal.modal.querySelector('.btnClose-icon');
  const butInModal =
    modal.modalBoxContent.children[0].children[0].children[2].children[4].children[1];

  if (theme === 'dark-theme') {
    modalForTheme.style.backgroundColor = '#202124';
    modalForTheme.style.color = '#ffffff';
    butInModal.style.color = '#ffffff';
    butInModal.style.borderColor = '#ffffff';
    btnClose.style.stroke = '#ffffff';
  }
}

// ============

const getCardTitles = async () => document.querySelectorAll('.card__title');

const initThemeSwitcher = async () => {
  const cardTitles = await getCardTitles();

  if (localStorage.getItem('theme') === 'dark-theme') {
    cardTitles.forEach(cardTitle => {
      cardTitle.style.color = '#ffffff';
    });
    refs.footer.style.backgroundColor = '#202124';
    refs.footer.style.color = '#ffffff';
  } else {
    cardTitles.forEach(cardTitle => {
      cardTitle.style.color = '#202124';
    });
    refs.footer.style.backgroundColor = 'var(--main-bg-color)';
    refs.footer.style.color = '#202124';
  }
};

const onThemeToggle = async event => {
  const cardTitles = await getCardTitles();

  if (event.target.checked) {
    cardTitles.forEach(title => (title.style.color = '#ffffff'));
  } else {
    cardTitles.forEach(title => (title.style.color = '#000000'));
  }
};

// ============

export { changeTheme, onThemeToggle, initThemeSwitcher, darkThemeForModal };
