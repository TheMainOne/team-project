export default function getHeaderRefs() {
  return {
    headerBackground: document.querySelector('.js-header'),
    navbar: document.querySelector('[data-action-controls]'),
    homeBtn: document.querySelector('[data-action="js-home"]'),
    libraryBtn: document.querySelector('[data-action="js-library"]'),
    headerControlBox: document.querySelector('[data-header-controls]'),
    trendingCheckbox: document.querySelector('[data-trending-checkbox]'),
    trendingLabel: document.querySelector('[data-trending-label]'),
    filtersContainer: document.querySelector('[data-filters]'),
  };
}
