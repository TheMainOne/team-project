const getRefs = () => ({
  gallery: document.querySelector('[data-gallery]'),
  form: document.querySelector('#search-form'),
  themeSwitcher: document.querySelector('.theme-switch__control'),
  backToTopBtn: document.querySelector('.btn-back-to-top'),
  footer: document.querySelector('.footer'),
});

export default getRefs;
