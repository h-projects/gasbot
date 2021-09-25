module.exports = content => {
  const badLetters = require('../detection.json').join('');
  const lowDetection = require('./low.js');
  return RegExp(`(\\s[${badLetters}]+\\s)|(^[${badLetters}]+\\s)|(\\s[${badLetters}]+$)`, 'iu').test(content) || lowDetection(content);
};
