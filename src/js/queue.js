import {  renderGallery } from './init-gallery';
import getHeaderRefs from './getHearedRefs';
import { load } from './storage';
import './film-in-modal-window'
import getRefs from './refs';
import { videoapi } from './api-service';

const {QUEUE} = videoapi.keys
const refs = getHeaderRefs();
const refGallery = getRefs();
const btnLibrary = document.querySelector(`[data-action="js-library"]`);



btnLibrary.addEventListener("click", () => {
    if (load(QUEUE)) {
        renderCard()
    }
})

refs.headerControlBox.addEventListener("click", (e) => {
    if (load(QUEUE) && e.target.dataset.action === "queue") {
        renderCard()
    }
})


export default function renderCard() {
    renderGallery(load(QUEUE));
    refGallery.gallery.dataset.gallery = "queue";
}
