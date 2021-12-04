export default function getHeaderRefs() {
  return {
    headerBackground: document.querySelector('.js-header'),
    navbar: document.querySelector('[data-action-controls]'),
    logo: document.querySelector('[data-action="logo"]'),
    homeBtn: document.querySelector('[data-action="js-home"]'),
    libraryBtn: document.querySelector('[data-action="js-library"]'),
    headerControlBox: document.querySelector('[data-header-controls]'),
    // searchButton: document.querySelector('[data-action="search"]'),
    headerForm: document.querySelector('[data-action="js-form"]'),
    headerLibraryButtons: document.querySelector('[data-action="library-buttons"]'),
  };
}
