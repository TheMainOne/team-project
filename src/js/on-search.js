import { notifyStatus, renderGallery, notifyOptions } from './init-gallery';
import { Notify } from 'notiflix';
import { videoapi } from './api-service';
import getRefs from './refs';
import getHeaderRefs from './getHearedRefs';
import { setPagination } from './pagination';
const { info } = Notify;
const { log, error } = console;
const refs = getRefs();
const headerRefs = getHeaderRefs();
const image = document.querySelector('.notify-gif');

const onSubmitSearch = async e => {
  e.preventDefault();
  try {
    const target = e.target;

    const input = headerRefs.headerControlBox.querySelector(
      '[name="searchQuery"]',
    );

    const form = headerRefs.headerControlBox.querySelector(
      '[data-action="js-form"]',
    );

    if (target === input || target === form) return;

    const searchButton = headerRefs.headerControlBox.querySelector(
      '[name="submitSearch"]',
    );

    let searchQuery = null;
    if (searchButton === target || target.closest('[name="submitSearch"]')) {
      searchQuery = input.value.trim();

      searchButton.disabled = true;
      setTimeout(() => (searchButton.disabled = false), 1000);
    }

    if (!searchQuery || searchQuery.length === 0) {
      return info('Please, enter search query.', notifyOptions);
    }

    videoapi.query = searchQuery;
    videoapi.type = videoapi.keys.SEARCH;

    /* page: 1, results: Array(20), total_pages: 1000, total_results: 20000 */
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
        'Sorry, there no results found. Try searching for something else!',
      );
    }

    setPagination(videoapi.keys.SEARCH, totalPages);

    console.log('res', page, results, totalPages, totalResults);

    if (notifyStatus(results.length, page, totalResults)) return;

    refs.gallery.dataset.gallery = 'search';
    await renderGallery(results);
  } catch (err) {
    error(err);
  }
};

export { onSubmitSearch };
