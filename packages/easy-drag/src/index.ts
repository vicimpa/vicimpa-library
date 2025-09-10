import { windowEvents } from "@vicimpa/events";

export type Point = { x: number; y: number; };

const point = (x = 0, y = 0): Point => ({ x, y });
const clone = (p: Point): Point => ({ x: p.x, y: p.y });
const set = (a: Point, b: Point): Point => {
  a.x = b.x;
  a.y = b.y;
  return a;
};
const minus = (a: Point, b: Point): Point => {
  a.x -= b.x;
  a.y -= b.y;
  return a;
};
const fromPageXY = (e: PointerEvent, out: Point = point()): Point => {
  out.x = e.pageX;
  out.y = e.pageY;
  return out;
};
const fromOffsetXY = (e: PointerEvent, out: Point = point()): Point => {
  out.x = e.offsetX;
  out.y = e.offsetY;
  return out;
};

export type TDragEvent = {
  start: Point;
  current: Point;
  delta: Point;
  target: EventTarget | null;
};

export type TDragStop<T extends any[] = []> = (e: TDragEvent, ...meta: T) => void;
export type TDragMove<T extends any[] = []> = (e: TDragEvent, ...meta: T) => void | TDragStop<T>;
export type TDragStart<T extends any[] = []> = (e: TDragEvent, ...meta: T) => void | TDragMove<T>;

export const makeDrag = <T extends any[] = []>(
  dragStart: TDragStart<T>,
  btn = 0,
  fromOffset = false
) => {
  let used = false;

  return (e: PointerEvent | { nativeEvent: PointerEvent; }, ...meta: T) => {
    if (used) return;
    used = true;

    if ("nativeEvent" in e) e = e.nativeEvent;

    if (e.button !== btn) return;

    const getPosition = (e: PointerEvent, out = point()) =>
      fromOffset ? fromOffsetXY(e, out) : fromPageXY(e, out);

    e.preventDefault();
    e.stopPropagation();

    const start = getPosition(e)!;
    const current = clone(start);
    const delta = point();

    const event = {
      get start() {
        return clone(start);
      },
      get current() {
        return clone(current);
      },
      get delta() {
        return clone(delta);
      },
      target: e.target,
    };

    const update = () => {
      if (!move) return;
      stop = move(event, ...meta);
    };

    let move = dragStart(event, ...meta);
    let stop: TDragStop<T> | void;

    update();

    const unsub = [
      windowEvents(["pointerup", "blur"], (e) => {
        const pe = e as PointerEvent;
        if (pe.button !== btn) return;

        stop && stop(event, ...meta);
        unsub.forEach((u) => u?.());
      }),
      windowEvents(["pointermove"], (e) => {
        const pe = e as PointerEvent;
        getPosition(pe, current);
        set(delta, start);
        minus(delta, current);
        update();
      }),
      () => {
        move = undefined;
        stop = undefined;
        used = false;
      },
    ];
  };
};
