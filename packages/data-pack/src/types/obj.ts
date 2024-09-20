import { TypeStruct, TypeValue, defineType } from "../lib/defineType";

import { cached } from "../lib/cached";

export type ObjectSchema = {
  [key: string | symbol]: TypeStruct<any>;
};

export type ObjectValue<T extends ObjectSchema> = {
  [K in keyof T]: TypeValue<T[K]>;
};

export default cached(<const T extends ObjectSchema>(schema: T) => {
  const keys = Object.keys(schema) as (keyof T)[];

  return defineType({
    name: `Object<${schema}>`,
    depends: Object.values(schema),
    write(data: ObjectValue<T>) {
      keys.forEach((key: keyof T) => {
        this.write(schema[key], data[key]);
      });
    },
    read(): ObjectValue<T> {
      return keys.reduce((acc, key: keyof T) => {
        acc[key] = this.read(schema[key]);
        return acc;
      }, {} as ObjectValue<T>);
    },
    equal(data) {
      if (!data || typeof data !== "object")
        return false;

      if (Array.isArray(data))
        return false;

      if (Object.keys(data).length < keys.length)
        return false;

      return keys.findIndex((key: keyof T) => (
        !schema[key].equal(data[key as any])
      )) === -1;
    }
  });
});