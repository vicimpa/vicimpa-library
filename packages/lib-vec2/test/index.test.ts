import { Vec2Map, Vec2Set, vec2 } from "../src";

describe('vec2point', () => {
  test('vec2 arguments', () => {
    expect(vec2()).toEqual({ x: 0, y: 0 });
    expect(vec2(0)).toEqual({ x: 0, y: 0 });
    expect(vec2(1, 2)).toEqual({ x: 1, y: 2 });
    expect(vec2([1, 2])).toEqual({ x: 1, y: 2 });
    expect(vec2({ x: 1, y: 2 })).toEqual({ x: 1, y: 2 });
  });

  test('vec2 base', () => {
    const a = vec2();
    const b = vec2(1, 2);
    const c = b.clone();
    const point = { x: 0, y: 0 };
    const size = { width: 0, height: 0 };

    a.set(b);
    a.toObject(point);
    a.toObjectSize(size);

    expect(a.equal(b)).toBeTruthy();
    expect(a === b).toBeFalsy();
    expect(a).toEqual({ x: 1, y: 2 });
    expect(b).toEqual({ x: 1, y: 2 });
    expect(a.size).toEqual({ width: 1, height: 2 });
    expect(a.tuple).toEqual([1, 2]);
    expect(a.point).toEqual({ x: 1, y: 2 });
    expect(a.s).toEqual({ width: 1, height: 2 });
    expect(a.t).toEqual([1, 2]);
    expect(a.p).toEqual({ x: 1, y: 2 });
    expect([...a]).toEqual([1, 2]);
    expect(a.toString()).toEqual(`Vec2 { x: 1, y: 2 }`);
    expect(c).toEqual({ x: 1, y: 2 });
    expect(b === c).toBeFalsy();
    expect(point).toEqual({ x: 1, y: 2 });
    expect(size).toEqual({ width: 1, height: 2 });
  });

  test('vec2 math', () => {
    expect(vec2().plus(1, 2)).toEqual({ x: 1, y: 2 });
    expect(vec2().minus(1, 2)).toEqual({ x: -1, y: -2 });
    expect(vec2(2).times(2, 3)).toEqual({ x: 4, y: 6 });
    expect(vec2(12).div(3, 4)).toEqual({ x: 4, y: 3 });
    expect(vec2(12).rem(5, 7)).toEqual({ x: 2, y: 5 });
    expect(vec2(2).pow(3, 4)).toEqual({ x: 8, y: 16 });
    expect(vec2(-1, 1).abs()).toEqual({ x: 1, y: 1 });
    expect(vec2(21, -3).abs()).toEqual({ x: 21, y: 3 });
    expect(vec2(31, -12).sign()).toEqual({ x: 1, y: -1 });
    expect(vec2(12.54, 12.12).round()).toEqual({ x: 13, y: 12 });
    expect(vec2(12.54, 12.12).ceil()).toEqual({ x: 13, y: 13 });
    expect(vec2(12.54, 12.12).floor()).toEqual({ x: 12, y: 12 });
  });

  test('vec2 utils', () => {
    expect(vec2(1, 1).angle()).toEqual(Math.PI / 4);
    expect(vec2(1, 1).length()).toEqual(Math.hypot(1, 1));
    expect(vec2(1, 1).distance(2, 2)).toEqual(Math.hypot(1, 1));
    expect(vec2(1, 2).inverse()).toEqual({ x: 2, y: 1 });
    expect(vec2(0, 4).normalize()).toEqual({ x: 0, y: 1 });
    expect(vec2(1, 4).min()).toEqual(1);
    expect(vec2(1, 4).max()).toEqual(4);
  });

  test('vec2 clamp', () => {
    expect(vec2(13, 12).clampMax(10, 11)).toEqual({ x: 10, y: 11 });
    expect(vec2(-13, -12).clampMin(-10, -11)).toEqual({ x: -10, y: -11 });
    expect(vec2(13, 12).clamp(-10, 11)).toEqual({ x: 11, y: 11 });
    expect(vec2(-13, -12).clamp(-10, 11)).toEqual({ x: -10, y: -10 });
  });

  test('vec2 copy math', () => {
    const a = { x: 12.54, y: -11.45 };
    const b = { x: 3, y: 4 };

    const base = vec2(a,);

    expect(base.cplus(b.x, b.y)).toEqual({ x: a.x + b.x, y: a.y + b.y });
    expect(base).toEqual(a);

    expect(base.cminus(b.x, b.y)).toEqual({ x: a.x - b.x, y: a.y - b.y });
    expect(base).toEqual(a);

    expect(base.ctimes(b.x, b.y)).toEqual({ x: a.x * b.x, y: a.y * b.y });
    expect(base).toEqual(a);

    expect(base.cdiv(b.x, b.y)).toEqual({ x: a.x / b.x, y: a.y / b.y });
    expect(base).toEqual(a);

    expect(base.crem(b.x, b.y)).toEqual({ x: a.x % b.x, y: a.y % b.y });
    expect(base).toEqual(a);

    expect(base.cpow(b.x, b.y)).toEqual({ x: a.x ** b.x, y: a.y ** b.y });
    expect(base).toEqual(a);

    expect(base.cabs()).toEqual({ x: Math.abs(a.x), y: Math.abs(a.y) });
    expect(base).toEqual(a);

    expect(base.csign()).toEqual({ x: Math.sign(a.x), y: Math.sign(a.y) });
    expect(base).toEqual(a);

    expect(base.cround()).toEqual({ x: Math.round(a.x), y: Math.round(a.y) });
    expect(base).toEqual(a);

    expect(base.cceil()).toEqual({ x: Math.ceil(a.x), y: Math.ceil(a.y) });
    expect(base).toEqual(a);

    expect(base.cfloor()).toEqual({ x: Math.floor(a.x), y: Math.floor(a.y) });
    expect(base).toEqual(a);
  });

  test('vec2 copy utils', () => {
    const a = { x: 12.54, y: -11.45 };
    const h = Math.hypot(a.x, a.y);
    const base = vec2(a);

    expect(base.cinverse()).toEqual({ x: a.y, y: a.x });
    expect(base).toEqual(a);

    expect(base.cnormalize()).toEqual({ x: a.x / h, y: a.y / h });
    expect(base).toEqual(a);
  });

  test('vec2 copy clamp', () => {
    const a = { x: 12.54, y: -11.45 };
    const bmin = { x: -10, y: -11 };
    const bmax = { x: 10, y: 11 };

    const base = vec2(a);

    expect(base.cclampMin(bmin)).toEqual({ x: Math.max(a.x, bmin.x), y: Math.max(a.y, bmin.y) });
    expect(base).toEqual(a);

    expect(base.cclampMax(bmax)).toEqual({ x: Math.min(a.x, bmax.x), y: Math.min(a.y, bmax.y) });
    expect(base).toEqual(a);
  });

  test('vec2map', () => {
    const map = new Vec2Map<'a' | 'b' | 'c'>();
    const args: any[] = [];
    map.set(0, 'a');
    map.set(1, 'b');
    map.set(2, 'c');
    map.forEach((..._args) => args.push(_args));
    expect(map.size).toEqual(3);
    expect([...map]).toEqual([
      [vec2(0), 'a'],
      [vec2(1), 'b'],
      [vec2(2), 'c']
    ]);
    expect(args).toEqual([
      ['a', vec2(0)],
      ['b', vec2(1)],
      ['c', vec2(2)]
    ]);
    map.clear();
    expect(map.size).toEqual(0);
    map.set(0, 'a');
    expect(map.size).toEqual(1);
    map.set(0, 'b');
    expect(map.size).toEqual(1);
    expect(map.get(0)).toEqual('b');
    map.set(0, 'c');
    expect(map.get(0)).toEqual('c');
    map.delete(0);
    expect(map.size).toEqual(0);
    expect(map.has(0)).toEqual(false);
    map.set(0, 'a');
    expect(map.has(0)).toEqual(true);
    expect(map.get(0)).toEqual('a');
    expect(map.get(1)).toEqual(undefined);
  });

  test('vec2set', () => {
    const set = new Vec2Set();
    const args: any[] = [];
    set.add(0);
    set.add(1);
    set.add(2);
    set.forEach((..._args) => args.push(_args));
    expect(set.size).toEqual(3);
    expect([...set]).toEqual([
      vec2(0),
      vec2(1),
      vec2(2)
    ]);
    expect(args).toEqual([
      [vec2(0)],
      [vec2(1)],
      [vec2(2)]
    ]);
    set.clear();
    expect(set.size).toEqual(0);
    set.add(0);
    expect(set.size).toEqual(1);
    set.add(0);
    expect(set.size).toEqual(1);
    set.delete(0);
    expect(set.size).toEqual(0);
    expect(set.has(0)).toEqual(false);
    set.add(0);
    expect(set.has(0)).toEqual(true);
    expect(set.has(1)).toEqual(false);
  });
});