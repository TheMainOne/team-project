export default function carouselRefs() {
  return {
    carousel: document.querySelector('.js-carousel'),
    carouselQueue: document.querySelector('[data-action="carousel-queue"]'),
    carouselWatched: document.querySelector('[data-action="carousel-watched"]'),
    carouselListQueue: document.querySelector('.carousel__gallery--queue'),
    carouselListWatched: document.querySelector('.carousel__gallery--watched'),
  };
}
