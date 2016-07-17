#!/usr/bin/env node

/**
 * Run tests.
 */

'use strict'

process.chdir(`${__dirname}/..`)

const { runTasks } = require('ape-tasking')
const { runMocha } = require('ape-testing')

runTasks('test', [
  () => runMocha('test/*_test.js', {
    timeout: 4000
  })
], true)
