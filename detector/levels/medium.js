const badLetters = require('../detection.json').join('');
const lowDetect = require('./low');

module.exports = content => RegExp(`\\b[${badLetters}]+\\b`, 'iu').test(content) || lowDetect(content);
