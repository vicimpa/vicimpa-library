import { toString } from "./Common";

export class Base {
  *[Symbol.iterator]() {
    yield 0;
  }

  toString() {
    return toString(this);
  }
}