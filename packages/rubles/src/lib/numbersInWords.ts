import bigDischarges from "../data/bigDischarges";
import smallDischarges from "../data/smallDischarges";
import { counterWord } from "./counterWord";
import { firstUpper } from "./firstUpper";
import { parseNumber } from "./parseNumber";

export function numbersInWords(input: number | string, com = false, upper = false) {
  const output: string[] = [];

  let [num] = parseNumber(input);

  let deep = 0;

  if (!num || num === '0')
    return upper ? firstUpper(smallDischarges[0][0]) : smallDischarges[0][0];

  while (num.length) {
    const row: string[] = [];
    const current = +num.slice(-3);
    num = num.slice(0, -3);

    const hundreds = current / 100 | 0;
    const dozens = current / 10 % 10 | 0;
    const units = current % 10;

    if (current) {
      row.push(smallDischarges[4][hundreds]);

      if (dozens === 1) {
        row.push(smallDischarges[2][units]);
      } else {
        row.push(smallDischarges[3][dozens]);

        if (deep === 1 || deep == 0 && com) {
          row.push(
            smallDischarges[5][units] ?? smallDischarges[1][units]
          );
        } else {
          row.push(smallDischarges[1][units]);
        }
      }

      if (deep) {
        row.push(counterWord(bigDischarges[deep] ?? bigDischarges[0], current));
      }
    }

    const rowString = row.filter(e => e && e != '-').join(' ');

    if (rowString)
      output.unshift(rowString);

    deep++;
  }

  return upper ? firstUpper(output.join(' ')) : output.join(' ');
}