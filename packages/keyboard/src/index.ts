import { Code } from "./code";

export { Code };

const DOWN = new Set<string>();
const PRESS = new Set<string>();
const TIMEOUT = new Map<string, () => void>();
const COUNT = new Map<string, number>();

window.addEventListener('keydown', ({ code, repeat }) => {
  if (repeat) return;
  DOWN.add(code);
});

window.addEventListener('keyup', ({ code }) => {
  DOWN.delete(code);
});

window.addEventListener('blur', () => {
  DOWN.clear();
  PRESS.clear();
  TIMEOUT.clear();
});

export function keyDown(code: string | string[]) {
  if (Array.isArray(code))
    return code.findIndex(keyDown) !== -1;

  return DOWN.has(code);
}

export function keysDownAll(codes: string[]) {
  return codes.every(keyDown);
}

export type KeyPressOptions = {
  every?: number;
  skip?: number;
};

export function keyPress(code: Code | Code[], { every, skip = 0 }: KeyPressOptions = {}) {
  const key = String(code);
  const count = COUNT.get(key) ?? 0;
  if (keyDown(code)) {
    if (!PRESS.has(key)) {
      nextTick(() => {
        PRESS.add(key);
        TIMEOUT.get(key)?.();
        if (every !== undefined) {
          TIMEOUT.set(key, (
            nextTimeout(() => {
              PRESS.delete(key);
            }, every)
          ));
        }
      });

      COUNT.set(key, count + 1);
      return count === 0 || count > skip;
    }

    return false;
  }
  PRESS.delete(key);
  COUNT.delete(key);
  return false;
}

export function keyPressAll(codes: Code[], options?: KeyPressOptions) {
  return keysDownAll(codes) && keyPress(codes, options);
}

function keysAxis(pos: Code | Code[]): number;
function keysAxis(neg: Code | Code[], pos?: Code | Code[]): number;
function keysAxis(neg: Code | Code[], pos?: Code | Code[]): number {
  if (!pos) return +keyDown(neg);
  return -keyDown(neg) + +keyDown(pos);
}

function keysAxisAll(pos: Code[]): number;
function keysAxisAll(neg: Code[], pos: Code[]): number;
function keysAxisAll(neg: Code[], pos?: Code[]): number {
  if (!pos) return +keysDownAll(neg);
  return -keysDownAll(neg) + +keysDownAll(pos);
}

export { keysAxis, keysAxisAll };

function nextTick(fn: Function) {
  Promise.resolve()
    .then(() => fn());

  return () => { fn = () => { }; };
}

function nextTimeout(fn: Function, n?: number) {
  return clearTimeout.bind(null, setTimeout(fn, n));
}