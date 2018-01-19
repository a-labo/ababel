/**
 * Test case for ababel.
 * Runs with mocha.
 */
'use strict'

const ababel = require('../lib/ababel.js')
const assert = require('assert')

describe('ababel', function () {
  this.timeout(3000)

  before(async () => {

  })

  after(async () => {

  })

  it('Ababel', async () => {
    await ababel(
      'mock-react-jsx/*.jsx',
      {
        cwd: `${__dirname}/../misc/mocks`,
        out: `${__dirname}/../tmp/testing-react-compiled`,
        presets: ['@babel/preset-react'],
        ext: ['.jsx']
      }
    )
  })
})

/* global describe, before, after, it */
