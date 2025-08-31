import { describe, it, beforeEach } from "bun:test";
import { Vec2, Vec3, Vec4, vec3 } from "..";
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

  describe("swizzling", () => {
    it("should support 2-component swizzling", () => {
      const vec = new Vec3(1, 2, 3);

      // Test 2-component swizzling
      expectEqualish([vec.xx.x, vec.xx.y], [1, 1]);
      expectEqualish([vec.xy.x, vec.xy.y], [1, 2]);
      expectEqualish([vec.xz.x, vec.xz.y], [1, 3]);
      expectEqualish([vec.yx.x, vec.yx.y], [2, 1]);
      expectEqualish([vec.yy.x, vec.yy.y], [2, 2]);
      expectEqualish([vec.yz.x, vec.yz.y], [2, 3]);
      expectEqualish([vec.zx.x, vec.zx.y], [3, 1]);
      expectEqualish([vec.zy.x, vec.zy.y], [3, 2]);
      expectEqualish([vec.zz.x, vec.zz.y], [3, 3]);
    });

    it("should support 3-component swizzling", () => {
      const vec = new Vec3(1, 2, 3);

      // Test 3-component swizzling
      expectEqualish([vec.xxx.x, vec.xxx.y, vec.xxx.z], [1, 1, 1]);
      expectEqualish([vec.xyx.x, vec.xyx.y, vec.xyx.z], [1, 2, 1]);
      expectEqualish([vec.xzx.x, vec.xzx.y, vec.xzx.z], [1, 3, 1]);
      expectEqualish([vec.yxy.x, vec.yxy.y, vec.yxy.z], [2, 1, 2]);
      expectEqualish([vec.yyy.x, vec.yyy.y, vec.yyy.z], [2, 2, 2]);
      expectEqualish([vec.yzy.x, vec.yzy.y, vec.yzy.z], [2, 3, 2]);
      expectEqualish([vec.zxz.x, vec.zxz.y, vec.zxz.z], [3, 1, 3]);
      expectEqualish([vec.zyz.x, vec.zyz.y, vec.zyz.z], [3, 2, 3]);
      expectEqualish([vec.zzz.x, vec.zzz.y, vec.zzz.z], [3, 3, 3]);
    });

    it("should support 4-component swizzling", () => {
      const vec = new Vec3(1, 2, 3);

      // Test 4-component swizzling
      expectEqualish([vec.xxxx.x, vec.xxxx.y, vec.xxxx.z, vec.xxxx.w], [1, 1, 1, 1]);
      expectEqualish([vec.xyxy.x, vec.xyxy.y, vec.xyxy.z, vec.xyxy.w], [1, 2, 1, 2]);
      expectEqualish([vec.xzxz.x, vec.xzxz.y, vec.xzxz.z, vec.xzxz.w], [1, 3, 1, 3]);
      expectEqualish([vec.yxyx.x, vec.yxyx.y, vec.yxyx.z, vec.yxyx.w], [2, 1, 2, 1]);
      expectEqualish([vec.yyyy.x, vec.yyyy.y, vec.yyyy.z, vec.yyyy.w], [2, 2, 2, 2]);
      expectEqualish([vec.yzyz.x, vec.yzyz.y, vec.yzyz.z, vec.yzyz.w], [2, 3, 2, 3]);
      expectEqualish([vec.zxzx.x, vec.zxzx.y, vec.zxzx.z, vec.zxzx.w], [3, 1, 3, 1]);
      expectEqualish([vec.zyzy.x, vec.zyzy.y, vec.zyzy.z, vec.zyzy.w], [3, 2, 3, 2]);
      expectEqualish([vec.zzzz.x, vec.zzzz.y, vec.zzzz.z, vec.zzzz.w], [3, 3, 3, 3]);
    });

    it("should return correct vector types", () => {
      const vec = new Vec3(1, 2, 3);

      // 2-component should return Vec2
      if (!(vec.xy instanceof Vec2)) throw new Error("Expected vec.xy to be instance of Vec2");

      // 3-component should return Vec3
      if (!(vec.xyx instanceof Vec3)) throw new Error("Expected vec.xyx to be instance of Vec3");

      // 4-component should return Vec4
      if (!(vec.xyxy instanceof Vec4)) throw new Error("Expected vec.xyxy to be instance of Vec4");
    });
  });

  describe("vec3 function overloads", () => {
    it("should create Vec3 with no arguments", () => {
      const result = vec3();
      expectEqualish([result.x, result.y, result.z], [0, 0, 0]);
    });

    it("should create Vec3 with single number argument", () => {
      const result = vec3(5);
      expectEqualish([result.x, result.y, result.z], [5, 5, 5]);
    });

    it("should create Vec3 with three number arguments", () => {
      const result = vec3(1, 2, 3);
      expectEqualish([result.x, result.y, result.z], [1, 2, 3]);
    });

    it("should create Vec3 from existing Vec3", () => {
      const original = new Vec3(3, 4, 5);
      const result = vec3(original);
      expectEqualish([result.x, result.y, result.z], [3, 4, 5]);
      // Should be a new instance, not the same reference
      if (result === original) throw new Error("Expected new instance");
    });

    it("should create Vec3 from Vec2 and z component", () => {
      const vec2 = new Vec2(1, 2);
      const result = vec3(vec2, 3);
      expectEqualish([result.x, result.y, result.z], [1, 2, 3]);
    });

    it("should create Vec3 from x component and Vec2", () => {
      const vec2 = new Vec2(2, 3);
      const result = vec3(1, vec2);
      expectEqualish([result.x, result.y, result.z], [1, 2, 3]);
    });

    it("should handle undefined arguments correctly", () => {
      const result = vec3(undefined);
      expectEqualish([result.x, result.y, result.z], [0, 0, 0]);
    });
  });
});
