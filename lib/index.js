/**
 * Babel wrapper to seep up compiling by caching results.
 * @module ababel
 */

'use strict'

let d = (module) => module.default || module

module.exports = {
  get ababel () { return d(require('./ababel')) }
}
