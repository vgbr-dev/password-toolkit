/**
 * @file Constants and regular expressions for password evaluation.
 *
 * This file contains constants and regular expressions used for password
 * evaluation. These constants and patterns can be used for various password
 * strength checks and validations.
 *
 * @private
 * @module PasswordToolKit/constants
 */

// ━━ TYPE DEFINITIONS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * Object that contains regular expressions to validate certain patterns in
 * the password.
 *
 * @private
 * @typedef  {object} RegExpsPassword
 * @property {RegExp} numbers         - At least one numeric digit.
 * @property {RegExp} symbols         - At least one special symbol.
 * @property {RegExp} uppercases      - At least one capital letter.
 * @property {RegExp} lowercases      - At least one lowercase letter.
 * @property {RegExp} repeated        - Contains no repeating characters.
 */

/**
 * Array containing regular expressions to validate common password patterns.
 *
 * @private
 * @typedef {Array<RegExp>} Patterns
 */

// ━━	MODULE	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * Object that contains regular expressions to validate certain patterns in
 * the password.
 *
 * @private
 * @type {RegExpsPassword}
 */
const regexps = {
  numbers: /\d/,
  symbols: /[\W_]/,
  uppercases: /[A-Z]/,
  lowercases: /[a-z]/,
  repeated: /(.).*?\1/,
};

/**
 * Array containing regular expressions to validate common password patterns.
 *
 * @private
 * @type {Patterns}
 */
const patterns = [
  /\d{4}/, // 4 consecutive digits
  /\d{6}/, // 6 consecutive digits
  /[A-Za-z]{4}/, // 4 consecutive letters
  /[A-Za-z]{6}/, // 6 consecutive letters
  /([A-Za-z\d])\1{2,}/, // 3 or more consecutive identical characters
  /[A-Za-z]+\d+[A-Za-z]*/, // letters and numbers interspersed
  /[A-Za-z]*\d+[A-Za-z]+/, // letters and numbers interspersed
  /([A-Za-z\d])\1{3,}/, // 4 or more consecutive identical characters
];

// ━━ EXPORT MODULE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
exports.regexps = regexps;
exports.patterns = patterns;
