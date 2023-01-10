import { createResolver, logger } from '@nuxt/kit'
const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
  app: {
    baseURL: '/nuxt-typo3/'
  },
  extends: '@nuxt-themes/docus'
})
