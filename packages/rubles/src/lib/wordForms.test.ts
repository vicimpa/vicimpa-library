import { describe, expect, test } from 'bun:test';

import { counterWord } from './counterWord';
import { firstUpper } from './firstUpper';
import { joinWord } from './joinWord';

const ruble = ['рубл', 'ей', 'ь', 'я'] as const;
const endings = ['пар', 'ней', 'ень', 'ня'] as const;

describe('counterWord', () => {
  test('selects the correct word form', () => {
    const cases = [
      [0, 'рублей'],
      [1, 'рубль'],
      [2, 'рубля'],
      [4, 'рубля'],
      [5, 'рублей'],
      [11, 'рублей'],
      [14, 'рублей'],
      [20, 'рублей'],
      [21, 'рубль'],
      [22, 'рубля'],
      [25, 'рублей'],
      [101, 'рубль'],
      [111, 'рублей'],
      [121, 'рубль'],
    ] as const;

    for (const [counter, expected] of cases) {
      expect(counterWord(ruble, counter)).toBe(expected);
    }
  });
});

describe('joinWord', () => {
  test('joins a root with the selected ending', () => {
    expect(joinWord(endings)).toBe('парней');
    expect(joinWord(endings, 0)).toBe('парней');
    expect(joinWord(endings, 1)).toBe('парень');
    expect(joinWord(endings, 2)).toBe('парня');
  });
});

describe('firstUpper', () => {
  test('capitalizes the first letter and lowercases the rest', () => {
    expect(firstUpper('привет')).toBe('Привет');
    expect(firstUpper('агА')).toBe('Ага');
    expect(firstUpper('')).toBe('');
  });
});
