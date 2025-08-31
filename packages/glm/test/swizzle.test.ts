import { describe, it } from "bun:test";
import { Vec2, Vec3, Vec4 } from "..";
import { expectEqualish } from "./helpers/test-utils";

describe("swizzling examples", () => {
  it("should demonstrate practical swizzling use cases", () => {
    // Create a 3D position vector
    const position = new Vec3(10, 20, 30);

    // Extract 2D components for screen rendering
    const screenPos = position.xy;
    expectEqualish([screenPos.x, screenPos.y], [10, 20]);

    // Extract depth for z-buffer
    const depth = position.z;
    expectEqualish(depth, 30);

    // Create a color vector from position (for debugging)
    const color = position.xyz;
    expectEqualish([color.x, color.y, color.z], [10, 20, 30]);

    // Reorder components for different coordinate systems
    const yxz = position.yxz;
    expectEqualish([yxz.x, yxz.y, yxz.z], [20, 10, 30]);

    // Create a 4D vector for homogeneous coordinates
    const homogeneous = new Vec4(position.x, position.y, position.z, 0);
    expectEqualish([homogeneous.x, homogeneous.y, homogeneous.z, homogeneous.w], [10, 20, 30, 0]);
  });

  it("should demonstrate component repetition", () => {
    const vec = new Vec2(5, 7);

    // Repeat components
    const xxx = vec.xxx;
    expectEqualish([xxx.x, xxx.y, xxx.z], [5, 5, 5]);

    const yyy = vec.yyy;
    expectEqualish([yyy.x, yyy.y, yyy.z], [7, 7, 7]);

    // Pattern repetition
    const xyxy = vec.xyxy;
    expectEqualish([xyxy.x, xyxy.y, xyxy.z, xyxy.w], [5, 7, 5, 7]);
  });

  it("should work with Vec4 for complex swizzling", () => {
    const vec = new Vec4(1, 2, 3, 4);

    // Extract 2D components
    const xy = vec.xy;
    expectEqualish([xy.x, xy.y], [1, 2]);

    const zw = vec.zw;
    expectEqualish([zw.x, zw.y], [3, 4]);

    // Extract 3D components
    const xyz = vec.xyz;
    expectEqualish([xyz.x, xyz.y, xyz.z], [1, 2, 3]);

    const yzw = vec.yzw;
    expectEqualish([yzw.x, yzw.y, yzw.z], [2, 3, 4]);

    // Complex 4D swizzling
    const wzyx = vec.wzyx;
    expectEqualish([wzyx.x, wzyx.y, wzyx.z, wzyx.w], [4, 3, 2, 1]);
  });

  it("should demonstrate practical game development scenarios", () => {
    // Camera position and target
    const cameraPos = new Vec3(0, 10, 0);
    const targetPos = new Vec3(5, 0, 5);

    // Extract horizontal components for 2D minimap
    const camera2D = cameraPos.xz;
    expectEqualish([camera2D.x, camera2D.y], [0, 0]);

    const target2D = targetPos.xz;
    expectEqualish([target2D.x, target2D.y], [5, 5]);

    // Calculate direction vector
    const direction = targetPos.sub(cameraPos);
    const horizontalDir = direction.xz;
    expectEqualish([horizontalDir.x, horizontalDir.y], [5, 5]);

    // Extract height difference
    const heightDiff = direction.y;
    expectEqualish(heightDiff, -10);
  });
});
