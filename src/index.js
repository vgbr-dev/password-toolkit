/**
 * @file Provides classes and functions for generating and evaluating passwords.
 *
 * Password manipulation tool. It provides functionality to generate strong passwords,
 * check their strength, and perform other password-related operations.
 *
 * @module PasswordToolKit
 */

// ━━ IMPORT MODULES ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// » IMPORT MODULES
const { regexps, patterns } = require('./constants');
const { suggestions, qualities } = require('./defaults');
const { getRandomNumber, getSelectedChars, charsToArray, everyString } = require('./functions');

// ━━ TYPE DEFINITIONS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * The options for the PasswordToolKit instance.
 *
 * @typedef  {object}         PasswordToolKitSettings
 * @property {number}         maximum                 - The maximum length allowed for a password.
 * @property {Array.<string>} suggestions             - Texts offering suggestions to improve password security.
 * @property {Array.<string>} qualities               - Quality levels for password strength.
 */

/**
 * Object that represents the result of validating password options.
 *
 * @typedef  {object}  OptionsValidation
 * @property {boolean} ok                - Indicates whether the validation passed `true` or failed `false`.
 * @property {string}  reason            - Reason for the validation result.
 */

/**
 * Configuration options to generate passwords.
 *
 * @typedef  {object}  GenerateOptions
 * @property {number}  size            - The desired size of the password.
 * @property {boolean} numbers         - Indicates whether numbers are allowed in the password.
 * @property {boolean} symbols         - Indicates whether symbols are allowed in the password.
 * @property {boolean} uppercases      - Indicates whether uppercase letters are allowed in the password.
 * @property {boolean} lowercases      - Indicates whether lowercase letters are allowed in the password.
 */

/**
 * The result of validating a password's security.
 *
 * @typedef  {object} PasswordEvaluation
 * @property {number} level              - A number indicating the security level of the password (0-5).
 * @property {string} suggestion         - Text offering suggestions to improve password security.
 * @property {string} quality            - The quality level of the password.
 */

// ━━	MODULE	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * Password manipulation tool. It provides functionality to generate strong
 * passwords, check their strength, and perform other password-related
 * operations.
 *
 * @version 2.0.0
 * @class PasswordToolKit
 * @classdesc Password class that allows generating and evaluating passwordstrength.
 */
class PasswordToolKit {
  /**
   * Creates a new Password instance with the given options.
   *
   * This constructor initializes the `PasswordToolKit` object with the
   * provided settings, including suggestions for password security, quality
   * levels, and maximum password length.
   *
   *
   * @memberof PasswordToolKit
   * @param {PasswordToolKitSettings} [settings] - The options for the PasswordToolKit instance.
   * @throws {TypeError} Throws a TypeError if the "options" parameter is not an object.
   * @throws {TypeError} Throws a TypeError if the "suggestions" value is not an array.
   * @throws {TypeError} Throws a TypeError if the "qualities" value is not an array.
   * @throws {TypeError} Throws a TypeError if the "maximum" value is not a number.
   * @throws {TypeError} Throws a TypeError if any "suggestions" value is not a string.
   * @throws {TypeError} Throws a TypeError if any "qualities" value is not a string.
   * @throws {RangeError} Throws a RangeError if the "suggestions" array length is not 7.
   * @throws {RangeError} Throws a RangeError if the "qualities" array length is not 5.
   * @example
   * ```js
   * const settings = {
   *   maximum: 30,
   *   suggestions: [
   *     'The password must have at least 8 characters.',
   *     'Add uppercase and lowercase letters to make the password more secure.',
   *     'Add numbers to make the password more secure.',
   *     'Add symbols to make the password more secure.',
   *     'Avoid using repeated characters in the password.',
   *     'Avoid using common password patterns.',
   *     'Excellent! The password is secure.',
   *   ],
   *   qualities: ['insecure', 'low', 'medium', 'high', 'perfect'],
   * };
   * const passwordToolKit = new PasswordToolKit(settings);
   * ```
   *
   */
  constructor(settings = {}) {
    if (typeof settings !== 'object') {
      throw new TypeError('The "options" must be an object.');
    }
    if (Reflect.has(settings, 'suggestions') && !Array.isArray(settings.suggestions)) {
      throw new TypeError('The "suggestions" value must be an array type.');
    }
    if (Reflect.has(settings, 'qualities') && !Array.isArray(settings.qualities)) {
      throw new TypeError('The "qualities" value must be an array type.');
    }
    if (Reflect.has(settings, 'maximum') && typeof settings.maximum !== 'number') {
      throw new TypeError('The "maximum" value must be a number type.');
    }
    if (Reflect.has(settings, 'suggestions') && !everyString(settings.suggestions)) {
      throw new TypeError('All "suggestions" values must be a string type.');
    }
    if (Reflect.has(settings, 'qualities') && !everyString(settings.qualities)) {
      throw new TypeError('All "qualities" values must be a string type.');
    }
    if (Reflect.has(settings, 'suggestions') && settings.suggestions.length !== 7) {
      throw new RangeError('The "suggestions" elements number must be equal to 7.');
    }
    if (Reflect.has(settings, 'qualities') && settings.qualities.length !== 5) {
      throw new RangeError('The "qualities" elements number must be equal to 5.');
    }
    Object.defineProperties(this, {
      suggestions: {
        value: settings.suggestions || suggestions,
        writable: false,
        enumerable: false,
        configurable: false,
      },
      qualities: {
        value: settings.qualities || qualities,
        writable: false,
        enumerable: false,
        configurable: false,
      },
      maximum: {
        value: settings.maximum || 30,
        writable: false,
        enumerable: false,
        configurable: false,
      },
    });
  }

  /**
   * The `create()` method, checks if the provided password options are valid.
   *
   * @memberof  PasswordToolKit
   * @param {GenerateOptions} options - The options for the password to be check.
   * @returns {OptionsValidation} The result of the validation.
   * @example Add example.
   */
  checkOptions(options) {
    if (typeof options !== 'object') {
      return { ok: false, reason: 'Options must be an object.' };
    }
    if (!Reflect.has(options, 'size')) {
      return { ok: false, reason: 'The "size" property is required.' };
    }
    if (options.size < 1) {
      return { ok: false, reason: 'The password length must be greater than 1.' };
    }
    if (options.size > this.maximum) {
      return { ok: false, reason: 'The password length must be less than specified maximum.' };
    }
    if (Reflect.has(options, 'numbers') && typeof options.numbers !== 'boolean') {
      return { ok: false, reason: 'The "numbers" option must be a boolean.' };
    }
    if (Reflect.has(options, 'symbols') && typeof options.symbols !== 'boolean') {
      return { ok: false, reason: 'The "symbols" option must be a boolean.' };
    }
    if (Reflect.has(options, 'uppercases') && typeof options.uppercases !== 'boolean') {
      return { ok: false, reason: 'The "uppercases" option must be a boolean.' };
    }
    if (Reflect.has(options, 'lowercases') && typeof options.lowercases !== 'boolean') {
      return { ok: false, reason: 'The "lowercases" option must be a boolean.' };
    }
    if (!options.numbers && !options.symbols && !options.uppercases && !options.lowercases) {
      return { ok: false, reason: 'You must select at least one option to generate the password.' };
    }
    return { ok: true, reason: null };
  }

  /**
   * The `generate()` method, generates a new password with the provided options.
   *
   * @memberof PasswordToolKit
   * @param {GenerateOptions} options - The options for the password to be generated.
   * @returns {string|null} The generated password, or null if the provided options are invalid.
   * @example
   * ```js
   * const options = { size: 12, numbers: true, symbols: true };
   * const password = passwordToolKit.generate(options);
   * console.log(password);
   * ```
   */
  generate(options) {
    const check = this.checkOptions(options);
    if (!check.ok) {
      return null;
    }
    const array = Array(options.size).fill('');
    const selectedChars = getSelectedChars(options);
    const chars = charsToArray(selectedChars);
    const password = array.map(() => chars[getRandomNumber(chars.length)]).join('');
    return password;
  }

  /**
   * The `evaluate()` method, Evaluates the strength of the provided password
   * and returns a result object.
   *
   * @memberof  PasswordToolKit
   * @param {string} password - The password to be evaluated.
   * @returns {PasswordEvaluation} The evaluation result object.
   * @throws {TypeError} If the provided password is not a string.
   * @example
   * ```js
   * const evaluation = passwordToolKit.evaluate('MyStr0ngP@ssword!');
   * ```
   */
  evaluate(password) {
    // Check if the password is string
    if (typeof password !== 'string') {
      throw new TypeError(`The "password" value must be a string type.`);
    }

    // Check if the password has at least 8 characters
    if (password.length < 8) {
      return { level: 0, quality: this.qualities[0], suggestion: this.suggestions[0] };
    }

    // Check if the password has uppercase and lowercase letters
    if (!regexps.lowercases.test(password) || !regexps.uppercases.test(password)) {
      return { level: 1, quality: this.qualities[1], suggestion: this.suggestions[1] };
    }

    // Check if the password has numbers
    if (!regexps.numbers.test(password)) {
      return { level: 2, quality: this.qualities[1], suggestion: this.suggestions[2] };
    }

    // Check if the password has symbols
    if (!regexps.symbols.test(password)) {
      return { level: 3, quality: this.qualities[2], suggestion: this.suggestions[3] };
    }

    // We check if the password has repeated characters
    if (regexps.repeated.test(password)) {
      return { level: 4, quality: this.qualities[3], suggestion: this.suggestions[4] };
    }

    // We check if the password has common patterns
    for (let i = 0; i < patterns.length; i += 1) {
      if (patterns[i].test(password)) {
        return { level: 4, quality: this.qualities[3], suggestion: this.suggestions[5] };
      }
    }

    // If the password passes all the above tests, it is considered safe.
    return { level: 5, quality: this.qualities[4], suggestion: this.suggestions[6] };
  }
}

// ━━ EXPORT MODULE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
module.exports = PasswordToolKit;
