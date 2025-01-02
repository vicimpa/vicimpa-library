export type Vec2Point = { x: number; y: number; };
export type Vec2Tuple = [x: number, y: number];
export type Vec2Size = { width: number, height: number; };
export type Vec2PageXY = { pageX: number, pageY: number; };
export type Vec2OffsetXY = { offsetX: number, offsetY: number; };
export type Vec2DeltaXY = { deltaX: number, deltaY: number; };
export type Vec2OffsetSize = { offsetWidth: number, offsetHeight: number; };
export type Vec2InnerSize = { innerWidth: number, innerHeight: number; };
export type Vec2Args = [xy: number | Vec2Point] | [x: number, y: number];
export type Vec2Clamp = [min: Vec2Args[0], max: Vec2Args[0]] | [minX: number, minY: number, maxX: number, maxY: number];

export function vec2(...args: Vec2Args | []): Vec2;
export function vec2(x?: number | Vec2Point, y?: number) {
  const vec = new Vec2();
  if (x === undefined) return vec;
  if (typeof x === 'object')
    return vec.set(x);
  return vec.set(x, y ?? x);
}

export class Vec2 {
  x = 0;
  y = 0;

  get point() { return { ...this } as Vec2Point; }
  get tuple() { return [...this] as Vec2Tuple; }
  get size() { return { width: this.x, height: this.y } as Vec2Size; }

  get p() { return this.point; }
  get t() { return this.tuple; }
  get s() { return this.size; }

  *[Symbol.iterator](): Iterator<number> {
    yield this.x;
    yield this.y;
  }

  toString(): string {
    return `Vec2 { x: ${this.x}, y: ${this.y} }`;
  }

  constructor(...args: Vec2Args | []);
  constructor(x?: number | Vec2Point, y?: number) {
    if (x === undefined) return;
    if (typeof x === 'object')
      return this.set(x);

    this.set(x, y ?? x);
  }

  equal(...args: Vec2Args): boolean;
  equal(x: number | Vec2Point, y?: number): boolean {
    if (typeof x === 'object') (y = x.y, x = x.x);
    return this.x === x && this.y === (y ?? x);
  }

  set(...args: Vec2Args): this;
  set(x: number | Vec2Point, y?: number): this {
    if (typeof x === 'object') (y = x.y, x = x.x);
    return (this.x = x, this.y = y ?? x, this);
  }

  toObject(o: Vec2Point): this {
    o.x = this.x;
    o.y = this.y;
    return this;
  }

  toObjectSize(o: Vec2Size): this {
    o.width = this.x;
    o.height = this.y;
    return this;
  }

  toTuple(o: Vec2Tuple): this {
    o[0] = this.x;
    o[1] = this.y;
    return this;
  }

  clone(): Vec2 {
    return new Vec2(this);
  }

  min(): number {
    return Math.min(this.x, this.y);
  }

  max(): number {
    return Math.max(this.x, this.y);
  }

  angle(): number {
    return Math.atan2(this.y, this.x);
  }

  length(): number {
    return Math.hypot(this.x, this.y);
  }

  distance(...args: Vec2Args): number;
  distance(x: number | Vec2Point, y?: number): number {
    if (typeof x === 'object') (y = x.y, x = x.x);
    return Math.hypot(this.x - x, this.y - (y ?? x));
  }

  dot(...args: Vec2Args): number;
  dot(x: number | Vec2Point, y?: number): number {
    if (typeof x === 'object') (y = x.y, x = x.x);
    return this.x * x + this.y * (y ?? x);
  }

  scalar(...args: Vec2Args): number;
  scalar(x: number | Vec2Point, y?: number): number {
    if (typeof x === 'object') (y = x.y, x = x.x);
    return this.dot(x, y ?? x) / Math.hypot(x, y ?? x);
  }

  plus(...args: Vec2Args): this;
  plus(x: number | Vec2Point, y?: number): this {
    if (typeof x === 'object') (y = x.y, x = x.x);
    return (this.x += x, this.y += y ?? x, this);
  }

  minus(...args: Vec2Args): this;
  minus(x: number | Vec2Point, y?: number): this {
    if (typeof x === 'object') (y = x.y, x = x.x);
    return (this.x -= x, this.y -= y ?? x, this);
  }

  times(...args: Vec2Args): this;
  times(x: number | Vec2Point, y?: number): this {
    if (typeof x === 'object') (y = x.y, x = x.x);
    return (this.x *= x, this.y *= y ?? x, this);
  }

  div(...args: Vec2Args): this;
  div(x: number | Vec2Point, y?: number): this {
    if (typeof x === 'object') (y = x.y, x = x.x);
    return (this.x /= x, this.y /= y ?? x, this);
  }

  rem(...args: Vec2Args): this;
  rem(x: number | Vec2Point, y?: number): this {
    if (typeof x === 'object') (y = x.y, x = x.x);
    return (this.x %= x, this.y %= y ?? x, this);
  }

  pow(...args: Vec2Args): this;
  pow(x: number | Vec2Point, y?: number): this {
    if (typeof x === 'object') (y = x.y, x = x.x);
    return (this.x **= x, this.y **= y ?? x, this);
  }

  abs(): this {
    this.x = Math.abs(this.x);
    this.y = Math.abs(this.y);
    return this;
  }

  sign(): this {
    this.x = Math.sign(this.x);
    this.y = Math.sign(this.y);
    return this;
  }

  round(): this {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
    return this;
  }

  ceil(): this {
    this.x = Math.ceil(this.x);
    this.y = Math.ceil(this.y);
    return this;
  }

  floor(): this {
    this.x = Math.floor(this.x);
    this.y = Math.floor(this.y);
    return this;
  }

  normalize(): this {
    return this.equal(0) ? this : this.div(this.length());
  }

  inverse(): this {
    return this.set(this.y, this.x);
  }

  clampMin(...args: Vec2Args): this;
  clampMin(x: number | Vec2Point, y?: number): this {
    if (typeof x === 'object') (y = x.y, x = x.x);
    this.x = Math.max(this.x, x);
    this.y = Math.max(this.y, y ?? x);
    return this;
  }

  clampMax(...args: Vec2Args): this;
  clampMax(x: number | Vec2Point, y?: number): this {
    if (typeof x === 'object') (y = x.y, x = x.x);
    this.x = Math.min(this.x, x);
    this.y = Math.min(this.y, y ?? x);
    return this;
  }

  clamp(...args: Vec2Clamp): this {
    if (args.length === 2)
      this.clampMin(args[0]).clampMax(args[1]);
    else if (args.length === 4)
      this.clampMin(args[0], args[1]).clampMax(args[2], args[3]);
    else
      throw new Error('Invalid arguments');

    return this;
  }

  cplus(...args: Vec2Args): Vec2;
  cplus(x: number | Vec2Point, y?: number): Vec2 {
    if (typeof x === 'object') (y = x.y, x = x.x);
    return this.clone().plus(x, y ?? x);
  }

  cminus(...args: Vec2Args): Vec2;
  cminus(x: number | Vec2Point, y?: number): Vec2 {
    if (typeof x === 'object') (y = x.y, x = x.x);
    return this.clone().minus(x, y ?? x);
  }

  ctimes(...args: Vec2Args): Vec2;
  ctimes(x: number | Vec2Point, y?: number): Vec2 {
    if (typeof x === 'object') (y = x.y, x = x.x);
    return this.clone().times(x, y ?? x);
  }

  cdiv(...args: Vec2Args): Vec2;
  cdiv(x: number | Vec2Point, y?: number): Vec2 {
    if (typeof x === 'object') (y = x.y, x = x.x);
    return this.clone().div(x, y ?? x);
  }

  crem(...args: Vec2Args): Vec2;
  crem(x: number | Vec2Point, y?: number): Vec2 {
    if (typeof x === 'object') (y = x.y, x = x.x);
    return this.clone().rem(x, y ?? x);
  }

  cpow(...args: Vec2Args): Vec2;
  cpow(x: number | Vec2Point, y?: number): Vec2 {
    if (typeof x === 'object') (y = x.y, x = x.x);
    return this.clone().pow(x, y ?? x);
  }

  cabs(): Vec2 {
    return this.clone().abs();
  }

  csign(): Vec2 {
    return this.clone().sign();
  }

  cround(): Vec2 {
    return this.clone().round();
  }

  cceil(): Vec2 {
    return this.clone().ceil();
  }

  cfloor(): Vec2 {
    return this.clone().floor();
  }

  cnormalize(): Vec2 {
    return this.clone().normalize();
  }

  cinverse(): Vec2 {
    return this.clone().inverse();
  }

  cclampMin(...args: Vec2Args): Vec2;
  cclampMin(x: number | Vec2Point, y?: number) {
    if (typeof x === 'object') (y = x.y, x = x.x);
    return this.clone().clampMin(x, y ?? x);
  }

  cclampMax(...args: Vec2Args): Vec2;
  cclampMax(x: number | Vec2Point, y?: number) {
    if (typeof x === 'object') (y = x.y, x = x.x);
    return this.clone().clampMax(x, y ?? x);
  }

  cclamp(...args: Vec2Clamp): Vec2 {
    return this.clone().clamp(...args);
  }

  static fromAngle(angle: number, vec = new this()): Vec2 {
    return vec.set(Math.sin(angle), Math.cos(angle));
  }

  static fromRandom(vec = new this()): Vec2 {
    return vec.set(Math.random(), Math.random());
  }

  static fromSrandom(vec = new this()): Vec2 {
    return this.fromRandom(vec).times(2).minus(1);
  }

  static fromSize(size: Vec2Size, vec = new this()): Vec2 {
    return vec.set(size.width, size.height);
  }

  static fromDeltaXY(page: Vec2DeltaXY, vec = new this()): Vec2 {
    return vec.set(page.deltaX, page.deltaY);
  }

  static fromPageXY(page: Vec2PageXY, vec = new this()): Vec2 {
    return vec.set(page.pageX, page.pageY);
  }

  static fromOffsetXY(offset: Vec2OffsetXY, vec = new this()): Vec2 {
    return vec.set(offset.offsetX, offset.offsetY);
  }

  static fromInnerSize(offsetSize: Vec2InnerSize, vec = new this()): Vec2 {
    return vec.set(offsetSize.innerWidth, offsetSize.innerHeight);
  }

  static fromOffsetSize(offsetSize: Vec2OffsetSize, vec = new this()): Vec2 {
    return vec.set(offsetSize.offsetWidth, offsetSize.offsetHeight);
  }

  static fromSvgLength(x: SVGAnimatedLength, y: SVGAnimatedLength, vec = new this()): Vec2 {
    return vec.set(x.baseVal.value, y.baseVal.value);
  }
}

export class Vec2Map<T> {
  private _data: Map<symbol, T> = new Map();
  private _keys: Record<number, Record<number, symbol>> = {};
  private _vectors: Record<symbol, { x: number, y: number; }> = {};

  get size(): number {
    return this._data.size;
  }

  has(...args: Vec2Args): boolean;
  has(x: number | Vec2Point, y?: number): boolean {
    if (typeof x === 'object') (y = x.y, x = x.x);
    return this._data.has(this._keys[x]?.[y ?? x]);
  }

  get(...args: Vec2Args): T | undefined;
  get(x: number | Vec2Point, y?: number): T | undefined {
    if (typeof x === 'object') (y = x.y, x = x.x);
    return this._data.get(this._keys[x]?.[y ?? x]);
  }

  set(...args: [...Vec2Args, value: T]): this;
  set(x: number | Vec2Point, y?: number | T, z?: T): this {
    if (z === undefined) (z = y as T, y = undefined);
    if (typeof x === 'object') (y = x.y, x = x.x);
    y = (y ?? x) as number;

    const key = (this._keys[x] ?? (
      this._keys[x] = {})
    )[y] ?? (this._keys[x][y] = Symbol(''));

    this._vectors[key] = { x, y };
    this._data.set(key, z);
    return this;
  }

  delete(...args: Vec2Args): boolean;
  delete(x: number | Vec2Point, y?: number): boolean {
    if (typeof x === 'object') (y = x.y, x = x.x);
    return !!this._data.delete(this._keys[x]?.[y ?? x]);
  }

  clear(): this {
    this._keys = {};
    this._vectors = {};
    this._data.clear();
    return this;
  }

  forEach(callback: (value: T, key: Vec2) => any): void {
    this._data.forEach((value, key) => {
      callback(value, vec2(this._vectors[key]));
    });
  }

  *[Symbol.iterator](): Iterator<[key: Vec2, value: T]> {
    for (const item of this._data) {
      yield [vec2(this._vectors[item[0]]), item[1]];
    }
  }
}

export class Vec2Set {
  private _data: Set<symbol> = new Set();
  private _keys: Record<number, Record<number, symbol>> = {};
  private _vectors: Record<symbol, { x: number, y: number; }> = {};

  get size(): number {
    return this._data.size;
  }

  has(...args: Vec2Args): boolean;
  has(x: number | Vec2Point, y?: number): boolean {
    if (typeof x === 'object') (y = x.y, x = x.x);
    return this._data.has(this._keys[x]?.[y ?? x]);
  }

  add(...args: Vec2Args): this;
  add(x: number | Vec2Point, y?: number): this {
    if (typeof x === 'object') (y = x.y, x = x.x);
    y = y ?? x;

    const key = (this._keys[x] ?? (
      this._keys[x] = {})
    )[y] ?? (this._keys[x][y] = Symbol(''));

    this._vectors[key] = { x, y };
    this._data.add(key);

    return this;
  }

  delete(...args: Vec2Args): boolean;
  delete(x: number | Vec2Point, y?: number): boolean {
    if (typeof x === 'object') (y = x.y, x = x.x);
    return !!this._data.delete(this._keys[x]?.[y ?? x]);
  }

  clear(): this {
    this._keys = {};
    this._vectors = {};
    this._data.clear();
    return this;
  }

  forEach(callback: (value: Vec2) => any): void {
    this._data.forEach((value) => {
      callback(vec2(this._vectors[value]));
    });
  }

  *[Symbol.iterator](): Iterator<Vec2> {
    for (const item of this._data) {
      yield vec2(this._vectors[item]);
    }
  }
}