
export type TypeContext<S extends object = {}> = {
  readonly store: S;
  write<T extends TypeStruct<any>>(dep: T, value: TypeValue<T>): void;
  read<T extends TypeStruct<any>>(dep: T): TypeValue<T>;
};

export type TypeStruct<T = any, S extends object = {}> = {
  name?: string;
  depends?: TypeStruct<any>[];
  initial?: S | (() => S);
  store?: {
    read(data: ArrayBuffer): Partial<S>;
    write(data: S): ArrayBuffer;
  };
  write(this: TypeContext<S>, data: T): void;
  read(this: TypeContext<S>): T;
  equal(data: any): boolean;
};

export type TypeValue<T extends TypeStruct<any, any>> = ReturnType<T['read']>;

export const defineType = <T, S extends object>(
  type: TypeStruct<T, S>
) => type;
