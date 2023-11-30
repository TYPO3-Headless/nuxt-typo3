export default defineNuxtConfig({
  app: { baseURL: '/nuxt-typo3/' },
  extends: '@nuxt-themes/docus',
  devtools: { enabled: true },
  // Temporary solution, waiting for docus update where they solve this problem
  typescript: {
    tsConfig: {
      compilerOptions: {
        verbatimModuleSyntax: false
      }
    }
  }
})
