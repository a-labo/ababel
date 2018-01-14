/**
 * Compile files
 * @function ababel
 * @param {string} pattern - Glob file name pattern
 * @param {Object} [options] - Optional settings
 * @param {string} [options.status] - Status file path
 * @param {string} [options.cwd] - Current working directory path
 * @param {string} [options.out] - Output directory path
 * @param {boolean} [options.minified] - Minified or not
 * @param {string[]} [options.reflects] - File patterns to reflects changes
 * @returns {Promise}
 */
'use strict'

const aglob = require('aglob')
const convertSourceMap = require('convert-source-map')
const writeout = require('writeout')
const akvStatus = require('akv-status')
const path = require('path')
const filedel = require('filedel')
const {statAsync} = require('asfs')
const {isProduction} = require('asenv')
const {transformFile} = require('babel-core')
const {DEFAULT_PRESET, DEFAULT_EXT} = require('./constants')

const {replaceExt} = require('./helpers/file_helper')
const relative = (filename) => path.relative(process.cwd(), filename)
const mtime = (filename) => statAsync(filename).catch(() => null).then(({mtime}) => mtime)

/** @lends ababel */
async function ababel (pattern, options = {}) {
  let {
    status = 'tmp/ababel.status.json',
    cwd = process.cwd(),
    out = process.cwd(),
    presets = DEFAULT_PRESET.split(','),
    sourceMaps = !isProduction(),
    minified = false,
    ignore = [],
    reflects = [],
    plugins = [],
    ext = DEFAULT_EXT.split(','),
  } = options

  const store = akvStatus(status)
  try {
    const filenames = await aglob(pattern, {cwd, ignore})
    reflects = await aglob(reflects)
    for (const filename of filenames) {
      const src = path.resolve(cwd, filename)
      const dest = path.resolve(out, ext.reduce((filename, ext) => replaceExt(filename, ext, '.js'), filename))
      if (!isProduction()) {
        const changed = await store.filterStatusUnknown([src, dest, ...reflects])
        if (changed.length === 0) {
          let srcMtime = await mtime(src)
          let destMtime = await mtime(dest)
          let skip = srcMtime && destMtime && (srcMtime <= destMtime)
          if (skip) {
            continue
          }
        }
      }
      const {code, map, ast} = await new Promise((resolve, reject) => {
        const options = {
          presets,
          minified,
          sourceMaps,
          compact: false,
          babelrc: false,
          sourceRoot: path.relative(process.cwd(), cwd),
          plugins: ['transform-runtime', ...plugins],
        }
        transformFile(src, options, (err, result) => err ? reject(err) : resolve(result))
      })
      try {
        if (dest !== src) {
          await filedel(dest)
        }
      } catch (err) {
        // Do nothing
      }
      const {skipped} = await writeout(dest, `${code}\n${convertSourceMap.fromObject(map).toComment()}`, {
        mkdirp: true,
        skipIfIdentical: true
      })
      if (!skipped) {
        console.log(`File generated: ${relative(dest)}`)
      }

      await store.saveStatus([src, dest, ...reflects])
    }
  } catch (err) {
    await store.destroy()
    throw err
  }
}

module.exports = ababel
