import Pagination from 'tui-pagination';
import { videoapi } from './api-service';
import { renderGallery } from './init-gallery';

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

const removeDOM = async els => els.map(el => el.remove());

const removeTuiButtons = async resultsLength => {
  const { first, last, disabledFirst, disabledLast } =
    pagination._view._buttons;

  if (resultsLength < 1) {
    document.querySelectorAll('.tui-page-btn').forEach(el => el.remove());
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

const forPaginationFilter = (array, perPage) => {
  const { page } = videoapi;
  return array?.filter(
    (item, index) => index >= perPage * (page - 1) && index < perPage * page,
  );
};

const onPaginationClick = async ({ page }) => {
  videoapi.page = page;
  const perPage = 9;

  const { TRENDING, SEARCH, WATCHED, QUEUE } = videoapi.keys;

  switch (videoapi.type) {
    case TRENDING.WEEK: {
      videoapi.period = 'week';
      const { results } = await videoapi.getTrendingVideos();
      renderGallery(results);
      break;
    }
    case TRENDING.DAY: {
      videoapi.period = 'day';
      const { results } = await videoapi.getTrendingVideos();
      renderGallery(results);
      break;
    }
    case SEARCH: {
      const { results } = await videoapi.getVideos();
      renderGallery(results);
      break;
    }
    case WATCHED: {
      const filteredWatched = forPaginationFilter(load(WATCHED), perPage);
      renderGallery(filteredWatched);
      break;
    }
    case QUEUE: {
      const filteredQueue = forPaginationFilter(load(QUEUE), perPage);
      renderGallery(filteredQueue);
      break;
    }
    default:
      return;
  }
};

const listenPaginationClick = () => {
  pagination.on('afterMove', onPaginationClick);
};

const setPagination = (type, items = 0, perPage = 20) => {
  videoapi.type = type;
  console.log({ items, type: videoapi.type, perPage });
  if (!items || items === 0 || items.length === 0) {
    pagination.reset(0);
    pagination.setItemsPerPage(perPage);
    pagination.movePageTo(1);
    hidePagination();
  }

  if (items >= perPage) {
    pagination.reset(items);
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
