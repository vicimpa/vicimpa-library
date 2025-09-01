import { describe, it, beforeEach } from "bun:test";
import { Mat3 } from "../src";
import { expectEqualish } from "./helpers/test-utils";

describe("mat3", () => {
  let out: Mat3, matA: Mat3, matB: Mat3, result: Mat3;

  beforeEach(() => {
    matA = new Mat3().set(1, 2, 3, 4, 5, 6, 7, 8, 9);
    matB = new Mat3().set(9, 8, 7, 6, 5, 4, 3, 2, 1);
    out = new Mat3();
  });

  describe("create", () => {
    beforeEach(() => { result = new Mat3(); });
    it("should return a 3x3 matrix initialized to identity", () => {
      expectEqualish([
        result.a, result.b, result.c,
        result.d, result.e, result.f,
        result.g, result.h, result.i
      ], [1, 0, 0, 0, 1, 0, 0, 0, 1]);
    });
  });

  describe("clone", () => {
    beforeEach(() => { result = matA.clone(); });
    it("should return a copy of the matrix", () => {
      expectEqualish([
        result.a, result.b, result.c,
        result.d, result.e, result.f,
        result.g, result.h, result.i
      ], [
        matA.a, matA.b, matA.c,
        matA.d, matA.e, matA.f,
        matA.g, matA.h, matA.i
      ]);
    });
  });

  describe("copy", () => {
    beforeEach(() => { result = out.copy(matA); });
    it("should copy values into out", () => {
      expectEqualish([
        out.a, out.b, out.c,
        out.d, out.e, out.f,
        out.g, out.h, out.i
      ], [1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });
    it("should return out", () => {
      if (result !== out) throw new Error("Expected result to be out");
    });
  });

  describe("set", () => {
    beforeEach(() => { result = out.set(1, 2, 3, 4, 5, 6, 7, 8, 9); });
    it("should set values", () => {
      expectEqualish([
        out.a, out.b, out.c,
        out.d, out.e, out.f,
        out.g, out.h, out.i
      ], [1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });
    it("should return out", () => {
      if (result !== out) throw new Error("Expected result to be out");
    });
  });

  describe("identity", () => {
    beforeEach(() => { result = out.identity(); });
    it("should set to identity matrix", () => {
      expectEqualish([
        out.a, out.b, out.c,
        out.d, out.e, out.f,
        out.g, out.h, out.i
      ], [1, 0, 0, 0, 1, 0, 0, 0, 1]);
    });
    it("should return out", () => {
      if (result !== out) throw new Error("Expected result to be out");
    });
  });

  describe("transpose", () => {
    beforeEach(() => { result = out.copy(matA).transpose(); });

    it("should transpose the matrix", () => {
      expectEqualish([
        out.a, out.b, out.c,
        out.d, out.e, out.f,
        out.g, out.h, out.i
      ], [1, 4, 7, 2, 5, 8, 3, 6, 9]);
    });
    it("should return out", () => {
      if (result !== out) throw new Error("Expected result to be out");
    });
  });

  describe("determinant", () => {
    let detResult: number;
    beforeEach(() => { detResult = matA.determinant(); });

    it("should return the determinant", () => {
      expectEqualish(detResult, 0); // This matrix has determinant 0
    });
  });

  describe("mul", () => {
    beforeEach(() => { result = out.copy(matA).mul(matB); });

    it("should multiply matrices", () => {
      // Expected result for [1,2,3;4,5,6;7,8,9] * [9,8,7;6,5,4;3,2,1]
      // [90,114,138; 54,69,84; 18,24,30]
      expectEqualish([
        out.a, out.b, out.c,
        out.d, out.e, out.f,
        out.g, out.h, out.i
      ], [90, 114, 138, 54, 69, 84, 18, 24, 30]);
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
    });
  });

  describe("iterator", () => {
    it("should iterate over matrix elements", () => {
      const values = Array.from(matA);
      expectEqualish(values, [1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });
  });
});
