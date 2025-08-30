export { };

declare global {
  interface Number {
    readonly x: number;
    readonly y: number;
    readonly z: number;
    readonly w: number;
  }
}

Object.defineProperties(Number.prototype, {
  x: { get() { return +this; } },
  y: { get() { return +this; } },
  z: { get() { return +this; } },
  w: { get() { return +this; } },
});