import { describe, it, beforeEach } from "bun:test";
import { Mat2 } from "../src";
import { expectEqualish } from "./helpers/test-utils";

describe("mat2", () => {
  let out: Mat2, matA: Mat2, matB: Mat2, result: Mat2;

  beforeEach(() => {
    matA = new Mat2().set(1, 2, 3, 4);
    matB = new Mat2().set(5, 6, 7, 8);
    out = new Mat2();
  });

  describe("create", () => {
    beforeEach(() => { result = new Mat2(); });
    it("should return a 2x2 matrix initialized to identity", () => {
      expectEqualish([result.a, result.b, result.c, result.d], [1, 0, 0, 1]);
    });
  });

  describe("clone", () => {
    beforeEach(() => { result = matA.clone(); });
    it("should return a copy of the matrix", () => {
      expectEqualish([result.a, result.b, result.c, result.d], [matA.a, matA.b, matA.c, matA.d]);
    });
  });

  describe("copy", () => {
    beforeEach(() => { result = out.copy(matA); });
    it("should copy values into out", () => {
      expectEqualish([out.a, out.b, out.c, out.d], [1, 2, 3, 4]);
    });
    it("should return out", () => {
      if (result !== out) throw new Error("Expected result to be out");
    });
  });

  describe("set", () => {
    beforeEach(() => { result = out.set(1, 2, 3, 4); });
    it("should set values", () => {
      expectEqualish([out.a, out.b, out.c, out.d], [1, 2, 3, 4]);
    });
    it("should return out", () => {
      if (result !== out) throw new Error("Expected result to be out");
    });
  });

  describe("identity", () => {
    beforeEach(() => { result = out.identity(); });
    it("should set to identity matrix", () => {
      expectEqualish([out.a, out.b, out.c, out.d], [1, 0, 0, 1]);
    });
    it("should return out", () => {
      if (result !== out) throw new Error("Expected result to be out");
    });
  });

  describe("transpose", () => {
    beforeEach(() => { result = out.copy(matA).transpose(); });

    it("should transpose the matrix", () => {
      expectEqualish([out.a, out.b, out.c, out.d], [1, 3, 2, 4]);
    });
    it("should return out", () => {
      if (result !== out) throw new Error("Expected result to be out");
    });
    it("should not modify the original", () => {
      expectEqualish([matA.a, matA.b, matA.c, matA.d], [1, 2, 3, 4]);
    });
  });

  describe("invert", () => {
    beforeEach(() => { result = out.copy(matA).invert(); });

    it("should invert the matrix", () => {
      const det = matA.determinant();
      const expected = [
        matA.d / det, -matA.b / det,
        -matA.c / det, matA.a / det
      ];
      expectEqualish([out.a, out.b, out.c, out.d], expected);
    });
    it("should return out", () => {
      if (result !== out) throw new Error("Expected result to be out");
    });
  });

  describe("adjoint", () => {
    beforeEach(() => { result = out.copy(matA).adjoint(); });

    it("should compute the adjoint", () => {
      expectEqualish([out.a, out.b, out.c, out.d], [4, -2, -3, 1]);
    });
    it("should return out", () => {
      if (result !== out) throw new Error("Expected result to be out");
    });
  });

  describe("determinant", () => {
    let detResult: number;
    beforeEach(() => { detResult = matA.determinant(); });

    it("should return the determinant", () => {
      expectEqualish(detResult, -2);
    });
  });

  describe("frob", () => {
    let frobResult: number;
    beforeEach(() => { frobResult = matA.frob(); });

    it("should return the Frobenius norm", () => {
      expectEqualish(frobResult, Math.sqrt(30));
    });
  });

  describe("mul", () => {
    beforeEach(() => { result = out.copy(matA).mul(matB); });

    it("should multiply matrices", () => {
      // Expected result for matrix multiplication: [1,2;3,4] * [5,6;7,8]
      // [1*5+3*6, 2*5+4*6; 1*7+3*8, 2*7+4*8] = [23,34;31,46]
      expectEqualish([out.a, out.b, out.c, out.d], [23, 34, 31, 46]);
    });
    it("should return out", () => {
      if (result !== out) throw new Error("Expected result to be out");
    });
    it("should not modify matA", () => {
      expectEqualish([matA.a, matA.b, matA.c, matA.d], [1, 2, 3, 4]);
    });
    it("should not modify matB", () => {
      expectEqualish([matB.a, matB.b, matB.c, matB.d], [5, 6, 7, 8]);
    });
  });

  describe("array access", () => {
    it("should access a via [0]", () => {
      if (matA[0] !== matA.a) throw new Error("Expected matA[0] to equal matA.a");
    });
    it("should access b via [1]", () => {
      if (matA[1] !== matA.b) throw new Error("Expected matA[1] to equal matA.b");
    });
    it("should access c via [2]", () => {
      if (matA[2] !== matA.c) throw new Error("Expected matA[2] to equal matA.c");
    });
    it("should access d via [3]", () => {
      if (matA[3] !== matA.d) throw new Error("Expected matA[3] to equal matA.d");
    });
  });

  describe("iterator", () => {
    it("should iterate over matrix elements", () => {
      const values = Array.from(matA);
      expectEqualish(values, [1, 2, 3, 4]);
    });
  });
});
