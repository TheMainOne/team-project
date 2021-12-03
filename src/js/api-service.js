import axios from 'axios';
import storage from './storage';
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

  async fetchData(dataURL = '') {
    if (!dataURL) return;

    const res = await axios(dataURL);

    if (res.status !== 200) throw Error(`status: ${res.status}`);
    return res.data;
  }

  async getGenres() {
    // https://api.themoviedb.org/3/genre/movie/list?api_key=0bd610b1a3557ac4e7f9b5501edcfef4&language=en-US
    const { media, language, fetchData } = this;
    const genresURL = `${movieBaseURL}genre/${media}/list${api_key}&language=${language}`;
    const savedGenres = storage.load(storage.GENRES_KEY);
    if (savedGenres) return savedGenres;

    const { genres } = await fetchData(genresURL);
    storage.save(storage.GENRES_KEY, genres);

    return await genres;
  }

  async getTrendingVideos() {
    // https://api.themoviedb.org/3/trending/movie/week?api_key=0bd610b1a3557ac4e7f9b5501edcfef4
    const { media, period, fetchData } = this;
    const trendingVideosURL = `${movieBaseURL}trending/${media}/${period}${api_key}`;

    const trendingVideos = await fetchData(trendingVideosURL);

    return trendingVideos;
  }

  async getVideos() {
    // https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>&language=en-US&page=1&include_adult=false
    const { query, page, media, language, fetchData } = this;
    const searchVideosURL = `${movieBaseURL}search/${media}${api_key}&query=${query}&${language}&page=${page}&include_adult=false}`;

    const searchedVideos = await fetchData(searchVideosURL);
    return searchedVideos;
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
}

export default videoAPI;
