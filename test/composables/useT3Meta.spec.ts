import { fileURLToPath } from 'node:url'
import { describe, beforeAll, it, expect } from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils'

await setup({
  server: true,
  setupTimeout: 100000,
  rootDir: fileURLToPath(new URL('../fixtures', import.meta.url))
})

describe('useT3Meta', () => {
  let result: string

  beforeAll(async () => {
    result = await $fetch('/meta')
  })

  it('displays correct meta title', () => {
    expect(result).contains('<title>TYPO3 Demo Project</title>')
  }, 15000)

  it('displays correct lang and dir attrs', () => {
    expect(result).contains('lang="pl" dir="ltr"')
  }, 15000)

  it('displays correct meta description', () => {
    expect(result).contains('<meta name="description" content="Get an insight on how the CMS TYPO3 works, log in to the backend, edit and delete content and experience TYPO3\'s amazing features.">')
  }, 15000)

  it('displays correct twitter title', () => {
    expect(result).contains('<meta name="twitter:title" content="Twitter title">')
  }, 15000)

  it('displays correct twitter description', () => {
    expect(result).contains('<meta name="twitter:description" content="Twitter description ">')
  }, 15000)

  it('displays correct twitter image', () => {
    expect(result).contains('<meta name="twitter:image" content="https://api.t3pwa.com/fileadmin/_processed_/6/e/csm_csm_pexels-matheus-gomes-2516025__1__b4cfde370d_0ee4fe9ac2.png">')
  }, 15000)

  it('displays correct twitter card', () => {
    expect(result).contains('<meta name="twitter:card" content="summary">')
  }, 15000)

  it('displays correct og title', () => {
    expect(result).contains('<meta property="og:title" content="Open graph title">')
  }, 15000)

  it('displays correct og description', () => {
    expect(result).contains('<meta property="og:description" content="Open graph description ">')
  }, 15000)

  it('displays correct og type', () => {
    expect(result).contains('<meta property="og:type" content="website">')
  }, 15000)

  it('displays correct og image', () => {
    expect(result).contains('<meta property="og:image" content="https://api.t3pwa.com/fileadmin/_processed_/6/e/csm_csm_pexels-matheus-gomes-2516025__1__b4cfde370d_0ee4fe9ac2.png">')
  }, 15000)
})
