import { renderCard } from './init-gallery';
import getHeaderRefs from './getHearedRefs';
import { load } from './storage';
import './film-in-modal-window';
import getRefs from './refs';
import { videoapi } from './api-service';

const { QUEUE } = videoapi.keys;
const refs = getHeaderRefs();
const refGallery = getRefs();
const btnLibrary = document.querySelector(`[data-action="js-library"]`);

const loadQueue = load(QUEUE);
const perPage = 9;

btnLibrary.addEventListener('click', () => {
  refGallery.gallery.dataset.gallery = 'queue';
  document.querySelector('.tui-pagination').classList.add('is-hidden');
  if (loadQueue) {
    renderCard({ key: QUEUE, perPage });
  }
});

refs.headerControlBox.addEventListener('click', e => {
  if (e.target.dataset.action === 'queue') {
    refGallery.gallery.innerHTML = '';
    refGallery.gallery.dataset.gallery = 'queue';
    renderCard({ key: QUEUE, perPage });

    if (!loadQueue || loadQueue.length === 0) {
      document.querySelector('.tui-pagination').classList.add('is-hidden');
    }
  }
});
