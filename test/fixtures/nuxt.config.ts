import { defineNuxtConfig } from 'nuxt/config'
import MyModule from '../..'

export default defineNuxtConfig({
  modules: [MyModule],
  typo3: {
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
})
