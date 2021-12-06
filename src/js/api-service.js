import axios from 'axios';
import { save, load, GENRES_KEY } from './storage';
const { log, error } = console;

const KEY = '0bd610b1a3557ac4e7f9b5501edcfef4';

const api_key = `?api_key=${KEY}`;
const movieBaseURL = 'https://api.themoviedb.org/3/';
const imageBaseURL = 'https://image.tmdb.org/t/p/';
const movieID = 'movie/550';
const url = `${movieBaseURL}${movieID}${api_key}`;

// get settings
// https://api.themovidb.org/3/configuration?api_key=0bd610b1a3557ac4e7f9b5501edcfef4
// const configuration = `${baseURL}configuration${api_key}`;

class videoAPI {
  #baseURL = 'https://api.themoviedb.org/3/';
  #page = '1';
  #media = 'movie';
  #period = 'week';
  #language = 'en-US';
  #type = 'trendingVideosWeek';
  #keys = {
    GENRES: 'filmoteka-genres',
    TRENDING_DAY: 'filmoteka-trending-day',
    TRENDING_WEEK: 'filmoteka-trending-week',
    MOVIES: 'filmoteka-movies',
  };

  async fetchData(dataURL = '') {
    if (!dataURL) return;

    const res = await axios(dataURL);

    if (res.status !== 200) throw Error(`status: ${res.status}`);
    return res.data;
  }

  async getGenres() {
    // https://api.themoviedb.org/3/genre/movie/list?api_key=0bd610b1a3557ac4e7f9b5501edcfef4&language=en-US
    const { keys, media, language, fetchData } = this;

    const savedGenres = load(keys.GENRES);
    if (savedGenres) return savedGenres;

    const genresURL = `${movieBaseURL}genre/${media}/list${api_key}&language=${language}`;
    const { genres } = await fetchData(genresURL);
    save(keys.GENRES, genres);

    return genres;
  }

  async getTrendingVideos() {
    // https://api.themoviedb.org/3/trending/movie/week?api_key=0bd610b1a3557ac4e7f9b5501edcfef4
    const { keys, period, page, media, fetchData } = this;

    const key = `${keys[`TRENDING_${period.toUpperCase()}`]}-${page}`;

    const savedTrending = load(key);
    if (savedTrending) return savedTrending;

    const trendingVideosURL = `${movieBaseURL}trending/${media}/${period}${api_key}&page=${page}`;
    const trendingVideos = await fetchData(trendingVideosURL);
    save(key, trendingVideos);

    return trendingVideos;
  }

  async getVideos() {
    // https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>&language=en-US&page=1&include_adult=false
    const { keys, query, page, media, language, fetchData } = this;

    const key = `${keys.MOVIES}-${query}-${page}`;

    const savedSearchVideos = load(key);
    if (savedSearchVideos) return savedSearchVideos;

    const searchVideosURL = `${movieBaseURL}search/${media}${api_key}&query=${query}&${language}&page=${page}&include_adult=false}`;
    const searchedVideos = await fetchData(searchVideosURL);
    save(key, searchedVideos);

    return searchedVideos;
  }

  checkType() {
    let key = null;
    const { type } = this;

    if (type === 'trendingVideosWeek') {
      key = this.#keys.TRENDING_WEEK;
    }

    if (type === 'trendingVideosDay') {
      key = this.#keys.TRENDING_DAY;
    }

    if (type === 'videos') {
      key = this.#keys.MOVIES;
    }

    return key;
  }

  get baseURL() {
    return this.#baseURL;
  }

  set baseURL(newBaseURL) {
    this.#baseURL = newBaseURL;
  }

  get media() {
    return this.#media;
  }

  set media(newMedia) {
    const mediaTypes = ['all', 'movie', 'tv', 'person'];
    if (!mediaTypes.includes(newMedia)) return;

    this.#media = newMedia;
  }

  get period() {
    return this.#period;
  }

  set period(newPeriod) {
    const periods = ['week', 'day'];
    if (!periods.includes(newPeriod)) return;

    this.#period = newPeriod;
  }

  get language() {
    return this.#language;
  }

  set language(newLanguage) {
    this.#language = newLanguage;
  }

  get page() {
    return this.#page;
  }

  set page(newPage) {
    if (newPage <= 0 || isNaN(newPage)) return;

    this.#page = newPage;
  }

  get type() {
    return this.#type;
  }

  set type(newType) {
    this.#type = newType;
  }

  get keys() {
    return this.#keys;
  }

  set keys(newKeys) {
    this.#keys = newKeys;
  }
}

export default videoAPI;
