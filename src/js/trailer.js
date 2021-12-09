export function enableTrailerLink() {
  const targetName = document.querySelector('.movie__title').textContent;
  const trailerLinkRef = document.querySelector('.trailer-link');
  const trailerTextRef = document.querySelector('.trailer-link__text');
  const searchRef = document.querySelector('.search-for-trailer');
  searchRef.classList.add('unable')
  trailerLinkRef.classList.add('enable');

  const youtubeKeyApi = 'AIzaSyCrnGnV2GS29bGv6ktcqjAdI_UxuU_ESyQ';
  const baseYoutubeUrl = `https://www.googleapis.com/youtube/v3/search?q=${targetName}+official+trailer&key=${youtubeKeyApi}&part=snippet,id&kind='youtube#video'order=date&maxResults=1`;
  fetch(baseYoutubeUrl)
    .then(response => {
      if (!response.ok) {
          trailerLinkRef.target = '_self';
          trailerTextRef.textContent = 'Sorry, CURRENTLY UNAVAILABLE';
          trailerLinkRef.title='The request cannot be completed because the youtube quota is exceeded';
          return;
      }

      return response.json();
    })
    .then(data => {
      const movieId = data.items[0].id.videoId;
      return movieId;
    })
    .then(data => {
      trailerLinkRef.addEventListener('click', function () {
      trailerLinkRef.href = `https://www.youtube.com/embed/${data}?enablejsapi=1`;
      });
    });
}


