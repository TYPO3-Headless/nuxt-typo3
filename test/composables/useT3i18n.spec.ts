import { fileURLToPath } from 'node:url'
import { describe, it, expect } from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils'

await setup({
  server: true,
  setupTimeout: 100000,
  rootDir: fileURLToPath(new URL('../fixtures', import.meta.url))
})

describe('useT3i18n', () => {
  it('displays correct current langauge', async () => {
    const result = await $fetch('/i18n')

    expect(result).includes('<p>currentLocale: pl</p>')
  }, 15000)

  it('fetch correct data for current language', async () => {
    const result = await $fetch('/en/i18n')
    expect(result).includes('<p>currentLocale: en</p>')
    expect(result).includes('EN: TYPO3 Demo Project')
  }, 15000)
})
