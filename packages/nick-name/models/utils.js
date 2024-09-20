exports.rnd = function rnd(ceiling = 0) {
  return Math.floor(Math.random() * ceiling);
}

exports.alphaup = function alphaup(index = 0) {
  return String.fromCharCode(65 + index);
}

exports.alphalow = function alphalow(index = 0) {
  return String.fromCharCode(97 + index);
}