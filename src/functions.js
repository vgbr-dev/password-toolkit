/**
 * @file Utility functions for password generation and manipulation.
 *
 * This file contains utility functions used for password generation and
 * manipulation. It includes functions to generate random numbers,
 * retrieve selected characters based on options, convert selected characters
 * to an array, and check if all elements in an array are strings.
 *
 * These functions are designed to support the password evaluation
 * process and can be used in conjunction with other modules or scripts.
 *
 * @private
 * @module PasswordToolKit/functions
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

// ━━	MODULE	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
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
 * const chars = charsToArray({ lowercase: 'abc', numbers: '123' }); // Expected value: ['a','b', 'c', '1', '2', '3']
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

// ━━ EXPORT MODULE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
exports.getRandomNumber = getRandomNumber;
exports.getSelectedChars = getSelectedChars;
exports.charsToArray = charsToArray;
exports.everyString = everyString;
