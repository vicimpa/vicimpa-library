import { describe, expect, test } from 'bun:test';

import { numbersInWords } from './numbersInWords';

describe('numbersInWords', () => {
  test('converts integer parts to words', () => {
    const cases = [
      [0, 'ноль'],
      [10.12, 'десять'],
      [101, 'сто один'],
      [110, 'сто десять'],
      [115, 'сто пятнадцать'],
      [1001, 'одна тысяча один'],
      [1_000_000, 'один миллион'],
      [1_000_001, 'один миллион один'],
      [2_000_000_000, 'два миллиарда'],
      [1_000_000_000_000, 'один триллион'],
    ] as const;

    for (const [input, expected] of cases) {
      expect(numbersInWords(input)).toBe(expected);
    }
  });

  test('supports feminine forms for the last group', () => {
    expect(numbersInWords(1, true)).toBe('одна');
    expect(numbersInWords(2, true)).toBe('две');
    expect(numbersInWords(21, true)).toBe('двадцать одна');
    expect(numbersInWords(1022, true)).toBe('одна тысяча двадцать две');
  });

  test('supports capitalization and string inputs with separators', () => {
    expect(numbersInWords('15_213.28', false, true))
      .toBe('Пятнадцать тысяч двести тринадцать');
    expect(numbersInWords('12 351.23', true, true))
      .toBe('Двенадцать тысяч триста пятьдесят одна');
  });

  test('supports negative numbers and scientific notation', () => {
    expect(numbersInWords(-123)).toBe('минус сто двадцать три');
    expect(numbersInWords(-0.01)).toBe('минус ноль');
    expect(numbersInWords(-123, false, true)).toBe('Минус сто двадцать три');
    expect(numbersInWords('1.23e2')).toBe('сто двадцать три');
    expect(numbersInWords(1e21)).toBe('один секстиллион');
  });
});
