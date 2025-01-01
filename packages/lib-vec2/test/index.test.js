const { vec2 } = require('../');

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
});