import Vue from 'vue'
import T3BlDefault from '~typo3/components/T3BlDefault/T3BlDefault'

const registerBackendLayouts = {
  install: (Vue, options) => {
    const layouts = options.layouts
    Object.keys(layouts).forEach((key) => {
      Vue.component(key, layouts[key])
      options.context.components[key] = layouts[key] // pass layout to application context for SSR purspoes
    })
  }
}

const layouts = {
  T3BlDefault
}

export { registerBackendLayouts }

export default ({ app }) => {
  Vue.use(registerBackendLayouts, {
    context: app,
    layouts
  })
}
