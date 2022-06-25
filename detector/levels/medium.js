const badLetters = require('../detection.json').join('');
const lowDetect = require('./low');

const boundaries = '[\\s!-/:-@[-`{-¿ -⁯]';

module.exports = content => RegExp(`(?<=${boundaries}|^)[${badLetters}]+(?=${boundaries}|$)`, 'iu').test(content) || lowDetect(content);
