/**
 * @file Default values for password evaluation.
 *
 * This file contains default suggestions and qualities used for evaluating
 * passwords. The suggestions array provides tips and recommendations for
 * creating strong passwords, while the qualities array represents the levels of
 * password strength. These default values can be customized or overridden as
 * needed.
 *
 * @private
 * @module PasswordToolKit/defaults
 */

// ━━ TYPE DEFINITIONS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * Array of suggestions for password evaluation.
 *
 * @private
 * @typedef {Array<string>} Suggestions
 */

/**
 * Array of qualities for password evaluation.
 *
 * @private
 * @typedef {Array<string>} Qualities
 */

// ━━	MODULE	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * Array containing default suggestions for password evaluation.
 *
 * @private
 * @type {Suggestions}
 */
const suggestions = [
  'The password must have at least 8 characters.',
  'Add uppercase and lowercase letters to make the password more secure.',
  'Add numbers to make the password more secure.',
  'Add symbols to make the password more secure.',
  'Avoid using repeated characters in the password.',
  'Avoid using common password patterns.',
  'Excellent! The password is secure.',
];

/**
 * Array containing default qualities for password evaluation.
 *
 * @private
 * @type {Qualities}
 */
const qualities = ['insecure', 'low', 'medium', 'high', 'perfect'];

// ━━ EXPORT MODULE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
exports.suggestions = suggestions;
exports.qualities = qualities;
