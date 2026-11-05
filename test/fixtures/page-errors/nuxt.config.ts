import { defineNuxtConfig } from 'nuxt/config'
import MyModule from '../../../src/module'

// Fixture dedicated to the error handling of missing pages and initial data.
const site = {
  api: {
    baseUrl: 'http://localhost:9876'
  },
  i18n: {
    default: 'pl',
    locales: ['pl', 'de']
  },
  features: {
    initialDataPlugin: true
  }
}

export default defineNuxtConfig({
  modules: [MyModule],
  typo3: {
    sites: [
      { ...site, hostname: '127.0.0.1' },
      { ...site, hostname: 'localhost' }
    ]
  }
})
