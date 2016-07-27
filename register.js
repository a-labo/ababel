/**
 * Register babel
 * @function register
 * @param {Object} options
 */
'use strict'

const defaults = require('defaults')
const babelRegister = require('babel-register')

/** @lends register */
function register (options = {}) {
  babelRegister(defaults(options, {
    extensions: [ '.js', '.jsx' ],
    compact: false,
    babelrc: false,
    sourceRoot: process.cwd(),
    presets: [ 'es2015' ]
  }))
}

module.exports = register
