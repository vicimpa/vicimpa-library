export function rnd(ceiling: number = 0): number {
  return Math.floor(Math.random() * ceiling);
}

export function alphaup(index: number = 0): string {
  return String.fromCharCode(65 + index);
}

export function alphalow(index: number = 0): string {
  return String.fromCharCode(97 + index);
}