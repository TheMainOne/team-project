const refs = {
  topNavBox: document.querySelector('[data-action-controls]'),
  homeBtn: document.querySelector('[data-action="js-home"]'),
  libraryBtn: document.querySelector('[data-action="js-library"]'),
};

refs.topNavBox.addEventListener('click', onTopNavBtnClick);
function onTopNavBtnClick(e) {
  const nextButton = e.target;

  if (!nextButton.dataset.action) return;

  const prevButton = refs.topNavBox.querySelector('.is-active');
  if (prevButton) {
    prevButton.classList.remove('is-active');
  }

  nextButton.classList.add('is-active');
}
