import { save, load } from './storage';
import { videoapi } from './api-service';
import getHeaderRefs from './getHearedRefs';

const { WATCHED, QUEUE } = videoapi.keys;
console.log(WATCHED, QUEUE);

const carousel = document.querySelector('.js-carousel');
console.log(carousel);
