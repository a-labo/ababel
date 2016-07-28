/**
 * Browserify transform
 * @function transform
 * @param {Object} options
 */
'use strict'

const defaults = require('defaults')
const babelify = require('babelify')
const { DEFAULT_PRESET, DEFAULT_EXT } = require('./lib/constants')

/** @lends transform */
function transform (options = {}) {
  return babelify.configure(defaults(options, {
    extensions: DEFAULT_EXT.split(','),
    compact: false,
    babelrc: false,
    sourceRoot: process.cwd(),
    presets: DEFAULT_PRESET.split(',')
  }))
}

module.exports = transform
