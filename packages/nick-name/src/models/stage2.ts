import { alphalow, alphaup, rnd, selectIndex } from './utils';

import letters1 from './static/letters1';
import letters2 from './static/letters2';

export default function getName(length = rnd(12) + 3) {
  if (length < 3 || length > 15)
    throw new Error('Length need min 3 max 15');

  const curchar = rnd(26);
  let nam = alphaup(curchar);
  let firstchar, secondchar, nextchar;

  firstchar = curchar;

  secondchar = selectIndex(letters1[firstchar], rnd(1000));
  nam += alphalow(secondchar);

  for (var cnt = 2; cnt < length; cnt++) {
    nextchar = selectIndex(
      letters2[firstchar][secondchar],
      rnd(1000),
    );

    firstchar = secondchar;
    secondchar = nextchar;
    nam += alphalow(nextchar);
  }

  return nam;
}
