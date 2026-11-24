import { describe, expect, it } from "bun:test";
import { Mat3, Mat4, Quat, Vec3 } from "../src";
import { expectEqualish } from "./helpers/test-utils";

describe("Mat3 advanced operations", () => {
  it("inverts into a separate output matrix", () => {
    const source = new Mat3().fromScale(new Vec3(2, 3, 4));
    const inverse = new Mat3().invert(source);

    expectEqualish([...inverse], [
      1 / 2, 0, 0,
      0, 1 / 3, 0,
      0, 0, 1 / 4,
    ]);
    expectEqualish([...source], [
      2, 0, 0,
      0, 3, 0,
      0, 0, 4,
    ]);
  });

  it("inverts a general matrix in place and out of place", () => {
    const source = new Mat3().set(
      2, 0, 10,
      4, 2, 12,
      6, 8, 0,
    );
    const expected = [
      -12, 10, -2.5,
      9, -7.5, 2,
      2.5, -2, 0.5,
    ];

    expectEqualish([...new Mat3().invert(source)], expected);
    expectEqualish([...source.clone().invert()], expected);
    expectEqualish([...source.clone().mul(new Mat3().invert(source))], [...new Mat3()]);
  });

  it("throws for a singular source without modifying the output", () => {
    const source = new Mat3().set(
      1, 2, 3,
      2, 4, 6,
      3, 6, 9,
    );
    const output = new Mat3();

    expect(() => output.invert(source)).toThrow("Cannot invert matrix");
    expectEqualish([...output], [...new Mat3()]);
  });

  it("builds the normal matrix as the inverse-transpose of the model matrix", () => {
    const rotation = new Quat().fromEuler(20, -35, 50);
    const model = new Mat4().fromRotationTranslationScale(
      rotation,
      new Vec3(4, -2, 7),
      new Vec3(2, 3, 4),
    );
    const expected = new Mat3().fromMat4(model).invert().transpose();
    const actual = new Mat3().normalFromMat4(model);

    expectEqualish([...actual], [...expected]);
  });
});
