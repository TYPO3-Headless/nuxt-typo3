import { fileURLToPath } from 'node:url'
import { describe, it, expect } from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils'

await setup({
  server: true,
  rootDir: fileURLToPath(new URL('../fixtures', import.meta.url))
})

describe('useT3Api', () => {
  it('fetch initialData and set internal state', async () => {
    const result = await $fetch('/client')
    expect(result).includes('<span>initial data: TYPO3 Demo Site</span>')
  }, 15000)

  it('fetch page data and set internal state', async () => {
    const result = await $fetch('/client')
    expect(result).includes('<span>page data: TYPO3 Demo Project</span>')
  }, 15000)

  it('use common headers', async () => {
    const result = await $fetch('/client')

    expect(result).includes('<span>headers test: typo3 is the best</span>')
  }, 15000)
})
