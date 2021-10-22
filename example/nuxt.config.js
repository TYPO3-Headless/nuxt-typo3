// import https from 'https'
import pl from './locale/pl'
import en from './locale/en'
const { resolve } = require('path')
const pkg = require('../package')
const localeConfig = {
  locales: ['en', 'de', 'pl'],
  defaultLocale: 'en'
}
module.exports = {
  rootDir: resolve(__dirname, '..'),
  buildDir: resolve(__dirname, '.nuxt'),
  srcDir: __dirname,
  render: {
    resourceHints: false
  },
  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** TYPO3PWA Settings
   */
  typo3: {
    baseURL: 'http://localhost:3000',
    api: {
      baseURL: 'https://api.t3pwa.com/v11'
    },
    i18n: localeConfig
  },
  /*
   ** Add components/layouts overrides
   */
  plugins: ['~/plugins/components', '~/plugins/layouts', '~/plugins/i18n'],
  /*
   ** Register required modules
   */
  modules: [
    '@nuxtjs/i18n',
    {
      handler: require('../')
    }
  ],

  i18n: {
    strategy: 'no_prefix',
    localeConfig,
    vueI18n: {
      fallbackLocale: 'en',
      messages: {
        en,
        pl
      }
    }
  },

  build: {
    /*
     ** You can extend webpack config here
     */
    extend (config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }

      if (ctx.isDev) {
        config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map'
      }
    }
  }
}
