import gen1 from "./models/stage1";
import gen2 from "./models/stage2";
import gen3 from "./models/stage3";
import { InvalidDistributionError, rnd } from "./models/utils";

const MAX_GENERATION_ATTEMPTS = 100;

export function genName(method = 1, length = rnd(12) + 3) {
  for (let attempt = 0; attempt < MAX_GENERATION_ATTEMPTS; attempt++) {
    try {
      switch (method) {
        case 1: return gen1(length);
        case 2: return gen2(length);
        case 3: return gen3(length);
        default: throw new Error('Unknown method!');
      }
    } catch (e) {
      if (!(e instanceof InvalidDistributionError))
        throw e;
    }
  }

  throw new Error('Unable to generate a name from the probability tables');
}
