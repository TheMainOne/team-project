### `modalTeam.js`

```js
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

const iconGithub = `${sprite}#icon-github`;
const iconLinkedin = `${sprite}#icon-linkedin`;

// prettier-ignore
const info = [
  { name: 'Max', img: Max, github: 'https://github.com/TheMainOne', linkedIn: 'https://www.linkedin.com/in/maksym-lvov-390617202/', role: 'Team Lead' },
  { name: 'Anastasia', img: Anastasia_scrum, github: 'https://github.com/anastasia1756', linkedIn: 'http://linkedin.com/in/anastasiia-kolomiiets-frontend-developer', role: 'Scrum/Developer'},
  { name: 'Nataliia', img: Nataliia, github: 'https://github.com/Natatashkin', linkedIn: 'https://linkedin.com', role: 'Developer' },
  { name: 'Anastasia', img: Anastasia, github: 'https://github.com/Malogon-Anastasia', linkedIn: 'https://www.linkedin.com/in/anastasia-mal%D0%BEgon-835bb2207/', role: 'Developer' },
  { name: 'Julia', img: Julia, github: 'https://github.com', linkedIn: 'https://linkedin.com', role: 'Developer' },
  { name: 'Daryna', img: Daryna, github: 'https://github.com', linkedIn: 'https://linkedin.com', role: 'Developer' },
  { name: 'Alex', img: Alex, github: 'https://github.com/AlexKarb', linkedIn: 'https://linkedin.com', role: 'Developer' },
  { name: 'Alexey', img: Alexey, github: 'https://github.com/drdolgiy', linkedIn: 'https://linkedin.com', role: 'Developer' },
  { name: 'Dmitriy', img: Dmitriy, github: 'https://github.com/dimahalaiskiy/', linkedIn: 'https://linkedin.com', role: 'Developer' },
  { name: 'Kostiantyn', img: Kostiantyn, github: 'https://github.com/KostiantynO', linkedIn: 'https://www.linkedin.com/in/kostiantyn-ochenash-2840b1212/', role: 'Developer' },
];

const makeTeamMarkup = ({ name, img, github, linkedIn, role }) => `
   <li class="team__card">
      <img src="${img}" alt="${name}" class="team__image" loading="lazy" decoding="async" />
      <p class="team__name">${name}</p>
      <p class="team__role">${role}</p>

      <ul class="team__social list">
        <li class="team__icon">
          <a class="team__git" href="${github}" target="_blank" rel="noreferrer noopener nofollow"> <svg class="logo__icon"> <use href="${iconGithub}"></use> </svg> </a>
        </li>

        <li class="team__icon">
          <a class="team__git" href="${linkedIn}" target="_blank" rel="noreferrer noopener nofollow"> <svg class="logo__icon logo__icon-linkedin"> <use href="${iconLinkedin}"></use> </svg> </a>
        </li>
      </ul>
    </li>
`;

const markup = `
<div class="team-modal__content">
  <div class="title-wrapper">
    <a class="ref-git" href="https://github.com/TheMainOne/team-project" target="_blank" rel="noreferrer noopener nofollow" aria-label="Our Project">
      <img class="logo" src="https://goit.ua/wp-content/themes/2/images/Layer.png" alt="GoIt" width="274" height="398" loading="lazy" decoding="async"/>
    </a>
  </div>

  <ul class="team__wrapper list">
    ${info.map(makeTeamMarkup).join('')}
  </ul>
</div>
`;

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
```
