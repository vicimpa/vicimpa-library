const { rnd, alphaup, alphalow } = require('./utils');
const letters1 = require('./static/letters1');
const letters2 = require('./static/letters2');
const letters3 = require('./static/letters3');

module.exports = function getName(length = rnd(12) + 3) {
  if(length < 3 || length > 15)
    throw new Error('Length need min 3 max 15');
    
  const curchar = rnd(26);
  let nam = alphaup(curchar);
  let ran, curar, firstchar, secondchar, thirdchar, nextchar;

  firstchar = curchar;

  ran = rnd(1000);
  secondchar = 0;
  curar = letters1[firstchar];
  while (ran >= curar[secondchar]) secondchar++;
  nam += alphalow(secondchar);

  ran = rnd(1000);
  thirdchar = 0;
  curar = letters2[firstchar][secondchar];
  while (ran >= curar[thirdchar]) thirdchar++;
  nam += alphalow(thirdchar);

  for (var cnt = 3; cnt < length; cnt++) {
    ran = rnd(1000);
    nextchar = 0;
    curar = letters3[firstchar][secondchar][thirdchar];
    while (ran >= curar[nextchar]) nextchar++;

    firstchar = secondchar;
    secondchar = thirdchar;
    thirdchar = nextchar;
    nam += alphalow(nextchar);
  }

  return nam
}