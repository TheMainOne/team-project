import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.min.css';

/*
const options = {
  template: {
    page: '<a href="#" class="tui-page-btn">{{page}}</a>',
    currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
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
      '</a>'
  }
};
 */

const initPagination = async ({ page, itemsPerPage, totalItems }) => {
  const options = {
    page,
    totalItems,
    itemsPerPage,
    visiblePages: 5,
    usageStatistics: false,
    centerAlign: false,
    firstItemClassName: 'tui-first-child',
    lastItemClassName: 'tui-last-child',

    template: {
      page: '<a href="#" class="tui-page-btn">{{page}}</a>',
      currentPage:
        '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',

      disabledMoveButton: `<span class="tui-page-btn tui-is-disabled tui-{{type}}">
                            <span class="tui-ico-{{type}}">{{type}}</span>
                          </span>`,
    },
  };

  const pagination = await new Pagination('pagination', options);
  console.log('pagination', pagination);
  return pagination;
};

export default initPagination;
