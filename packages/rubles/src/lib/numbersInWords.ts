import bigDischarges from '../data/bigDischarges';
import smallDischarges from '../data/smallDischarges';
import { counterWord } from './counterWord';
import { firstUpper } from './firstUpper';
import { parseNumber } from './parseNumber';

export function numbersInWords(input: number | string, feminine = false, upper = false) {
  const output: string[] = [];
  let [num] = parseNumber(input);
  const negative = num.startsWith('-');

  if (negative) {
    num = num.slice(1);
  }

  let deep = 0;
  let result = smallDischarges[0][0];

  if (num !== '0') {
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

          if (deep === 1 || deep === 0 && feminine) {
            row.push(
              smallDischarges[5][units] ?? smallDischarges[1][units],
            );
          } else {
            row.push(smallDischarges[1][units]);
          }
        }

        if (deep) {
          row.push(counterWord(bigDischarges[deep] ?? bigDischarges[0], current));
        }
      }

      const rowString = row.filter(e => e && e !== '-').join(' ');

      if (rowString) {
        output.unshift(rowString);
      }

      deep++;
    }

    result = output.join(' ');
  }

  if (negative) {
    result = `минус ${result}`;
  }

  return upper ? firstUpper(result) : result;
}
