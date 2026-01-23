export default defineNuxtConfig({
  app: { baseURL: '/nuxt-typo3/' },
  extends: ['docus'],
  devtools: { enabled: true },
  experimental: {
    payloadExtraction: false
  },
  nitro: {
    prerender: {
      ignore: ['/raw/'],
      autoSubfolderIndex: false
    }
  }
})
