import { renderGallery } from '..';
import getHeaderRefs from './getHearedRefs';
import { load } from './storage';
import './film-in-modal-window'
import getRefs from './refs';


const refs = getHeaderRefs();
const refGallery = getRefs();
const LOCAL_STORAGE_QUEUE = 'filmoteka-queue';




refs.headerControlBox.addEventListener("click", () => {
    const watched = load(LOCAL_STORAGE_QUEUE);
    renderGallery(watched);
    refGallery.gallery.dataset.gallery = "queue";
// console.log("~ refGallery.gallery", refGallery.gallery.dataset)
})


