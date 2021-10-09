module.exports = content => {
  const badLetters = require('../detection.json').join('');
  if (!content) return false;
  return !RegExp(`[^\\s${badLetters}]`, 'iu').test(content);
};
