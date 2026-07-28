import { fileURLToPath } from 'node:url'
import { describe, it, expect } from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils'

await setup({
  server: true,
  rootDir: fileURLToPath(new URL('../fixtures/headers', import.meta.url))
})

const render = () => $fetch('/', {
  headers: {
    cookie: 't3session=do-not-hydrate',
    'user-agent': 'vitest'
  }
})

describe('T3 API header hydration', () => {
  it('keeps server-only auth headers out of the payload', async () => {
    const html = await render()
    expect(html).not.includes('c2VjcmV0LXRva2Vu')
  }, 15000)

  it('keeps proxied request headers out of the payload', async () => {
    const html = await render()
    expect(html).not.includes('do-not-hydrate')
  }, 15000)

  it('still hydrates headers set at runtime during SSR', async () => {
    const html = await render()
    expect(html).includes('hydrate-me')
  }, 15000)
})
