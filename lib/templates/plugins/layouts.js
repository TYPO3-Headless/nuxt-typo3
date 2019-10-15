import Vue from 'vue'
import BeDynamic from '~typo3/layouts/backend/BeDynamic'
import BeDefault from '~typo3/layouts/backend/BeDefault'

const registerBackendLayouts = {
  install: (Vue, options) => {
    const layouts = options.layouts
    Object.keys(layouts).forEach(key => {
      Vue.component(key, layouts[key])
      options.context.components[key] = layouts[key] // pass layout to application context for SSR purspoes
    })
  }
}

const layouts = {
  BeDynamic,
  BeDefault
}

export { registerBackendLayouts }

export default ({ app }) => {
  Vue.use(registerBackendLayouts, {
    context: app,
    layouts
  })
}
