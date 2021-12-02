const galleryCardTemplate = ({ poster_path, genres, release_date, title }) => {
  /* example image: https://image.tmdb.org/t/p/w342/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg */
  // poster_sizes: (7) ['w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original']

  const secure_base_url = 'https://image.tmdb.org/t/p/';
  const size = 'w342';
  const poster = `${secure_base_url}${size}${poster_path}`;
  console.log('poster', poster);
  // poster_path: "/rjkmN1dniUHVYAtwuV3Tji7FsDO.jpg"
  const genresNames = genres;

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
        <span class="card__genres">${genresNames}</span>
        <span class="card__release-date">
          ${Date(release_date).slice(11, 15)}</span
        >
      </p>
    </div>
  </div>
</li>
`;
};

export default galleryCardTemplate;
