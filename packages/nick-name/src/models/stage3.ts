import { alphalow, alphaup, rnd, selectIndex } from './utils';

import letters1 from './static/letters1';
import letters2 from './static/letters2';
import letters3 from './static/letters3';

export default function getName(length = rnd(12) + 3) {
  if (length < 3 || length > 15)
    throw new Error('Length need min 3 max 15');

  const curchar = rnd(26);
  let nam = alphaup(curchar);
  let firstchar, secondchar, thirdchar, nextchar;

  firstchar = curchar;

  secondchar = selectIndex(letters1[firstchar], rnd(1000));
  nam += alphalow(secondchar);

  thirdchar = selectIndex(
    letters2[firstchar][secondchar],
    rnd(1000),
  );
  nam += alphalow(thirdchar);

  for (var cnt = 3; cnt < length; cnt++) {
    nextchar = selectIndex(
      letters3[firstchar][secondchar][thirdchar],
      rnd(1000),
    );

    firstchar = secondchar;
    secondchar = thirdchar;
    thirdchar = nextchar;
    nam += alphalow(nextchar);
  }

  return nam;
}
