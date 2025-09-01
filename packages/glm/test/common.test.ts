import { describe, it, beforeEach } from "bun:test";
import { toRadian, toDegree, equals, EPSILON } from "../src";
import { expectEqualish } from "./helpers/test-utils";

describe("common", () => {
  let result: number;

  describe("toRadian", () => {
    beforeEach(() => {
      result = toRadian(180);
    });

    it("should return a value of 3.141592654(Math.PI)", () => {
      expectEqualish(result, Math.PI);
    });
  });

  describe("toDegree", () => {
    beforeEach(() => {
      result = toDegree(Math.PI);
    });

    it("should return a value of 180", () => {
      expectEqualish(result, 180);
    });
  });

  describe("equals", () => {
    let r0: boolean, r1: boolean, r2: boolean, r3: boolean, r4: boolean;

    beforeEach(() => {
      r0 = equals(1.0, 0.0);
      r1 = equals(1.0, 1.0);
      r2 = equals(1.0 + EPSILON / 2, 1.0);
      r3 = equals(1.0011, 1.0, 0.001);
      r4 = equals(100.5, 100.7, 0.2);
    });

    it("should return false for different numbers", () => {
      if (r0) throw new Error("Expected false for different numbers");
    });

    it("should return true for the same number", () => {
      if (!r1) throw new Error("Expected true for the same number");
    });

    it("should return true for numbers that are close", () => {
      if (!r2) throw new Error("Expected true for numbers that are close");
    });

    it("should return false for numbers that are close but tolerance is set to smaller value", () => {
      if (r3) throw new Error("Expected false for numbers that are close but tolerance is set to smaller value");
    });

    it("should return true for numbers that are close with tolerance is set to bigger value", () => {
      if (!r4) throw new Error("Expected true for numbers that are close with tolerance is set to bigger value");
    });
  });
});
