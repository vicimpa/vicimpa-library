import { TypeContext, TypeStruct, TypeValue } from "./lib/defineType";

import { DataBuffer } from "@vicimpa/data-buffer";
import { types as t } from "./types";

export { types } from "./types";
export { t };

const getAllSchema = <T extends TypeStruct>(schema: T): TypeStruct[] => {
  return ([schema] as TypeStruct[])
    .concat(...schema.depends?.map(getAllSchema) ?? []);
};

export const makeDataPack = <T extends TypeStruct>(schema: T) => {
  const schemas = [...new Set(getAllSchema(schema))];
  const databuffer = new DataBuffer();

  const initial = <T extends TypeStruct>(schema: T) => {
    return schema.initial instanceof Function ? (
      schema.initial()
    ) : schema.initial;
  };

  const contextWith = <T extends TypeStruct, S extends Map<TypeStruct, any>>(target: T, _store: S): TypeContext => {
    const store = _store.get(target);

    return {
      store,
      write<T extends TypeStruct>(schema: T, value: TypeValue<T>) {
        schema.write.call(contextWith(schema, _store), value);
      },
      read<T extends TypeStruct>(schema: T): TypeValue<T> {
        return schema.read.call(contextWith(schema, _store));
      }
    };
  };

  return {
    write(data: TypeValue<T>): ArrayBuffer {
      const store = new Map<TypeStruct, any>();
      databuffer.reset();

      for (const schema of schemas)
        store.set(schema, initial(schema));

      schema.write.call(contextWith(schema, store), data);

      for (const schema of schemas) {
        if (!schema.store) continue;
        const { store: currentStore } = contextWith(schema, store);
        var buffer = schema.store.write(currentStore);
        var size = buffer.byteLength;
        databuffer.writeVarint(size);
        if (!size) continue;
        databuffer.write(buffer);
      }

      return databuffer.buffer;
    },
    read(data: ArrayBuffer): TypeValue<T> {
      const store = new Map<TypeStruct, any>();
      databuffer.reset();
      databuffer.write(data);
      databuffer.cursor = 0;

      for (const schema of schemas) {
        if (!schema.store) continue;
        store.set(schema, initial(schema));

        var size = databuffer.readVarint();

        if (!size) continue;

        store.set(schema, Object.assign(
          initial(schema),
          schema.store.read(
            databuffer.read(undefined, size)
          )
        ));
      }

      return schema.read.call(contextWith(schema, store));
    },
    equal(data: any): data is TypeValue<T> {
      return schema.equal(data);
    }
  };
};

export { TypeValue };