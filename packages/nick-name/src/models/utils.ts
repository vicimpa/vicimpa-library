export function rnd(ceiling: number = 0): number {
  return Math.floor(Math.random() * ceiling);
}

export class InvalidDistributionError extends TypeError {
  constructor() {
    super('Invalid probability distribution');
    this.name = 'InvalidDistributionError';
  }
}

export function selectIndex(
  distribution: ReadonlyArray<number | null>,
  value: number,
): number {
  for (let index = 0; index < distribution.length; index++) {
    const threshold = distribution[index];

    if (threshold != null && value < threshold)
      return index;
  }

  throw new InvalidDistributionError();
}

export function alphaup(index: number = 0): string {
  return String.fromCharCode(65 + index);
}

export function alphalow(index: number = 0): string {
  return String.fromCharCode(97 + index);
}
