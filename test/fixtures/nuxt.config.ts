import { defineNuxtConfig } from 'nuxt/config'
import MyModule from '../../src/module'

export default defineNuxtConfig({
  modules: [MyModule],
  typo3: {
    sites:
      [
        {
          hostname: '127.0.0.1',
          api: {
            baseUrl: 'https://my-api-demo.com'
          },
          i18n: {
            default: 'pl',
            locales: ['pl', 'en', 'de']
          },
          features: {
            initInitialData: false
          }
        },
        {
          hostname: 'localhost',
          api: {
            baseUrl: 'https://my-api-demo.com'
          },
          i18n: {
            default: 'pl',
            locales: ['pl', 'en', 'de']
          },
          features: {
            initInitialData: false
          }
        }
      ]
  }
})
