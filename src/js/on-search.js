import { notifyStatus, renderGallery, notifyOptions } from './init-gallery';
import { Notify } from 'notiflix';
import { hidePagination, setPagination, showPagination } from './pagination';
import { videoapi } from './api-service';
import getRefs from './refs';
import getHeaderRefs from './getHearedRefs';
const { info, warning } = Notify;
const { log, error } = console;
const refs = getRefs();
const headerRefs = getHeaderRefs();
const image = document.querySelector('.notify-gif');

const onSubmitSearch = async e => {
  e.preventDefault();
  const target = e.target;

  const searchBtn = headerRefs.headerControlBox.querySelector(
    '[name="submitSearch"]',
  );

  const isClickOnSubmitBtn =
    target === searchBtn ||
    target?.closest('.search-button')?.classList?.contains('.search-button');

  if (!isClickOnSubmitBtn) return;

  const input = headerRefs.headerControlBox.querySelector(
    '[name="searchQuery"]',
  );

  const searchQuery = input?.value?.trim() || '';
  searchBtn.disabled = true;
  setTimeout(() => (searchBtn.disabled = false), 1000);

  if (!searchQuery || searchQuery.length === 0) {
    return info('Please, enter search query.', notifyOptions);
  }
  const { SEARCH } = videoapi.keys;

  videoapi.query = searchQuery;
  videoapi.type = videoapi.keys.SEARCH;

  try {
    const {
      page,
      results,
      total_pages: totalPages,
      total_results: totalResults,
    } = await videoapi.getVideos();

    if (totalResults === 0) {
      refs.gallery.innerHTML = '';
      image.style.display = 'block';
      return warning(
        'Sorry, there are no results found. Try searching for something else!',
      );
    }

    setPagination(SEARCH, totalResults);
    if (notifyStatus(results.length, page, totalResults)) return;

    refs.gallery.dataset.gallery = 'search';
    await renderGallery(results);
    showPagination();
    input.value = '';
  } catch (err) {
    error(err);
  }
};

export { onSubmitSearch };
