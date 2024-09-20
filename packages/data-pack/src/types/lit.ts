import { cached } from "../lib/cached";
import { defineType } from "../lib/defineType";

export default cached(<const T>(value: T) => (
  defineType({
    name: 'Literal',
    write() { },
    read() {
      return value;
    },
    equal(data) {
      return data === value;
    }
  })
));