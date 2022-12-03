import { defineNuxtConfig } from 'nuxt/config'
import nuxtTypo3 from '..'
export default defineNuxtConfig({
  pages: true,
  modules: ['@macopedia/nuxt-typo3'],

  typo3: {
    api: {
      baseUrl: 'https://api.t3pwa.com'
    }
  },
  components: [
    {
      path: '@/components',
      global: true
    }
  ],
  runtimeConfig: {
    public: {
      typo3: {

      }
    }
  }
})
