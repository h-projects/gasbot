module.exports = content => {
  const badLetters = require('../detection.json').join('');
  return !RegExp(`[^\\s${badLetters}]`, 'iu').test(content);
};
