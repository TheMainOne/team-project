import { renderGallery } from '..';
import getHeaderRefs from './getHearedRefs';
import { load } from './storage';
import './film-in-modal-window'
const refs = getHeaderRefs();
const libraryBtn = document.querySelector(`[data-action="js-library"]`);


refs.headerControlBox.addEventListener("click", (e)=>{
    
    if (e.target.dataset.action === "queue" && load('filmoteka-queue')) {
        renderCard();
    }
})

libraryBtn.addEventListener("click", ()=>{
    if (load('filmoteka-queue')) { 
    renderCard();
    }
})

function renderCard() {
   renderGallery(load('filmoteka-queue'));
}


// добавь везде потом
    // refGallery.gallery.dataset.gallery = "queue";
