export { };

declare global {
  interface VecGetters {
    readonly x: number;
    readonly y: number;
    readonly z: number;
    readonly w: number;
  }

  interface Array<T = number> extends VecGetters { }
  interface Float64Array extends VecGetters { }
  interface Float32Array extends VecGetters { }
  interface Int8Array extends VecGetters { }
  interface Int16Array extends VecGetters { }
  interface Int32Array extends VecGetters { }
  interface Uint8Array extends VecGetters { }
  interface Uint16Array extends VecGetters { }
  interface Uint32Array extends VecGetters { }
}

const patch: Record<string, ThisType<ArrayLike<number>>> = {
  x: { get() { return this[0] ?? 0; } },
  y: { get() { return this[1] ?? 0; } },
  z: { get() { return this[2] ?? 0; } },
  w: { get() { return this[3] ?? 0; } },
};

Object.defineProperties(Array.prototype, patch);

if (typeof Float64Array !== 'undefined')
  Object.defineProperties(Float64Array.prototype, patch);
if (typeof Float32Array !== 'undefined')
  Object.defineProperties(Float32Array.prototype, patch);
if (typeof Int8Array !== 'undefined')
  Object.defineProperties(Int8Array.prototype, patch);
if (typeof Int16Array !== 'undefined')
  Object.defineProperties(Int16Array.prototype, patch);
if (typeof Int32Array !== 'undefined')
  Object.defineProperties(Int32Array.prototype, patch);
if (typeof Uint8Array !== 'undefined')
  Object.defineProperties(Uint8Array.prototype, patch);
if (typeof Uint16Array !== 'undefined')
  Object.defineProperties(Uint16Array.prototype, patch);
if (typeof Uint32Array !== 'undefined')
  Object.defineProperties(Uint32Array.prototype, patch);