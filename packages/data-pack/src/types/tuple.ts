import { TypeStruct, TypeValue, defineType } from "../lib/defineType";

import { cached } from "../lib/cached";

export type TupleValue<T extends TypeStruct<any>[]> = [
  ...{
    [K in keyof T]: TypeValue<T[K]>
  }
];

export default cached(<const T extends TypeStruct<any>[]>(...schemas: T) => (
  defineType({
    name: `Tuple[${schemas.map(e => e.name)}]`,
    depends: schemas,
    read(): TupleValue<T> {
      return schemas.map((
        schema => (
          this.read(schema)
        )
      )) as TupleValue<T>;
    },
    write(data: TupleValue<T>) {
      schemas.forEach(
        (schema, index) => (
          this.write(schema, data[index])
        )
      );
    },
    equal(data) {
      if (!Array.isArray(data))
        return false;

      return schemas.findIndex((schema, i) => (
        !schema.equal(data[i])
      )) === -1;
    }
  })
));