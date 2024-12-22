export function toEnumLike(array) {
  return Object.freeze(array.reduce((acc, curr) => {
    acc[curr] = curr;
    return acc;
  }, {}));
}