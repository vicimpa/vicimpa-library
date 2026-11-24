import { describe, expect, it } from "bun:test";
import { Mat2, Mat2d, Mat3, Mat4, Quat, Vec2, Vec3, Vec4, vec4 } from "../src";
import { expectEqualish } from "./helpers/test-utils";

describe("vector advanced operations", () => {
  it("rotates Vec2 around the origin and a custom center", () => {
    expectEqualish([...new Vec2(1, 0).rotate(Math.PI / 2)], [0, 1]);
    expectEqualish([...new Vec2(2, 1).rotate(Math.PI, new Vec2(1, 1))], [0, 1]);
  });

  it("applies linear and affine 2D matrices", () => {
    const linear = new Mat2().set(0, 1, -1, 0);
    const affine = new Mat2d().fromTranslation(new Vec2(3, 4)).rotate(Math.PI / 2);

    expectEqualish([...new Vec2(1, 0).applyMat2(linear)], [0, 1]);
    expectEqualish([...new Vec2(1, 0).applyMat2d(affine)], [3, 5]);
  });

  it("matches axis rotations and arbitrary-axis rotation with Mat4 and Quat", () => {
    const axis = new Vec3(1, 2, 3).normalize();
    const angle = 0.7;
    const vector = new Vec3(2, -1, 3);
    const matrix = new Mat4().fromRotation(angle, axis);
    const quaternion = new Quat().setAxisAngle(axis, angle);

    expectEqualish(
      [...vector.clone().rotateAround(angle, axis)],
      [...vector.clone().applyMat4(matrix)],
    );
    expectEqualish(
      [...vector.clone().rotateAround(angle, axis)],
      [...vector.clone().applyQuat(quaternion)],
    );
    expectEqualish([...new Vec3(1, 0, 0).rotateY(Math.PI / 2)], [0, 0, -1]);
    expectEqualish([...new Vec3(0, 1, 0).rotateX(Math.PI / 2)], [0, 0, 1]);
    expectEqualish([...new Vec3(1, 0, 0).rotateZ(Math.PI / 2)], [0, 1, 0]);
  });

  it("applies Mat3 and homogeneous Mat4 transforms", () => {
    const rotation = new Quat().setAxisAngle(Vec3.FORWARD, Math.PI / 2);
    const mat3 = new Mat3().fromQuat(rotation);
    const mat4 = new Mat4().fromRotationTranslation(rotation, new Vec3(3, 4, 5));

    expectEqualish([...new Vec3(1, 0, 0).applyMat3(mat3)], [0, 1, 0]);
    expectEqualish([...new Vec4(1, 0, 0, 1).applyMat4(mat4)], [3, 5, 5, 1]);
    expectEqualish([...new Vec4(1, 0, 0, 0).applyMat4(mat4)], [0, 1, 0, 0]);
  });

  it("keeps zero vectors finite during normalization", () => {
    expectEqualish([...new Vec2().normalize()], [0, 0]);
    expectEqualish([...new Vec3().normalize()], [0, 0, 0]);
    expectEqualish([...new Vec4().normalize()], [0, 0, 0, 0]);
  });

  it("creates random vectors with the requested length and keeps the legacy alias", () => {
    const vectors = [new Vec2(), new Vec3(), new Vec4()];

    for (const vector of vectors) {
      expect(vector.random(2.5)).toBe(vector);
      expectEqualish(vector.length(), 2.5);
      expect([...vector].every(Number.isFinite)).toBe(true);

      expect(vector.rendom(1.5)).toBe(vector);
      expectEqualish(vector.length(), 1.5);
      expect([...vector].every(Number.isFinite)).toBe(true);
    }
  });

  it("supports the Vec4(x, Vec2, w) factory overload", () => {
    expectEqualish([...vec4(1, new Vec2(2, 3), 4)], [1, 2, 3, 4]);
  });

  it("round-trips arrays with offsets", () => {
    const target = [99, 99, 99, 99, 99, 99];
    const vector = new Vec4(1, 2, 3, 4);

    expect(vector.toArray(target, 1)).toBe(target);
    expect(target).toEqual([99, 1, 2, 3, 4, 99]);
    expectEqualish([...new Vec4().fromArray(target, 1)], [1, 2, 3, 4]);
  });
});
