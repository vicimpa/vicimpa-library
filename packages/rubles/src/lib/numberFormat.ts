import { normalizeNumber, type RoundingMode } from './normalizeNumber';

export const numberFormat = (
  input: number | string,
  sep = ' ',
  precision = 2,
  dot = '.',
  rounding: RoundingMode = 'truncate',
) => {
  const { negative, integer, fraction } = normalizeNumber(input, precision, rounding);
  const segments: string[] = [];

  for (let index = integer.length; index > 0; index -= 3) {
    segments.unshift(integer.slice(Math.max(0, index - 3), index));
  }

  const output = [segments.join(sep), fraction].filter(Boolean).join(dot);

  return negative ? `-${output}` : output;
};
