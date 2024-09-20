import currency from "../data/currency";
import { counterWord } from "./counterWord";
import { firstUpper } from "./firstUpper";
import { numberFormat } from "./numberFormat";
import { numbersInWords } from "./numbersInWords";
import { parseNumber } from "./parseNumber";

const formatRegExp = /\$([a-z]+)/gi;

export function format(input: number | string, format = '$summString $summCurrency $pennyString $pennyCurrency') {
  let [base = '0', dop = '00'] = parseNumber(input);

  dop = dop.slice(0, 2);
  dop = ('00' + dop).slice(-2);

  return format.replace(formatRegExp, (find, arg) => {
    switch (arg) {
      case 'input': return numberFormat(input, undefined, 2);
      case 'summ': return numberFormat(input, undefined, 0);
      case 'summString': return numbersInWords(input);
      case 'summCurrency': return counterWord(currency[0], +base.slice(-2));
      case 'SummString': return firstUpper(numbersInWords(input));
      case 'SummCurrency': return firstUpper(counterWord(currency[0], +base.slice(-2)));
      case 'penny': return dop;
      case 'pennyString': return numbersInWords(+dop, true);
      case 'pennyCurrency': return counterWord(currency[1], +dop);
      case 'PennyString': return firstUpper(numbersInWords(+dop, true));
      case 'PennyCurrency': return firstUpper(counterWord(currency[1], +dop));
      default: return find;
    }
  });
}
