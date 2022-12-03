import { expect, describe, it } from 'vitest'
import { getRawHost } from '../../src/runtime/lib/url'

describe('utils', () => {
  it('returns raw host from url', () => {
    const host = getRawHost('http://localhost:3000')
    expect(host).equal('localhost')
  })
})
