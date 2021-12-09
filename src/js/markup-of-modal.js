import { sprite } from '../index';
const iconPlaceholder = `${sprite}#icon-placeholder`;
const iconClose = `${sprite}#icon-close`;

export function createPoster(poster, title) {
  return poster
    ? `<img class="movie__img" src="${poster}" alt="${title}"></img>`
    : `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 125 125" style="enable-background:new 0 0 125 125" xml:space="preserve"><style>.st0{fill:none;stroke:#000;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10}</style><path class="st0" d="M41.7 32.2c16.9-3.5 34.9-7.3 51.8-10.8.8 3.7 1.5 7.1 2.2 10.8m-74.6 45c-2.8-13.5-5.3-25.5-8.1-39 2.1-.4 6-1.3 8.1-1.7m45.1 58.8c-13.6 2.8-26 5.4-39.6 8.2-.6-2.9-1.1-5.3-1.7-8.2m76.6-35.8c1.7 8.1 3.9 19.2 5.6 27.3-2 .4-3.7.8-5.7 1.2m-80.3 7.3h80.4V32.2m-5.7 0H21.1v57.3"/><path class="st0" d="M34.4 79.6c4.4-11.9 7.8-20.9 12.3-32.8 3.9 4.9 7.5 9.3 11.3 14.2M60.6 64.1c1.8 2.3 3.7 4.6 5.6 6.9 3.2-2.4 6.4-4.8 9.7-7.3 4.8 7.3 9.7 14.5 14.5 21.8H33M87.4 43.3c1.8 1.3 3.1 3.5 3 5.9 0 4-3.3 7.2-7.3 7.2-3 0-5.6-1.8-6.7-4.4M76 48c.5-3.5 3.5-6.1 7.2-6.1.3 0 .6 0 .9.1M115 21.5l-105 82"/></svg>`;
  // `<svg  ><use href="${iconPlaceholder}"></use></svg>`
}

export function createMarkup({
  isFilmInQueue,
  isFilmInWatch,
  id,
  poster,
  genresJoined,
  title,
  voteAverage,
  voteCount,
  popularity,
  originalTitle,
  overview,
}) {
  const queueStatus = isFilmInQueue
    ? { data: 'remove-from-queue', text: 'remove from queue' }
    : { data: 'add-to-queue', text: 'add to queue' };
  const watchStatus = isFilmInWatch
    ? { data: 'remove-from-watched', text: 'remove from watched' }
    : { data: 'add-to-watched', text: 'add to watched' };

  return `<div class="modal-window">
    <div class="movie movie__container" data-id="${id}">
        <button class="btnClose">
            <svg  class="btnClose-icon" width="30" height="30">
                <use href="${iconClose}"></use>
            </svg>  
        </button>
    
        <div class="movie__container--left-side">
        ${poster}
        </div>


        <div class="movie__container--rigth-side">
            <h1 class="movie__title">${title}</h1>

            <table class="movie__info" >
                <tbody>
                <tr class="movie__info-rows">
                    <td class="movie__info-name">Vote / Votes</td>
                    <td class="movie__info-rating">
                        <span class="movie__info-rating-value movie__info-rating--accent">${voteAverage} </span>
                        <span class="movie__info-rating-slash">/</span>
                        <span class="movie__info-rating-value">${voteCount}</span>
                    </td>
                </tr>
                <tr class="movie__info-rows">
                    <td class="movie__info-name">Popularity</td>
                    <td class="movie__info-numbers">${popularity}</td>
                </tr>
                <tr class="movie__info-rows">
                    <td class="movie__info-name">Original Title</td>
                    <td class="movie__info-value">${originalTitle}</td>
                </tr>
                <tr class="movie__info-rows movie__info-rows--last">
                    <td class="movie__info-name">Genre</td>
                    <td class="movie__info-value">${genresJoined}</td>
                </tr>
                </tbody>
            </table>

            <h2 class="movie__about-title">About</h2>
            <p class="movie__about-text">${overview}</p>

            <div class="movie__btn-container">
                <button type="submit" id="watched-btn" data-action="${watchStatus.data}" class="movie__btn add-to-watch btn btn--accent"> ${watchStatus.text} </button>
                <button type="submit" id="queue-btn" data-action="${queueStatus.data}" class="movie__btn btn"> ${queueStatus.text} </button>
            </div>
        </div>

    </div>

    </div>`;
}
