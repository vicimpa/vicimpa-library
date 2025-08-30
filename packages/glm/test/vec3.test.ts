import { describe, it, beforeEach } from "bun:test";
import { Vec3 } from "..";
import { expectEqualish } from "./helpers/test-utils";

describe("vec3", () => {
  let out: Vec3, vecA: Vec3, vecB: Vec3, result: Vec3;

  beforeEach(() => {
    vecA = new Vec3(1, 2, 3);
    vecB = new Vec3(4, 5, 6);
    out = new Vec3(0, 0, 0);
  });

  describe("create", () => {
    beforeEach(() => { result = new Vec3(); });
    it("should return a 3 element vector initialized to 0s", () => {
      expectEqualish([result.x, result.y, result.z], [0, 0, 0]);
    });
  });

  describe("clone", () => {
    beforeEach(() => { result = vecA.clone(); });
    it("should return a copy of the vector", () => {
      expectEqualish([result.x, result.y, result.z], [vecA.x, vecA.y, vecA.z]);
    });
  });

  describe("copy", () => {
    beforeEach(() => { result = out.copy(vecA); });
    it("should copy values into out", () => {
      expectEqualish([out.x, out.y, out.z], [1, 2, 3]);
    });
    it("should return out", () => {
      if (result !== out) throw new Error("Expected result to be out");
    });
  });

  describe("set", () => {
    beforeEach(() => { result = out.set(1, 2, 3); });
    it("should set values", () => {
      expectEqualish([out.x, out.y, out.z], [1, 2, 3]);
    });
    it("should return out", () => {
      if (result !== out) throw new Error("Expected result to be out");
    });
  });

  describe("add", () => {
    beforeEach(() => { result = out.copy(vecA).add(vecB); });

    it("should add vectors", () => {
      expectEqualish([out.x, out.y, out.z], [5, 7, 9]);
    });
    it("should return out", () => {
      if (result !== out) throw new Error("Expected result to be out");
    });
    it("should not modify vecA", () => {
      expectEqualish([vecA.x, vecA.y, vecA.z], [1, 2, 3]);
    });
    it("should not modify vecB", () => {
      expectEqualish([vecB.x, vecB.y, vecB.z], [4, 5, 6]);
    });
  });

  describe("sub", () => {
    beforeEach(() => { result = out.copy(vecA).sub(vecB); });

    it("should subtract vectors", () => {
      expectEqualish([out.x, out.y, out.z], [-3, -3, -3]);
    });
    it("should return out", () => {
      if (result !== out) throw new Error("Expected result to be out");
    });
  });

  describe("mul", () => {
    beforeEach(() => { result = out.copy(vecA).mul(vecB); });

    it("should multiply vectors element-wise", () => {
      expectEqualish([out.x, out.y, out.z], [4, 10, 18]);
    });
    it("should return out", () => {
      if (result !== out) throw new Error("Expected result to be out");
    });
  });

  describe("scale", () => {
    beforeEach(() => { result = out.copy(vecA).scale(2); });

    it("should scale the vector", () => {
      expectEqualish([out.x, out.y, out.z], [2, 4, 6]);
    });
    it("should return out", () => {
      if (result !== out) throw new Error("Expected result to be out");
    });
  });

  describe("dot", () => {
    let dotResult: number;
    beforeEach(() => { dotResult = vecA.dot(vecB); });

    it("should return the dot product", () => {
      expectEqualish(dotResult, 32);
    });
  });

  describe("cross", () => {
    beforeEach(() => { result = out.copy(vecA).cross(vecB); });

    it("should return the cross product", () => {
      expectEqualish([out.x, out.y, out.z], [-3, 6, -3]);
    });
    it("should return out", () => {
      if (result !== out) throw new Error("Expected result to be out");
    });
  });

  describe("length", () => {
    let lengthResult: number;
    beforeEach(() => { lengthResult = vecA.length(); });

    it("should return the length", () => {
      expectEqualish(lengthResult, Math.sqrt(14));
    });
  });

  describe("lengthSq", () => {
    let lengthSqResult: number;
    beforeEach(() => { lengthSqResult = vecA.lengthSq(); });

    it("should return the squared length", () => {
      expectEqualish(lengthSqResult, 14);
    });
  });

  describe("normalize", () => {
    beforeEach(() => { result = out.copy(vecA).normalize(); });

    it("should normalize the vector", () => {
      const len = Math.sqrt(result.x * result.x + result.y * result.y + result.z * result.z);
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
      expectEqualish(distanceResult, Math.sqrt(27));
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
  });
});
