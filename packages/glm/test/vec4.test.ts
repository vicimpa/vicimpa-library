import { describe, it, beforeEach } from "bun:test";
import { Vec4 } from "..";
import { expectEqualish } from "./helpers/test-utils";

describe("vec4", () => {
  let out: Vec4, vecA: Vec4, vecB: Vec4, result: Vec4;

  beforeEach(() => {
    vecA = new Vec4(1, 2, 3, 4);
    vecB = new Vec4(5, 6, 7, 8);
    out = new Vec4(0, 0, 0, 0);
  });

  describe("create", () => {
    beforeEach(() => { result = new Vec4(); });
    it("should return a 4 element vector initialized to 0s", () => {
      expectEqualish([result.x, result.y, result.z, result.w], [0, 0, 0, 0]);
    });
  });

  describe("clone", () => {
    beforeEach(() => { result = vecA.clone(); });
    it("should return a copy of the vector", () => {
      expectEqualish([result.x, result.y, result.z, result.w], [vecA.x, vecA.y, vecA.z, vecA.w]);
    });
  });

  describe("copy", () => {
    beforeEach(() => { result = out.copy(vecA); });
    it("should copy values into out", () => {
      expectEqualish([out.x, out.y, out.z, out.w], [1, 2, 3, 4]);
    });
    it("should return out", () => {
      if (result !== out) throw new Error("Expected result to be out");
    });
  });

  describe("set", () => {
    beforeEach(() => { result = out.set(1, 2, 3, 4); });
    it("should set values", () => {
      expectEqualish([out.x, out.y, out.z, out.w], [1, 2, 3, 4]);
    });
    it("should return out", () => {
      if (result !== out) throw new Error("Expected result to be out");
    });
  });

  describe("add", () => {
    beforeEach(() => { result = out.copy(vecA).add(vecB); });

    it("should add vectors", () => {
      expectEqualish([out.x, out.y, out.z, out.w], [6, 8, 10, 12]);
    });
    it("should return out", () => {
      if (result !== out) throw new Error("Expected result to be out");
    });
    it("should not modify vecA", () => {
      expectEqualish([vecA.x, vecA.y, vecA.z, vecA.w], [1, 2, 3, 4]);
    });
    it("should not modify vecB", () => {
      expectEqualish([vecB.x, vecB.y, vecB.z, vecB.w], [5, 6, 7, 8]);
    });
  });

  describe("sub", () => {
    beforeEach(() => { result = out.copy(vecA).sub(vecB); });

    it("should subtract vectors", () => {
      expectEqualish([out.x, out.y, out.z, out.w], [-4, -4, -4, -4]);
    });
    it("should return out", () => {
      if (result !== out) throw new Error("Expected result to be out");
    });
  });

  describe("mul", () => {
    beforeEach(() => { result = out.copy(vecA).mul(vecB); });

    it("should multiply vectors element-wise", () => {
      expectEqualish([out.x, out.y, out.z, out.w], [5, 12, 21, 32]);
    });
    it("should return out", () => {
      if (result !== out) throw new Error("Expected result to be out");
    });
  });

  describe("scale", () => {
    beforeEach(() => { result = out.copy(vecA).scale(2); });

    it("should scale the vector", () => {
      expectEqualish([out.x, out.y, out.z, out.w], [2, 4, 6, 8]);
    });
    it("should return out", () => {
      if (result !== out) throw new Error("Expected result to be out");
    });
  });

  describe("dot", () => {
    let dotResult: number;
    beforeEach(() => { dotResult = vecA.dot(vecB); });

    it("should return the dot product", () => {
      expectEqualish(dotResult, 70);
    });
  });

  describe("length", () => {
    let lengthResult: number;
    beforeEach(() => { lengthResult = vecA.length(); });

    it("should return the length", () => {
      expectEqualish(lengthResult, Math.sqrt(30));
    });
  });

  describe("lengthSq", () => {
    let lengthSqResult: number;
    beforeEach(() => { lengthSqResult = vecA.lengthSq(); });

    it("should return the squared length", () => {
      expectEqualish(lengthSqResult, 30);
    });
  });

  describe("normalize", () => {
    beforeEach(() => { result = out.copy(vecA).normalize(); });

    it("should normalize the vector", () => {
      const len = Math.sqrt(result.x * result.x + result.y * result.y + result.z * result.z + result.w * result.w);
      expectEqualish(len, 1);
    });
    it("should return out", () => {
      if (result !== out) throw new Error("Expected result to be out");
    });
  });

  describe("distance", () => {
    let distanceResult: number;
    beforeEach(() => { distanceResult = vecA.distance(vecB); });

    it("should return the distance", () => {
      expectEqualish(distanceResult, Math.sqrt(64));
    });
  });

  describe("equals", () => {
    it("should return true for identical vectors", () => {
      if (!vecA.equals(vecA)) throw new Error("Expected true for identical vectors");
    });
    it("should return false for different vectors", () => {
      if (vecA.equals(vecB)) throw new Error("Expected false for different vectors");
    });
  });

  describe("array access", () => {
    it("should access x via [0]", () => {
      if (vecA[0] !== vecA.x) throw new Error("Expected vecA[0] to equal vecA.x");
    });
    it("should access y via [1]", () => {
      if (vecA[1] !== vecA.y) throw new Error("Expected vecA[1] to equal vecA.y");
    });
    it("should access z via [2]", () => {
      if (vecA[2] !== vecA.z) throw new Error("Expected vecA[2] to equal vecA.z");
    });
    it("should access w via [3]", () => {
      if (vecA[3] !== vecA.w) throw new Error("Expected vecA[3] to equal vecA.w");
    });
  });
});
