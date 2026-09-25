import { alphalow, alphaup, rnd, selectIndex } from './utils';

import letters1 from './static/letters1';

export default function getName(length = rnd(12) + 3) {
  if (length < 3 || length > 15)
    throw new Error('Length need min 3 max 15');

  const curchar = rnd(26);
  let nam = alphaup(curchar);
  let firstchar, nextchar;

  firstchar = curchar;

  for (let cnt = 1; cnt < length; cnt++) {
    nextchar = selectIndex(letters1[firstchar], rnd(1000));

    firstchar = nextchar;
    nam += alphalow(nextchar);
  }

  return nam;
}
