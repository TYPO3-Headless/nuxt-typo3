import { defineNuxtConfig } from 'nuxt/config'
import MyModule from '../../../src/module'

// Fixture dedicated to the initialData plugin route guard.
// initialDataPlugin is enabled here (unlike the main fixture) so we can
// observe both the page-resolution gate (meta.t3Page) and the
// initial-data gate (meta.t3InitialData).
export default defineNuxtConfig({
  modules: [MyModule],
  typo3: {
    sites: [
      {
        hostname: '127.0.0.1',
        api: {
          baseUrl: 'http://localhost:9876'
        },
        i18n: {
          default: 'pl',
          locales: ['pl', 'en']
        },
        features: {
          initialDataPlugin: true
        }
      },
      {
        hostname: 'localhost',
        api: {
          baseUrl: 'http://localhost:9876'
        },
        i18n: {
          default: 'pl',
          locales: ['pl', 'en']
        },
        features: {
          initialDataPlugin: true
        }
      }
    ]
  }
})
