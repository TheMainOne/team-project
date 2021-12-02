import './sass/main.scss';
import galleryCardTemplate from './js/gallery-card-template';
import axios from 'axios';
const { log, error } = console;
const KEY = '0bd610b1a3557ac4e7f9b5501edcfef4';
const baseURL = 'https://api.themoviedb.org/3/';
const imageBaseURL = 'https://image.tmdb.org/t/p/';
const movieID = 'movie/550';

const api_key = `?api_key=${KEY}`;
const url = `${baseURL}${api_key}`;

const gallery = document.querySelector('[data-gallery]');

/*
MOVIE
Action            28
Adventure         12
Animation         16
Comedy            35
Crime             80
Documentary       99
Drama             18
Family            10751
Fantasy           14
History           36
Horror            27
Music             10402
Mystery           9648
Romance           10749
Science Fiction   878
TV Movie          10770
Thriller          53
War               10752
Western           37
*/

// get settings
// https://api.themovidb.org/3/configuration?api_key=0bd610b1a3557ac4e7f9b5501edcfef4
// const configuration = `${baseURL}configuration${api_key}`;

// get trending videos
// https://api.themoviedb.org/3/trending/movie/week?api_key=0bd610b1a3557ac4e7f9b5501edcfef4
const trendingType = 'trending/';
const trendingMedia = 'movie/';
const trendingPeriod = 'week';
const trendingVideosURL = `${baseURL}${trendingType}${trendingMedia}${trendingPeriod}${api_key}`;

const fetchData = async () => {
  const res = await axios(trendingVideosURL);

  if (res.status !== 200) throw Error(`status: ${res.status}`);
  return res.data;
};

const renderGallery = async () => {
  try {
    const {
      page,
      results,
      total_results: totalResults,
      total_pages: totalPages,
    } = await fetchData();

    const perPage = Math.floor(totalResults / totalPages);
    log({ page, results, totalPages, totalResults, perPage });

    const galleryMarkup = results.map(galleryCardTemplate);

    log('renderGallery ~ galleryMarkup', galleryMarkup);
    gallery.innerHTML = '';
    gallery.insertAdjacentHTML('beforeend', galleryMarkup);
  } catch (err) {
    error(err);
  }
};

renderGallery();
