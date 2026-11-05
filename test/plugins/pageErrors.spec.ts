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

  it('keeps the status code of a failed initial data request', async () => {
    const response = await fetch('/de/')
    expect(response.status).toBe(404)
  }, 15000)
})
