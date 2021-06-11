import { resolve, join } from 'path'
import webpack from 'webpack'
import defu from 'defu'
import _options from './options'

function Typo3(options) {
  const { nuxt } = this
  const runtimeConfig =
    nuxt.options.publicRuntimeConfig && nuxt.options.publicRuntimeConfig.typo3
  options = defu(this.options.typo3, _options)
  if (runtimeConfig) {
    options = defu(runtimeConfig, options)
  }

  const modulesList = [
    ...this.nuxt.options.modules,
    ...this.nuxt.options.buildModules
  ]

  if (!modulesList.includes('@nuxtjs/axios')) {
    this.requireModule(['@nuxtjs/axios', this.options.axios || options.api])
  }

  const configFn = this.options.extendPlugins
  this.options.extendPlugins = plugins => {
    const pluginIndex = plugins.findIndex(({ src }) => src.includes('axios.js'))
    const shouldBeFirstPlugin = plugins[pluginIndex]
    plugins.splice(pluginIndex, 1)
    plugins.unshift(shouldBeFirstPlugin)

    if (configFn) {
      return configFn(plugins)
    }
    return plugins
  }

  // add $typo3pwa context
  this.addPlugin({
    src: resolve(__dirname, './templates/plugins/context.js'),
    options,
    fileName: join('typo3', 'plugins.context.js')
  })

  // add typo3pwa store
  this.addPlugin({
    src: resolve(__dirname, './templates/store/index.js'),
    options,
    fileName: join('typo3', 'store.index.js')
  })

  // add i18n router middleware
  this.addPlugin({
    src: resolve(__dirname, './templates/middleware/i18n.js'),
    fileName: join('typo3', 'middleware.i18n.js'),
    options
  })
  this.options.router.middleware.push('typo3i18n')

  // add router middlewares
  this.addPlugin({
    src: resolve(__dirname, './templates/middleware/context.js'),
    fileName: join('typo3', 'middleware.context.js'),
    options
  })
  this.options.router.middleware.push('typo3Context')

  // add components
  // you can disable it if you don't want them in build
  // you can import them in your source code
  if (options.registerComponents) {
    this.addPlugin({
      src: resolve(__dirname, './templates/plugins/components.js'),
      options,
      fileName: join('typo3', 'plugins.components.js')
    })
  }

  if (options.registerForms) {
    this.addPlugin({
      src: resolve(__dirname, './templates/plugins/forms.js'),
      options,
      fileName: join('typo3', 'plugins.forms.js')
    })
  }

  // register layouts
  // you can disable it if you don't want them in build
  // you can import them in your source code
  if (options.registerLayouts) {
    this.addPlugin({
      src: resolve(__dirname, './templates/plugins/layouts.js'),
      options,
      fileName: join('typo3', 'plugins.layouts.js')
    })
  }

  // add default _.vue page to handle dynamic routing
  this.extendRoutes((routes, resolve) => {
    routes.push({
      name: 'page',
      path: '/*',
      component: resolve(__dirname, './templates/pages/_.vue')
    })
  })

  this.extendBuild((config, { isDev, isClient }) => {
    config.resolve.alias['~typo3'] = resolve(__dirname, './templates')
    // avoid warning about about consola dependency in case of standalone build
    config.plugins.push(new webpack.ContextReplacementPlugin(/consola/))
  })
}

module.exports = Typo3
module.exports.meta = require('../package.json')
