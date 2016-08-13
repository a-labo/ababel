/**
 * Register babel
 * @function register
 * @param {Object} options
 */
'use strict'

const babelRegister = require('babel-register')
const { DEFAULT_PRESET, DEFAULT_EXT } = require('./lib/constants')

/** @lends register */
function register (options = {}) {
  babelRegister(
    Object.assign({
      extensions: DEFAULT_EXT.split(','),
      compact: false,
      babelrc: false,
      sourceRoot: process.cwd(),
      presets: DEFAULT_PRESET.split(',')
    }, options)
  )
}

module.exports = register
