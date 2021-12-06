import getRefs from './refs';
import tingle from "tingle.js";
import 'tingle.js/src/tingle.css'
import { markup } from './markup-of-modal';

const refs = getRefs();





var modal = new tingle.modal({
        footer: false,
    stickyFooter: false,
    closeMethods: ['overlay', 'escape'],
    closeLabel: "Close",
    cssClass: ['custom-class-1','custom-class-2'],
    // onOpen: function() {
    //     console.log('modal open');
    // },
    // onClose: function() {
    //     console.log('modal closed');
    // },
    // beforeClose: function () {
       
    //     return true; 
       
    // }
});
        
refs.gallery.addEventListener("click", (event) => {
    if (event.target.nodeName !== "IMG") {
        return
    }
    modal.setContent(markup);
    modal.open();
    onCloseModal();
})

function onCloseModal() {
    const btnClose = document.querySelector(".btnClose");
    btnClose.addEventListener("click", () => {
        modal.close();
})
}
