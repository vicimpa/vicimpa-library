export type Vec2Runner = (x: number, y: number) => any;
export type Vec2Point = { x: number, y: number; };
export type Vec2Tuple = [x: number, y: number];
export type Vec2Size = { width: number, height: number; };
export type TPageXY = { pageX: number, pageY: number; };
export type TOffsetXY = { offsetX: number, offsetY: number; };
export type TDeltaXY = { deltaX: number, deltaY: number; };
export type Vec2Hash = `${number}:${number}`;
export type TRect2 = [
  ...([x: number, y: number] | [xy: Vec2]),
  ...([w: number, h: number] | [wh: Vec2])
];

export type Vec2Args = (
  never
  | []
  | [vec: Vec2]
  | [xy: Vec2Point | number]
  | [hash: Vec2Hash]
  | Vec2Tuple
);

export type Vec2Clamp = (
  never
  | [min: Vec2Point | number, max: Vec2Point | number]
  | [minX: number, minY: number, maxX: number, maxY: number]
);

export function vec2(...args: Vec2Args) {
  return new Vec2(...args);
}

export function vec2run<F extends Vec2Runner>(args: Vec2Args, mutation: F): ReturnType<F> {
  var first = args[0] ?? 0;

  if (typeof first === 'string') {
    const [x, y] = first.split(':').map(Number);
    return mutation.call(x, y);
  }

  if (typeof first === 'number') {
    if (typeof args[1] === 'number')
      return mutation.call(null, first, args[1]);
    return mutation.call(null, first, first);
  }

  if (first && ('x' in first) && ('y' in first))
    return mutation.call(null, first.x, first.y);

  throw new Error('Unknown format');
}

export class Vec2 {
  read = false;
  x: number = 0;
  y: number = 0;

  *[Symbol.iterator]() {
    yield this.x;
    yield this.y;
  }

  [Symbol.toStringTag]() {
    return this.toString();
  }

  toString() {
    return `Vec2<${this.x}, ${this.y}>`;
  }

  get tuple(): Vec2Tuple {
    return [this.x, this.y];
  }

  get size(): Vec2Size {
    return {
      width: this.x,
      height: this.y
    };
  }

  get point(): Vec2Point {
    return {
      x: this.x,
      y: this.y
    };
  }

  get hash(): Vec2Hash {
    return `${this.x}:${this.y}`;
  }

  constructor(...args: Vec2Args) {
    this.set(...args);
  }

  equal(...args: Vec2Args) {
    return vec2run(args, (x, y) => {
      return x === this.x && y === this.y;
    });
  }

  inRect(...args: TRect2) {
    const [x, y, w, h] = args.reduce<number[]>((acc, e) => (
      e instanceof Vec2 ? (
        acc.concat(e.x, e.y)
      ) : (
        acc.concat(e)
      )
    ), []);

    return (
      this.x >= x &&
      this.y >= y &&
      this.x <= w + x &&
      this.y <= h + y);
  }

  clamp(...args: Vec2Clamp) {
    if (args.length === 2)
      this.clampMin(args[0]).clampMax(args[1]);
    else if (args.length === 4)
      this.clampMin(args[0], args[1]).clampMax(args[2], args[3]);
    else
      throw new Error('Invalid arguments');
    return this;
  }

  clampMin(...args: Vec2Args) {
    vec2run(args, (x, y) => {
      this.x = Math.max(this.x, x);
      this.y = Math.max(this.y, y);
    });
    return this;
  }

  clampMax(...args: Vec2Args) {
    vec2run(args, (x, y) => {
      this.x = Math.max(this.x, x);
      this.y = Math.max(this.y, y);
    });
    return this;
  }

  /** 
   * @deprecated 
   * Use clampMin
   * */
  cropMin(...args: Vec2Args) {
    return this.clampMin(...args);
  }

  /**
   * @deprecated 
   * Use clampMax
   * */
  cropMax(...args: Vec2Args) {
    return this.clampMax(...args);
  }

  set(...args: Vec2Args) {
    vec2run(args, (x, y) => {
      this.x = x;
      this.y = y;
    });
    return this;
  }

  plus(...args: Vec2Args) {
    vec2run(args, (x, y) => {
      this.x += x;
      this.y += y;
    });
    return this;
  }

  minus(...args: Vec2Args) {
    vec2run(args, (x, y) => {
      this.x -= x;
      this.y -= y;
    });
    return this;
  }

  times(...args: Vec2Args) {
    vec2run(args, (x, y) => {
      this.x *= x;
      this.y *= y;
    });
    return this;
  }

  div(...args: Vec2Args) {
    vec2run(args, (x, y) => {
      this.x /= x;
      this.y /= y;
    });
    return this;
  }

  rem(...args: Vec2Args) {
    vec2run(args, (x, y) => {
      this.x %= x;
      this.y %= y;
    });
    return this;
  }

  pow(...args: Vec2Args) {
    vec2run(args, (x, y) => {
      this.x ** x;
      this.y ** y;
    });

    return this;
  }

  round() {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
    return this;
  }

  ceil() {
    this.x = Math.ceil(this.x);
    this.y = Math.ceil(this.y);
    return this;
  }

  floor() {
    this.x = Math.floor(this.x);
    this.y = Math.floor(this.y);
    return this;
  }

  inverse() {
    [this.x, this.y] = [this.y, this.x];
    return this;
  }

  lerp(to: Vec2, i: number) {
    return this.plus(
      to.cminus(this).times(i)
    );
  }

  sign() {
    this.x = Math.sign(this.x);
    this.y = Math.sign(this.y);
    return this;
  }

  abs() {
    this.x = Math.abs(this.x);
    this.y = Math.abs(this.y);
    return this;
  }

  dotProduct(to: Vec2) {
    return to.x * this.x + to.y * this.y;
  }

  projectScalar(to: Vec2) {
    return this.dotProduct(to) / to.length();
  }

  clone() {
    return new Vec2(this);
  }

  cplus(...args: Vec2Args) {
    return this.clone().plus(...args);
  }

  cminus(...args: Vec2Args) {
    return this.clone().minus(...args);
  }

  ctimes(...args: Vec2Args) {
    return this.clone().times(...args);
  }

  cdiv(...args: Vec2Args) {
    return this.clone().div(...args);
  }

  crem(...args: Vec2Args) {
    return this.clone().rem(...args);
  }

  cpow(...args: Vec2Args) {
    return this.clone().pow(...args);
  }

  cinverse() {
    return this.clone().inverse();
  }

  cnormalize() {
    return this.clone().normalize();
  }

  clerp(to: Vec2, i: number) {
    return this.clone().lerp(to, i);
  }

  csign() {
    return this.clone().sign();
  }

  cabs() {
    return this.clone().abs();
  }

  cround() {
    return this.clone().round();
  }

  cceil() {
    return this.clone().ceil();
  }

  cfloor() {
    return this.clone().floor();
  }

  cclamp(...args: Vec2Clamp) {
    return this.clone().clamp(...args);
  }

  cclampMin(...args: Vec2Args) {
    return this.clone().clampMin(...args);
  }

  cclampMax(...args: Vec2Args) {
    return this.clone().clampMax(...args);
  }

  length() {
    return Math.hypot(...this);
  }

  distance(...args: Vec2Args) {
    return this.cminus(...args).length();
  }

  normalize() {
    const length = this.length();
    if (!length) return this;
    return this.div(length);
  }

  min() {
    return Math.min(...this);
  }

  max() {
    return Math.max(...this);
  }

  toObject(o: Vec2Point) {
    o.x = this.x;
    o.y = this.y;
    return this;
  }

  toObjectSize(o: Vec2Size) {
    o.width = this.x;
    o.height = this.y;
    return this;
  }

  toRect(...args: Vec2Args) {
    return vec2run(args, (x, y) => {
      const xRect = Math.min(this.x, x);
      const yRect = Math.min(this.y, y);
      const wRect = Math.abs(Math.max(this.x, x) - xRect);
      const hRect = Math.abs(Math.max(this.y, y) - yRect);
      return new DOMRect(xRect, yRect, wRect, hRect);
    });
  }

  static fromHash(hash: Vec2Hash, vec = new this()) {
    return vec.set(hash);
  }

  static fromAngle(d: number, vec = new this()) {
    return vec.set(Math.sin(d), Math.cos(d));
  }

  static fromPoint(point: Vec2Point, vec = new this()) {
    return vec.set(point.x, point.y);
  }

  static fromRandom(vec = new this()) {
    return vec.set(Math.random(), Math.random());
  }

  static fromSrandom(vec = new this()) {
    return vec.set(Math.random(), Math.random()).times(2).minus(1);
  }

  static fromSize(size: Vec2Size, vec = new this()) {
    return vec.set(size.width, size.height);
  }

  static fromDeltaXY(page: TDeltaXY, vec = new this()) {
    return vec.set(page.deltaX, page.deltaY);
  }

  static fromPageXY(page: TPageXY, vec = new this()) {
    return vec.set(page.pageX, page.pageY);
  }

  static fromOffsetXY(offset: TOffsetXY, vec = new this()) {
    return vec.set(offset.offsetX, offset.offsetY);
  }

  static fromOffsetSize(elem: HTMLElement, vec = new this()) {
    return vec.set(elem.offsetWidth, elem.offsetHeight);
  }

  static fromSvgLength(x: SVGAnimatedLength, y: SVGAnimatedLength, vec = new this()) {
    return vec.set(x.baseVal.value, y.baseVal.value);
  }
}

export class Vec2Map<T> {
  #data = new Map<number, Map<number, T>>();

  has(...args: Vec2Args) {
    return vec2run(args, (x, y) => {
      return Boolean(this.#data.get(y)?.has(x));
    });
  }

  get(...args: Vec2Args) {
    return vec2run(args, (x, y) => {
      return this.#data.get(y)?.get(x);
    });
  }

  delete(...args: Vec2Args) {
    return vec2run(args, (x, y) => {
      return Boolean(this.#data.get(y)?.delete(x));
    });
  }

  set(value: T, ...args: Vec2Args) {
    return vec2run(args, (x, y) => {
      (this.#data.get(y) ?? (
        this.#data.set(y, new Map()),
        this.#data.get(y)!
      )).set(x, value);
      return this;
    });
  }

  clear() {
    this.#data.clear();
    return;
  }

  forEach(callback: (key: Vec2, value: T, self: this) => any) {
    for (const [key, value] of this) {
      callback(key, value, this);
    }
  }

  *[Symbol.iterator]() {
    for (const [y, row] of this.#data) {
      for (const [x, value] of row) {
        yield [vec2(x, y), value] as [key: Vec2, value: T];
      }
    }
  }
}

export class Vec2Set {
  #data = new Map<number, Set<number>>();

  has(...args: Vec2Args) {
    return vec2run(args, (x, y) => {
      return Boolean(this.#data.get(y)?.has(x));
    });
  }

  add(...args: Vec2Args) {
    return vec2run(args, (x, y) => {
      (this.#data.get(y) ?? (
        this.#data.set(y, new Set()),
        this.#data.get(y)!
      )).add(x);
      return this;
    });
  }

  clear() {
    this.#data.clear();
    return;
  }

  forEach(callback: (key: Vec2, self: this) => any) {
    for (const key of this) {
      callback(key, this);
    }
  }

  *[Symbol.iterator]() {
    for (const [y, row] of this.#data) {
      for (const x of row) {
        yield vec2(x, y);
      }
    }
  }
}