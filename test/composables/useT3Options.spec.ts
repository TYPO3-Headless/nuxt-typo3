import { fileURLToPath } from 'node:url'
import { describe, it, expect } from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils'

await setup({
  server: true,
  rootDir: fileURLToPath(new URL('../fixtures', import.meta.url))
})

describe('useT3Options', () => {
  it('renders correct host', async () => {
    const result = await $fetch('/')
    expect(result).toContain('api host: https://my-api-demo.com')
  }, 15000)

  it('renders correct curent locale', async () => {
    const result = await $fetch('/')
    expect(result).toContain('default locale: pl')
  }, 15000)

  it('renders available locale', async () => {
    const result = await $fetch('/')
    expect(result).includes('<span>pl</span>')
    expect(result).includes('<span>en</span>')
    expect(result).includes('<span>de</span>')
  }, 15000)
})
