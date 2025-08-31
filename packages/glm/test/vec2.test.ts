import { describe, it, beforeEach } from "bun:test";
import { Vec2, Vec3, Vec4, vec2 } from "..";
import { expectEqualish } from "./helpers/test-utils";

describe("vec2", () => {
  let out: Vec2, vecA: Vec2, vecB: Vec2, result: Vec2;

  beforeEach(() => {
    vecA = new Vec2(1, 2);
    vecB = new Vec2(3, 4);
    out = new Vec2(0, 0);
  });

  describe("create", () => {
    beforeEach(() => { result = new Vec2(); });
    it("should return a 2 element array initialized to 0s", () => {
      expectEqualish([result.x, result.y], [0, 0]);
    });
  });

  describe("clone", () => {
    beforeEach(() => { result = vecA.clone(); });
    it("should return a 2 element array initialized to the values in vecA", () => {
      expectEqualish([result.x, result.y], [vecA.x, vecA.y]);
    });
  });

  describe("fromValues", () => {
    beforeEach(() => { result = new Vec2(1, 2); });
    it("should return a 2 element array initialized to the values passed", () => {
      expectEqualish([result.x, result.y], [1, 2]);
    });
  });

  describe("copy", () => {
    beforeEach(() => { result = out.copy(vecA); });
    it("should place values into out", () => {
      expectEqualish([out.x, out.y], [1, 2]);
    });
    it("should return out", () => {
      if (result !== out) throw new Error("Expected result to be out");
    });
  });

  describe("set", () => {
    beforeEach(() => { result = out.set(1, 2); });
    it("should place values into out", () => {
      expectEqualish([out.x, out.y], [1, 2]);
    });
    it("should return out", () => {
      if (result !== out) throw new Error("Expected result to be out");
    });
  });

  describe("add", () => {
    describe("with a separate output vector", () => {
      beforeEach(() => { result = out.copy(vecA).add(vecB); });

      it("should place values into out", () => {
        expectEqualish([out.x, out.y], [4, 6]);
      });
      it("should return out", () => {
        if (result !== out) throw new Error("Expected result to be out");
      });
      it("should not modify vecA", () => {
        expectEqualish([vecA.x, vecA.y], [1, 2]);
      });
      it("should not modify vecB", () => {
        expectEqualish([vecB.x, vecB.y], [3, 4]);
      });
    });

    describe("when vecA is the output vector", () => {
      beforeEach(() => { result = vecA.add(vecB); });

      it("should place values into vecA", () => {
        expectEqualish([vecA.x, vecA.y], [4, 6]);
      });
      it("should return vecA", () => {
        if (result !== vecA) throw new Error("Expected result to be vecA");
      });
      it("should not modify vecB", () => {
        expectEqualish([vecB.x, vecB.y], [3, 4]);
      });
    });
  });

  describe("subtract", () => {
    it("should have an alias called 'sub'", () => {
      // Проверяем что метод sub существует
      if (typeof vecA.sub !== 'function') throw new Error("Expected sub method to exist");
    });

    describe("with a separate output vector", () => {
      beforeEach(() => { result = out.copy(vecA).sub(vecB); });

      it("should place values into out", () => {
        expectEqualish([out.x, out.y], [-2, -2]);
      });
      it("should return out", () => {
        if (result !== out) throw new Error("Expected result to be out");
      });
      it("should not modify vecA", () => {
        expectEqualish([vecA.x, vecA.y], [1, 2]);
      });
      it("should not modify vecB", () => {
        expectEqualish([vecB.x, vecB.y], [3, 4]);
      });
    });

    describe("when vecA is the output vector", () => {
      beforeEach(() => { result = vecA.sub(vecB); });

      it("should place values into vecA", () => {
        expectEqualish([vecA.x, vecA.y], [-2, -2]);
      });
      it("should return vecA", () => {
        if (result !== vecA) throw new Error("Expected result to be vecA");
      });
      it("should not modify vecB", () => {
        expectEqualish([vecB.x, vecB.y], [3, 4]);
      });
    });
  });

  describe("multiply", () => {
    it("should have an alias called 'mul'", () => {
      // Проверяем что метод mul существует
      if (typeof vecA.mul !== 'function') throw new Error("Expected mul method to exist");
    });

    describe("with a separate output vector", () => {
      beforeEach(() => { result = out.copy(vecA).mul(vecB); });

      it("should place values into out", () => {
        expectEqualish([out.x, out.y], [3, 8]);
      });
      it("should return out", () => {
        if (result !== out) throw new Error("Expected result to be out");
      });
      it("should not modify vecA", () => {
        expectEqualish([vecA.x, vecA.y], [1, 2]);
      });
      it("should not modify vecB", () => {
        expectEqualish([vecB.x, vecB.y], [3, 4]);
      });
    });

    describe("when vecA is the output vector", () => {
      beforeEach(() => { result = vecA.mul(vecB); });

      it("should place values into vecA", () => {
        expectEqualish([vecA.x, vecA.y], [3, 8]);
      });
      it("should return vecA", () => {
        if (result !== vecA) throw new Error("Expected result to be vecA");
      });
      it("should not modify vecB", () => {
        expectEqualish([vecB.x, vecB.y], [3, 4]);
      });
    });
  });

  describe("divide", () => {
    it("should have an alias called 'div'", () => {
      // Проверяем что метод div существует
      if (typeof vecA.div !== 'function') throw new Error("Expected div method to exist");
    });

    describe("with a separate output vector", () => {
      beforeEach(() => { result = out.copy(vecA).div(vecB); });

      it("should place values into out", () => {
        expectEqualish([out.x, out.y], [1 / 3, 2 / 4]);
      });
      it("should return out", () => {
        if (result !== out) throw new Error("Expected result to be out");
      });
      it("should not modify vecA", () => {
        expectEqualish([vecA.x, vecA.y], [1, 2]);
      });
      it("should not modify vecB", () => {
        expectEqualish([vecB.x, vecB.y], [3, 4]);
      });
    });
  });

  describe("scale", () => {
    beforeEach(() => { result = out.copy(vecA).scale(2); });

    it("should scale the individual elements", () => {
      expectEqualish([out.x, out.y], [2, 4]);
    });
    it("should return out", () => {
      if (result !== out) throw new Error("Expected result to be out");
    });
  });

  describe("dot", () => {
    let dotResult: number;
    beforeEach(() => { dotResult = vecA.dot(vecB); });

    it("should return the dot product", () => {
      expectEqualish(dotResult, 11);
    });
    it("should not modify vecA", () => {
      expectEqualish([vecA.x, vecA.y], [1, 2]);
    });
    it("should not modify vecB", () => {
      expectEqualish([vecB.x, vecB.y], [3, 4]);
    });
  });

  describe("length", () => {
    let lengthResult: number;
    beforeEach(() => { lengthResult = vecA.length(); });

    it("should return the length", () => {
      expectEqualish(lengthResult, Math.sqrt(5));
    });
    it("should not modify vecA", () => {
      expectEqualish([vecA.x, vecA.y], [1, 2]);
    });
  });

  describe("lengthSq", () => {
    let lengthSqResult: number;
    beforeEach(() => { lengthSqResult = vecA.lengthSq(); });

    it("should return the squared length", () => {
      expectEqualish(lengthSqResult, 5);
    });
    it("should not modify vecA", () => {
      expectEqualish([vecA.x, vecA.y], [1, 2]);
    });
  });

  describe("normalize", () => {
    beforeEach(() => { result = out.copy(vecA).normalize(); });

    it("should normalize the vector", () => {
      const len = Math.sqrt(result.x * result.x + result.y * result.y);
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
      expectEqualish(distanceResult, Math.sqrt(8));
    });
    it("should not modify vecA", () => {
      expectEqualish([vecA.x, vecA.y], [1, 2]);
    });
    it("should not modify vecB", () => {
      expectEqualish([vecB.x, vecB.y], [3, 4]);
    });
  });

  describe("distanceSq", () => {
    let distanceSqResult: number;
    beforeEach(() => { distanceSqResult = vecA.distanceSq(vecB); });

    it("should return the squared distance", () => {
      expectEqualish(distanceSqResult, 8);
    });
    it("should not modify vecA", () => {
      expectEqualish([vecA.x, vecA.y], [1, 2]);
    });
    it("should not modify vecB", () => {
      expectEqualish([vecB.x, vecB.y], [3, 4]);
    });
  });

  describe("negate", () => {
    beforeEach(() => { result = out.copy(vecA).negate(); });

    it("should negate the individual elements", () => {
      expectEqualish([out.x, out.y], [-1, -2]);
    });
    it("should return out", () => {
      if (result !== out) throw new Error("Expected result to be out");
    });
  });

  describe("inverse", () => {
    beforeEach(() => { result = out.copy(vecA).inverse(); });

    it("should invert the individual elements", () => {
      expectEqualish([out.x, out.y], [1, 0.5]);
    });
    it("should return out", () => {
      if (result !== out) throw new Error("Expected result to be out");
    });
  });

  describe("ceil", () => {
    beforeEach(() => { result = out.copy(vecA).ceil(); });

    it("should ceil the individual elements", () => {
      expectEqualish([out.x, out.y], [1, 2]);
    });
    it("should return out", () => {
      if (result !== out) throw new Error("Expected result to be out");
    });
  });

  describe("floor", () => {
    beforeEach(() => { result = out.copy(vecA).floor(); });

    it("should floor the individual elements", () => {
      expectEqualish([out.x, out.y], [1, 2]);
    });
    it("should return out", () => {
      if (result !== out) throw new Error("Expected result to be out");
    });
  });

  describe("round", () => {
    beforeEach(() => { result = out.copy(vecA).round(); });

    it("should round the individual elements", () => {
      expectEqualish([out.x, out.y], [1, 2]);
    });
    it("should return out", () => {
      if (result !== out) throw new Error("Expected result to be out");
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

  describe("min", () => {
    beforeEach(() => { result = out.min(vecA, vecB); });

    it("should return the minimum of individual elements", () => {
      expectEqualish([out.x, out.y], [1, 2]);
    });
    it("should return out", () => {
      if (result !== out) throw new Error("Expected result to be out");
    });
  });

  describe("max", () => {
    beforeEach(() => { result = out.max(vecA, vecB); });

    it("should return the maximum of individual elements", () => {
      expectEqualish([out.x, out.y], [3, 4]);
    });
    it("should return out", () => {
      if (result !== out) throw new Error("Expected result to be out");
    });
  });

  describe("lerp", () => {
    beforeEach(() => { result = out.lerp(vecA, vecB, 0.5); });

    it("should interpolate between vectors", () => {
      expectEqualish([out.x, out.y], [2, 3]);
    });
    it("should return out", () => {
      if (result !== out) throw new Error("Expected result to be out");
    });
  });

  describe("iterator", () => {
    it("should iterate over x and y values", () => {
      const values = Array.from(vecA);
      expectEqualish(values, [1, 2]);
    });
  });

  describe("array access", () => {
    it("should access x via [0]", () => {
      if (vecA[0] !== vecA.x) throw new Error("Expected vecA[0] to equal vecA.x");
    });
    it("should access y via [1]", () => {
      if (vecA[1] !== vecA.y) throw new Error("Expected vecA[1] to equal vecA.y");
    });
  });

  describe("swizzling", () => {
    it("should support 2-component swizzling", () => {
      const vec = new Vec2(1, 2);

      // Test 2-component swizzling
      expectEqualish([vec.xx.x, vec.xx.y], [1, 1]);
      expectEqualish([vec.xy.x, vec.xy.y], [1, 2]);
      expectEqualish([vec.yx.x, vec.yx.y], [2, 1]);
      expectEqualish([vec.yy.x, vec.yy.y], [2, 2]);
    });

    it("should support 3-component swizzling", () => {
      const vec = new Vec2(1, 2);

      // Test 3-component swizzling
      expectEqualish([vec.xxx.x, vec.xxx.y, vec.xxx.z], [1, 1, 1]);
      expectEqualish([vec.xyx.x, vec.xyx.y, vec.xyx.z], [1, 2, 1]);
      expectEqualish([vec.yxy.x, vec.yxy.y, vec.yxy.z], [2, 1, 2]);
      expectEqualish([vec.yyy.x, vec.yyy.y, vec.yyy.z], [2, 2, 2]);
    });

    it("should support 4-component swizzling", () => {
      const vec = new Vec2(1, 2);

      // Test 4-component swizzling
      expectEqualish([vec.xxxx.x, vec.xxxx.y, vec.xxxx.z, vec.xxxx.w], [1, 1, 1, 1]);
      expectEqualish([vec.xyxy.x, vec.xyxy.y, vec.xyxy.z, vec.xyxy.w], [1, 2, 1, 2]);
      expectEqualish([vec.yxyx.x, vec.yxyx.y, vec.yxyx.z, vec.yxyx.w], [2, 1, 2, 1]);
      expectEqualish([vec.yyyy.x, vec.yyyy.y, vec.yyyy.z, vec.yyyy.w], [2, 2, 2, 2]);
    });

    it("should return correct vector types", () => {
      const vec = new Vec2(1, 2);

      // 2-component should return Vec2
      if (!(vec.xy instanceof Vec2)) throw new Error("Expected vec.xy to be instance of Vec2");

      // 3-component should return Vec3
      if (!(vec.xyx instanceof Vec3)) throw new Error("Expected vec.xyx to be instance of Vec3");

      // 4-component should return Vec4
      if (!(vec.xyxy instanceof Vec4)) throw new Error("Expected vec.xyxy to be instance of Vec4");
    });
  });

  describe("vec2 function overloads", () => {
    it("should create Vec2 with no arguments", () => {
      const result = vec2();
      expectEqualish([result.x, result.y], [0, 0]);
    });

    it("should create Vec2 with single number argument", () => {
      const result = vec2(5);
      expectEqualish([result.x, result.y], [5, 5]);
    });

    it("should create Vec2 with two number arguments", () => {
      const result = vec2(1, 2);
      expectEqualish([result.x, result.y], [1, 2]);
    });

    it("should create Vec2 from existing Vec2", () => {
      const original = new Vec2(3, 4);
      const result = vec2(original);
      expectEqualish([result.x, result.y], [3, 4]);
      // Should be a new instance, not the same reference
      if (result === original) throw new Error("Expected new instance");
    });

    it("should handle undefined arguments correctly", () => {
      const result = vec2(undefined);
      expectEqualish([result.x, result.y], [0, 0]);
    });
  });
});
