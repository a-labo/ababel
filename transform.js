/**
 * Browserify transform
 * @function transform
 * @param {Object} options
 */
'use strict'

const babelify = require('babelify')
const { DEFAULT_PRESET, DEFAULT_EXT } = require('./lib/constants')

/** @lends transform */
function transform (options = {}) {
  return babelify.configure(
    Object.assign({
      extensions: DEFAULT_EXT.split(','),
      compact: false,
      babelrc: false,
      sourceRoot: process.cwd(),
      presets: DEFAULT_PRESET.split(',')
    }, options)
  )
}

module.exports = transform
