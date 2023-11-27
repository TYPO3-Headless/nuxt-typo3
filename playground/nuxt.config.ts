import { defineNuxtConfig } from 'nuxt/config'
import nuxtTypo3 from '..'

export default defineNuxtConfig({
  modules: [nuxtTypo3],
  typo3: {
    sites: [
      {
        hostname: 'localhost',
        api: {
          baseUrl: 'http://localhost:3000/api'
        },
        i18n: {
          default: 'en',
          locales: ['en', 'de', 'pl']
        }
      },
      {
        hostname: 'local.t3pwa.com',
        api: {
          baseUrl: 'http://localhost:3000/api'
        }
      }
    ]
  },
  components: {
    dirs: [
      {
        path: '@/components/T3',
        global: true,
        pathPrefix: false
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
