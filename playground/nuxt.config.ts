import { defineNuxtConfig } from 'nuxt/config'
import nuxtTypo3 from '..'

export default defineNuxtConfig({
  modules: [nuxtTypo3],
  typo3: {
    api: {
      baseUrl: 'http://localhost:3000/api'
    }
  },
  components: {
    dirs: [
      {
        path: '@/components/T3',
        global: true
      }
    ]
  },
  nitro: {
    devProxy: {
      '/api': {
        target: 'https://api.t3pwa.com/',
        secure: false,
        changeOrigin: true,
        preserveHeaderKeyCase: true
      }
    }
  }
})
