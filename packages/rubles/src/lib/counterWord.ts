import { joinWord, type WordForms } from './joinWord';

export function counterWord(input: WordForms, counter: number) {
  const lastTwo = counter % 100;
  const units = counter % 10;

  if (lastTwo >= 10 && lastTwo <= 19) {
    return joinWord(input, 0);
  }

  if (units === 1) {
    return joinWord(input, 1);
  }

  if (units > 1 && units < 5) {
    return joinWord(input, 2);
  }

  return joinWord(input, 0);
}
