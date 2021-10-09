module.exports = content => {
  const badLetters = require('../detection.json').join('');
  return RegExp(`[${badLetters}]`, 'iu').test(content);
};
