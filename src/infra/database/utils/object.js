export const isObjectEmpty = (object) => {
  return Object.keys(object).length === 0;
};

export const isArray = (array) => {
  return Array.isArray(array);
};

export const isArrayEmpty = (array) => {
  return array.length === 0;
};
