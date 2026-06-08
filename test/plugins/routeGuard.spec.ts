import { fileURLToPath } from 'node:url'
import { describe, it, expect } from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils'

await setup({
  server: true,
  rootDir: fileURLToPath(new URL('../fixtures/plugin', import.meta.url))
})

describe('initialData plugin route guard', () => {
  it('resolves TYPO3 page data for routes with meta.t3Page', async () => {
    const html = await $fetch('/t3-enabled')
    expect(html).includes('page title: TYPO3 Demo Project')
  }, 15000)

  it('fetches initial data when meta.t3InitialData is not disabled', async () => {
    const html = await $fetch('/t3-enabled')
    expect(html).includes('initial nav: TYPO3 Demo Site')
  }, 15000)

  it('skips initial data fetch when meta.t3InitialData is false, but still resolves page data', async () => {
    const html = await $fetch('/no-initial')
    expect(html).includes('initial nav: none')
    expect(html).includes('page title: TYPO3 Demo Project')
  }, 15000)

  it('leaves pages without meta.t3Page untouched (no TYPO3 page resolution)', async () => {
    const html = await $fetch('/static-page')
    expect(html).includes('static rendered')
    expect(html).includes('page title: none')
  }, 15000)
})
