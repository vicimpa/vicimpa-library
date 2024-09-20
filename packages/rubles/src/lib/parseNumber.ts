export const parseNumber = (input: string | number) => {
  return input
    .toString()
    .replace(/[\s\t\_\-]+/g, '')
    .split(/[\.\,]/);
};