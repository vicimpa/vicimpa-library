import { Vec2, vec2 } from "@vicimpa/lib-vec2";

import { windowEvents } from "@vicimpa/events";

export type TDragEvent = {
  start: Vec2;
  current: Vec2;
  delta: Vec2;
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

  return (e: MouseEvent | TouchEvent | { nativeEvent: MouseEvent | TouchEvent; }, ...meta: T) => {
    if (used)
      return;

    used = true;

    if ('nativeEvent' in e)
      e = e.nativeEvent;

    let id = -1;

    if (e instanceof MouseEvent)
      if (e.button !== btn)
        return;

    if (e instanceof TouchEvent)
      id = e.changedTouches[0].identifier;

    const getPosition = (e: MouseEvent | TouchEvent, vec = vec2()) => {
      if (e instanceof MouseEvent)
        return fromOffset ? Vec2.fromOffsetXY(e, vec) : Vec2.fromPageXY(e, vec);

      const find = [...e.changedTouches].find(e => e.identifier === id);
      if (!find) return null;
      return Vec2.fromPageXY(find, vec);
    };

    e.preventDefault();
    e.stopPropagation();

    const start = getPosition(e)!;
    const current = start.clone();
    const delta = new Vec2(0);

    const event = {
      get start() {
        return start.clone();
      },
      get current() {
        return current.clone();
      },
      get delta() {
        return delta.clone();
      },
      target: e.target
    };

    const update = () => {
      if (!move) return;
      stop = move(event, ...meta);
    };

    let move = dragStart(event, ...meta);
    let stop: TDragStop<T> | void;

    update();

    const unsub = [
      windowEvents(['mouseup', 'touchend', 'blur'], (e) => {
        if (e instanceof MouseEvent && e.button !== btn)
          return;

        if (e instanceof TouchEvent && !getPosition(e))
          return;

        stop && stop(event, ...meta);
        unsub.forEach(u => u?.());
      }),
      windowEvents(['mousemove', 'touchmove'], (e) => {
        if (!getPosition(e, current)) return;
        delta.set(start).minus(current);
        update();
      }),
      () => {
        move = undefined;
        stop = undefined;
        used = false;
      }
    ];
  };
};