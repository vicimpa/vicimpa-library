import { describe, expect, test } from 'bun:test';

import { format } from './format';

const pennyCases = [
  { input: 0, penny: '00', words: 'ноль', currency: 'копеек' },
  { input: 0.01, penny: '01', words: 'одна', currency: 'копейка' },
  { input: 0.02, penny: '02', words: 'две', currency: 'копейки' },
  { input: 0.05, penny: '05', words: 'пять', currency: 'копеек' },
  { input: 0.1, penny: '10', words: 'десять', currency: 'копеек' },
  { input: 0.11, penny: '11', words: 'одиннадцать', currency: 'копеек' },
  { input: 0.12, penny: '12', words: 'двенадцать', currency: 'копеек' },
  { input: 0.14, penny: '14', words: 'четырнадцать', currency: 'копеек' },
  { input: 0.2, penny: '20', words: 'двадцать', currency: 'копеек' },
  { input: 0.21, penny: '21', words: 'двадцать одна', currency: 'копейка' },
  { input: 0.4, penny: '40', words: 'сорок', currency: 'копеек' },
  { input: 0.41, penny: '41', words: 'сорок одна', currency: 'копейка' },
  { input: 0.5, penny: '50', words: 'пятьдесят', currency: 'копеек' },
  { input: 0.99, penny: '99', words: 'девяносто девять', currency: 'копеек' },
];

const capitalize = (value: string) => value[0].toUpperCase() + value.slice(1);

describe('format', () => {
  test('formats sums in words by default', () => {
    const cases = [
      [0, 'ноль рублей ноль копеек'],
      [10.12, 'десять рублей двенадцать копеек'],
      ['1_234.54', 'одна тысяча двести тридцать четыре рубля пятьдесят четыре копейки'],
      ['1 421 234.43', 'один миллион четыреста двадцать одна тысяча двести тридцать четыре рубля сорок три копейки'],
      ['41-214.94', 'сорок одна тысяча двести четырнадцать рублей девяносто четыре копейки'],
      ['123,4', 'сто двадцать три рубля сорок копеек'],
    ] as const;

    for (const [input, expected] of cases) {
      expect(format(input)).toBe(expected);
    }
  });

  test('formats every penny value from 00 to 99 for string and number inputs', () => {
    for (let value = 0; value < 100; value++) {
      const penny = String(value).padStart(2, '0');
      const input = `123.${penny}`;

      expect(format(input, '$penny')).toBe(penny);
      expect(format(Number(input), '$penny')).toBe(penny);
    }
  });

  test('treats one fractional digit as tenths and truncates extra digits', () => {
    expect(format(0.5, '$penny')).toBe('50');
    expect(format('0.5', '$pennyString $pennyCurrency')).toBe('пятьдесят копеек');
    expect(format('0.05', '$penny')).toBe('05');
    expect(format('0.500', '$penny')).toBe('50');
    expect(format('1.239')).toBe('один рубль двадцать три копейки');
  });

  for (const { input, penny, words, currency } of pennyCases) {
    test(`formats penny placeholders for ${input}`, () => {
      expect(format(input, '$penny $pennyString $pennyCurrency'))
        .toBe(`${penny} ${words} ${currency}`);
      expect(format(input, '$PennyString $PennyCurrency'))
        .toBe(`${capitalize(words)} ${capitalize(currency)}`);
    });
  }

  test('supports all sum placeholders and their capitalized variants', () => {
    const template = [
      '$input',
      '$summ',
      '$summString',
      '$summCurrency',
      '$penny',
      '$pennyString',
      '$pennyCurrency',
      '$SummString',
      '$SummCurrency',
      '$PennyString',
      '$PennyCurrency',
    ].join(' | ');

    expect(format('1_234.50', template)).toBe(
      '1 234.50 | 1 234 | одна тысяча двести тридцать четыре | рубля | 50 | пятьдесят | копеек | ' +
      'Одна тысяча двести тридцать четыре | Рубля | Пятьдесят | Копеек',
    );
  });

  test('keeps custom text and unknown placeholders', () => {
    expect(format(10.12, 'Сумма: $SummString $summCurrency; $penny $pennyCurrency; $unknown'))
      .toBe('Сумма: Десять рублей; 12 копеек; $unknown');
  });

  test('supports negative sums and removes the sign from rounded zero', () => {
    expect(format(-10.12)).toBe('минус десять рублей двенадцать копеек');
    expect(format(-0.5)).toBe('минус ноль рублей пятьдесят копеек');
    expect(format(-0.001)).toBe('ноль рублей ноль копеек');
    expect(format(-1234.5, '$input | $summ | $SummString')).toBe(
      '-1 234.5 | -1 234 | Минус одна тысяча двести тридцать четыре',
    );
  });

  test('supports scientific notation for small and large numbers', () => {
    expect(format(1e-7)).toBe('ноль рублей ноль копеек');
    expect(format(1e21)).toBe('один секстиллион рублей ноль копеек');
    expect(format('1.23e2')).toBe('сто двадцать три рубля ноль копеек');
  });

  test('optionally rounds decimal digits without floating-point errors', () => {
    expect(format('1.239', undefined, 'round')).toBe('один рубль двадцать четыре копейки');
    expect(format('1.999', undefined, 'round')).toBe('два рубля ноль копеек');
    expect(format('-1.235', undefined, 'round')).toBe('минус один рубль двадцать четыре копейки');
    expect(format('-0.005', undefined, 'round')).toBe('минус ноль рублей одна копейка');
    expect(format(1.005, undefined, 'round')).toBe('один рубль одна копейка');
    expect(format(1.239)).toBe('один рубль двадцать три копейки');
  });

  test('rejects non-finite and malformed inputs', () => {
    const invalidInputs = [Number.NaN, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY, '', 'abc', '1.2.3', '--1'];

    for (const input of invalidInputs) {
      expect(() => format(input)).toThrow(TypeError);
    }
  });
});
