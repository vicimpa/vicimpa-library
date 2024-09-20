import { cached } from "../lib/cached";
import { defineType, TypeStruct, TypeValue } from "../lib/defineType";
import varint from "./varint";

export default cached(<const T extends TypeStruct<any, any>>(type: T) => {
  const sizes = varint();

  return defineType({
    name: 'Array<' + type.name + '>',
    depends: [sizes, type],
    read(): TypeValue<T>[] {
      return Array.from({
        length: this.read(sizes)
      }, () => this.read(type));
    },
    write(data: TypeValue<T>[]) {
      this.write(sizes, data.length);

      data.forEach(
        (value) => {
          this.write(type, value);
        }
      );
    },
    equal(value) {
      if (!Array.isArray(value))
        return false;

      return value.findIndex(e => !type.equal(e)) === -1;
    }
  });
});