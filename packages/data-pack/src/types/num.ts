import { cached } from "../lib/cached";
import { defineType } from "../lib/defineType";

const typedArrays = [
  Int8Array,
  Int16Array,
  Int32Array,
  Uint8Array,
  Uint16Array,
  Uint32Array,
  Float32Array,
  Float64Array,
] as const;

type TypedArray = typeof typedArrays[number];

const num = cached(
  (TypedArray: TypedArray, name: string = 'Number') => {
    const test = new TypedArray(1);

    return defineType({
      name,
      initial: () => ({
        cursor: 0,
        data: [] as number[],
      }),
      store: {
        write: ({ data }) => (
          new TypedArray(data).buffer
        ),
        read: (data) => ({
          cursor: 0,
          data: [...new TypedArray(data)],
        }),
      },
      write(n: number): void {
        const { store } = this;
        store.data.push(n);
      },
      read(): number {
        const { store } = this;

        if (store.cursor > store.data.length - 1)
          throw new Error('Out of range');

        return store.data[store.cursor++]!;
      },
      equal(data) {
        if (typeof data !== 'number')
          return false;

        if (TypedArray === Float64Array)
          return true;

        test[0] = data;

        return test[0] === data;
      }
    });
  }
);

export default (type: TypedArray = Float64Array, name?: string) => num(type, name);