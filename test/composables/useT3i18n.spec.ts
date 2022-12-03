import { fileURLToPath } from 'node:url'
import { describe, beforeEach, afterEach, it, expect } from 'vitest'
import { listen, Listener } from 'listhen'
import { createApp, eventHandler, toNodeListener } from 'h3'
import { setup, $fetch } from '@nuxt/test-utils'
import initialData from '../fixtures/api/initialData.json'
import pageData from '../fixtures/api/page.json'
import pageDataEn from '../fixtures/api/en/page.json'

await setup({
  server: true,
  setupTimeout: 100000,
  rootDir: fileURLToPath(new URL('../fixtures', import.meta.url))
})

describe('useT3i18n', () => {
  let listener: Listener

  beforeEach(async () => {
    const app = createApp()
      .use(
        '/?type=834',
        eventHandler(() => initialData)
      )
      .use(
        '/en/i18n',
        eventHandler(() => pageDataEn)
      )
      .use(
        '/',
        eventHandler(() => pageData)
      )

    listener = await listen(toNodeListener(app), {
      port: 9878
    })
  })

  afterEach(async () => {
    await listener.close()
  })

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
