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

const removeEmptyStorageKeys = async () => {
  try {
    Object.keys(localStorage).forEach(key => {
      if (key === 'theme') {
        return;
      }

      const loadedData = load(key);

      if (
        !loadedData ||
        loadedData === '' ||
        (typeof loadedData === 'object' && Object.keys(loadedData).length === 0) ||
        (Array.isArray(loadedData) && loadedData.length === 0)
      ) {
        localStorage.removeItem(key);
      }
    });
  } catch (err) {
    error(err);
  }
};

export { save, load, removeEmptyStorageKeys };
