import { cache } from "./Common";
import { Mat2 } from "./Mat2";
import { Mat2d } from "./Mat2d";
import { Mat3 } from "./Mat3";
import { Mat4 } from "./Mat4";
import { Quat } from "./Quat";
import { Vec2 } from "./Vec2";
import { Vec3 } from "./Vec3";
import { Vec4 } from "./Vec4";

export default Object.defineProperties({}, {
  vec2: { get: cache(() => new Vec2()) },
  vec3: { get: cache(() => new Vec3()) },
  vec4: { get: cache(() => new Vec4()) },
  mat2: { get: cache(() => new Mat2()) },
  mat2d: { get: cache(() => new Mat2d()) },
  mat3: { get: cache(() => new Mat3()) },
  mat4: { get: cache(() => new Mat4()) },
  quat: { get: cache(() => new Quat()) },
}) as {
  vec2: Vec2;
  vec3: Vec3;
  vec4: Vec4;
  mat2: Mat2;
  mat2d: Mat2d;
  mat3: Mat3;
  mat4: Mat4;
  quat: Quat;
};