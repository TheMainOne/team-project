import { renderCard } from './init-gallery';
import getHeaderRefs from './get-header-refs';
import { load } from './storage';
import './film-in-modal-window';
import getRefs from './refs';
import { videoapi } from './api-service';
import { fonLibrary } from './fon-library';
import { setBgSnow, deleteCanvas } from './library';

const { QUEUE, WATCHED } = videoapi.keys;
const refs = getHeaderRefs();
const refGallery = getRefs();
const btnLibrary = document.querySelector(`[data-action="js-library"]`);

const perPage = 9;

btnLibrary.addEventListener('click', () => {
  const loadQueue = load(QUEUE);
  refGallery.gallery.dataset.gallery = 'queue';

  // if (loadQueue) {
  //   renderCard({ key: QUEUE, perPage });
  //   document.querySelector('.tui-pagination').classList.remove('is-hidden');
  // }
  if (!loadQueue || loadQueue.length === 0) {
    if (load(WATCHED) && load(WATCHED).length > 0) {
      renderCard({ key: QUEUE, perPage });
      document.querySelector('.tui-pagination').classList.add('is-hidden');
      refGallery.gallery.innerHTML = fonLibrary();
    }
  }
});

refs.headerControlBox.addEventListener('click', e => {
  const loadQueue = load(QUEUE);
  if (e.target.dataset.action === 'queue') {
    refGallery.gallery.innerHTML = '';
    refGallery.gallery.dataset.gallery = 'queue';

    if (loadQueue) {
      renderCard({ key: QUEUE, perPage });

      document.querySelector('.tui-pagination').classList.remove('is-hidden');
    }

    if (!loadQueue || loadQueue.length === 0) {
      document.querySelector('.tui-pagination').classList.add('is-hidden');
      if (load(WATCHED) && load(WATCHED).length > 0) {
        refGallery.gallery.innerHTML = fonLibrary();
      } else {
        deleteCanvas();
        refGallery.gallery.innerHTML = setBgSnow();
      }
    }
  }
});
