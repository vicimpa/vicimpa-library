import { SimpleArrayLike, toString } from "./Common";

const f64 = new Float64Array(16);
const decoder = new TextDecoder('utf-8');

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
    return decoder.decode(this.toArray(f64.fill(0)).buffer);
  }

  toString() {
    return toString(this);
  }
}