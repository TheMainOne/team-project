import { renderCard } from './init-gallery';
import getHeaderRefs from './getHearedRefs';
import './film-in-modal-window';
import getRefs from './refs';
import { videoapi } from './api-service';
import { setFon } from './fon-library';
import { hideCarousels } from './carousel';

const { QUEUE } = videoapi.keys;
const refs = getHeaderRefs();
const refGallery = getRefs();
// const btnLibrary = document.querySelector(`[data-action="js-library"]`);

const perPage = 9;

// btnLibrary.addEventListener('click', renderQueue);

refs.headerControlBox.addEventListener('click', e => {
  if (e.target.dataset.action === 'queue') {
    renderQueue();
    hideCarousels();
  }
});

async function renderQueue() {
  refGallery.gallery.dataset.gallery = 'queue';
  videoapi.type = QUEUE;
  videoapi.page = 1;
  setFon();
  await renderCard({ key: QUEUE, perPage });
}
