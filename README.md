# PasswordToolKit

![Github Actions](https://github.com/vgbr-dev/password-toolkit/actions/workflows/integrate.yaml/badge.svg)
[![npm version](https://badge.fury.io/js/password-utility.svg)](https://badge.fury.io/js/password-utility)
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/vgbr-dev/password-toolkit)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/vgbr-dev/password-toolkit/blob/main/LICENSE)

The `PasswordToolKit` is a simple and easy-to-use class that allows generating and evaluating password strength.

## Table of Contents

- [Installation](#installation)
- [Importing](#importing)
- [Usage](#usage)
- [API](#api)
  - [PasswordToolKit(settings)](#passwordtoolkitsettings)
  - [PasswordToolKit#checkOptions(options)](#passwordtoolkitcheckoptionsoptions)
  - [PasswordToolKit#create(options)](#passwordtoolkitcreateoptions)
  - [PasswordToolKit#evaluate(password)](#passwordtoolkitevaluatepassword)
- [Contributing](#contributing)
- [License](#license)

## Installation

You can install `PasswordToolKit` via [npm](https://www.npmjs.com/package/password-toolkit):

```sh
npm install password-toolkit
```

## Importing

To use PasswordToolKit in your JavaScript application, first import it:

```js
// Using ES6 imports
import PasswordToolKit from 'password-toolkit';

// Using Node.js `require()`
const PasswordToolKit = require('password-toolkit');
```

## Usage

The `PasswordToolKit` module is a class that needs to be instantiated with a `settings` a object with configuration settings, before it can be used. Once instantiated, you can use the `create()` and `evaluate()` methods to create and evaluate passwords.

```js
// Import the PasswordToolKit module
const PasswordToolKit = require('password-toolkit');

// Create an instance of PasswordToolKit
const passwordToolKit = new PasswordToolKit();

// Generate a password
const options = {
  size: 12,
  numbers: true,
  symbols: true,
  uppercases: true,
  lowercases: true
};

const validation = passwordToolKit.checkOptions(options);

if (validation.ok) {
  const password = passwordToolKit.create(options);
  // Evaluate the security of a password
  const evaluation = passwordToolKit.evaluate(password);

  // Output the results
  console.log('Generated Password:', password);
  console.log('Password Evaluation:', evaluation);
} else {
  throw new Error(validation.reason);
}
```

## API

### `PasswordToolKit(settings)`

Creates an instance of the PasswordToolKit class.

Arguments

| Name                   | Type             | Description                                             |
|------------------------|------------------|---------------------------------------------------------|
| `settings`             | `object`         | The options for the PasswordToolKit instance.           |
| `settings.maximum`     | `number`         | The maximum length allowed for a password.              |
| `settings.suggestions` | `Array.<string>` | Text offering suggestions to improve password security. |
| `settings.qualities`   | `Array.<string>` | Array of quality levels for password strength.          |

Throws

| Type         | Description                                  |
|--------------|----------------------------------------------|
| `TypeError`  | if the `options` parameter is not an object. |
| `TypeError`  | if the `suggestions` value is not an array.  |
| `TypeError`  | if the `qualities` value is not an array.    |
| `TypeError`  | if the `maximum` value is not a number.      |
| `TypeError`  | if any `suggestions` value is not a string.  |
| `TypeError`  | if any `qualities` value is not a string.    |
| `RangeError` | if the `suggestions` array length is not 7.  |
| `RangeError` | if the `qualities` array length is not 5.    |

Example

```js
const PasswordToolKit = require('password-toolkit');

const passwordToolKit = new PasswordToolKit();

// or


```

### `PasswordToolKit#checkOptions(options)`

Checks if the provided options for generating a password are valid.

Arguments

| Name                 | Type      | Description                                                      |
|----------------------|-----------|------------------------------------------------------------------|
| `options`            | `object`  | The options for the password to be generated.                    |
| `options.size`       | `number`  | The desired size of the password.                                |
| `options.numbers`    | `boolean` | Indicates whether numbers are allowed in the password.           |
| `options.symbols`    | `boolean` | Indicates whether symbols are allowed in the password.           |
| `options.uppercases` | `boolean` | Indicates whether uppercase letters are allowed in the password. |
| `options.lowercases` | `boolean` | Indicates whether lowercase letters are allowed in the password. |

Returns

An `object` with the following properties:

| Property | Type      | Description                                                       |
|----------|-----------|-------------------------------------------------------------------|
| `ok`     | `boolean` | Indicates whether the validation passed `true` or failed `false`. |
| `reason` | `string`  | Reason for the validation result.                                 |

Example

```js
const PasswordToolKit = require('password-toolkit');

const passwordToolKit = new PasswordToolKit();
const options = {
  size: 12,
  numbers: true,
  symbols: true,
  uppercases: true,
  lowercases: true
};
const validation = passwordToolKit.checkOptions(options);
```

### `PasswordToolKit#create(options)`

The `create()` method generates a new password with the provided options. It accepts an options object with the following properties:

Arguments

| Name                 | Type      | Description                                                      |
|----------------------|-----------|------------------------------------------------------------------|
| `options`            | `object`  | The options for the password to be generated.                    |
| `options.size`       | `number`  | The desired size of the password.                                |
| `options.numbers`    | `boolean` | Indicates whether numbers are allowed in the password.           |
| `options.symbols`    | `boolean` | Indicates whether symbols are allowed in the password.           |
| `options.uppercases` | `boolean` | Indicates whether uppercase letters are allowed in the password. |
| `options.lowercases` | `boolean` | Indicates whether lowercase letters are allowed in the password. |

Returns

The method returns the generated password as a `string`, or `null` if the provided options are invalid.

Example

```js
const options = {
  size: 12,
  numbers: true,
  symbols: true,
  uppercases: true,
  lowercases: true
};

const password = passwordToolKit.create(options);
```

### `PasswordToolKit#evaluate(password)`

The evaluate() method evaluates the security level of a password. It accepts a password `string` as input.

Arguments

| Name       | Type     | Description                   |
|------------|----------|-------------------------------|
| `password` | `string` | The password to be evaluated. |

Returns

An `object` with the following properties:

| Property     | Type     | Description                                                   |
|--------------|----------|---------------------------------------------------------------|
| `level`      | `number` | A number indicating the security level of the password (0-5). |
| `suggestion` | `string` | Text offering suggestions to improve password security.       |
| `quality`    | `string` | The quality level of the password.                            |

Throws

| Type             | Description                                |
|------------------|--------------------------------------------|
| `TypeError`      | If the `password` value is not a `string`. |

Example

```js
const evaluation = passwordToolKit.evaluate('MySecurePassword123!');

```

## Contributing

If you encounter any bugs or issues with `PasswordToolKit`, issues and feature requests are welcome. Feel free to check [issues page](https://github.com/vgbr-dev/password-toolkit/issues) if you want to contribute.

## License

Distributed under the MIT License. See LICENSE for more information.
