/**
 * File helper
 * @module FileHelper
 */
'use strict'

/** @lends FileHelper */
module.exports = Object.assign(exports, {
  /**
   * Replace file extension name
   * @param {string} filename
   * @param {string} from - Extname convert from
   * @param {string} to - Extname convert to
   * @returns {*}
   */
  replaceExt (filename, from, to) {
    return filename.replace(new RegExp(`\\${from}$`), to)
  }

})
