module.exports = content => {
  const badLetters = require('../detection.json').join('');
  if (!/[^\s]/u.test(content)) return false;
  return !RegExp(`[^\\s${badLetters}]`, 'iu').test(content);
};
