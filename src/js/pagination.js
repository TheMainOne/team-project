import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.min.css';
import { renderGallery, videoapi } from '../index';

const { log, error } = console;

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
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
        '</a>',

      disabledMoveButton:
        '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
        '</span>',

      moreButton:
        '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
        '<span class="tui-ico-ellip">...</span>' +
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
  log('pagination', pagination);


  return pagination;
};

export default initPagination;
