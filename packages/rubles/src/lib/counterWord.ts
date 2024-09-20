import { joinWord } from "./joinWord";

export function counterWord(input: string[], counter: number) {
  const units = counter % 10;

  if (counter > 10 && counter < 20)
    return joinWord(input, 0);

  if (units == 1)
    return joinWord(input, 1);

  if (units > 1 && units < 5)
    return joinWord(input, 2);

  return joinWord(input, 0);
}