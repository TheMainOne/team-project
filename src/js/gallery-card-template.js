import { videoapi } from './api-service';

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

const getPoster = posterUrl => {
  const PLACEHOLDER = './images/svg/placeholder.svg';

  let poster = PLACEHOLDER;
  if (posterUrl) {
    poster = posterUrl;
  }
  return poster;
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

  const poster = getPoster(posterUrl);

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
  <a href="#" class="card">
  <a class="card__list-link card__list-link-wrapper link" href="#">
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
      <p class="card__list-overlay">YOUTUBE TRAILER 
       <svg class="trailer-link__svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 502 210.649" height="21" width="50"><g><path d="M498.333 45.7s-2.91-20.443-11.846-29.447C475.157 4.44 462.452 4.38 456.627 3.687c-41.7-3-104.25-3-104.25-3h-.13s-62.555 0-104.255 3c-5.826.693-18.523.753-29.86 12.566-8.933 9.004-11.84 29.447-11.84 29.447s-2.983 24.003-2.983 48.009v22.507c0 24.006 2.983 48.013 2.983 48.013s2.907 20.44 11.84 29.446c11.337 11.817 26.23 11.44 32.86 12.677 23.84 2.28 101.315 2.983 101.315 2.983s62.62-.094 104.32-3.093c5.824-.694 18.527-.75 29.857-12.567 8.936-9.006 11.846-29.446 11.846-29.446s2.98-24.007 2.98-48.013V93.709c0-24.006-2.98-48.01-2.98-48.01" fill="#cd201f"/><g><path d="M187.934 169.537h-18.96V158.56c-7.19 8.24-13.284 12.4-19.927 12.4-5.826 0-9.876-2.747-11.9-7.717-1.23-3.02-2.103-7.736-2.103-14.663V68.744h18.957v81.833c.443 2.796 1.636 3.823 4.043 3.823 3.63 0 6.913-3.153 10.93-8.817V68.744h18.96v100.793zM102.109 139.597c.996 9.98-2.1 14.93-7.987 14.93s-8.98-4.95-7.98-14.93v-39.92c-1-9.98 2.093-14.657 7.98-14.657 5.89 0 8.993 4.677 7.996 14.657l-.01 39.92zm18.96-37.923c0-10.77-2.164-18.86-5.987-23.95-5.054-6.897-12.973-9.72-20.96-9.72-9.033 0-15.913 2.823-20.957 9.72-3.886 5.09-5.97 13.266-5.97 24.036l-.016 35.84c0 10.71 1.853 18.11 5.736 23.153 5.047 6.873 13.227 10.513 21.207 10.513 7.986 0 16.306-3.64 21.36-10.513 3.823-5.043 5.586-12.443 5.586-23.153v-35.926zM46.223 114.647v54.889h-19.96v-54.89S5.582 47.358 1.314 34.815H22.27L36.277 87.38l13.936-52.566H71.17l-24.947 79.833z"/></g><g fill="#fff"><path d="M440.413 96.647c0-9.33 2.557-11.874 8.59-11.874 5.99 0 8.374 2.777 8.374 11.997v10.893l-16.964.02V96.647zm35.96 25.986l-.003-20.4c0-10.656-2.1-18.456-5.88-23.5-5.06-6.823-12.253-10.436-21.317-10.436-9.226 0-16.42 3.613-21.643 10.436-3.84 5.044-6.076 13.28-6.076 23.943v34.927c0 10.596 2.46 18.013 6.296 23.003 5.227 6.813 12.42 10.216 21.87 10.216 9.44 0 16.853-3.566 21.85-10.81 2.2-3.196 3.616-6.82 4.226-10.823.164-1.81.64-5.933.64-11.753v-2.827h-18.96c0 7.247.037 11.557-.133 12.54-1.033 4.834-3.623 7.25-8.07 7.25-6.203 0-8.826-4.636-8.76-13.843v-17.923h35.96zM390.513 140.597c0 9.98-2.353 13.806-7.563 13.806-2.973 0-6.4-1.53-9.423-4.553l.02-60.523c3.02-2.98 6.43-4.55 9.403-4.55 5.21 0 7.563 2.93 7.563 12.91v42.91zm2.104-72.453c-6.647 0-13.253 4.087-19.09 11.27l.02-43.603h-17.963V169.54h17.963l.027-10.05c6.036 7.47 12.62 11.333 19.043 11.333 7.193 0 12.45-3.85 14.863-11.267 1.203-4.226 1.993-10.733 1.993-19.956V99.684c0-9.447-1.21-15.907-2.416-19.917-2.41-7.466-7.247-11.623-14.44-11.623M340.618 169.537h-18.956V158.56c-7.193 8.24-13.283 12.4-19.926 12.4-5.827 0-9.877-2.747-11.9-7.717-1.234-3.02-2.107-7.736-2.107-14.663V69.744h18.96v80.833c.443 2.796 1.633 3.823 4.043 3.823 3.63 0 6.913-3.153 10.93-8.817V69.744h18.957v99.793z"/><path d="M268.763 169.537h-19.956V54.77h-20.956V35.835l62.869-.024v18.96h-21.957v114.766z"/></g></g></svg>
       <iframe width="220" height="160" src="https://www.youtube.com/embed/xFa2_PVMeDQ" frameborder="0" allowfullscreen></iframe>
       </p>
       
    </div>
</a>
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
