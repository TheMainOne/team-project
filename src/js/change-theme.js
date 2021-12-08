function changeTheme() {
  const Theme = {
    LIGHT: 'light-theme',
    DARK: 'dark-theme',
  };
  const { LIGHT, DARK } = Theme;

  const footer = document.querySelector('.footer');
  const themSwitcher = document.querySelector('.theme-switch__control');
  const themeToggle = document.querySelector('.theme-switch__toggle');
  const bgColor = document.querySelector('body');

  const lightThemeIcon = themSwitcher.previousElementSibling;
  const darkThemeIcon = themSwitcher.nextElementSibling;

  themSwitcher.addEventListener('change', onControlThemeSwitch);

  populateChooseTheme();

  console.log(footer);
  function onControlThemeSwitch(event) {
    if (event.target.checked) {
      bgColor.classList.remove(LIGHT);
      bgColor.classList.add(DARK);
      footer.style.backgroundColor = '#202124';
      setDarkThemeIcon();

      localStorage.setItem('theme', DARK);
    } else {
      bgColor.classList.remove(DARK);
      bgColor.classList.add(LIGHT);
      footer.style.backgroundColor = '#f7f7f7';
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

export { changeTheme };
