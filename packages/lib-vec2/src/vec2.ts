namespace Vec2 {
  export type Point = { x: number, y: number; };
  export type Tuple = [x: number, y: number];
  export type Size = { width: number, height: number; };
  export type PageXY = { pageX: number, pageY: number; };
  export type OffsetXY = { offsetX: number, offsetY: number; };
  export type DeltaXY = { deltaX: number, deltaY: number; };
  export type OffsetSize = { offsetWidth: number, offsetHeight: number; };
  export type InnerSize = { innerWidth: number, innerHeight: number; };
  export type Args = [xy: number | Point | Tuple] | Tuple;
  export type ClampArgs = [min: Args[0], max: Args[0]] | [minX: number, minY: number, maxX: number, maxY: number];

  export interface Base {
    set(this: Vec2, ...args: Args): this;
    equal(this: Vec2, ...args: Args): boolean;
    clone(this: Vec2): Vec2;
    toObject(this: Vec2, o: Point): this;
    toObjectSize(this: Vec2, o: Size): this;
    toString(this: Vec2): string;
    [Symbol.iterator](this: Vec2): Iterator<number>;
    [Symbol.toStringTag](this: Vec2): string;
  }

  export interface Math {
    plus(this: Vec2, ...args: Args): this;
    minus(this: Vec2, ...args: Args): this;
    times(this: Vec2, ...args: Args): this;
    div(this: Vec2, ...args: Args): this;
    rem(this: Vec2, ...args: Args): this;
    pow(this: Vec2, ...args: Args): this;
    abs(this: Vec2): this;
    sign(this: Vec2): this;
    round(this: Vec2): this;
    ceil(this: Vec2): this;
    floor(this: Vec2): this;
  }

  export interface Utils {
    angle(this: Vec2): number;
    length(this: Vec2): number;
    distance(this: Vec2, ...args: Args): number;
    inverse(this: Vec2): this;
    normalize(this: Vec2): this;
  }

  export interface Clamp {
    clampMin(this: Vec2, ...args: Args): this;
    clampMax(this: Vec2, ...args: Args): this;
    clamp(this: Vec2, ...args: ClampArgs): this;
  }

  export interface CopyMath {
    cplus(this: Vec2, ...args: Args): Vec2;
    cminus(this: Vec2, ...args: Args): Vec2;
    ctimes(this: Vec2, ...args: Args): Vec2;
    cdiv(this: Vec2, ...args: Args): Vec2;
    crem(this: Vec2, ...args: Args): Vec2;
    cpow(this: Vec2, ...args: Args): Vec2;
    cabs(this: Vec2): Vec2;
    csign(this: Vec2): Vec2;
    cround(this: Vec2): Vec2;
    cceil(this: Vec2): Vec2;
    cfloor(this: Vec2): Vec2;
  }

  export interface CopyUtils {
    cinverse(this: Vec2): Vec2;
    cnormalize(this: Vec2): Vec2;
  }

  export interface CopyClamp {
    cclampMin(this: Vec2, ...args: Args): Vec2;
    cclampMax(this: Vec2, ...args: Args): Vec2;
    cclamp(this: Vec2, ...args: ClampArgs): Vec2;
  }
}

function $<T, A>(func: (self: T, x: number, y: number) => A) {
  return function (a, b) {
    if (typeof a === 'number')
      return func(this, a, b ?? a);

    if (Array.isArray(a))
      return func(this, a[0], a[1]);

    if (a && ('x' in a) && ('y' in a))
      return func(this, a.x, a.y);

    throw new Error('Invalid arguments');
  } as (this: T, ...args: Vec2.Args) => A;
}

export const vec2point = $((_, x, y): Vec2.Point => ({ x, y }));
export const vec2tuple = $((_, x, y): Vec2.Tuple => [x, y]);
export const vec2 = (...args: Vec2.Args | []) => new Vec2(...args);

export interface Vec2 extends Vec2.Base, Vec2.Math, Vec2.Utils, Vec2.Clamp, Vec2.CopyMath, Vec2.CopyUtils, Vec2.CopyClamp {
  x: number;
  y: number;
}

export class Vec2 {
  x = 0;
  y = 0;

  get tuple(): Vec2.Tuple {
    return [this.x, this.y];
  };

  get size(): Vec2.Size {
    return { width: this.x, height: this.y };
  }

  get point(): Vec2.Point {
    return { x: this.x, y: this.y };
  }

  constructor(...args: Vec2.Args | []) {
    if (!args.length)
      return;

    this.set.apply(this, args);
  }

  static fromAngle(angle: number, vec = new this()) {
    return vec.set(Math.sin(angle), Math.cos(angle));
  }

  static fromRandom(vec = new this()) {
    return vec.set(Math.random(), Math.random());
  }

  static fromSrandom(vec = new this()) {
    return this.fromRandom(vec).times(2).minus(1);
  }

  static fromSize(size: Vec2.Size, vec = new this()) {
    return vec.set(size.width, size.height);
  }

  static fromDeltaXY(page: Vec2.DeltaXY, vec = new this()) {
    return vec.set(page.deltaX, page.deltaY);
  }

  static fromPageXY(page: Vec2.PageXY, vec = new this()) {
    return vec.set(page.pageX, page.pageY);
  }

  static fromOffsetXY(offset: Vec2.OffsetXY, vec = new this()) {
    return vec.set(offset.offsetX, offset.offsetY);
  }

  static fromInnerSize(offsetSize: Vec2.InnerSize, vec = new this()) {
    return vec.set(offsetSize.innerWidth, offsetSize.innerHeight);
  }

  static fromOffsetSize(offsetSize: Vec2.OffsetSize, vec = new this()) {
    return vec.set(offsetSize.offsetWidth, offsetSize.offsetHeight);
  }

  static fromSvgLength(x: SVGAnimatedLength, y: SVGAnimatedLength, vec = new this()) {
    return vec.set(x.baseVal.value, y.baseVal.value);
  }
}

Object.assign(
  Vec2.prototype,
  {
    set: $((s, x, y) => (s.x = x, s.y = y, s)),
    equal: $((s, x, y) => s.x === x && s.y === y),
    clone() { return Object.assign(new Vec2(), this); },

    *[Symbol.iterator]() {
      yield this.x;
      yield this.y;
    },

    [Symbol.toStringTag]() {
      return this.toString();
    },

    toObject(o) {
      Object.assign(o, this.point);
      return this;
    },

    toObjectSize(o) {
      Object.assign(o, this.size);
      return this;
    },

    toString() {
      return `Vec2 { x: ${this.x}, y: ${this.y} }`;
    }
  } as Vec2.Base,
  {
    plus: $((s, x, y) => (s.x += x, s.y += y, s)),
    minus: $((s, x, y) => (s.x -= x, s.y -= y, s)),
    times: $((s, x, y) => (s.x *= x, s.y *= y, s)),
    div: $((s, x, y) => (s.x /= x, s.y /= y, s)),
    rem: $((s, x, y) => (s.x %= x, s.y %= y, s)),
    pow: $((s, x, y) => (s.x **= x, s.y **= y, s)),
    abs() { return this.set(Math.abs(this.x), Math.abs(this.y)); },
    sign() { return this.set(Math.sign(this.x), Math.sign(this.y)); },
    round() { return this.set(Math.round(this.x), Math.round(this.y)); },
    ceil() { return this.set(Math.ceil(this.x), Math.ceil(this.y)); },
    floor() { return this.set(Math.floor(this.x), Math.floor(this.y)); }
  } as Vec2.Math,
  {
    angle() { return Math.atan2(this.y, this.x); },
    length() { return Math.hypot(this.x, this.y); },
    distance: $((s, x, y) => Math.hypot(s.x - x, s.y - y)),
    inverse() { return this.set(this.y, this.x); },
    normalize() { return this.equal(0) ? this : this.div(this.length()); }
  } as Vec2.Utils,
  {
    clampMin: $((s, x, y) => s.set(Math.max(s.x, x), Math.max(s.y, y))),
    clampMax: $((s, x, y) => s.set(Math.min(s.x, x), Math.min(s.y, y))),
    clamp(...args: Vec2.ClampArgs) {
      if (args.length === 2)
        this.clampMin(args[0]).clampMax(args[1]);
      else if (args.length === 4)
        this.clampMin(args[0], args[1]).clampMax(args[2], args[3]);
      else
        throw new Error('Invalid arguments');

      return this;
    }
  } as Vec2.Clamp,
  {
    cplus: $((s, x, y) => s.clone().plus(x, y)),
    cminus: $((s, x, y) => s.clone().minus(x, y)),
    ctimes: $((s, x, y) => s.clone().times(x, y)),
    cdiv: $((s, x, y) => s.clone().div(x, y)),
    crem: $((s, x, y) => s.clone().rem(x, y)),
    cpow: $((s, x, y) => s.clone().pow(x, y)),
    cabs() { return this.clone().abs(); },
    csign() { return this.clone().sign(); },
    cround() { return this.clone().round(); },
    cceil() { return this.clone().ceil(); },
    cfloor() { return this.clone().floor(); }
  } as Vec2.CopyMath,
  {
    cinverse() { return this.clone().inverse(); },
    cnormalize() { return this.clone().normalize(); }
  } as Vec2.CopyUtils,
  {
    cclampMin: $((s, x, y) => s.clone().clampMin(x, y)),
    cclampMax: $((s, x, y) => s.clone().clampMax(x, y)),
    cclamp(...args) { return this.clone().clamp(...args); }
  } as Vec2.CopyClamp
);