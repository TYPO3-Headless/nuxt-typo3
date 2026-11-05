import { fileURLToPath } from 'node:url'
import { describe, it, expect } from 'vitest'
import { setup, fetch, createPage } from '@nuxt/test-utils'

await setup({
  server: true,
  browser: true,
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

  it('responds with a 404 for missing pages under parallel requests', async () => {
    const responses = await Promise.all(
      Array.from({ length: 40 }, (_, index) => fetch(`/not-found-page/${index}`))
    )
    expect(responses.map(({ status }) => status)).toEqual(Array(40).fill(404))
  }, 30000)

  it('shows the error page for a missing page after a client side navigation', async () => {
    const page = await createPage('/')
    await page.click('#missing-page')
    await page.waitForSelector('#error-status')
    expect((await page.textContent('#error-status'))?.trim()).toBe('404')
    await page.close()
  }, 30000)
})
