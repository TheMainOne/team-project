import Pagination from 'tui-pagination';
import { videoapi } from './api-service';
import { renderGallery } from './init-gallery';
import { theme, onPageThemeToggle } from './change-theme';

import { sprite } from '../index';
import { load } from './storage';
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
    page: `<a href="#" class="tui-page-btn page-symbol ${
      theme ? 'dark-theme' : 'light-theme'
    }">{{page}}</a>`,

    currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',

    moveButton:
      `<a href="#" class="tui-page-btn tui-{{type}}">` +
      `<svg class="tui-ico-{{type}} page-symbol ${
        theme ? 'dark-theme' : 'light-theme'
      }"><use href="${iconArrow}-{{type}}"></use></svg>` +
      '</a>',

    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</span>',

    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
      `<svg class="tui-ico-ellip page-symbol ${
        theme ? 'dark-theme' : 'light-theme'
      }"><use href="${iconDots}"></use></svg>` +
      '</a>',
  },
};
const containerID = 'pagination';
const pagination = new Pagination(containerID, options);

const removeDOM = async els => els.map(el => el.remove());

const removeTuiButtons = async resultsLength => {
  const { first, last, disabledFirst, disabledLast } = pagination._view._buttons;

  if (resultsLength < 1) {
    removeDOM([...document.querySelectorAll('.tui-page-btn')]);
    return;
  }

  removeDOM([first, last, disabledFirst, disabledLast]);
};

const showPagination = () => {
  document.querySelector('.tui-pagination').classList.remove('is-hidden');
};
const hidePagination = () => {
  document.querySelector('.tui-pagination').classList.add('is-hidden');
};

hidePagination();

const forPaginationFilter = (array, perPage) => {
  const { page } = videoapi;
  return array?.filter((item, index) => index < perPage * page && index >= perPage * (page - 1));
};

const onPaginationClick = async ({ page }) => {
  videoapi.page = page;
  const perPage = 9;
  onPageThemeToggle();

  const { TRENDING, SEARCH, WATCHED, QUEUE } = videoapi.keys;

  switch (videoapi.type) {
    case TRENDING.WEEK: {
      videoapi.period = 'week';
      const { results } = await videoapi.getTrendingVideos();
      await renderGallery(results);
      break;
    }
    case TRENDING.DAY: {
      videoapi.period = 'day';
      const { results } = await videoapi.getTrendingVideos();
      await renderGallery(results);
      break;
    }
    case SEARCH: {
      const { results } = await videoapi.getVideos();
      await renderGallery(results);
      break;
    }
    case WATCHED: {
      const filteredWatched = forPaginationFilter(load(WATCHED), perPage);
      const renderedWatchedOnPaginationClick = await renderGallery(filteredWatched);
      break;
    }
    case QUEUE: {
      const filteredQueue = forPaginationFilter(load(QUEUE), perPage);
      const renderedQueueOnPaginationClick = await renderGallery(filteredQueue);
      break;
    }
    default:
      return;
  }
};

const listenPaginationClick = () => {
  pagination.on('afterMove', onPaginationClick);
};

const setPagination = async (type, totalItems = 0, perPage = 20) => {
  videoapi.type = type;
  videoapi.page = 1;

  if (!totalItems || totalItems <= perPage) {
    pagination.reset(totalItems);
    pagination.setItemsPerPage(perPage);
    pagination.movePageTo(1);
    hidePagination();
  } else {
    pagination.reset(totalItems);
    pagination.setItemsPerPage(perPage);

    pagination.movePageTo(1);
    showPagination();
  }
};

export {
  setPagination,
  removeTuiButtons,
  listenPaginationClick,
  pagination,
  forPaginationFilter,
  showPagination,
  hidePagination,
};
