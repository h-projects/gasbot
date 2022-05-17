const badLetters = require('../detection.json').join('');

module.exports = content => RegExp(`[${badLetters}]`, 'iu').test(content);
