import { renderCard } from './init-gallery';
import getHeaderRefs from './getHearedRefs';
import { load } from './storage';
import './film-in-modal-window'
import getRefs from './refs';
import { videoapi } from './api-service';


const {QUEUE} = videoapi.keys
const refs = getHeaderRefs();
const refGallery = getRefs();
const btnLibrary = document.querySelector(`[data-action="js-library"]`);

const loadQueue = load(QUEUE);
const perPage = 9;
    

btnLibrary.addEventListener("click", () => {
    if (loadQueue) {
        renderCard({ key: QUEUE, perPage});
        refGallery.gallery.dataset.gallery = "queue";
    }
})




refs.headerControlBox.addEventListener("click", (e) => {
    if (loadQueue && e.target.dataset.action === "queue") {
        renderCard({ key: QUEUE, perPage});
        refGallery.gallery.dataset.gallery = "queue";
    }
})



