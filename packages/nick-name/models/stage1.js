const { rnd, alphaup, alphalow } = require('./utils');
const letters1 = require('./static/letters1');

module.exports = function getName(length = rnd(12) + 3) {
  if(length < 3 || length > 15)
    throw new Error('Length need min 3 max 15');
    
  const curchar = rnd(26);
  let nam = alphaup(curchar);
  let ran, curar, firstchar, nextchar;

  firstchar = curchar;

  for (var cnt = 1; cnt < length; cnt++) {
    ran = rnd(1000);
    nextchar = 0;
    curar = letters1[firstchar];
    while (ran >= curar[nextchar]) nextchar++;

    firstchar = nextchar;
    nam += alphalow(nextchar);
  }

  return nam
}