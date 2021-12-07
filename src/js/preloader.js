export default class Preloader {
  constructor({ selector }) {
    this.preloader = document.querySelector(selector);
    console.log(this.preloader);
  }

  show() {
    this.preloader.classList.remove('is-hidden');
  }
  hide() {
    this.preloader.classList.add('is-hidden');
  }
}