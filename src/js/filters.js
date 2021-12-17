import { videoapi } from './api-service';
import getHeaderRefs from './getHearedRefs';
import { renderTrendingVideos } from './init-gallery';
const headerRefs = getHeaderRefs();
const { TRENDING } = videoapi.keys;

const onToggleRenderTrending = async () => {
  videoapi.page = 1;
  const labelText = headerRefs.filtersContainer.querySelectorAll(
    '.trending-toggle .filters__label-text',
  );
  const toggleSlider = headerRefs.trendingLabel.querySelector('.filters__label-slider');

  const daily = labelText[0]?.clientWidth + 18;
  const weekly = labelText[1]?.clientWidth + 14;
  const isDaily = headerRefs.trendingCheckbox.checked;

  if (isDaily) {
    videoapi.period = 'day';
    toggleSlider.style.width = `${daily}px`;
    toggleSlider.style.transform = `translateX(0)`;
    await renderTrendingVideos({ key: TRENDING.DAY });
  } else {
    videoapi.period = 'week';
    toggleSlider.style.width = `${weekly}px`;
    toggleSlider.style.transform = `translateX(${daily - 6}px)`;
    await renderTrendingVideos({ key: TRENDING.WEEK });
  }
};

const listenTrendingToggle = () => {
  headerRefs.trendingCheckbox.addEventListener('change', onToggleRenderTrending);
  headerRefs.filtersContainer.classList.remove('is-hidden');
};

const unlistenTrendingToggle = () => {
  headerRefs.trendingCheckbox.removeEventListener('change', onToggleRenderTrending);
  headerRefs.filtersContainer.classList.add('is-hidden');
};

export { onToggleRenderTrending, listenTrendingToggle, unlistenTrendingToggle };
