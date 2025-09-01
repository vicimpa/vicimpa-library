import { describe, it, beforeEach } from "bun:test";
import { Quat } from "../src";
import { expectEqualish } from "./helpers/test-utils";

describe("quat", () => {
  let out: Quat, quatA: Quat, quatB: Quat, result: Quat;

  beforeEach(() => {
    quatA = new Quat().set(1, 2, 3, 4);
    quatB = new Quat().set(5, 6, 7, 8);
    out = new Quat();
  });

  describe("create", () => {
    beforeEach(() => { result = new Quat(); });
    it("should return a quaternion initialized to identity", () => {
      expectEqualish([result.x, result.y, result.z, result.w], [0, 0, 0, 1]);
    });
  });

  describe("clone", () => {
    beforeEach(() => { result = quatA.clone(); });
    it("should return a copy of the quaternion", () => {
      expectEqualish([result.x, result.y, result.z, result.w], [quatA.x, quatA.y, quatA.z, quatA.w]);
    });
  });

  describe("copy", () => {
    beforeEach(() => { result = out.copy(quatA); });
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

  describe("identity", () => {
    beforeEach(() => { result = out.identity(); });
    it("should set to identity quaternion", () => {
      expectEqualish([out.x, out.y, out.z, out.w], [0, 0, 0, 1]);
    });
    it("should return out", () => {
      if (result !== out) throw new Error("Expected result to be out");
    });
  });

  describe("mul", () => {
    beforeEach(() => { result = out.copy(quatA).mul(quatB); });

    it("should multiply quaternions", () => {
      // Expected result for quaternion multiplication: (1,2,3,4) * (5,6,7,8)
      // [24,48,48,-6] - это результат реального умножения кватернионов
      expectEqualish([out.x, out.y, out.z, out.w], [24, 48, 48, -6]);
    });
    it("should return out", () => {
      if (result !== out) throw new Error("Expected result to be out");
    });
  });

  describe("normalize", () => {
    beforeEach(() => { result = out.copy(quatA).normalize(); });

    it("should normalize the quaternion", () => {
      const len = Math.sqrt(quatA.x * quatA.x + quatA.y * quatA.y + quatA.z * quatA.z + quatA.w * quatA.w);
      expectEqualish(result.x * result.x + result.y * result.y + result.z * result.z + result.w * result.w, 1);
    });
    it("should return out", () => {
      if (result !== out) throw new Error("Expected result to be out");
    });
  });

  describe("equals", () => {
    it("should return true for identical quaternions", () => {
      if (!quatA.equals(quatA)) throw new Error("Expected true for identical quaternions");
    });
    it("should return false for different quaternions", () => {
      // Используем extract=true для точного сравнения
      if (quatA.equals(quatB, true)) throw new Error("Expected false for different quaternions");
    });
  });

  describe("array access", () => {
    it("should access x via [0]", () => {
      if (quatA[0] !== quatA.x) throw new Error("Expected quatA[0] to equal quatA.x");
    });
    it("should access y via [1]", () => {
      if (quatA[1] !== quatA.y) throw new Error("Expected quatA[1] to equal quatA.y");
    });
    it("should access z via [2]", () => {
      if (quatA[2] !== quatA.z) throw new Error("Expected quatA[2] to equal quatA.z");
    });
    it("should access w via [3]", () => {
      if (quatA[3] !== quatA.w) throw new Error("Expected quatA[3] to equal quatA.w");
    });
  });

  describe("iterator", () => {
    it("should iterate over quaternion elements", () => {
      const values = Array.from(quatA);
      expectEqualish(values, [1, 2, 3, 4]);
    });
  });
});
