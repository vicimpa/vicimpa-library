import { describe, it, beforeEach } from "bun:test";
import { Vec2, Vec3, Vec4, vec4 } from "..";
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

  describe("swizzling", () => {
    it("should support 2-component swizzling", () => {
      const vec = new Vec4(1, 2, 3, 4);

      // Test 2-component swizzling
      expectEqualish([vec.xx.x, vec.xx.y], [1, 1]);
      expectEqualish([vec.xy.x, vec.xy.y], [1, 2]);
      expectEqualish([vec.xz.x, vec.xz.y], [1, 3]);
      expectEqualish([vec.xw.x, vec.xw.y], [1, 4]);
      expectEqualish([vec.yx.x, vec.yx.y], [2, 1]);
      expectEqualish([vec.yy.x, vec.yy.y], [2, 2]);
      expectEqualish([vec.yz.x, vec.yz.y], [2, 3]);
      expectEqualish([vec.yw.x, vec.yw.y], [2, 4]);
      expectEqualish([vec.zx.x, vec.zx.y], [3, 1]);
      expectEqualish([vec.zy.x, vec.zy.y], [3, 2]);
      expectEqualish([vec.zz.x, vec.zz.y], [3, 3]);
      expectEqualish([vec.zw.x, vec.zw.y], [3, 4]);
      expectEqualish([vec.wx.x, vec.wx.y], [4, 1]);
      expectEqualish([vec.wy.x, vec.wy.y], [4, 2]);
      expectEqualish([vec.wz.x, vec.wz.y], [4, 3]);
      expectEqualish([vec.ww.x, vec.ww.y], [4, 4]);
    });

    it("should support 3-component swizzling", () => {
      const vec = new Vec4(1, 2, 3, 4);

      // Test 3-component swizzling
      expectEqualish([vec.xxx.x, vec.xxx.y, vec.xxx.z], [1, 1, 1]);
      expectEqualish([vec.xyx.x, vec.xyx.y, vec.xyx.z], [1, 2, 1]);
      expectEqualish([vec.xzx.x, vec.xzx.y, vec.xzx.z], [1, 3, 1]);
      expectEqualish([vec.xwx.x, vec.xwx.y, vec.xwx.z], [1, 4, 1]);
      expectEqualish([vec.yxy.x, vec.yxy.y, vec.yxy.z], [2, 1, 2]);
      expectEqualish([vec.yyy.x, vec.yyy.y, vec.yyy.z], [2, 2, 2]);
      expectEqualish([vec.yzy.x, vec.yzy.y, vec.yzy.z], [2, 3, 2]);
      expectEqualish([vec.ywy.x, vec.ywy.y, vec.ywy.z], [2, 4, 2]);
      expectEqualish([vec.zxz.x, vec.zxz.y, vec.zxz.z], [3, 1, 3]);
      expectEqualish([vec.zyz.x, vec.zyz.y, vec.zyz.z], [3, 2, 3]);
      expectEqualish([vec.zzz.x, vec.zzz.y, vec.zzz.z], [3, 3, 3]);
      expectEqualish([vec.zwz.x, vec.zwz.y, vec.zwz.z], [3, 4, 3]);
      expectEqualish([vec.wxw.x, vec.wxw.y, vec.wxw.z], [4, 1, 4]);
      expectEqualish([vec.wyw.x, vec.wyw.y, vec.wyw.z], [4, 2, 4]);
      expectEqualish([vec.wzw.x, vec.wzw.y, vec.wzw.z], [4, 3, 4]);
      expectEqualish([vec.www.x, vec.www.y, vec.www.z], [4, 4, 4]);
    });

    it("should support 4-component swizzling", () => {
      const vec = new Vec4(1, 2, 3, 4);

      // Test 4-component swizzling
      expectEqualish([vec.xxxx.x, vec.xxxx.y, vec.xxxx.z, vec.xxxx.w], [1, 1, 1, 1]);
      expectEqualish([vec.xyxy.x, vec.xyxy.y, vec.xyxy.z, vec.xyxy.w], [1, 2, 1, 2]);
      expectEqualish([vec.xzxz.x, vec.xzxz.y, vec.xzxz.z, vec.xzxz.w], [1, 3, 1, 3]);
      expectEqualish([vec.xwxw.x, vec.xwxw.y, vec.xwxw.z, vec.xwxw.w], [1, 4, 1, 4]);
      expectEqualish([vec.yxyx.x, vec.yxyx.y, vec.yxyx.z, vec.yxyx.w], [2, 1, 2, 1]);
      expectEqualish([vec.yyyy.x, vec.yyyy.y, vec.yyyy.z, vec.yyyy.w], [2, 2, 2, 2]);
      expectEqualish([vec.yzyz.x, vec.yzyz.y, vec.yzyz.z, vec.yzyz.w], [2, 3, 2, 3]);
      expectEqualish([vec.ywyw.x, vec.ywyw.y, vec.ywyw.z, vec.ywyw.w], [2, 4, 2, 4]);
      expectEqualish([vec.zxzx.x, vec.zxzx.y, vec.zxzx.z, vec.zxzx.w], [3, 1, 3, 1]);
      expectEqualish([vec.zyzy.x, vec.zyzy.y, vec.zyzy.z, vec.zyzy.w], [3, 2, 3, 2]);
      expectEqualish([vec.zzzz.x, vec.zzzz.y, vec.zzzz.z, vec.zzzz.w], [3, 3, 3, 3]);
      expectEqualish([vec.zwzw.x, vec.zwzw.y, vec.zwzw.z, vec.zwzw.w], [3, 4, 3, 4]);
      expectEqualish([vec.wxwx.x, vec.wxwx.y, vec.wxwx.z, vec.wxwx.w], [4, 1, 4, 1]);
      expectEqualish([vec.wywy.x, vec.wywy.y, vec.wywy.z, vec.wywy.w], [4, 2, 4, 2]);
      expectEqualish([vec.wzwz.x, vec.wzwz.y, vec.wzwz.z, vec.wzwz.w], [4, 3, 4, 3]);
      expectEqualish([vec.wwww.x, vec.wwww.y, vec.wwww.z, vec.wwww.w], [4, 4, 4, 4]);
    });

    it("should return correct vector types", () => {
      const vec = new Vec4(1, 2, 3, 4);

      // 2-component should return Vec2
      if (!(vec.xy instanceof Vec2)) throw new Error("Expected vec.xy to be instance of Vec2");

      // 4-component should return Vec4
      if (!(vec.xyxy instanceof Vec4)) throw new Error("Expected vec.xyxy to be instance of Vec4");
    });
  });

  describe("vec4 function overloads", () => {
    it("should create Vec4 with no arguments", () => {
      const result = vec4();
      expectEqualish([result.x, result.y, result.z, result.w], [0, 0, 0, 0]);
    });

    it("should create Vec4 with single number argument", () => {
      const result = vec4(5);
      expectEqualish([result.x, result.y, result.z, result.w], [5, 5, 5, 5]);
    });

    it("should create Vec4 with four number arguments", () => {
      const result = vec4(1, 2, 3, 4);
      expectEqualish([result.x, result.y, result.z, result.w], [1, 2, 3, 4]);
    });

    it("should create Vec4 from existing Vec4", () => {
      const original = new Vec4(3, 4, 5, 6);
      const result = vec4(original);
      expectEqualish([result.x, result.y, result.z, result.w], [3, 4, 5, 6]);
      // Should be a new instance, not the same reference
      if (result === original) throw new Error("Expected new instance");
    });

    it("should create Vec4 from Vec3 and w component", () => {
      const vec3 = new Vec3(1, 2, 3);
      const result = vec4(vec3, 4);
      expectEqualish([result.x, result.y, result.z, result.w], [1, 2, 3, 4]);
    });

    it("should create Vec4 from Vec2 and Vec2", () => {
      const vec2a = new Vec2(1, 2);
      const vec2b = new Vec2(3, 4);
      const result = vec4(vec2a, vec2b);
      expectEqualish([result.x, result.y, result.z, result.w], [1, 2, 3, 4]);
    });

    it("should create Vec4 from Vec2, z, and w components", () => {
      const vec2 = new Vec2(1, 2);
      const result = vec4(vec2, 3, 4);
      expectEqualish([result.x, result.y, result.z, result.w], [1, 2, 3, 4]);
    });

    it("should create Vec4 from x, y, and Vec2", () => {
      const vec2 = new Vec2(3, 4);
      const result = vec4(1, 2, vec2);
      expectEqualish([result.x, result.y, result.z, result.w], [1, 2, 3, 4]);
    });

    it("should create Vec4 from x component and Vec3", () => {
      const vec3 = new Vec3(2, 3, 4);
      const result = vec4(1, vec3);
      expectEqualish([result.x, result.y, result.z, result.w], [1, 2, 3, 4]);
    });

    it("should handle undefined arguments correctly", () => {
      const result = vec4(undefined);
      expectEqualish([result.x, result.y, result.z, result.w], [0, 0, 0, 0]);
    });
  });
});
