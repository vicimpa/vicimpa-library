import { describe, it, beforeEach } from "bun:test";
import { Mat2d } from "../src";
import { expectEqualish } from "./helpers/test-utils";

describe("mat2d", () => {
  let out: Mat2d, matA: Mat2d, matB: Mat2d, result: Mat2d;

  beforeEach(() => {
    matA = new Mat2d().set(1, 2, 3, 4, 5, 6);
    matB = new Mat2d().set(7, 8, 9, 10, 11, 12);
    out = new Mat2d();
  });

  describe("create", () => {
    beforeEach(() => { result = new Mat2d(); });
    it("should return a 2x3 matrix initialized to identity", () => {
      expectEqualish([result.a, result.b, result.c, result.d, result.e, result.f], [1, 0, 0, 1, 0, 0]);
    });
  });

  describe("clone", () => {
    beforeEach(() => { result = matA.clone(); });
    it("should return a copy of the matrix", () => {
      expectEqualish([result.a, result.b, result.c, result.d, result.e, result.f], [matA.a, matA.b, matA.c, matA.d, matA.e, matA.f]);
    });
  });

  describe("copy", () => {
    beforeEach(() => { result = out.copy(matA); });
    it("should copy values into out", () => {
      expectEqualish([out.a, out.b, out.c, out.d, out.e, out.f], [1, 2, 3, 4, 5, 6]);
    });
    it("should return out", () => {
      if (result !== out) throw new Error("Expected result to be out");
    });
  });

  describe("set", () => {
    beforeEach(() => { result = out.set(1, 2, 3, 4, 5, 6); });
    it("should set values", () => {
      expectEqualish([out.a, out.b, out.c, out.d, out.e, out.f], [1, 2, 3, 4, 5, 6]);
    });
    it("should return out", () => {
      if (result !== out) throw new Error("Expected result to be out");
    });
  });

  describe("identity", () => {
    beforeEach(() => { result = out.identity(); });
    it("should set to identity matrix", () => {
      expectEqualish([out.a, out.b, out.c, out.d, out.e, out.f], [1, 0, 0, 1, 0, 0]);
    });
    it("should return out", () => {
      if (result !== out) throw new Error("Expected result to be out");
    });
  });

  describe("transpose", () => {
    beforeEach(() => { result = out.copy(matA).transpose(); });

    it("should transpose the matrix", () => {
      expectEqualish([out.a, out.b, out.c, out.d, out.e, out.f], [1, 3, 2, 4, 5, 6]);
    });
    it("should return out", () => {
      if (result !== out) throw new Error("Expected result to be out");
    });
  });

  describe("invert", () => {
    beforeEach(() => { result = out.copy(matA).invert(); });

    it("should invert the matrix", () => {
      const det = matA.a * matA.d - matA.c * matA.b;
      const expected = [
        matA.d / det, -matA.b / det,
        -matA.c / det, matA.a / det,
        (matA.c * matA.f - matA.d * matA.e) / det,
        (matA.b * matA.e - matA.a * matA.f) / det
      ];
      expectEqualish([out.a, out.b, out.c, out.d, out.e, out.f], expected);
    });
    it("should return out", () => {
      if (result !== out) throw new Error("Expected result to be out");
    });
  });

  describe("translate", () => {
    beforeEach(() => { result = out.copy(matA).translate(2, 3); });

    it("should translate the matrix", () => {
      // translate(2,3) with matrix [1,2,3,4,5,6]
      // new_e = 5 + 2*1 + 3*3 = 5 + 2 + 9 = 16
      // new_f = 6 + 2*2 + 3*4 = 6 + 4 + 12 = 22
      expectEqualish([out.a, out.b, out.c, out.d, out.e, out.f], [1, 2, 3, 4, 16, 22]);
    });
    it("should return out", () => {
      if (result !== out) throw new Error("Expected result to be out");
    });
  });

  describe("mul", () => {
    beforeEach(() => { result = out.copy(matA).mul(matB); });

    it("should multiply matrices", () => {
      // Expected result for matrix multiplication: [1,2,3,4,5,6] * [7,8,9,10,11,12]
      // [1*7+3*8, 2*7+4*8; 1*9+3*10, 2*9+4*10; 1*11+3*12+5, 2*11+4*12+6]
      // [31,46; 39,58; 52,76]
      expectEqualish([out.a, out.b, out.c, out.d, out.e, out.f], [31, 46, 39, 58, 52, 76]);
    });
    it("should return out", () => {
      if (result !== out) throw new Error("Expected result to be out");
    });
  });

  describe("array access", () => {
    it("should access elements via indices", () => {
      if (matA[0] !== matA.a) throw new Error("Expected matA[0] to equal matA.a");
      if (matA[1] !== matA.b) throw new Error("Expected matA[1] to equal matA.b");
      if (matA[2] !== matA.c) throw new Error("Expected matA[2] to equal matA.c");
      if (matA[3] !== matA.d) throw new Error("Expected matA[3] to equal matA.d");
      if (matA[4] !== matA.e) throw new Error("Expected matA[4] to equal matA.e");
      if (matA[5] !== matA.f) throw new Error("Expected matA[5] to equal matA.f");
    });
  });

  describe("iterator", () => {
    it("should iterate over matrix elements", () => {
      const values = Array.from(matA);
      expectEqualish(values, [1, 2, 3, 4, 5, 6]);
    });
  });
});
