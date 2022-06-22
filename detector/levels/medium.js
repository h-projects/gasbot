const badLetters = require('../detection.json').join('');
const lowDetect = require('./low');

module.exports = content => RegExp(`(?<=\\W|^)[${badLetters}]+(?=\\W|$)`, 'iu').test(content) || lowDetect(content);
