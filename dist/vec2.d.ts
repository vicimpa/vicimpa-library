export type TMutation = (x: number, y: number) => any;
export type TPointVec2 = {
    x: number;
    y: number;
};
export type TTupleVec2 = [x: number, y: number];
export type TSizeVec2 = {
    width: number;
    height: number;
};
export type TPageXY = {
    pageX: number;
    pageY: number;
};
export type TOffsetXY = {
    offsetX: number;
    offsetY: number;
};
export type TDeltaXY = {
    deltaX: number;
    deltaY: number;
};
export type TRect2 = [
    ...([x: number, y: number] | [xy: Vec2]),
    ...([w: number, h: number] | [wh: Vec2])
];
export type TParameter = (never | [] | [vec: Vec2] | [xy: TPointVec2] | [xy: number] | TTupleVec2);
export declare function mutation<F extends TMutation>(args: TParameter, mutation: F): ReturnType<F>;
export declare class Vec2 {
    read: boolean;
    x: number;
    y: number;
    [Symbol.iterator](): Generator<number, void, unknown>;
    [Symbol.toStringTag](): string;
    toString(): string;
    get tuple(): TTupleVec2;
    get size(): TSizeVec2;
    get point(): TPointVec2;
    constructor(...args: TParameter);
    equal(...args: TParameter): boolean;
    inRect(...args: TRect2): boolean;
    cropMin(...args: TParameter): this;
    cropMax(...args: TParameter): this;
    set(...args: TParameter): this;
    plus(...args: TParameter): this;
    minus(...args: TParameter): this;
    times(...args: TParameter): this;
    div(...args: TParameter): this;
    rem(...args: TParameter): this;
    round(): this;
    ceil(): this;
    floor(): this;
    inverse(): this;
    lerp(to: Vec2, i: number): this;
    sign(): this;
    abs(): this;
    clone(): Vec2;
    cplus(...args: TParameter): Vec2;
    cminus(...args: TParameter): Vec2;
    ctimes(...args: TParameter): Vec2;
    cdiv(...args: TParameter): Vec2;
    crem(...args: TParameter): Vec2;
    cinverse(): Vec2;
    cnormalize(): Vec2;
    clerp(to: Vec2, i: number): Vec2;
    csign(): Vec2;
    cabs(): Vec2;
    cround(): Vec2;
    cceil(): Vec2;
    cfloor(): Vec2;
    length(): number;
    distance(...args: TParameter): number;
    normalize(): this;
    min(): number;
    max(): number;
    toObject(o: {
        x: number;
        y: number;
    }): this;
    toRect(...args: TParameter): DOMRect;
    static fromAngle(d: number, vec?: Vec2): Vec2;
    static fromPoint(point: TPointVec2, vec?: Vec2): Vec2;
    static fromSize(size: TSizeVec2, vec?: Vec2): Vec2;
    static fromDeltaXY(page: TDeltaXY, vec?: Vec2): Vec2;
    static fromPageXY(page: TPageXY, vec?: Vec2): Vec2;
    static fromOffsetXY(offset: TOffsetXY, vec?: Vec2): Vec2;
    static fromOffsetSize(elem: HTMLElement, vec?: Vec2): Vec2;
    static fromSvgLength(x: SVGAnimatedLength, y: SVGAnimatedLength, vec?: Vec2): Vec2;
}
