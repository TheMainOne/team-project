import getRefs from './refs';
import getHeaderRefs from './getHearedRefs';
import { Notify } from 'notiflix';
import { videoapi } from './api-service';
import { setPagination } from './pagination';
import { onToggleRenderTrending } from './filters';
import { notifyStatus, renderGallery } from './init-gallery';

const { info, warning, success } = Notify;
const notifyOptions = time => ({
  timeout: time,
  clickToClose: true,
  showOnlyTheLastOne: true,
  fontSize: '14px',
});

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
    return info('Please, enter search query.', notifyOptions(2000));
  }
  const { SEARCH } = videoapi.keys;

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

export { onSubmitSearch, info, warning, success, notifyOptions };
