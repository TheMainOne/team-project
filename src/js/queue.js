import {  renderGallery } from './init-gallery';
import getHeaderRefs from './getHearedRefs';
import { load } from './storage';
import './film-in-modal-window'
import getRefs from './refs';


const refs = getHeaderRefs();
const refGallery = getRefs();
const LOCAL_STORAGE_QUEUE = 'filmoteka-queue';

const btnLibrary = document.querySelector(`[data-action="js-library"]`);

btnLibrary.addEventListener("click", () => {
    if (load(LOCAL_STORAGE_QUEUE)) {
        renderCard()
    }


})

refs.headerControlBox.addEventListener("click", (e) => {

    if (load(LOCAL_STORAGE_QUEUE) && e.target.dataset.action === "queue") {
        renderCard()
    }
})

function renderCard() {
    renderGallery(load(LOCAL_STORAGE_QUEUE));
    refGallery.gallery.dataset.gallery = "queue";
}
