import { cached } from "../lib/cached";
import { defineType, TypeStruct, TypeValue } from "../lib/defineType";
import uint from "./uint";

export default cached(<const T extends TypeStruct[]>(...schemas: T) => {
  const indexes = uint(8);

  return defineType({
    name: `Or<${schemas.map(e => e.name).join('|')}>`,
    depends: [indexes, ...schemas],
    write(data: TypeValue<T[number]>) {
      const index = schemas.findIndex((
        schema => schema.equal(data)
      ));

      if (index === -1)
        throw new Error('Unsupport type');

      this.write(indexes, index);
      this.write(schemas[index], data);
    },
    read() {
      const index = this.read(indexes);

      if (!schemas[index])
        throw new Error('Unsupport type');

      return this.read(schemas[index]);
    },
    equal(data) {
      return schemas.findIndex(schema => {
        schema.equal(data);
      }) !== -1;
    }
  });
});