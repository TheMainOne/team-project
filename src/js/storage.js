const GENRES_KEY = 'filmoteka_genres';

const save = (key, obj) => {
  try {
    localStorage.setItem(key, JSON.stringify(obj));
  } catch (err) {
    error(err);
  }
};

const load = key => {
  try {
    const isStored = localStorage.getItem(key);
    return isStored ? JSON.parse(isStored) : null;
  } catch (err) {
    error(err);
  }
};

export default { save, load, GENRES_KEY };
