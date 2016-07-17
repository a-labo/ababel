/**
 * @function ababel
 */
'use strict'

const aglob = require('aglob')
const convertSourceMap = require('convert-source-map')
const writeout = require('writeout')
const akv = require('akv')
const co = require('co')
const path = require('path')
const defaults = require('defaults')
const { transformFile } = require('babel-core')
let { replaceExt, fileChanged, fileState } = require('./helpers/file_helper')

/** @lends ababel */
function ababel (pattern, options = {}) {
  let { status, cwd, out, ext, presets, minified, ignore } = defaults(options, {
    status: 'tmp/ababel.status.json',
    cwd: process.cwd(),
    out: process.cwd(),
    presets: [ 'es2015' ],
    minified: false,
    ignore: [],
    ext: [ '.es', '.es6', '.js', '.jsx' ]
  })
  let kv = akv(status)
  return co(function * () {
    let filenames = yield aglob(pattern, { cwd, ignore })
    for (let filename of filenames) {
      let src = path.resolve(cwd, filename)
      let dest = path.resolve(out, ext.reduce((filename, ext) => replaceExt(filename, ext, '.js'), filename))
      let srcStat = yield kv.get(src)
      let destStat = yield kv.get(dest)
      let changed = (yield fileChanged(src, srcStat)) || (yield fileChanged(dest, destStat))
      if (changed) {
        let { code, map, ast } = yield new Promise((resolve, reject) => {
          let options = {
            presets,
            minified,
            babelrc: false,
            sourceRoot: cwd
          }
          transformFile(src, options, (err, result) => err ? reject(err) : resolve(result))
        })
        let { filename, skipped } = yield writeout(dest, `${code}\n${convertSourceMap.fromObject(map).toComment()}`, {
          mkdirp: true,
          skipIfIdentical: true
        })
        if (!skipped) {
          console.log(`File generated: ${path.relative(process.cwd(), filename)}`)
        }
        yield kv.set(src, (yield fileState(src)))
        yield kv.set(dest, (yield fileState(dest)))
      }
    }
    yield kv.commit()
  })
}

module.exports = ababel
