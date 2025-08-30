import { describe, it, beforeEach } from "bun:test";
import { Mat4 } from "..";
import { expectEqualish } from "./helpers/test-utils";

describe("mat4", () => {
  let out: Mat4, matA: Mat4, matB: Mat4, result: Mat4;

  beforeEach(() => {
    matA = new Mat4().set(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);
    matB = new Mat4().set(16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1);
    out = new Mat4();
  });

  describe("create", () => {
    beforeEach(() => { result = new Mat4(); });
    it("should return a 4x4 matrix initialized to identity", () => {
      expectEqualish([
        result.a, result.b, result.c, result.d,
        result.e, result.f, result.g, result.h,
        result.i, result.j, result.k, result.l,
        result.m, result.n, result.o, result.p
      ], [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
    });
  });

  describe("clone", () => {
    beforeEach(() => { result = matA.clone(); });
    it("should return a copy of the matrix", () => {
      expectEqualish([
        result.a, result.b, result.c, result.d,
        result.e, result.f, result.g, result.h,
        result.i, result.j, result.k, result.l,
        result.m, result.n, result.o, result.p
      ], [
        matA.a, matA.b, matA.c, matA.d,
        matA.e, matA.f, matA.g, matA.h,
        matA.i, matA.j, matA.k, matA.l,
        matA.m, matA.n, matA.o, matA.p
      ]);
    });
  });

  describe("copy", () => {
    beforeEach(() => { result = out.copy(matA); });
    it("should copy values into out", () => {
      expectEqualish([
        out.a, out.b, out.c, out.d,
        out.e, out.f, out.g, out.h,
        out.i, out.j, out.k, out.l,
        out.m, out.n, out.o, out.p
      ], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);
    });
    it("should return out", () => {
      if (result !== out) throw new Error("Expected result to be out");
    });
  });

  describe("set", () => {
    beforeEach(() => { result = out.set(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16); });
    it("should set values", () => {
      expectEqualish([
        out.a, out.b, out.c, out.d,
        out.e, out.f, out.g, out.h,
        out.i, out.j, out.k, out.l,
        out.m, out.n, out.o, out.p
      ], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);
    });
    it("should return out", () => {
      if (result !== out) throw new Error("Expected result to be out");
    });
  });

  describe("identity", () => {
    beforeEach(() => { result = out.identity(); });
    it("should set to identity matrix", () => {
      expectEqualish([
        out.a, out.b, out.c, out.d,
        out.e, out.f, out.g, out.h,
        out.i, out.j, out.k, out.l,
        out.m, out.n, out.o, out.p
      ], [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
    });
    it("should return out", () => {
      if (result !== out) throw new Error("Expected result to be out");
    });
  });

  describe("transpose", () => {
    beforeEach(() => { result = out.copy(matA).transpose(); });

    it("should transpose the matrix", () => {
      expectEqualish([
        out.a, out.b, out.c, out.d,
        out.e, out.f, out.g, out.h,
        out.i, out.j, out.k, out.l,
        out.m, out.n, out.o, out.p
      ], [1, 5, 9, 13, 2, 6, 10, 14, 3, 7, 11, 15, 4, 8, 12, 16]);
    });
    it("should return out", () => {
      if (result !== out) throw new Error("Expected result to be out");
    });
  });

  describe("determinant", () => {
    it("should return 1 for identity matrix", () => {
      const identity = new Mat4().identity();
      expectEqualish(identity.determinant(), 1);
    });

    it("should return 0 for singular matrix", () => {
      const singular = new Mat4().set(
        1, 2, 3, 4,
        2, 4, 6, 8,
        3, 6, 9, 12,
        4, 8, 12, 16
      );
      expectEqualish(singular.determinant(), 0);
    });

    it("should calculate determinant correctly for diagonal matrix", () => {
      const matrix = new Mat4().set(
        2, 0, 0, 0,
        0, 3, 0, 0,
        0, 0, 4, 0,
        0, 0, 0, 5
      );
      // For diagonal matrix, determinant is product of diagonal elements
      expectEqualish(matrix.determinant(), 2 * 3 * 4 * 5);
    });

    it("should handle matrix with negative values", () => {
      const matrix = new Mat4().set(
        -1, 2, -3, 4,
        5, -6, 7, -8,
        -9, 10, -11, 12,
        13, -14, 15, -16
      );
      const det = matrix.determinant();
      // Just verify it's a finite number
      if (!isFinite(det)) throw new Error("Expected determinant to be finite");
    });

    it("should return correct determinant for triangular matrix", () => {
      const triangular = new Mat4().set(
        2, 0, 0, 0,
        3, 4, 0, 0,
        5, 6, 7, 0,
        8, 9, 10, 11
      );
      // For triangular matrix, determinant is product of diagonal elements
      expectEqualish(triangular.determinant(), 2 * 4 * 7 * 11);
    });
  });

  describe("equals", () => {
    it("should return true for identical matrices", () => {
      if (!matA.equals(matA)) throw new Error("Expected true for identical matrices");
    });
    it("should return false for different matrices", () => {
      if (matA.equals(matB)) throw new Error("Expected false for different matrices");
    });
  });

  describe("mul", () => {
    beforeEach(() => { result = out.copy(matA).mul(matB); });

    it("should multiply matrices", () => {
      // Expected result for matrix multiplication: [1,2,3,4;5,6,7,8;9,10,11,12;13,14,15,16] * [16,15,14,13;12,11,10,9;8,7,6,5;4,3,2,1]
      // [386,444,502,560; 274,316,358,400; 162,188,214,240; 50,60,70,80]
      expectEqualish([
        out.a, out.b, out.c, out.d,
        out.e, out.f, out.g, out.h,
        out.i, out.j, out.k, out.l,
        out.m, out.n, out.o, out.p
      ], [386, 444, 502, 560, 274, 316, 358, 400, 162, 188, 214, 240, 50, 60, 70, 80]);
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
      if (matA[6] !== matA.g) throw new Error("Expected matA[6] to equal matA.g");
      if (matA[7] !== matA.h) throw new Error("Expected matA[7] to equal matA.h");
      if (matA[8] !== matA.i) throw new Error("Expected matA[8] to equal matA.i");
      if (matA[9] !== matA.j) throw new Error("Expected matA[9] to equal matA.j");
      if (matA[10] !== matA.k) throw new Error("Expected matA[10] to equal matA.k");
      if (matA[11] !== matA.l) throw new Error("Expected matA[11] to equal matA.l");
      if (matA[12] !== matA.m) throw new Error("Expected matA[12] to equal matA.m");
      if (matA[13] !== matA.n) throw new Error("Expected matA[13] to equal matA.n");
      if (matA[14] !== matA.o) throw new Error("Expected matA[14] to equal matA.o");
      if (matA[15] !== matA.p) throw new Error("Expected matA[15] to equal matA.p");
    });
  });

  describe("iterator", () => {
    it("should iterate over matrix elements", () => {
      const values = Array.from(matA);
      expectEqualish(values, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);
    });
  });
});
