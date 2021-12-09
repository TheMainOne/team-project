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
    const teamModalRef = document.querySelector('.team__wrapper');
    const gitRef = document.querySelectorAll('.logo__icon-git');
    if (localStorage.getItem('theme') === 'dark-theme') {
      gitRef.forEach(git => (git.style.fill = '#ffffff'));
      teamModalRef.style.backgroundColor = '#111111';
    } else {
      gitRef.forEach(git => (git.style.fill = '#000000'));
      teamModalRef.style.backgroundColor = '#ffffff';
    }
  });

  themeSwitcher.addEventListener('change', onControlThemeSwitch);
  populateChooseTheme();

  function onControlThemeSwitch(event) {
    if (event.target.checked) {
      bgColor.classList.remove(LIGHT);
      bgColor.classList.add(DARK);
      footer.style.backgroundColor = '#202124';
      footer.style.color = '#ffffff';
      setDarkThemeIcon();

      localStorage.setItem('theme', DARK);
    } else {
      bgColor.classList.remove(DARK);
      bgColor.classList.add(LIGHT);
      footer.style.backgroundColor = '#f7f7f7';
      footer.style.color = '#545454';
      setLightThemeIcon();

      localStorage.setItem('theme', LIGHT);
    }
  }

  function populateChooseTheme(event) {
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
      bgColor.classList.toggle(currentTheme);
    }

    if (currentTheme === DARK) {
      themeToggle.checked = true;
      setDarkThemeIcon();
    }
  }

  function setLightThemeIcon() {
    darkThemeIcon.classList.remove('is-active');
    lightThemeIcon.classList.add('is-active');
  }

  function setDarkThemeIcon() {
    lightThemeIcon.classList.remove('is-active');
    darkThemeIcon.classList.add('is-active');
  }
}

export function darkThemeForModal(modal) {
  const theme = localStorage.getItem('theme');
  const modalForTheme = modal.modalBoxContent.children[0].children[0];
  const butInModal =
    modal.modalBoxContent.children[0].children[0].children[2].children[4]
      .children[1];
  const btnClose = modal.modal.querySelector('.btnClose-icon');

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
    cardTitles.forEach(title => (title.style.color = '#ffffff'));
    refs.footer.style.backgroundColor = '#202124';
    refs.footer.style.color = '#ffffff';
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

export { changeTheme, onThemeToggle, initThemeSwitcher };
