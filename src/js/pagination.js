import Pagination from 'tui-pagination';
import { videoapi } from './api-service';
import { renderGallery } from './init-gallery';

import { sprite } from '../index';
const iconDots = `${sprite}#icon-dots`;
const iconArrow = `${sprite}#icon-arrow`;

/*
.tui-pagination .tui-ico-ellip,
.tui-pagination .tui-ico-first,
.tui-pagination .tui-ico-last,
.tui-pagination .tui-ico-next,
.tui-pagination .tui-ico-prev */

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
    removeDOM([...document.querySelectorAll('.tui-page-btn')]);
    return;
  }

  removeDOM([first, last, disabledFirst, disabledLast]);
};

// delete pagination._view._buttons.first;
// delete pagination._view._buttons.last;
// delete pagination._view._buttons.disabledFirst;
// delete pagination._view._buttons.disabledLast;

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

export { setPagination, removeTuiButtons };
