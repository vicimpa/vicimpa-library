import { cached } from "../lib/cached";
import { defineType } from "../lib/defineType";

export default cached(() => (
  defineType({
    name: 'Boolean',
    initial: () => ({
      cursor: 0,
      data: [] as boolean[]
    }),
    store: {
      read(data) {
        const nums = new Uint8Array(data);
        const mask = 0xFF << 7 & 0xFF;

        return ({
          cursor: 0,
          data: ([] as boolean[])
            .concat(...[...nums].map((val) => (
              Array.from({
                length: 8
              }, (_, i) => !!((val << i) & mask))
            )))
        });
      },
      write({ data }) {
        const array = new Uint8Array(
          Math.ceil(data.length / 8)
        );

        for (let i = 0; i < array.length; i++) {
          for (let j = 0; j < 8; j++) {
            var val = data[i * 8 + j];
            array[i] = (array[i] << 1) | +val;
          }
        }

        return array.buffer;
      }
    },
    read() {
      const { store } = this;
      return store.data[store.cursor++] ?? false;
    },
    write(data: boolean) {
      const { store } = this;
      return store.data.push(data);
    },
    equal(value) {
      return typeof value === 'boolean';
    }
  })
));