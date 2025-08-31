import { hash, SimpleArrayLike, toString } from "./Common";

const f32 = new Float32Array(16);

export class Base {
  *[Symbol.iterator]() {
    yield 0;
  }

  fromArray(array: SimpleArrayLike, offset = 0) {
    return this;
  }

  toArray(): number[];
  toArray<T extends SimpleArrayLike>(array: T): T;
  toArray<T extends SimpleArrayLike>(array: T, offset: number): T;
  toArray(array: number[] = [], offset = 0) {
    return array;
  }

  hash() {
    return hash(this.toArray(f32.fill(0)));
  }

  toString() {
    return toString(this);
  }
}