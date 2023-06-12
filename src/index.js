/**
 * @file Provides classes and functions for generating and evaluating passwords.
 *
 * Password manipulation tool. It provides functionality to generate strong passwords,
 * check their strength, and perform other password-related operations.
 *
 * @module PasswordToolKit
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
 * Object that represents the result of validating password options.
 *
 * @typedef  {object}  OptionsValidation
 * @property {boolean} ok                - Indicates whether the validation passed `true` or failed `false`.
 * @property {string}  reason            - Reason for the validation result.
 */

/**
 * Configuration options to create passwords.
 *
 * @typedef  {object}  CreateOptions
 * @property {number}  size          - The desired size of the password.
 * @property {boolean} numbers       - Indicates whether numbers are allowed in the password.
 * @property {boolean} symbols       - Indicates whether symbols are allowed in the password.
 * @property {boolean} uppercases    - Indicates whether uppercase letters are allowed in the password.
 * @property {boolean} lowercases    - Indicates whether lowercase letters are allowed in the password.
 */

/**
 * The result of validating a password's security.
 *
 * @typedef  {object} PasswordEvaluation
 * @property {number} level              - A number indicating the security level of the password (0-5).
 * @property {string} suggestion         - Text offering suggestions to improve password security.
 * @property {string} quality            - The quality level of the password.
 */

// ━━ CONSTANTS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * Constant that defines the numeric digits 0 through 9.
 *
 * @private
 * @constant
 * @type {string}
 */
const numbers = '0123456789';

/**
 * Constant that defines the special symbols for passwords.
 *
 * @private
 * @constant
 * @type {string}
 */
const symbols = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';

/**
 * Constant that defines the lowercase letters of the English alphabet.
 *
 * @private
 * @constant
 * @type {string}
 */
const lowercases = 'abcdefghijklmnopqrstuvwxyz';

/**
 * Constant that defines the capital letters of the English alphabet.
 *
 * @private
 * @constant
 * @type {string}
 */
const uppercases = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

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
 * @type {Array<RegExp>}
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

/**
 * Array containing default suggestions for password evaluation.
 *
 * @private
 * @type {Array<string>}
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
 * @type {Array<string>}
 */
const qualities = ['insecure', 'low', 'medium', 'high', 'perfect'];

// ━━ FUNCTIONS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * Function that returns a random number between 0 and the specified size.
 *
 * @private
 * @function
 * @param {number} size - Maximum size to generate the random number.
 * @returns {number} Generated random number.
 * @example
 * ```js
 * const randomNumber = getRandomNumber();
 * ```
 */
const getRandomNumber = size => Math.floor(Math.random() * size);

/**
 * Function that returns an object with the characters to be used to create a
 * password, according to the specified options.
 *
 * @private
 * @function
 * @param {object} options - A object that contains the password creation options.
 * @returns {object} Object with the characters to use to generate.
 * @example
 * ```js
 * const options = { numbers: true, symbols: true, uppercases: true };
 * const selectedChars = getSelectedChars({ numbers: true });
 * ```
 */
const getSelectedChars = options => ({
  ...(options.numbers && { numbers }),
  ...(options.symbols && { symbols }),
  ...(options.uppercases && { uppercases }),
  ...(options.lowercases && { lowercases }),
});

/**
 * Function that converts the selected characters into an array.
 *
 * @private
 * @function
 * @param {object} selected - Object with the selected characters.
 * @returns {Array<string>} An `Array` with selected characters.
 * @example
 * ```js
 * const chars = charsToArray('abcdefghijklmnopqrstuvwxyz');
 * ```
 */
const charsToArray = selected => Object.values(selected).flatMap(value => value.split(''));

/**
 * Checks if every element in the array is a string.
 *
 * @private
 * @function
 * @param {Array<string>} target - The array to check.
 * @returns {boolean} Returns `true` if every element is a string, otherwise `false`.
 * @example
 * ```js
 * everyString(['yellow', 'red', 'green']); // Expected value: true
 * ```
 */
const everyString = target => target.every(item => typeof item === 'string');

// ━━	MODULE	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * Password manipulation tool. It provides functionality to generate strong
 * passwords, check their strength, and perform other password-related
 * operations.
 *
 * @class PasswordToolKit
 * @version 1.0.3
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
   * @param {object} [settings] - The options for the PasswordToolKit instance.
   * @param {number} [settings.maximum] - The maximum length allowed for a password.
   * @param {string} [settings.suggestions] - Text offering suggestions to improve password security.
   * @param {string} [settings.qualities] - Array of quality levels for password strength.
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
   * @param {object} options - The options for the password to be check.
   * @param {number} options.size - The desired size of the password.
   * @param {boolean} options.numbers - Indicates whether numbers are allowed in the password.
   * @param {boolean} options.symbols - Indicates whether symbols are allowed in the password.
   * @param {boolean} options.uppercases - Indicates whether uppercase letters are allowed in the password.
   * @param {boolean} options.lowercases - Indicates whether lowercase letters are allowed in the password.
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
   * The `create()` method, generates a new password with the provided options.
   *
   * @memberof PasswordToolKit
   * @deprecated
   * @param {object} options - The options for the password to be generated.
   * @param {number} options.size - The desired size of the password.
   * @param {boolean} options.numbers - Indicates whether numbers are allowed in the password.
   * @param {boolean} options.symbols - Indicates whether symbols are allowed in the password.
   * @param {boolean} options.uppercases - Indicates whether uppercase letters are allowed in the password.
   * @param {boolean} options.lowercases - Indicates whether lowercase letters are allowed in the password.
   * @returns {string|null} The generated password, or null if the provided options are invalid.
   * @example
   * ```js
   * const options = { size: 12, numbers: true, symbols: true };
   * const password = passwordToolKit.create(options);
   * console.log(password);
   * ```
   */
  create(options) {
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
