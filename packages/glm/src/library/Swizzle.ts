import { Base } from "./Base";
import { Vec2 } from "./Vec2";
import { Vec3 } from "./Vec3";
import { Vec4 } from "./Vec4";

type SwizzleVariants<K extends string> =
  & { [_ in `${K}${K}`]: Vec2 }
  & { [_ in `${K}${K}${K}`]: Vec3 }
  & { [_ in `${K}${K}${K}${K}`]: Vec4 };

export function makeSwizzle<const K extends string>(...keys: K[]) {
  type SwizzleObject = {
    [k in K]: number
  };

  class Swizzle extends Base { }

  keys.forEach(a => {
    keys.forEach(b => {
      Object.defineProperty(Swizzle.prototype, a + b, {
        get(this: SwizzleObject) {
          return new Vec2(this[a], this[b]);
        },
        set(this: SwizzleObject, value: SwizzleObject) {
          const x = value[keys[0]];
          const y = value[keys[1]];
          this[a] = x;
          this[b] = y;
        }
      });
    });
  });

  keys.forEach(a => {
    keys.forEach(b => {
      keys.forEach(c => {
        Object.defineProperty(Swizzle.prototype, a + b + c, {
          get(this: SwizzleObject) {
            return new Vec3(this[a], this[b], this[c]);
          },
          set(this: SwizzleObject, value: SwizzleObject) {
            const x = value[keys[0]];
            const y = value[keys[1]];
            const z = value[keys[2]];
            this[a] = x;
            this[b] = y;
            this[c] = z;
          }
        });
      });
    });
  });

  keys.forEach(a => {
    keys.forEach(b => {
      keys.forEach(c => {
        keys.forEach(d => {
          Object.defineProperty(Swizzle.prototype, a + b + c + d, {
            get(this: SwizzleObject) {
              return new Vec4(this[a], this[b], this[c], this[d]);
            },
            set(this: SwizzleObject, value: SwizzleObject) {
              const x = value[keys[0]];
              const y = value[keys[1]];
              const z = value[keys[2]];
              const w = value[keys[3]];
              this[a] = x;
              this[b] = y;
              this[c] = z;
              this[d] = w;
            }
          });
        });
      });
    });
  });

  return Swizzle as new () => Base & SwizzleVariants<K>;
}