### `header.js`

```js
videoapi.type = hasDataAttr;

`href="${iconSearch}"`;
```

### `index.js`

```js
import sprite from './images/svg/sprite.svg';
export { sprite };

import setPagination from './js/pagination';
import 'tui-pagination/dist/tui-pagination.min.css';

import initGallery from './js/init-gallery';

const notifyStatus = (videosCount, page, totalResults) => {
  if (videosCount < 1) {
    log(pagination?._view?._buttons);

    const disable = (...els) =>
      els.forEach(el => el.classList.add('is-hidden'));
    const { first, last, disabledFirst, disabledLast } =
      pagination?._view?._buttons;

    if (first && last && disabledFirst && disabledLast) {
      log(first && last && disabledFirst && disabledLast);

      disable(first, last, disabledFirst, disabledLast);
    }

    info('We found no videos for such query');
    return 1;
  }

  if (totalResults > 0 && page === 1) {
    return 0;
  }
};

const onSubmit = e => {
  e.preventDefault();
  // preloader.show();

  e.target.elements.submitSearch.disabled = true;
  setTimeout(() => (e.target.elements.submitSearch.disabled = false), 1000);
  log(e.target.elements);

  const search = e.target.elements.searchQuery.value.trim();

  if (search.length === 0) {
    // preloader.hide();
    return info('Please, enter search query.');
  }

  videoapi.query = search;

  /* page: 1, results: Array(20), total_pages: 1000, total_results: 20000 */
  const searchedVideos = videoapi.getVideos();
  searchedVideos
    .then(
      ({
        page,
        results,
        total_pages: totalPages,
        total_results: totalResults,
      }) => {
        setPagination('movies', totalPages);

        // console.log('res', page, results, totalPages, totalResults);

        // preloader.hide();
        if (notifyStatus(results.length, page, totalResults)) return;

        renderGallery(results);
      },
    )
    .catch(error);
};

setPagination('videos', totalPages); // doubledcheck!!!
setPagination('movies', totalPages);
```

### `init-gallery.js`

```js
import { videoapi } from './api-service';
import { notifyStatus, renderGallery } from '../index';
import setPagination from './pagination';
const { log, error } = console;

const initGallery = async () => {
  try {
    /* Response example:  page: 1, results: Array(20), total_pages: 1000, total_results: 20000 */
    // prettier-ignore
    const { page, results, total_pages: totalPages, total_results: totalResults } = await videoapi.getTrendingVideos();

    if (notifyStatus(results.length, page, totalResults)) {
      await setPagination(page, totalResults);
      return;
    }

    await Promise.all([
      renderGallery(results),
      setPagination(page, totalResults),
    ]);
  } catch (err) {
    error(err);
  }
};

export default initGallery;
```

### `gallery.scss`

```scss
.card__meta {
  contain: content;
  max-width: 100%;
  max-height: 3rem;
  padding: 0 5px 5px;
}
```

### tui-pagination.scsss

```scss
.tui-page-btn .tui-first.is-hidden,
.tui-page-btn .tui-first.is-hidden,
.tui-page-btn .tui-is-disabled .tui-first.is-hidden,
.tui-page-btn .tui-is-disabled .tui-last.is-hidden,
span.tui-page-btn:nth-child(1),
span.tui-page-btn:nth-child(10),
.tui-ico-last,
a.tui-page-btn.tui-last,
a.tui-page-btn:nth-child(1),
a.tui-page-btn:nth-child(11),
.tui-page-btn .tui-is-disabled .tui-last,
.tui-pagination .tui-next + .tui-last {
  display: none;
  background: none;
}
```

### `storage.js`

```js
const { error } = console;

const save = (key, obj) => {
  try {
    localStorage.setItem(key, JSON.stringify(obj));
  } catch (err) {
    error('Set state error: ', err);
  }
};

const load = key => {
  try {
    const isStored = localStorage.getItem(key);
    return isStored ? JSON.parse(isStored) : undefined;
  } catch (err) {
    error('Get state error: ', err);
  }
};

export { save, load };
```

### `pagination.js`

```
import { renderGallery, sprite } from '../index';
import { videoapi } from './api-service';
const { log, error } = console;

const iconDots = `${sprite}#icon-dots`;
const iconArrow = `${sprite}#icon-arrow`;


const options = {
  page: 1,

  totalItems: 0,

  itemsPerPage: 20,

  visiblePages: 5,

  centerAlign: true,

  usageStatistics: false,

  firstItemClassName: 'tui-first-child',

  lastItemClassName: 'tui-last-child',

  template: {
    page: '<a href="#" class="tui-page-btn">{{page}}</a>',

    currentPage:
      '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',

    moveButton:
      '<a href="#" class="tui-page-btn tui-{{type}}">' +
      `<svg class="tui-ico-{{type}}"><use href="${iconArrow}-{{type}}"></use></svg>` +
      '</a>',

    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</span>',

    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
      `<svg class="tui-ico-ellip"><use href="${iconDots}"></use></svg>` +
      '</a>',
  },
};

const containerID = 'pagination';
const pagination = new Pagination(containerID, options);

pagination.on('afterMove', async ({ page }) => {
  videoapi.page = page;

  switch (videoapi.type) {
    case 'trendingVideosWeek': {
      videoapi.period = 'week';
      const { results } = await videoapi.getTrendingVideos();
      renderGallery(results);
      break;
    }
    case 'trendingVideosDay': {
      videoapi.period = 'day';
      const { results } = await videoapi.getTrendingVideos();
      renderGallery(results);
      break;
    }
    case 'videos': {
      const { results } = await videoapi.getVideos();
      renderGallery(results);
      break;
    }
    default:
      return;
  }
});

const setPagination = async (type, totalPages) => {
  videoapi.type = type;
  pagination.reset(totalPages);
  pagination.movePageTo(1);
};

export default setPagination;

```

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
