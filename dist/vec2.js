"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vec2 = void 0;
exports.mutation = mutation;
function mutation(args, mutation) {
    var _a;
    var first = (_a = args[0]) !== null && _a !== void 0 ? _a : 0;
    if (typeof first === 'number') {
        if (typeof args[1] === 'number')
            return mutation.call(null, first, args[1]);
        return mutation.call(null, first, first);
    }
    if (first && ('x' in first) && ('y' in first))
        return mutation.call(null, first.x, first.y);
    throw new Error('Unknown format');
}
class Vec2 {
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
    get tuple() {
        return [this.x, this.y];
    }
    get size() {
        return {
            width: this.x,
            height: this.y
        };
    }
    get point() {
        return {
            x: this.x,
            y: this.y
        };
    }
    constructor(...args) {
        this.read = false;
        this.x = 0;
        this.y = 0;
        this.set(...args);
    }
    equal(...args) {
        return mutation(args, (x, y) => {
            return x === this.x && y === this.y;
        });
    }
    inRect(...args) {
        const [x, y, w, h] = args.reduce((acc, e) => (e instanceof Vec2 ? (acc.concat(e.x, e.y)) : (acc.concat(e))), []);
        return (this.x >= x &&
            this.y >= y &&
            this.x <= w + x &&
            this.y <= h + y);
    }
    cropMin(...args) {
        mutation(args, (x, y) => {
            this.x = Math.max(this.x, x);
            this.y = Math.max(this.y, y);
        });
        return this;
    }
    cropMax(...args) {
        mutation(args, (x, y) => {
            this.x = Math.min(this.x, x);
            this.y = Math.min(this.y, y);
        });
        return this;
    }
    set(...args) {
        mutation(args, (x, y) => {
            this.x = x;
            this.y = y;
        });
        return this;
    }
    plus(...args) {
        mutation(args, (x, y) => {
            this.x += x;
            this.y += y;
        });
        return this;
    }
    minus(...args) {
        mutation(args, (x, y) => {
            this.x -= x;
            this.y -= y;
        });
        return this;
    }
    times(...args) {
        mutation(args, (x, y) => {
            this.x *= x;
            this.y *= y;
        });
        return this;
    }
    div(...args) {
        mutation(args, (x, y) => {
            this.x /= x;
            this.y /= y;
        });
        return this;
    }
    rem(...args) {
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
    lerp(to, i) {
        return this.plus(to.cminus(this).times(i));
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
    cplus(...args) {
        return this.clone().plus(...args);
    }
    cminus(...args) {
        return this.clone().minus(...args);
    }
    ctimes(...args) {
        return this.clone().times(...args);
    }
    cdiv(...args) {
        return this.clone().div(...args);
    }
    crem(...args) {
        return this.clone().rem(...args);
    }
    cinverse() {
        return this.clone().inverse();
    }
    cnormalize() {
        return this.clone().normalize();
    }
    clerp(to, i) {
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
    distance(...args) {
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
    toObject(o) {
        o.x = this.x;
        o.y = this.y;
        return this;
    }
    toRect(...args) {
        return mutation(args, (x, y) => {
            const xRect = Math.min(this.x, x);
            const yRect = Math.min(this.y, y);
            const wRect = Math.abs(Math.max(this.x, x) - xRect);
            const hRect = Math.abs(Math.max(this.y, y) - yRect);
            return new DOMRect(xRect, yRect, wRect, hRect);
        });
    }
    static fromAngle(d, vec = new this()) {
        return vec.set(Math.sin(d), Math.cos(d));
    }
    static fromPoint(point, vec = new this()) {
        return vec.set(point.x, point.y);
    }
    static fromSize(size, vec = new this()) {
        return vec.set(size.width, size.height);
    }
    static fromDeltaXY(page, vec = new this()) {
        return vec.set(page.deltaX, page.deltaY);
    }
    static fromPageXY(page, vec = new this()) {
        return vec.set(page.pageX, page.pageY);
    }
    static fromOffsetXY(offset, vec = new this()) {
        return vec.set(offset.offsetX, offset.offsetY);
    }
    static fromOffsetSize(elem, vec = new this()) {
        return vec.set(elem.offsetWidth, elem.offsetHeight);
    }
    static fromSvgLength(x, y, vec = new this()) {
        return vec.set(x.baseVal.value, y.baseVal.value);
    }
}
exports.Vec2 = Vec2;
