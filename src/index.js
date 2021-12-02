import './sass/main.scss';
import galleryCardTemplate from './js/gallery-card-template';
const { log, error } = console;
const KEY = '0bd610b1a3557ac4e7f9b5501edcfef4';
const url = `https://api.themoviedb.org/3/movie/550?api_key=${KEY}`;

const gallery = document.querySelector('[data-gallery]');

const fetchVideos = async () => {
  const res = await fetch(url);
  if (!res.ok) throw Error('404 Not found');
  return await res.json();
};

const renderGallery = async () => {
  try {
    const videos = await fetchVideos();
    log('renderGallery ~ videos', videos);

    const galleryMarkup = galleryCardTemplate(videos);

    log('renderGallery ~ galleryMarkup', galleryMarkup);
    gallery.innerHTML = '';
    gallery.insertAdjacentHTML('beforeend', galleryMarkup);
  } catch (err) {
    error(err);
  }
};

renderGallery();
