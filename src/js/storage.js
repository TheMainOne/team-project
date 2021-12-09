const { error } = console;

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
    return isStored === null ? undefined : JSON.parse(isStored);
  } catch (err) {
    error(err);
  }
};

export { save, load };
