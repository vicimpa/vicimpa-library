import { parseNumber } from './parseNumber';

export type RoundingMode = 'truncate' | 'round';

export interface NormalizedNumber {
  negative: boolean;
  integer: string;
  fraction: string;
}

const incrementDecimal = (value: string) => {
  let index = value.length - 1;

  while (index >= 0 && value[index] === '9') {
    index--;
  }

  if (index < 0) {
    return `1${'0'.repeat(value.length)}`;
  }

  return `${value.slice(0, index)}${Number(value[index]) + 1}${'0'.repeat(value.length - index - 1)}`;
};

export const normalizeNumber = (
  input: string | number,
  precision = 2,
  rounding: RoundingMode = 'truncate',
): NormalizedNumber => {
  if (!Number.isInteger(precision) || precision < 0) {
    throw new RangeError('The precision must be a non-negative integer');
  }

  if (rounding !== 'truncate' && rounding !== 'round') {
    throw new TypeError(`Unknown rounding mode: ${String(rounding)}`);
  }

  const [rawInteger, rawFraction = ''] = parseNumber(input);
  let negative = rawInteger.startsWith('-');
  let integer = negative ? rawInteger.slice(1) : rawInteger;
  let fraction = rawFraction.slice(0, precision);

  const shouldRound = rounding === 'round'
    && rawFraction.length > precision
    && rawFraction[precision] >= '5';

  if (shouldRound) {
    if (precision === 0) {
      integer = incrementDecimal(integer);
    } else {
      const digits = incrementDecimal(`${integer}${fraction.padEnd(precision, '0')}`)
        .padStart(precision + 1, '0');

      integer = digits.slice(0, -precision);
      fraction = digits.slice(-precision);
    }
  }

  integer = integer.replace(/^0+(?=\d)/, '');

  if (!/[1-9]/.test(`${integer}${fraction}`)) {
    negative = false;
  }

  return { negative, integer, fraction };
};
