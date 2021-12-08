import { sprite } from '../index';
import { videoapi } from './api-service';
const iconYoutube = `${sprite}#icon-youtube`;
const iconPlaceholder = `${sprite}#icon-placeholder`;

const { log, error } = console;
const desktop = () => window.matchMedia('(min-width: 1024px)').matches;


const secureBaseUrl = 'https://image.tmdb.org/t/p/';
// poster_sizes: (7) ['w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original']
const size = desktop() ? 'w500' : 'w342';

const getImageUrl = posterPath => {
  if (posterPath && posterPath !== '') {
    return `${secureBaseUrl}${size}${posterPath}`;
  }
};

export { getImageUrl };

const initGenres = async () => {
  try {
    const genresParsed = await videoapi.getGenres();

    return genresParsed;
  } catch (err) {
    error(err);
  }
};

const genresParsed = initGenres();

const getGenreName = async id =>
  await (await genresParsed).find(genre => genre.id === id).name;

const getGenres = async genreIds => {
  let genresJoined = '';
  if (genreIds?.length > 0 && genreIds.length < 3) {
    genresJoined = await Promise.all(genreIds.map(getGenreName));
    genresJoined = genresJoined.join(', ');
  }

  if (genreIds?.length >= 3) {
    const genresIDS = await Promise.all(genreIds.slice(0, 2).map(getGenreName));

    genresJoined = `${genresIDS.join(', ')}, Other`;
  }
  return genresJoined;
};
export { getGenres };

const galleryCardTemplate = async (
  {
    poster_path: posterPath,
    genre_ids: genreIds = [],
    genres = null,
    release_date: releaseDate,
    title,
    vote_average: voteAverage = '',
  },
  idx,
) => {
  /* example image: https://image.tmdb.org/t/p/w342/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg */
  // poster_path: "/rjkmN1dniUHVYAtwuV3Tji7FsDO.jpg"

  const posterUrl = getImageUrl(posterPath);
  const poster = posterPath !== '' && posterUrl ? posterUrl : iconPlaceholder;

  const genresJoined = await getGenres(genreIds);

  const type = videoapi.checkType();
  if (type !== 'watched' && type !== 'queue') {
    voteAverage = '';
  }

  // const genresObjLength = genres && Object.keys(genres)?.length;
  // if (genresObjLength > 0 && genresObjLength < 3)
  //   genresJoined = Array.from(genres)
  //     .map(({ name }) => `${name}`)
  //     .join(', ');

  // if (genresObjLength > 3)
  //   genresJoined = `${Array.from(genres)
  //     .slice(0, 2)
  //     .map(({ name }) => `${name}`)
  //     .join(', ')}, Other`;

  const releaseYear = releaseDate.slice(0, 4);

  return `
<li class="gallery__item" data-idx=${idx}>
  <a href="#" class="card card__list-link-wrapper">
    <div class="card__thumb">
        ${
          posterUrl
            ? `<picture>
                <source media="(min-width: 1024px)" srcset="${poster}" sizes="(min-width: 1024px) 396px" />
                  <img class="card__poster" src="${poster}" alt="Video poster image - ${title}" loading="lazy" decoding="async" />
                </picture>`
            : `<svg class="card__poster"><use href="${poster}"></use><svg>`
        }

      <p class="card__list-overlay">YOUTUBE TRAILER
        <svg class="trailer-link__svg" height="21" width="50"><use href="${iconYoutube}"></use></svg>
      </p>

    </div>

    <div class="card__meta">
      <h2 class="card__title">${title}</h2>

      <p class="card__description">
        <span class="card__genres">${genresJoined}</span>
        <span class="card__release-date">${releaseYear}</span>
       ${voteAverage ? `<span class="card__vote">${voteAverage}</span>` : ''}
      </p>
    </div>

  </a>
</li>
`;
};

export default galleryCardTemplate;
