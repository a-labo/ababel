'use strict'

const ababel = require('ababel')

void async function () {
  await ababel('**/*.jsx', {
    cwd: 'src',
    out: 'dest',
    minified: true,
    presets: ['es2015', 'react']
  })
}().catch((err) => console.error(err))

