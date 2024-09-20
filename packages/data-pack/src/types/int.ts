import { cached } from "../lib/cached";
import num from "./num";

export default cached(
  (b: 8 | 16 | 32 = 32) => (
    num(globalThis[`Int${b}Array`], 'Int' + b)
  )
);