import { defineNuxtConfig } from 'nuxt/config'
import nuxtTypo3 from '../src/module'

export default defineNuxtConfig({
  modules: [nuxtTypo3],
  typo3: {
    sites: [
      {
        hostname: 'localhost',
        api: {
          baseUrl: 'http://localhost:8080',
          allowQuery: ['blabla']
        },
        i18n: {
          default: 'en',
          locales: ['en', 'de', 'pl']
        }
      }
    ]
  },
  runtimeConfig: {
    typo3: {
      sites: [
        {
          hostname: 'localhost',
          api: {
            baseUrl: 'https://macopedia.com/headless'
          }
        }
      ]
    }

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
  },
  compatibilityDate: '2025-06-16'
})
