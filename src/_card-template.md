```js
`
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
```
