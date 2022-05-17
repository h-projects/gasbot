const badLetters = require('../detection.json').join();

module.exports = content => {
  if (!/[^\s]/u.test(content)) return false;
  return !RegExp(`[^\\s${badLetters}]`, 'iu').test(content);
};
