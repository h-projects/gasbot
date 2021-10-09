module.exports = content => {
  const badLetters = require('../detection.json').join('');
  const lowDetection = require('./low.js');
  return RegExp(`\\b[${badLetters}]+\\b`, 'iu').test(content) || lowDetection(content);
};
