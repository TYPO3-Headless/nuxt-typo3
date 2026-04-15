import { defineNuxtConfig } from 'nuxt/config'
import MyModule from '../../src/module'

export default defineNuxtConfig({
  modules: [MyModule],
  sourcemap: {
    server: true,
    client: true
  },
  typo3: {
    sites:
      [
        {
          hostname: '127.0.0.1',
          api: {
            baseUrl: 'http://localhost:9876'
          },
          i18n: {
            default: 'pl',
            locales: ['pl', 'en', 'de']
          },
          features: {
            initialDataPlugin: false
          }
        },
        {
          hostname: 'localhost',
          api: {
            baseUrl: 'http://localhost:9876'
          },
          i18n: {
            default: 'pl',
            locales: ['pl', 'en', 'de']
          },
          features: {
            initialDataPlugin: false
          }
        }
      ]
  }
})
