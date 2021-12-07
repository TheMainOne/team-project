import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.min.css';
import { renderGallery, sprite } from '../index';
import { videoapi } from './api-service';
const { log, error } = console;

const iconDots = `${sprite}#icon-dots`;
const iconArrow = `${sprite}#icon-arrow`;

/*
.tui-pagination .tui-ico-ellip,
.tui-pagination .tui-ico-first,
.tui-pagination .tui-ico-last,
.tui-pagination .tui-ico-next,
.tui-pagination .tui-ico-prev */

const initPagination = async ({ page, itemsPerPage, totalItems }) => {
  const options = {
    page,

    totalItems,

    itemsPerPage,

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

  const pagination = await new Pagination('pagination', options);

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

  return pagination;
};

export default initPagination;
