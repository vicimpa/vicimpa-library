export const firstUpper = (input: string) => {
  return input.slice(0, 1).toUpperCase() + input.slice(1).toLocaleLowerCase();
};