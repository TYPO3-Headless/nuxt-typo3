import { fileURLToPath } from 'node:url'
import { describe, it, expect } from 'vitest'
import { setup, fetch } from '@nuxt/test-utils'

await setup({
  server: true,
  setupTimeout: 100000,
  rootDir: fileURLToPath(new URL('../fixtures/page-errors', import.meta.url))
})

describe('page and initial data errors', () => {
  it('does not send the cHash of a page to the initial data endpoint', async () => {
    const response = await fetch('/detail?id=1&cHash=abc')
    expect(response.status).toBe(200)
  }, 15000)
})
