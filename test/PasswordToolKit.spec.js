/**
 * @file This file contains the test for the `PasswordToolKit` class.
 */

// ━━ IMPORT MODULES ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// » IMPORT NATIVE NODE MODULES
const { describe, it } = require('node:test');
const assert = require('node:assert');

// » IMPORT MODULES
const PasswordToolKit = require('..');

// ━━ CONSTANTS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * Defines the errors that can be thrown by the `PasswordToolKit` class.
 *
 * @private
 * @constant {object} THROWS
 */
const THROWS = {
  TYPE_SETTINGS: {
    name: 'TypeError',
    message: 'The "options" must be an object.',
  },
  TYPE_SUGGESTIONS: {
    name: 'TypeError',
    message: 'The "suggestions" value must be an array type.',
  },
  TYPE_QUALITIES: {
    name: 'TypeError',
    message: 'The "qualities" value must be an array type.',
  },
  TYPE_MAXIMUM: {
    name: 'TypeError',
    message: 'The "maximum" value must be a number type.',
  },
  TYPES_SUGGESTIONS: {
    name: 'TypeError',
    message: 'All "suggestions" values must be a string type.',
  },
  TYPES_QUALITIES: {
    name: 'TypeError',
    message: 'All "qualities" values must be a string type.',
  },
  RANGE_SUGGESTIONS: {
    name: 'RangeError',
    message: 'The "suggestions" elements number must be equal to 7.',
  },
  RANGE_QUALITIES: {
    name: 'RangeError',
    message: 'The "qualities" elements number must be equal to 5.',
  },
};

/**
 * The options for the `PasswordToolKit` instance.
 *
 * @private
 * @constant {object} INSTANCE_OPTIONS
 */
const INSTANCE_OPTIONS = {
  maximum: 30,
  suggestions: [
    'La contraseña debe tener al menos 8 caracteres.',
    'Agregue letras mayúsculas y minúsculas para que la contraseña sea más segura.',
    'Agregue números para que la contraseña sea más segura.',
    'Agregue símbolos para que la contraseña sea más segura.',
    'Evitar el uso de caracteres repetidos en la contraseña.',
    'Evitar el uso de patrones de contraseña comunes.',
    '¡Excelente! La contraseña es segura.',
  ],
  qualities: ['Inseguro', 'Bajo', 'Medio', 'Alto', 'Perfecto'],
};

// ━━ CONSTANTS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * Add description.
 *
 * @private
 * @function createInstance
 * @param {string} settings  - Add description.
 * @returns {PasswordToolKit} Add description.
 * @example createInstance(d6F3Efeqd6F3Efeqd6F3Efeqd6F3Efeq);
 *
 */
const createInstance = settings => new PasswordToolKit(settings);

// ━━ TEST ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
describe('PasswordToolKit', () => {
  describe('constructor', () => {
    it('should create a new instance of PasswordToolKit with a default options', () => {
      const passwordToolKit = new PasswordToolKit();
      assert.ok(passwordToolKit instanceof PasswordToolKit);
      assert.strictEqual(passwordToolKit.maximum, 30);
      assert.deepStrictEqual(passwordToolKit.suggestions, [
        'The password must have at least 8 characters.',
        'Add uppercase and lowercase letters to make the password more secure.',
        'Add numbers to make the password more secure.',
        'Add symbols to make the password more secure.',
        'Avoid using repeated characters in the password.',
        'Avoid using common password patterns.',
        'Excellent! The password is secure.',
      ]);
      assert.deepStrictEqual(passwordToolKit.qualities, [
        'insecure',
        'low',
        'medium',
        'high',
        'perfect',
      ]);
    });

    it('should create a new instance of PasswordToolKit with a valid options', () => {
      const passwordToolKit = new PasswordToolKit(INSTANCE_OPTIONS);
      assert.ok(passwordToolKit instanceof PasswordToolKit);
      assert.strictEqual(passwordToolKit.maximum, 30);
      assert.deepStrictEqual(passwordToolKit.suggestions, [
        'La contraseña debe tener al menos 8 caracteres.',
        'Agregue letras mayúsculas y minúsculas para que la contraseña sea más segura.',
        'Agregue números para que la contraseña sea más segura.',
        'Agregue símbolos para que la contraseña sea más segura.',
        'Evitar el uso de caracteres repetidos en la contraseña.',
        'Evitar el uso de patrones de contraseña comunes.',
        '¡Excelente! La contraseña es segura.',
      ]);
      assert.deepStrictEqual(passwordToolKit.qualities, [
        'Inseguro',
        'Bajo',
        'Medio',
        'Alto',
        'Perfecto',
      ]);
    });

    it('should throw a TypeError if "setting" is not an object', () => {
      assert.throws(() => {
        createInstance(true);
      }, THROWS.TYPE_SETTINGS);
    });

    it('should throw a TypeError if "suggestions" is not an array', () => {
      assert.throws(() => {
        createInstance({ suggestions: true });
      }, THROWS.TYPE_SUGGESTIONS);
    });

    it('should throw a TypeError if "qualities" is not an array', () => {
      assert.throws(() => {
        createInstance({ qualities: true });
      }, THROWS.TYPE_QUALITIES);
    });

    it('should throw a TypeError if "maximum" is not a number', () => {
      assert.throws(() => {
        createInstance({ maximum: true });
      }, THROWS.TYPE_MAXIMUM);
    });

    it('should throw a TypeError if "suggestions" contain non-string values', () => {
      assert.throws(() => {
        createInstance({
          suggestions: [
            'La contraseña debe tener al menos 8 caracteres.',
            'Agregue letras mayúsculas y minúsculas para que la contraseña sea más segura.',
            'Agregue números para que la contraseña sea más segura.',
            'Agregue símbolos para que la contraseña sea más segura.',
            'Evitar el uso de caracteres repetidos en la contraseña.',
            'Evitar el uso de patrones de contraseña comunes.',
            2,
          ],
        });
      }, THROWS.TYPES_SUGGESTIONS);
    });

    it('should throw a TypeError if "suggestions" contain non-string values', () => {
      assert.throws(() => {
        createInstance({
          qualities: ['Inseguro', 'Bajo', 'Medio', 'Alto', true],
        });
      }, THROWS.TYPES_QUALITIES);
    });

    it('should return error if qualities length is not equal to 5', () => {
      assert.throws(() => {
        createInstance({
          suggestions: [
            'La contraseña debe tener al menos 8 caracteres.',
            'Agregue letras mayúsculas y minúsculas para que la contraseña sea más segura.',
            'Agregue números para que la contraseña sea más segura.',
            'Agregue símbolos para que la contraseña sea más segura.',
            'Evitar el uso de caracteres repetidos en la contraseña.',
            'Evitar el uso de patrones de contraseña comunes.',
          ],
        });
      }, THROWS.RANGE_SUGGESTIONS);
    });

    it('should return error if qualities length is not equal to 5', () => {
      assert.throws(() => {
        createInstance({
          qualities: ['Inseguro', 'Bajo', 'Medio', 'Alto'],
        });
      }, THROWS.RANGE_QUALITIES);
    });
  });

  describe('#checkOptions()', () => {
    it('should return an object with ok:false and reason when options is not an object', () => {
      const passwordToolKit = new PasswordToolKit(INSTANCE_OPTIONS);
      const result = passwordToolKit.checkOptions('invalid options');
      assert.deepStrictEqual(result, { ok: false, reason: 'Options must be an object.' });
    });

    it('should return an object with ok:false and reason when password length is undefined', () => {
      const passwordToolKit = new PasswordToolKit(INSTANCE_OPTIONS);
      const result = passwordToolKit.checkOptions({
        numbers: true,
        symbols: true,
        uppercases: true,
        lowercases: true,
      });
      assert.deepStrictEqual(result, {
        ok: false,
        reason: 'The "size" property is required.',
      });
    });

    it('should return an object with ok:false and reason when password length is less than 1', () => {
      const passwordToolKit = new PasswordToolKit(INSTANCE_OPTIONS);
      const result = passwordToolKit.checkOptions({ size: 0 });
      assert.deepStrictEqual(result, {
        ok: false,
        reason: 'The password length must be greater than 1.',
      });
    });

    it('should return an object with ok:false and reason when password length is greater than specified maximum', () => {
      const passwordToolKit = new PasswordToolKit(INSTANCE_OPTIONS);
      const result = passwordToolKit.checkOptions({ size: 50 });
      assert.deepStrictEqual(result, {
        ok: false,
        reason: 'The password length must be less than specified maximum.',
      });
    });

    it('should return an object with ok:false and reason when "numbers" option is not a boolean', () => {
      const passwordToolKit = new PasswordToolKit(INSTANCE_OPTIONS);
      const result = passwordToolKit.checkOptions({ size: 8, numbers: 'invalid' });
      assert.deepStrictEqual(result, {
        ok: false,
        reason: 'The "numbers" option must be a boolean.',
      });
    });

    it('should return an object with ok:false and reason when "symbols" option is not a boolean', () => {
      const passwordToolKit = new PasswordToolKit(INSTANCE_OPTIONS);
      const result = passwordToolKit.checkOptions({ size: 8, symbols: 'invalid' });
      assert.deepStrictEqual(result, {
        ok: false,
        reason: 'The "symbols" option must be a boolean.',
      });
    });

    it('should return an object with ok:false and reason when "uppercases" option is not a boolean', () => {
      const passwordToolKit = new PasswordToolKit(INSTANCE_OPTIONS);
      const result = passwordToolKit.checkOptions({ size: 8, uppercases: 'invalid' });
      assert.deepStrictEqual(result, {
        ok: false,
        reason: 'The "uppercases" option must be a boolean.',
      });
    });

    it('should return an object with ok:false and reason when "lowercases" option is not a boolean', () => {
      const passwordToolKit = new PasswordToolKit(INSTANCE_OPTIONS);
      const result = passwordToolKit.checkOptions({ size: 8, lowercases: 'invalid' });
      assert.deepStrictEqual(result, {
        ok: false,
        reason: 'The "lowercases" option must be a boolean.',
      });
    });

    it('should return an object with ok:false and reason when no option is selected', () => {
      const passwordToolKit = new PasswordToolKit(INSTANCE_OPTIONS);
      const result = passwordToolKit.checkOptions({
        size: 8,
        numbers: false,
        symbols: false,
        uppercases: false,
        lowercases: false,
      });
      assert.deepStrictEqual(result, {
        ok: false,
        reason: 'You must select at least one option to generate the password.',
      });
    });

    it('should return an object with ok:true and null reason when all options are valid', () => {
      const passwordToolKit = new PasswordToolKit(INSTANCE_OPTIONS);
      const result = passwordToolKit.checkOptions({
        size: 10,
        numbers: true,
        symbols: true,
        uppercases: true,
        lowercases: true,
      });
      assert.deepStrictEqual(result, { ok: true, reason: null });
    });
  });

  describe('#generate()', () => {
    it('should return a string', () => {
      const passwordToolKit = new PasswordToolKit(INSTANCE_OPTIONS);
      const password = passwordToolKit.generate({
        size: 10,
        symbols: true,
        lowercases: true,
        uppercases: true,
        numbers: true,
      });
      assert.strictEqual(typeof password, 'string');
      assert.strictEqual(password.length, 10);
    });
    it('should return null if the options are invalid', () => {
      const passwordToolKit = new PasswordToolKit(INSTANCE_OPTIONS);
      const options = {
        size: 0,
        numbers: false,
        symbols: false,
        uppercases: false,
        lowercases: false,
      };
      const password = passwordToolKit.generate(options);
      assert.strictEqual(password, null);
    });
  });

  describe('#evaluate()', () => {
    it('should return the correct evaluation for a password', () => {
      const passwordToolKit = new PasswordToolKit(INSTANCE_OPTIONS);
      const password = 'MyStr0ngP@ssword!';

      const result = passwordToolKit.evaluate(password);
      assert.deepStrictEqual(result, {
        level: 4,
        quality: 'Alto',
        suggestion: 'Evitar el uso de caracteres repetidos en la contraseña.',
      });
    });

    it('should return the correct evaluation for a password', () => {
      const passwordToolKit = new PasswordToolKit(INSTANCE_OPTIONS);
      const password = 'Ma$bel-561';

      const result = passwordToolKit.evaluate(password);
      assert.deepStrictEqual(result, {
        level: 5,
        quality: 'Perfecto',
        suggestion: '¡Excelente! La contraseña es segura.',
      });
    });

    it('should throw a TypeError if password is not a string', () => {
      assert.throws(() => {
        const passwordToolKit = new PasswordToolKit(INSTANCE_OPTIONS);
        passwordToolKit.evaluate(true);
      }, THROWS.TYPE_PASSWORD);
    });
  });
});
