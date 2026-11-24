import { describe, it } from "bun:test";
import { EulerOrder, Mat3, Quat, toRadian, Vec3 } from "../src";
import { expectEqualish } from "./helpers/test-utils";

function expectSameRotation(actual: Quat, expected: Quat) {
  const a = actual.clone().normalize();
  const b = expected.clone().normalize();
  const dot = a.x * b.x + a.y * b.y + a.z * b.z + a.w * b.w;
  expectEqualish(Math.abs(dot), 1, 1e-5);
}

describe("Quat advanced operations", () => {
  it("round-trips axis-angle and rotates vectors", () => {
    const angle = Math.PI / 3;
    const quaternion = new Quat().setAxisAngle(Vec3.UP, angle);
    const axis = new Vec3();

    expectEqualish(quaternion.getAxisAngle(axis), angle);
    expectEqualish([...axis], [...Vec3.UP]);
    expectEqualish(
      [...new Vec3(1, 0, 0).applyQuat(quaternion)],
      [Math.cos(angle), 0, -Math.sin(angle)],
    );
  });

  it("matches axis-angle composition for every Euler order", () => {
    const angles = { x: 20, y: -35, z: 50 };
    const axes = { x: Vec3.RIGHT, y: Vec3.UP, z: Vec3.FORWARD };
    const orders: EulerOrder[] = ["xyz", "xzy", "yxz", "yzx", "zxy", "zyx"];

    for (const order of orders) {
      const expected = new Quat();
      for (let index = 0; index < order.length; index++) {
        const key = order[index] as "x" | "y" | "z";
        expected.mul(new Quat().setAxisAngle(axes[key], toRadian(angles[key])));
      }

      expectSameRotation(new Quat().fromEuler(angles.x, angles.y, angles.z, order), expected);
    }
  });

  it("round-trips rotations through Mat3 in every conversion branch", () => {
    const rotations = [
      new Quat(),
      new Quat().setAxisAngle(Vec3.RIGHT, Math.PI),
      new Quat().setAxisAngle(Vec3.UP, Math.PI),
      new Quat().setAxisAngle(Vec3.FORWARD, Math.PI),
      new Quat().fromEuler(20, 30, 40),
    ];

    for (const rotation of rotations) {
      const recovered = new Quat().fromMat3(new Mat3().fromQuat(rotation));
      expectSameRotation(recovered, rotation);
    }
  });

  it("slerps halfway and takes the shortest path", () => {
    const start = new Quat();
    const end = new Quat().setAxisAngle(Vec3.FORWARD, Math.PI / 2);
    const expected = new Quat().setAxisAngle(Vec3.FORWARD, Math.PI / 4);

    expectSameRotation(new Quat().slerp(start, end, 0.5), expected);
    expectSameRotation(new Quat().slerp(start, end.clone().scale(-1), 0.5), expected);
  });

  it("inverts normalized and non-normalized quaternions", () => {
    const quaternion = new Quat().setAxisAngle(new Vec3(1, 2, 3).normalize(), 0.7).scale(2);
    const product = quaternion.clone().mul(quaternion.clone().invert());

    expectEqualish([...product], [0, 0, 0, 1]);
  });

  it("finds rotations between vectors, including opposite directions", () => {
    const from = new Vec3(1, 2, 3).normalize();
    const to = new Vec3(-2, 0, 1).normalize();
    const rotation = new Quat().rotationTo(from, to);

    expectEqualish([...from.clone().applyQuat(rotation)], [...to]);

    const opposite = new Quat().rotationTo(Vec3.RIGHT, Vec3.LEFT);
    expectEqualish([...Vec3.RIGHT.clone().applyQuat(opposite)], [...Vec3.LEFT]);
    expectSameRotation(new Quat().rotationTo(Vec3.UP, Vec3.UP), new Quat());
  });

  it("round-trips exponential, logarithm, and power", () => {
    const quaternion = new Quat().setAxisAngle(new Vec3(1, 2, 3).normalize(), 0.7);

    expectSameRotation(quaternion.clone().ln().exp(), quaternion);
    expectSameRotation(quaternion.clone().pow(1), quaternion);
    expectSameRotation(quaternion.clone().pow(0), new Quat());
  });

  it("treats q and -q as the same rotation only for approximate equality", () => {
    const quaternion = new Quat().setAxisAngle(Vec3.UP, 0.7);
    const negated = quaternion.clone().scale(-1);

    expectEqualish(quaternion.equals(negated), true);
    expectEqualish(quaternion.equals(negated, true), false);
  });
});
