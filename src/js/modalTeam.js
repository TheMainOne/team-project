import * as basicLightbox from 'basiclightbox';

import Max from '../images/team/Max.jpg';
import Anastasia_scrum from '../images/team/Anastasia_scrum.jpg';
import Nataliia from '../images/team/Nataliia.jpg';
import Anastasia from '../images/team/Anastasia.jpg';
import Alex from '../images/team/Alex.jpg';
import Alexey from '../images/team/Alexey.jpg';
import Julia from '../images/team/Julia.jpg';
import Daryna from '../images/team/Daryna.jpg';
import Kostiantyn from '../images/team/Kostiantyn.jpg';
import Dmitriy from '../images/team/Dmitriy.jpg';
import { sprite } from '../index';

const container = document.querySelector('.team__modal');

const markup = `<ul class="team__wrapper">
<div class="title-wrapper">
<a class="ref-git" href="https://github.com/TheMainOne/team-project" target="blank" rel="noreferrer noopener" arai-label="Our Project">
<img class="logo" src="https://goit.ua/wp-content/themes/2/images/Layer.png" alt="GoIt" loading="lazy" width="274" height="398">
</a>
</div>
<li class="team__card list">
<img src="${Max}" alt="Max" class="team__image">
    <p class="team__name">Max</p>
    <p class="team__role">Team Lead </p>
    <ul class="team__social">
 <li class="team__icon list"><a class="team__git" href="https://github.com/TheMainOne" target="_blank"><svg
                         type="image/svg+xml" class="logo__icon" width="16" height="16" style="fill: black">
                         <use type="image/svg+xml" href="${sprite}#icon-github"></use>
                     </svg></a></li>
            <li class="team__icon list"><a class="team__git" href="https://www.linkedin.com/in/maksym-lvov-390617202/" target="_blank"><svg
                         type="image/svg+xml" class="logo__icon" width="16" height="16" style=" fill: rgba(66, 114, 247, 0.993)">
                         <use type="image/svg+xml" type="image/svg+xml" href="${sprite}#icon-linkedin"></use>
                     </svg></a></li>
         </ul>
    </li>
    <li class="team__card">
    <img src="${Anastasia_scrum}" alt="Anastasia" class="team__image">
         <p class="team__name">Anastasia</p>
        <p class="team__role">Scrum/Developer</p>
        <ul class="team__social">
   <li class="team__icon list"><a class="team__git" href="https://github.com/anastasia1756" target="_blank"><svg
                         type="image/svg+xml" class="logo__icon" width="16" height="16" style="fill: black">
                         <use type="image/svg+xml" href="${sprite}#icon-github"></use>
                     </svg></a></li>
             <li class="team__icon list"><a class="team__git" href="http://linkedin.com/in/anastasiia-kolomiiets-frontend-developer" target="_blank"><svg
                         type="image/svg+xml" class="logo__icon" width="16" height="16" style=" fill: rgba(66, 114, 247, 0.993)">
                         <use type="image/svg+xml" type="image/svg+xml" href="${sprite}#icon-linkedin"></use>
                     </svg></a></li>

        </ul>
        </li>
        <li class="team__card">
    <img src="${Nataliia}" alt="Nataliia" class="team__image">
         <p class="team__name">Nataliia</p>
        <p class="team__role">Developer</p>
        <ul class="team__social">
             <li class="team__icon list"><a class="team__git" href="https://github.com/Natatashkin" target="_blank"><svg
                         type="image/svg+xml" class="logo__icon" width="16" height="16" style="fill: black">
                         <use type="image/svg+xml" href="${sprite}#icon-github"></use>
                     </svg></a></li>
             <li class="team__icon list"><a class="team__git" href="https://linkedin.com" target="_blank"><svg
                         type="image/svg+xml" class="logo__icon" width="16" height="16" style=" fill: rgba(66, 114, 247, 0.993)">
                         <use type="image/svg+xml" type="image/svg+xml" href="${sprite}#icon-linkedin"></use>
                     </svg></a></li>

        </ul>
        </li>
        <li class="team__card">
    <img src="${Anastasia}" alt="Anastasia" class="team__image">
         <p class="team__name">Anastasia</p>
        <p class="team__role">Developer</p>
        <ul class="team__social">
             <li class="team__icon list"><a class="team__git" href="https://github.com/Malogon-Anastasia" target="_blank"><svg
                         type="image/svg+xml" class="logo__icon" width="16" height="16" style="fill: black">
                         <use type="image/svg+xml" href="${sprite}#icon-github"></use>
                    </svg></a></li>
             <li class="team__icon list"><a class="team__git" href="https://www.linkedin.com/in/anastasia-mal%D0%BEgon-835bb2207/" target="_blank"><svg
                         type="image/svg+xml" class="logo__icon" width="16" height="16" style=" fill: rgba(66, 114, 247, 0.993)">
                         <use type="image/svg+xml" type="image/svg+xml" href="${sprite}#icon-linkedin"></use>
                     </svg></a></li>

         </ul>
        </li>
        <li class="team__card">
    <img src="${Julia}" alt="Julia" class="team__image">
         <p class="team__name">Julia</p>
        <p class="team__role">Developer</p>
        <ul class="team__social">
                   <li class="team__icon list"><a class="team__git" href="https://github.com" target="_blank"><svg
                               type="image/svg+xml" class="logo__icon" width="16" height="16" style="fill: black">
                               <use type="image/svg+xml" href="${sprite}#icon-github"></use>
                           </svg></a></li>
                <li class="team__icon list"><a class="team__git" href="https://linkedin.com" target="_blank"><svg
                               type="image/svg+xml" class="logo__icon" width="16" height="16" style=" fill: rgba(66, 114, 247, 0.993)">
                                <use type="image/svg+xml" type="image/svg+xml" href="${sprite}#icon-linkedin"></use>
                            </svg></a></li>

               </ul>
        </li>
        <li class="team__card">
    <img src="${Daryna}" alt="Daryna" class="team__image">
         <p class="team__name">Daryna</p>
        <p class="team__role">Developer</p>
        <ul class="team__social">
                   <li class="team__icon list"><a class="team__git" href="https://github.com" target="_blank"><svg
                               type="image/svg+xml" class="logo__icon" width="16" height="16" style="fill: black">
                               <use type="image/svg+xml" href="${sprite}#icon-github"></use>
                           </svg></a></li>
                <li class="team__icon list"><a class="team__git" href="https://linkedin.com" target="_blank"><svg
                               type="image/svg+xml" class="logo__icon" width="16" height="16" style=" fill: rgba(66, 114, 247, 0.993)">
                                <use type="image/svg+xml" type="image/svg+xml" href="${sprite}#icon-linkedin"></use>
                            </svg></a></li>

               </ul>
        </li>
        <li class="team__card">
    <img src="${Alex}" alt="Alex" class="team__image">
         <p class="team__name">Alex</p>
        <p class="team__role">Developer</p>
        <ul class="team__social">
                   <li class="team__icon list"><a class="team__git" href="https://github.com/AlexKarb" target="_blank"><svg
                               type="image/svg+xml" class="logo__icon" width="16" height="16" style="fill: black">
                               <use type="image/svg+xml" href="${sprite}#icon-github"></use>
                           </svg></a></li>
                <li class="team__icon list"><a class="team__git" href="https://linkedin.com" target="_blank"><svg
                               type="image/svg+xml" class="logo__icon" width="16" height="16" style=" fill: rgba(66, 114, 247, 0.993)">
                                <use type="image/svg+xml" type="image/svg+xml" href="${sprite}#icon-linkedin"></use>
                            </svg></a></li>

               </ul>
        </li>
        <li class="team__card">
    <img src="${Alexey}" alt="Alexey" class="team__image">
         <p class="team__name">Alexey</p>
        <p class="team__role">Developer</p>
        <ul class="team__social">
                   <li class="team__icon list"><a class="team__git" href="https://github.com/drdolgiy" target="_blank"><svg
                               type="image/svg+xml" class="logo__icon" width="16" height="16" style="fill: black">
                               <use type="image/svg+xml" href="${sprite}#icon-github"></use>
                           </svg></a></li>
                <li class="team__icon list"><a class="team__git" href="https://linkedin.com" target="_blank"><svg
                               type="image/svg+xml" class="logo__icon" width="16" height="16" style=" fill: rgba(66, 114, 247, 0.993)">
                                <use type="image/svg+xml" type="image/svg+xml" href="${sprite}#icon-linkedin"></use>
                            </svg></a></li>

               </ul>
        </li>
        <li class="team__card">
    <img src="${Dmitriy}" alt="Dmitriy" class="team__image">
         <p class="team__name">Dmitriy</p>
        <p class="team__role">Developer</p>
        <ul class="team__social">
                   <li class="team__icon list"><a class="team__git" href="https://github.com/dimahalaiskiy/" target="_blank"><svg
                               type="image/svg+xml" class="logo__icon" width="16" height="16" style="fill: black">
                               <use type="image/svg+xml" href="${sprite}#icon-github"></use>
                           </svg></a></li>
                <li class="team__icon list"><a class="team__git" href="https://linkedin.com" target="_blank"><svg
                               type="image/svg+xml" class="logo__icon" width="16" height="16" style=" fill: rgba(66, 114, 247, 0.993)">
                                <use type="image/svg+xml" type="image/svg+xml" href="${sprite}#icon-linkedin"></use>
                            </svg></a></li>

               </ul>
        </li>
        <li class="team__card">
    <img src="${Kostiantyn}" alt="Kostiantyn" class="team__image">
         <p class="team__name">Kostiantyn</p>
        <p class="team__role">Developer</p>
        <ul class="team__social">
                   <li class="team__icon list"><a class="team__git" href="https://github.com/KostiantynO" target="_blank"><svg
                               type="image/svg+xml" class="logo__icon" width="16" height="16" style="fill: black">
                               <use type="image/svg+xml" href="${sprite}#icon-github"></use>
                           </svg></a></li>
                <li class="team__icon list"><a class="team__git" href="https://linkedin.com" target="_blank"><svg
                               type="image/svg+xml" class="logo__icon" width="16" height="16" style=" fill: rgba(66, 114, 247, 0.993)">
                                <use type="image/svg+xml" type="image/svg+xml" class="linkedin" href="${sprite}#icon-linkedin"></use>
                            </svg></a></li>

               </ul>
        </li>
        </ul>`;

const modal = basicLightbox.create(markup);
container.addEventListener('click', openModal);

function openModal(e) {
  modal.show();
  window.addEventListener('keydown', closeModalHandler);

  function closeModalHandler(e) {
    if (e.code === 'Escape') {
      modal.close();
      window.removeEventListener('keydown', closeModalHandler);
    }
  }
}
