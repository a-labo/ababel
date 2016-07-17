#!/usr/bin/env node

/**
 * Measure test coverage.
 */

'use strict'

process.chdir(`${__dirname}/..`)

const { runTasks } = require('ape-tasking')
const { measureCoverage } = require('ape-covering')

runTasks('cover', [
  () => measureCoverage('_mocha', [
    '-t', 6000, 'test/*_test.js'
  ], {
    dir: 'coverage'
  })
], true)
