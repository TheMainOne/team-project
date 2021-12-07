


 export default async function addToQueue(film) {
    
      const LOCAL_STORAGE_QUEUE = 'filmoteka-queue';
      const LOCAL_STORAGE_WEEK = 'filmoteka-trending-week';
      

      const movieIndex = document.querySelector('.movie').dataset.idx
      const filmOfWeek = await JSON.parse(localStorage.getItem(LOCAL_STORAGE_WEEK)).results;
      let filmForQueue = [];
    



      if (localStorage.getItem(LOCAL_STORAGE_QUEUE)) {
          filmForQueue = JSON.parse(localStorage.getItem(LOCAL_STORAGE_QUEUE));
      };

    filmForQueue = [
          ...filmForQueue,
          filmOfWeek[movieIndex],
      ];

    localStorage.setItem(LOCAL_STORAGE_QUEUE, JSON.stringify(filmForQueue))
    

    if (film.dataset.action = 'add-to-queue') {
      film.dataset.action = 'remove-from-queue';
       film.classList.add('remove-queue')
      film.innerHTML = "Remove from queue"
     };



    }


