#!/usr/bin/env node

/**
 * Compile to browser source
 */

'use strict'

process.chdir(`${__dirname}/..`)

const apeTasking = require('ape-tasking')
const ababel = require('../lib')

apeTasking.runTasks('shim', [
  () => ababel('**/*.js', {
    cwd: 'lib',
    out: 'shim/node',
    presets: [ 'es2015' ]
  })
], true)
