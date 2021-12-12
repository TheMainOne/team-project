import { videoapi } from './api-service';
import { notifyStatus, renderGallery, notifyOptions } from './init-gallery';
import { hidePagination, setPagination, showPagination } from './pagination';
import { Notify } from 'notiflix';
import getHeaderRefs from './get-header-refs';
import getRefs from './refs';
const { gallery } = getRefs();
const hRefs = getHeaderRefs();
const { info, warning } = Notify;
const { error } = console;
const image = document.querySelector('.notify-gif');

const onSubmitSearch = async e => {
  e.preventDefault();

  const target = e.target;
  const searchBtn = document.querySelector('.search-button');

  const isClickOnSubmitBtn =
    target === searchBtn ||
    target?.closest('.search-button')?.classList?.contains('.search-button');
  if (!isClickOnSubmitBtn) return;

  const input = document.querySelector('[name="searchQuery"]');
  const searchQuery = input.value.trim() || '';
  searchBtn.disabled = true;
  setTimeout(() => (searchBtn.disabled = false), 1000);

  if (!searchQuery || searchQuery.length === 0) {
    return info('Please, enter search query.', notifyOptions);
  }

  const { SEARCH } = videoapi.keys;

  videoapi.query = searchQuery;
  videoapi.type = SEARCH;

  try {
    const {
      page,
      results,
      total_pages: totalPages,
      total_results: totalResults,
    } = await videoapi.getVideos();

    if (totalResults === 0) {
      gallery.innerHTML = '';
      image.style.display = 'block';
      hidePagination();
      document.querySelector('.tui-pagination').classList.add('is-hidden');
      return warning('Sorry, found no results. Please try another query.');
    }

    setPagination(SEARCH, totalResults);
    showPagination();

    if (notifyStatus(results.length, page, totalResults)) return;

    gallery.dataset.gallery = 'search';
    await renderGallery(results);
    input.value = '';
  } catch (err) {
    error(err);
  }
};

export { onSubmitSearch };
