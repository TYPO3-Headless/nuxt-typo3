import { defineNuxtConfig } from 'nuxt/config'
import MyModule from '../../../src/module'

const site = (hostname: string) => ({
  hostname,
  api: {
    baseUrl: 'http://localhost:9876',
    // forwarded to the backend on SSR, must not be hydrated back to the client
    proxyReqHeaders: ['cookie']
  },
  i18n: {
    default: 'pl',
    locales: ['pl', 'en']
  }
})

// Fixture dedicated to API header hydration.
// The Basic auth header lives in the private `runtimeConfig.typo3` (server-only,
// merged into the site options during SSR) so a leak into `__NUXT_DATA__` is
// observable in the rendered HTML.
export default defineNuxtConfig({
  modules: [MyModule],
  typo3: {
    sites: [site('127.0.0.1'), site('localhost')]
  },
  runtimeConfig: {
    typo3: {
      sites: [
        { hostname: '127.0.0.1', api: { headers: { Authorization: 'Basic c2VjcmV0LXRva2Vu' } } },
        { hostname: 'localhost', api: { headers: { Authorization: 'Basic c2VjcmV0LXRva2Vu' } } }
      ]
    }
  }
})
