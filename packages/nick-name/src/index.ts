import gen1 from "./models/stage1";
import gen2 from "./models/stage2";
import gen3 from "./models/stage3";
import { rnd } from "./models/utils";

export function genName(method = 1, length = rnd(12) + 3) {
  try {
    switch (method) {
      case 1: return gen1(length);
      case 2: return gen2(length);
      case 3: return gen3(length);
    }
  } catch (e) {
    if (e instanceof TypeError)
      return genName(method, length);

    throw e;
  }

  throw new Error("Unknow method!");
}