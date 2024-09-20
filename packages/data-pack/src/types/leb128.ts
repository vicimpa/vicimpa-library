import { DataBuffer } from "@vicimpa/data-buffer";
import { cached } from "../lib/cached";
import { defineType } from "../lib/defineType";

export default cached(() => {
  const databuffer = new DataBuffer();

  return defineType({
    name: 'Leb128',
    initial: () => ({
      data: [] as bigint[],
      cursor: 0
    }),
    store: {
      write({ data }) {
        databuffer.reset();

        for (var num of data) {
          databuffer.writeLEB128(num);
        }

        return databuffer.buffer;
      },
      read(buff) {
        databuffer.reset();
        databuffer.write(buff);
        databuffer.cursor = 0;

        var data: bigint[] = [];

        while (databuffer.cursor < buff.byteLength) {
          data.push(databuffer.readLEB128());
        }

        return { data };
      }
    },
    write(data: bigint) {
      const { store } = this;
      store.data.push(data);
    },
    read() {
      const { store } = this;

      if (store.cursor > store.data.length - 1)
        throw new Error('Out of range');

      return store.data[store.cursor++];
    },
    equal(value) {
      return typeof value === "number";
    }
  });
});