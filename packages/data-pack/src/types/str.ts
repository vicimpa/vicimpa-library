import { cached } from "../lib/cached";
import { defineType } from "../lib/defineType";
import varint from "./varint";

export default cached(() => {
  const cursors = varint();
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  return defineType({
    name: 'String',
    depends: [cursors],
    initial: () => ({
      data: ''
    }),
    store: {
      write: ({ data }) => encoder.encode(data),
      read: (buffer) => ({
        data: decoder.decode(buffer)
      }),
    },
    write(data: string) {
      const { store } = this;
      var index = store.data.indexOf(data);

      if (index === -1) {
        index = store.data.length;
        store.data += data;
      }

      this.write(cursors, index);
      this.write(cursors, index + data.length);
    },
    read() {
      const { store } = this;
      var start = this.read(cursors);
      var end = this.read(cursors);
      return store.data.slice(start, end);
    },
    equal(data) {
      return typeof data === 'string';
    }
  });
});