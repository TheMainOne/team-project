import videoAPI from './api-service';
import storage from './storage';

const { log, error } = console;
const desktop = () => window.matchMedia('(min-width: 1024px)').matches;

const secureBaseUrl = 'https://image.tmdb.org/t/p/';
// poster_sizes: (7) ['w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original']
const size = desktop() ? 'w500' : 'w342';

const initGenres = async () => {
  try {
    const videoapi = new videoAPI();
    const genresParsed = await videoapi.getGenres();

    return genresParsed;
  } catch (err) {
    error(err);
  }
};

const genresParsed = initGenres();

const galleryCardTemplate = async ({
  poster_path: posterPath,
  genre_ids: genreIds = null,
  genres = null,
  release_date: releaseDate = null,

  title,
}) => {
  /* example image: https://image.tmdb.org/t/p/w342/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg */
  // poster_path: "/rjkmN1dniUHVYAtwuV3Tji7FsDO.jpg"
  const poster = `${secureBaseUrl}${size}${posterPath}`;

  let genresJoined = '';

  const getGenreName = async id =>
    await (await genresParsed).find(genre => genre.id === id).name;

  if (genreIds?.length > 0 && genreIds.length < 3) {
    genresJoined = await Promise.all(genreIds.map(getGenreName));
    genresJoined.join(', ');
  }

  if (genreIds?.length >= 3) {
    const genresIDS = await Promise.all(genreIds.slice(0, 2).map(getGenreName));

    genresJoined = `${genresIDS.join(', ')}, Other`;
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

  const releaseYear = releaseDate ? Date(releaseDate).slice(11, 15) : '';

  return `
<li class="gallery__item">
  <div class="card">
    <div class="card__thumb">
      <picture>
        <source
          media="(min-width: 1024px)"
          srcset="${poster}"
          sizes="(min-width: 1024px) 396px"
        />

        <img
          class="card__poster"
          src="${poster}"
          alt="Video poster image - ${title}"
          loading="lazy"
          decoding="async"
        />
      </picture>
    </div>

    <div class="card__meta">
      <h2 class="card__title">${title}</h2>
      <p class="card__description">
        <span class="card__genres">${genresJoined}</span>
        <span class="card__release-date">${releaseYear}</span>
      </p>
    </div>
  </div>
</li>
`;
};

export default galleryCardTemplate;
