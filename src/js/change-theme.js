
function changeTheme() {

    const Theme = {
    LIGHT: 'light-theme',
    DARK: 'dark-theme',
    };
    const { LIGHT, DARK } = Theme;
    
  const footer = document.querySelector('.footer');
    const themeSwitcher = document.querySelector(".theme-switch__control");
    const themeToggle = document.querySelector('.theme-switch__toggle');
    const bgColor = document.querySelector("body");
    const teamRef = document.querySelector(".team__modal");
    teamRef.addEventListener('click', () => {
        const teamModalRef = document.querySelector(".team__wrapper");
        if (localStorage.getItem('theme') === 'dark-theme') {
          
          teamModalRef.style.backgroundColor = '#111111';
        } else {
          teamModalRef.style.backgroundColor = '#ffffff';
        }
    
    })

    themeSwitcher.addEventListener("change", onControlThemeSwitch);
    populateChooseTheme();
    
    function onControlThemeSwitch(event) {
      if (event.target.checked) {
          bgColor.classList.remove(LIGHT);
          bgColor.classList.add(DARK);
        footer.style.backgroundColor = '#202124';
        footer.style.color = '#ffffff';

          localStorage.setItem("theme", DARK);
      } else {
          bgColor.classList.remove(DARK);
        bgColor.classList.add(LIGHT);
        footer.style.backgroundColor = '#f7f7f7';
        footer.style.color = '#545454';

          localStorage.setItem("theme", LIGHT);
      }
    };
    
    function populateChooseTheme(event) {
      const currentTheme = localStorage.getItem("theme");

      if (currentTheme) {
          bgColor.classList.toggle(currentTheme);
      }
    
      if (currentTheme === DARK) {
          themeToggle.checked = true;
      }
    }
    };
    
export { changeTheme };






export function darkTheameForModal(modal) {
   const theme = localStorage.getItem('theme');
  const modalForTheme = modal.modalBoxContent.children[0].children[0];
  const butInModal = modal.modalBoxContent.children[0].children[0].children[2].children[4].children[1];

  if (theme === 'dark-theme') {
    modalForTheme.style.backgroundColor = '#202124';
    modalForTheme.style.color = '#ffffff';
    butInModal.style.color = '#ffffff';
    butInModal.style.borderColor = '#ffffff';
  }
}
