import { defineNuxtConfig } from 'nuxt/config'
import nuxtTypo3 from '..'
export default defineNuxtConfig({
  modules: [nuxtTypo3],
  typo3: {
    api: {
      baseUrl: 'https://api.t3pwa.com'
    }
  },
  components: {
    dirs: [
      {
        path: '@/components/T3',
        global: true
      }
    ]
  }
})
