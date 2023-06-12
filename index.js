/**
 * @file Main module for the project.
 * @description This module exports the main functionality of the project.
 */

// ━━ TYPE DEFINITIONS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * Password manipulation tool. It provides functionality to generate strong
 * passwords, check their strength, and perform other password-related
 * operations.
 *
 * @class PasswordToolKit
 * @classdesc Password class that allows generating and evaluating password
 * strength.
 *
 * @version 2.0.0
 * @author Victor Giovanni Beltrán Rodríguez
 * @module PasswordToolKit
 */
const PasswordToolKit = require('./src');

// ━━ EXPORT MODULE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
module.exports = PasswordToolKit;
