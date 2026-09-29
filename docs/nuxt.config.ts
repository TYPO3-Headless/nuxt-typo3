const mcpRoute = '/mcp'

export default defineNuxtConfig({
  app: { baseURL: '/nuxt-typo3/' },
  css: ['~/assets/css/main.css'],
  extends: ['docus'],
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      mcp: {
        route: mcpRoute
      }
    }
  },
  mcp: {
    route: mcpRoute
  },
  robots: {
    robotsTxt: false
  },
  llms: {
    domain: 'https://t3headless.macopedia.io/nuxt-typo3'
  },
  experimental: {
    payloadExtraction: false
  },
  nitro: {
    prerender: {
      autoSubfolderIndex: false
    }
  }
})
