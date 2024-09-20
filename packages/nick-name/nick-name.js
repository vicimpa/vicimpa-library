const gen1 = require('./models/stage1');
const gen2 = require('./models/stage2');
const gen3 = require('./models/stage3');
const { rnd } = require('./models/utils');

module.exports = function genName(method = 1, length = rnd(12) + 3) {
  try {
    switch (method) {
      case 1: return gen1(length)
      case 2: return gen2(length)
      case 3: return gen3(length)
    }
  } catch (e) {
    if (e instanceof TypeError)
      return genName(method, length)

    throw e
  }

  throw new Error('Unknow method!')
}