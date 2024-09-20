import { TypeStruct, TypeValue, defineType } from "../lib/defineType";

import array from "./array";
import bool from "./bool";
import { cached } from "../lib/cached";
import float from "./float";
import int from "./int";
import or from "./or";
import str from "./str";
import uint from "./uint";
import json from "./json";

export type MapValue<T extends TypeStruct[]> = Record<string, TypeValue<T[number]>>;

export default cached(<
  const T extends TypeStruct[] = (
    | TypeStruct<number>
    | TypeStruct<boolean>
    | TypeStruct<string>
  )[]
>(
  variants: T = [
    bool(),
    int(8),
    uint(8),
    int(16),
    uint(16),
    int(32),
    uint(32),
    float(32),
    float(64),
    str(),
    json(),
  ] as any
) => {
  const keys = array(str());
  const values = or(...variants);

  return defineType({
    name: `Map<string, ${variants.map(e => e.name).join('|')}>`,
    depends: [keys, values],
    write(data: MapValue<T>) {
      this.write(keys, Object.keys(data));

      for (const key in data)
        this.write(values, data[key]);
    },
    read(): MapValue<T> {
      const data = {} as MapValue<T>;
      const _keys = this.read(keys);

      for (const key of _keys)
        data[key] = this.read(values);

      return data;
    },
    equal(data) {
      if (!data || typeof data !== "object")
        return false;

      if (Array.isArray(data))
        return false;

      return Object.values(data)
        .findIndex(e => !values.equal(e)) == -1;
    }
  });
});