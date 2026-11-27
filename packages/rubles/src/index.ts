import { counterWord } from './lib/counterWord';
import { firstUpper } from './lib/firstUpper';
import { format } from './lib/format';
import { joinWord } from './lib/joinWord';
import { numberFormat } from './lib/numberFormat';
import { numbersInWords } from './lib/numbersInWords';
import { parseNumber } from './lib/parseNumber';

export {
  counterWord,
  format,
  joinWord,
  numberFormat,
  numbersInWords,
  parseNumber,
  firstUpper,
};

export type { WordFormIndex, WordForms } from './lib/joinWord';
export type { RoundingMode } from './lib/normalizeNumber';
export type { ParsedNumber } from './lib/parseNumber';
