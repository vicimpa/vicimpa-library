export type TMutation = (x: number, y: number) => any;
export type TPointVec2 = { x: number, y: number; };
export type TTupleVec2 = [x: number, y: number];
export type TSizeVec2 = { width: number, height: number; };
export type TPageXY = { pageX: number, pageY: number; };
export type TOffsetXY = { offsetX: number, offsetY: number; };
export type TDeltaXY = { deltaX: number, deltaY: number; };
export type TRect2 = [
  ...([x: number, y: number] | [xy: Vec2]),
  ...([w: number, h: number] | [wh: Vec2])
];

export type TParameter = (
  never
  | []
  | [vec: Vec2]
  | [xy: TPointVec2]
  | [xy: number]
  | TTupleVec2
);

export function mutation<F extends TMutation>(args: TParameter, mutation: F): ReturnType<F> {
  var first = args[0] ?? 0;

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
    return `${this.x} ${this.y}`;
  }

  get tuple(): TTupleVec2 {
    return [this.x, this.y];
  }

  get size(): TSizeVec2 {
    return {
      width: this.x,
      height: this.y
    };
  }

  get point(): TPointVec2 {
    return {
      x: this.x,
      y: this.y
    };
  }

  constructor(...args: TParameter) {
    this.set(...args);
  }

  equal(...args: TParameter) {
    return mutation(args, (x, y) => {
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

  cropMin(...args: TParameter) {
    mutation(args, (x, y) => {
      this.x = Math.max(this.x, x);
      this.y = Math.max(this.y, y);
    });
    return this;
  }

  cropMax(...args: TParameter) {
    mutation(args, (x, y) => {
      this.x = Math.min(this.x, x);
      this.y = Math.min(this.y, y);
    });
    return this;
  }

  set(...args: TParameter) {
    mutation(args, (x, y) => {
      this.x = x;
      this.y = y;
    });
    return this;
  }

  plus(...args: TParameter) {
    mutation(args, (x, y) => {
      this.x += x;
      this.y += y;
    });
    return this;
  }

  minus(...args: TParameter) {
    mutation(args, (x, y) => {
      this.x -= x;
      this.y -= y;
    });
    return this;
  }

  times(...args: TParameter) {
    mutation(args, (x, y) => {
      this.x *= x;
      this.y *= y;
    });
    return this;
  }

  div(...args: TParameter) {
    mutation(args, (x, y) => {
      this.x /= x;
      this.y /= y;
    });
    return this;
  }

  rem(...args: TParameter) {
    mutation(args, (x, y) => {
      this.x %= x;
      this.y %= y;
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

  clone() {
    return new Vec2(this);
  }

  cplus(...args: TParameter) {
    return this.clone().plus(...args);
  }

  cminus(...args: TParameter) {
    return this.clone().minus(...args);
  }

  ctimes(...args: TParameter) {
    return this.clone().times(...args);
  }

  cdiv(...args: TParameter) {
    return this.clone().div(...args);
  }

  crem(...args: TParameter) {
    return this.clone().rem(...args);
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

  length() {
    return Math.hypot(...this);
  }

  distance(...args: TParameter) {
    return this.cminus(...args).length();
  }

  normalize() {
    return this.div(this.length());
  }

  min() {
    return Math.min(...this);
  }

  max() {
    return Math.max(...this);
  }

  toObject(o: { x: number, y: number; }) {
    o.x = this.x;
    o.y = this.y;
    return this;
  }

  toRect(...args: TParameter) {
    return mutation(args, (x, y) => {
      const xRect = Math.min(this.x, x);
      const yRect = Math.min(this.y, y);
      const wRect = Math.abs(Math.max(this.x, x) - xRect);
      const hRect = Math.abs(Math.max(this.y, y) - yRect);
      return new DOMRect(xRect, yRect, wRect, hRect);
    });
  }

  static fromAngle(d: number, vec = new this()) {
    return vec.set(Math.sin(d), Math.cos(d));
  }

  static fromPoint(point: TPointVec2, vec = new this()) {
    return vec.set(point.x, point.y);
  }

  static fromSize(size: TSizeVec2, vec = new this()) {
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