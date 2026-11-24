import { describe, it } from "bun:test";
import { Mat4, Quat, Vec3, Vec4 } from "../src";
import { expectEqualish } from "./helpers/test-utils";

function expectSameRotation(actual: Quat, expected: Quat) {
  const a = actual.clone().normalize();
  const b = expected.clone().normalize();
  const dot = a.x * b.x + a.y * b.y + a.z * b.z + a.w * b.w;
  expectEqualish(Math.abs(dot), 1, 1e-5);
}

function normalizedDeviceZ(matrix: Mat4, z: number) {
  const point = new Vec4(0, 0, z, 1).applyMat4(matrix);
  return point.z / point.w;
}

describe("Mat4 advanced operations", () => {
  it("decomposes TRS with arbitrary rotation and non-uniform scale", () => {
    const rotation = new Quat().fromEuler(20, 30, 40);
    const translation = new Vec3(7, -4, 2);
    const scale = new Vec3(2, 3, 4);
    const matrix = new Mat4().fromRotationTranslationScale(rotation, translation, scale);

    expectEqualish([...matrix.getTranslation()], [...translation]);
    expectEqualish([...matrix.getScaling()], [...scale]);
    expectSameRotation(matrix.getRotation(), rotation);
  });

  it("extracts rotation through every quaternion conversion branch", () => {
    const rotations = [
      new Quat(),
      new Quat().setAxisAngle(Vec3.RIGHT, Math.PI),
      new Quat().setAxisAngle(Vec3.UP, Math.PI),
      new Quat().setAxisAngle(Vec3.FORWARD, Math.PI),
      new Quat().fromEuler(130, -40, 75),
    ];

    for (const rotation of rotations) {
      const matrix = new Mat4().fromRotationTranslationScale(
        rotation,
        new Vec3(),
        new Vec3(2, 3, 4),
      );

      expectEqualish([...matrix.getScaling()], [2, 3, 4]);
      expectSameRotation(matrix.getRotation(), rotation);
    }
  });

  it("inverts a general affine transform", () => {
    const matrix = new Mat4().fromRotationTranslationScale(
      new Quat().fromEuler(20, 30, 40),
      new Vec3(7, -4, 2),
      new Vec3(2, 3, 4),
    );
    const product = matrix.clone().mul(matrix.clone().invert());

    expectEqualish([...product], [...new Mat4()], 1e-5);
  });

  it("satisfies A * adjoint(A) = determinant(A) * I", () => {
    const matrix = new Mat4().fromRotationTranslationScale(
      new Quat().fromEuler(-15, 25, 35),
      new Vec3(3, 5, 7),
      new Vec3(2, 3, 4),
    );
    const determinant = matrix.determinant();
    const product = matrix.clone().mul(matrix.clone().adjoint());
    const expected = new Mat4().scale(new Vec3(determinant, determinant, determinant));
    expected.p = determinant;

    expectEqualish([...product], [...expected], 1e-5);
  });

  it("maps near and far planes correctly for NO and ZO projections", () => {
    const near = 1;
    const far = 100;

    expectEqualish(normalizedDeviceZ(new Mat4().perspectiveNO(Math.PI / 2, 1, near, far), -near), -1);
    expectEqualish(normalizedDeviceZ(new Mat4().perspectiveNO(Math.PI / 2, 1, near, far), -far), 1);
    expectEqualish(normalizedDeviceZ(new Mat4().perspectiveZO(Math.PI / 2, 1, near, far), -near), 0);
    expectEqualish(normalizedDeviceZ(new Mat4().perspectiveZO(Math.PI / 2, 1, near, far), -far), 1);

    expectEqualish(normalizedDeviceZ(new Mat4().orthoNO(-2, 2, -2, 2, near, far), -near), -1);
    expectEqualish(normalizedDeviceZ(new Mat4().orthoNO(-2, 2, -2, 2, near, far), -far), 1);
    expectEqualish(normalizedDeviceZ(new Mat4().orthoZO(-2, 2, -2, 2, near, far), -near), 0);
    expectEqualish(normalizedDeviceZ(new Mat4().orthoZO(-2, 2, -2, 2, near, far), -far), 1);
  });

  it("builds a view matrix that moves the eye to the origin", () => {
    const eye = new Vec3(3, 4, 5);
    const view = new Mat4().lookAt(eye, new Vec3(0, 0, 0), Vec3.UP);
    const transformedEye = new Vec4(eye.x, eye.y, eye.z, 1).applyMat4(view);

    expectEqualish([...transformedEye], [0, 0, 0, 1]);
  });
});
