/**
 * Babel wrapper to speed up compiling by caching results.
 * @module ababel
 */

'use strict'

const ababel = require('./ababel')

let lib = ababel.bind(this)

Object.assign(lib, ababel, {
  ababel
})

module.exports = lib