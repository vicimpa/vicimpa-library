import { afterEach, describe, expect, it } from 'bun:test';

import { genName } from '../src';
import { selectIndex } from '../src/models/utils';

const originalRandom = Math.random;

afterEach(() => {
  Math.random = originalRandom;
});

describe('selectIndex', () => {
  it('rejects a distribution with no selectable values', () => {
    expect(() => selectIndex(Array(26).fill(null), 500)).toThrow(TypeError);
  });

  it('keeps the cumulative distribution boundary semantics', () => {
    expect(selectIndex([0, 100, 1000], 0)).toBe(1);
    expect(selectIndex([0, 100, 1000], 100)).toBe(2);
    expect(selectIndex([0, 100, 1000], 999)).toBe(2);
  });
});

describe('genName', () => {
  it('retries method 2 when a bigram has no transitions', () => {
    const values = [
      7.5 / 26, // H
      0.623, // g; letters2[H][g] contains only nulls
      0.5,
      0,
      0,
      0,
    ];
    let calls = 0;

    Math.random = () => values[calls++] ?? 0;

    expect(genName(2, 3)).toBe('Aac');
    expect(calls).toBe(6);
  });

  it('limits retries when every attempt reaches an empty distribution', () => {
    const values = [7.5 / 26, 0.623, 0.5];
    let calls = 0;

    Math.random = () => values[calls++ % values.length];

    expect(() => genName(2, 3)).toThrow(
      'Unable to generate a name from the probability tables',
    );
    expect(calls).toBe(300);
  });
});
