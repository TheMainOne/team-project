import { renderCard } from './init-gallery';
import getHeaderRefs from './getHearedRefs';
import { load } from './storage';
import './film-in-modal-window';
import getRefs from './refs';
import { videoapi } from './api-service';
import { fonLibrary } from './fon-library';

const { QUEUE, WATCHED } = videoapi.keys;
const refs = getHeaderRefs();
const refGallery = getRefs();
const btnLibrary = document.querySelector(`[data-action="js-library"]`);

const perPage = 9;

btnLibrary.addEventListener('click', () => {
  const loadQueue = load(QUEUE);
  refGallery.gallery.dataset.gallery = 'queue';

  if (loadQueue && Object.keys(loadQueue).length > 0) {
    renderCard({ key: QUEUE, perPage });
    document.querySelector('.tui-pagination').classList.remove('is-hidden');
  }
  if (!loadQueue) {
    document.querySelector('.tui-pagination').classList.add('is-hidden');
    if (load(WATCHED)) {
      console.log(load(WATCHED));
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
      if (load(WATCHED)) {
        console.log(load(WATCHED));
        refGallery.gallery.innerHTML = fonLibrary();
      }
    }
  }
});
