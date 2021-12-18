import axios from 'axios';
import { save, load } from './storage';

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
  #deletedFilm = { watched: {}, queue: {} };
  #baseURL = 'https://api.themoviedb.org/3/';
  #page = '1';
  #media = 'movie';
  #period = 'day';
  #language = 'en-US';
  #type = 'trendingVideosWeek';
  #currentPage = '';
  #rendered = {};
  #keys = {
    SEARCH: 'filmoteka-search',
    TRENDING: {
      DAY: 'filmoteka-trending-day',
      WEEK: 'filmoteka-trending-week',
    },
    QUEUE: 'filmoteka-queue',
    WATCHED: 'filmoteka-watched',
    GENRES: 'filmoteka-genres',
  };

  constructor(init = [{}]) {
    this.#rendered = {
      [this.#keys.SEARCH]: init,
      [this.#keys.TRENDING.DAY]: init,
      [this.#keys.TRENDING.WEEK]: init,
      [this.#keys.QUEUE]: init,
      [this.#keys.WATCHED]: init,
    };
  }

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
    let { keys, period, page, media, fetchData } = this;
    const key = `${keys.TRENDING[`${period.toUpperCase()}`]}`;

    const trendingVideosURL = `${movieBaseURL}trending/${media}/${period}${api_key}&page=${page}`;
    const trendingVideos = await fetchData(trendingVideosURL);
    save(key, trendingVideos);

    return trendingVideos;
  }

  async getVideos() {
    // https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>&language=en-US&page=1&include_adult=false
    const { keys, query, page, media, language, fetchData } = this;

    const key = `${keys.SEARCH}`;

    const searchVideosURL = `${movieBaseURL}search/${media}${api_key}&query=${query}&${language}&page=${page}&include_adult=false}`;
    const searchedVideos = await fetchData(searchVideosURL);
    save(key, searchedVideos);

    return searchedVideos;
  }

  get deletedFilm() {
    return this.#deletedFilm;
  }

  set deletedFilm(newDeletedFilm) {
    this.#deletedFilm = newDeletedFilm;
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

  get rendered() {
    return this.#rendered;
  }

  set rendered(newRendered) {
    this.#rendered = newRendered;
  }

  get currentPage() {
    return this.#currentPage;
  }

  set currentPage(newCurrentPage) {
    if (typeof newCurrentPage !== 'string') return;

    this.#currentPage = newCurrentPage;
  }
}

const videoapi = new videoAPI();
export { videoapi };
