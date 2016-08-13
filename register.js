/**
 * Register babel
 * @function register
 * @param {Object} options
 */
'use strict'

const defaults = require('defaults')
const babelRegister = require('babel-register')
const { DEFAULT_PRESET, DEFAULT_EXT } = require('./lib/constants')

/** @lends register */
function register (options = {}) {
  babelRegister(defaults(options, {
    extensions: DEFAULT_EXT.split(','),
    compact: false,
    babelrc: false,
    sourceRoot: process.cwd(),
    presets: DEFAULT_PRESET.split(',')
  }))
}

module.exports = register