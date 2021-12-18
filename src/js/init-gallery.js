import galleryCardTemplate from './gallery-card-template';
import { videoapi } from './api-service';
import { forPaginationFilter, setPagination } from './pagination';
import getRefs from './refs';
import { load } from './storage';
import { hideGif } from './fon-library';
import { changeCardsTitle } from './change-theme';
import { deleteCanvas } from './library';
import { listenTrendingToggle, onToggleRenderTrending } from './filters';
const refs = getRefs();
const { error } = console;

const notifyStatus = (videosCount, page, totalResults) => {
  if (videosCount < 1) {
    return 1;
  }

  if (totalResults > 0 && page === 1) {
    hideGif();
    deleteCanvas();
    return 0;
  }
};

const flatKeys = Object.values(videoapi.keys).flatMap(value =>
  typeof value === 'object' && value !== null ? Object.keys(value).map(key => value[key]) : value,
);

const renderGallery = async results => {
  try {
    refs.gallery.innerHTML = '';
    if (!results || !results.length) {
      return;
    }
    const string = await Promise.all(results?.map(galleryCardTemplate));
    const galleryMarkup = string.join('');

    refs.gallery.innerHTML = galleryMarkup;

    const checkTypeAndSaveResults = () => {
      for (const key of flatKeys) {
        if (videoapi.type !== key) continue;
        videoapi.rendered[key] = results;
        console.log('checkTypeAndSaveResults ~ key', key);
        console.log('checkTypeAndSaveResults ~ videoapi.rendered[key]', videoapi.rendered[key]);

        return videoapi.rendered[key];
      }
    };
    checkTypeAndSaveResults();
    // if (videoapi.type === TRENDING.WEEK) {
    //   videoapi.rendered[TRENDING.WEEK] = results;
    // }
    // if (videoapi.type === TRENDING.DAY) {
    //   videoapi.rendered[TRENDING.DAY] = results;
    // }
    // if (videoapi.type === SEARCH) {
    //   videoapi.rendered[SEARCH] = results;
    // }

    await changeCardsTitle();
  } catch (err) {
    error(err);
  }
};

const renderTrendingVideos = async ({ key }) => {
  videoapi.type = key;
  videoapi.page = 1;

  const perPage = 20;
  try {
    const { page, results, total_results: totalResults } = await videoapi.getTrendingVideos();
    if (notifyStatus(results.length, page, totalResults)) return;
    await setPagination(key, totalResults, perPage);
    await renderGallery(results);
  } catch (err) {
    error(err);
  }
};

const initGallery = async () => {
  onToggleRenderTrending();
  listenTrendingToggle();
};

const renderCard = async ({ key, perPage = 9 }) => {
  videoapi.type = key; // Это надо для пагинации. Без этого она не работает, потому что 1 экземпляр
  const { page } = videoapi;

  const loadedLS = load(key);
  const loadStorage = loadedLS?.results ? loadedLS.results : loadedLS;

  const filteredArray = forPaginationFilter(loadStorage, perPage, page); // Это надо для 9 карточек в Queue и Watched.
  // let currentPage = 1;
  // currentPage = pagination.getCurrentPage();

  await setPagination(key, loadStorage?.length, perPage);
  await renderGallery(filteredArray);

  // надо условие
  // pagination.movePageTo(currentPage);
  // pagination.reset();
};

export { notifyStatus, renderGallery, initGallery, renderCard, renderTrendingVideos };
