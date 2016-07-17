/**
 * File helper
 * @module FileHelper
 */
'use strict'

const co = require('co')
const { crc32 } = require('crc')
const { existsAsync, statAsync } = require('asfs')

let toHash = (values) => values && crc32(JSON.stringify(values))

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
  },

  /**
   * Check file changed
   * @param {string} filename - File name to check
   * @param {Object} lastStat - Known state
   * @returns {Promise.<boolean>}
   */
  fileChanged (filename, lastStat) {
    return co(function * () {
      if (!lastStat) {
        return true
      }
      let stat = yield exports.fileState(filename)
      if (!stat) {
        return true
      }
      let hash = toHash(stat)
      let lastHash = toHash(lastStat)
      return hash !== lastHash
    })
  },

  /**
   * Get state of file
   * @param {string} filename - File name to check
   * @returns {Promise.<Object>} - State
   */
  fileState (filename) {
    return co(function * () {
      let exists = yield existsAsync(filename)
      if (!exists) {
        return null
      }
      return yield statAsync(filename)
    })
  }
})
