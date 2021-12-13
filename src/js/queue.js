import { renderCard } from './init-gallery';
import getHeaderRefs from './getHearedRefs';
import './film-in-modal-window';
import getRefs from './refs';
import { videoapi } from './api-service';
import { setFon } from './fon-library';

const { QUEUE } = videoapi.keys;
const refs = getHeaderRefs();
const refGallery = getRefs();
const btnLibrary = document.querySelector(`[data-action="js-library"]`);

const perPage = 9;

btnLibrary.addEventListener('click', renderQueue);

refs.headerControlBox.addEventListener('click', e => {
  if (e.target.dataset.action === 'queue') {
    renderQueue();
  }
});

function renderQueue() {
  refGallery.gallery.dataset.gallery = 'queue';
  // videoapi.type = QUEUE;
  setFon();
  renderCard({ key: QUEUE, perPage });
}
