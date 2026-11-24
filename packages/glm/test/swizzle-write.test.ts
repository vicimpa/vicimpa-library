import { describe, expect, it } from "bun:test";
import { Vec2, Vec3, Vec4 } from "../src";

const indices: Record<string, number> = { x: 0, y: 1, z: 2, w: 3 };

function permutations(keys: string[], length: number, prefix = ""): string[] {
  if (prefix.length === length) return [prefix];

  return keys.flatMap(key => prefix.includes(key)
    ? []
    : permutations(keys, length, prefix + key)
  );
}

function expectedAssignment(size: number, pattern: string, values: number[]) {
  const expected = Array.from({ length: size }, (_, index) => index + 1);

  [...pattern].forEach((key, index) => {
    expected[indices[key]] = values[index];
  });

  return expected;
}

describe("swizzle assignment", () => {
  it("assigns every unique two-component Vec2 pattern", () => {
    for (const pattern of permutations(["x", "y"], 2)) {
      const vector = new Vec2(1, 2);
      (vector as any)[pattern] = new Vec2(8, 9);

      expect({ pattern, values: [...vector] }).toEqual({
        pattern,
        values: expectedAssignment(2, pattern, [8, 9]),
      });
    }
  });

  it("assigns every unique two- and three-component Vec3 pattern", () => {
    for (const size of [2, 3]) {
      const values = [8, 9, 10];

      for (const pattern of permutations(["x", "y", "z"], size)) {
        const vector = new Vec3(1, 2, 3);
        const value = size === 2
          ? new Vec2(...values.slice(0, 2) as [number, number])
          : new Vec3(...values as [number, number, number]);
        (vector as any)[pattern] = value;

        expect({ pattern, values: [...vector] }).toEqual({
          pattern,
          values: expectedAssignment(3, pattern, values),
        });
      }
    }
  });

  it("assigns every unique Vec4 pattern without touching other components", () => {
    const values = [8, 9, 10, 11];

    for (const size of [2, 3, 4]) {
      for (const pattern of permutations(["x", "y", "z", "w"], size)) {
        const vector = new Vec4(1, 2, 3, 4);
        const tuple = values.slice(0, size);
        const value = size === 2
          ? new Vec2(...tuple as [number, number])
          : size === 3
            ? new Vec3(...tuple as [number, number, number])
            : new Vec4(...tuple as [number, number, number, number]);
        (vector as any)[pattern] = value;

        expect({ pattern, values: [...vector] }).toEqual({
          pattern,
          values: expectedAssignment(4, pattern, values),
        });
      }
    }
  });

  it("evaluates the right-hand side before aliased assignments", () => {
    const vec2 = new Vec2(1, 2);
    vec2.yx = vec2;
    expect([...vec2]).toEqual([2, 1]);

    const vec3 = new Vec3(1, 2, 3);
    vec3.zxy = vec3;
    expect([...vec3]).toEqual([2, 3, 1]);

    const vec4 = new Vec4(1, 2, 3, 4);
    vec4.wxyz = vec4;
    expect([...vec4]).toEqual([2, 3, 4, 1]);
  });
});
