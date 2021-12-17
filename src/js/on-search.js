// prettier-ignore
import { notifyStatus, renderGallery, notifyOptions    } from './init-gallery';
import { Notify } from 'notiflix';
import { setPagination } from './pagination';
import { videoapi } from './api-service';
import getRefs from './refs';
import getHeaderRefs from './getHearedRefs';
import { onToggleRenderTrending } from './filters';
const { info, warning } = Notify;
const { error } = console;
const refs = getRefs();
const headerRefs = getHeaderRefs();

const onSubmitSearch = async e => {
  e.preventDefault();
  const target = e.target;

  const searchBtn = headerRefs.headerControlBox.querySelector('[name="submitSearch"]');

  const isClickOnSubmitBtn =
    target === searchBtn ||
    (target.nodeName !== 'BUTTON' && target?.closest('[name="submitSearch"]'));

  if (!isClickOnSubmitBtn) return;

  const input = headerRefs.headerControlBox.querySelector('[name="searchQuery"]');

  const searchQuery = input?.value?.trim() || '';
  searchBtn.disabled = true;
  setTimeout(() => (searchBtn.disabled = false), 1000);

  if (!searchQuery || searchQuery.length === 0) {
    return info('Please, enter search query.', notifyOptions);
  }
  const { SEARCH, TRENDING } = videoapi.keys;

  videoapi.query = searchQuery;
  videoapi.type = SEARCH;

  try {
    const { page, results, total_results: totalResults } = await videoapi.getVideos();

    input.value = '';
    refs.gallery.dataset.gallery = 'search';

    if (totalResults === 0) {
      warning('Sorry, no results. Please try another query!');
      headerRefs.trendingCheckbox.checked = 'true';
      await onToggleRenderTrending();
      return;
    }

    await setPagination(SEARCH, totalResults, 20);
    if (notifyStatus(results.length, page, totalResults)) return;

    await renderGallery(results);
  } catch (err) {
    error(err);
  }
};

export { onSubmitSearch };
