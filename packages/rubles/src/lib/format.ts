import currency from '../data/currency';
import { counterWord } from './counterWord';
import { firstUpper } from './firstUpper';
import { normalizeNumber, type RoundingMode } from './normalizeNumber';
import { numberFormat } from './numberFormat';
import { numbersInWords } from './numbersInWords';

const formatRegExp = /\$([a-z]+)/gi;

export function format(
  input: number | string,
  template = '$summString $summCurrency $pennyString $pennyCurrency',
  rounding: RoundingMode = 'truncate',
) {
  const { negative, integer: summ, fraction } = normalizeNumber(input, 2, rounding);
  const penny = fraction.padEnd(2, '0').slice(0, 2);
  const normalizedInput = `${negative ? '-' : ''}${summ}${fraction ? `.${fraction}` : ''}`;

  return template.replace(formatRegExp, (find, arg) => {
    switch (arg) {
      case 'input': return numberFormat(normalizedInput);
      case 'summ': return numberFormat(normalizedInput, undefined, 0);
      case 'summString': return numbersInWords(normalizedInput);
      case 'summCurrency': return counterWord(currency[0], +summ.slice(-2));
      case 'SummString': return firstUpper(numbersInWords(normalizedInput));
      case 'SummCurrency': return firstUpper(counterWord(currency[0], +summ.slice(-2)));
      case 'penny': return penny;
      case 'pennyString': return numbersInWords(+penny, true);
      case 'pennyCurrency': return counterWord(currency[1], +penny);
      case 'PennyString': return firstUpper(numbersInWords(+penny, true));
      case 'PennyCurrency': return firstUpper(counterWord(currency[1], +penny));
      default: return find;
    }
  });
}
