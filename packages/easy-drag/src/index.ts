import { Vec2 } from "@vicimpa/lib-vec2";
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
) => (e: MouseEvent | { nativeEvent: MouseEvent; }, ...meta: T) => {
  if ('nativeEvent' in e)
    e = e.nativeEvent;

  if (e.button !== btn)
    return;

  e.preventDefault();
  e.stopPropagation();

  const start = fromOffset ? Vec2.fromOffsetXY(e as MouseEvent) : Vec2.fromPageXY(e);
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
    windowEvents(['mouseup', 'blur'], (e) => {
      if ('button' in e && e.button !== btn)
        return;

      stop instanceof Function && stop(event, ...meta);
      unsub.forEach(u => u?.());
    }),
    windowEvents('mousemove', (e) => {
      if (fromOffset)
        Vec2.fromOffsetXY(e, current);
      else
        Vec2.fromPageXY(e, current);
      delta.set(start).minus(current);
      update();
    }),
    () => {
      move = undefined;
      stop = undefined;
    }
  ];
};