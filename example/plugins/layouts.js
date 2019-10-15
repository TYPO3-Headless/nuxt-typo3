import Vue from 'vue'
import { registerBackendLayouts } from '~typo3/plugins/layouts'
import BeDefault from '~/layouts/backend/default'

const layouts = {
  BeDefault,
  // beLayout2Columns,
  // example of async use
  BeTwoColumns: () =>
    import(
      /* webpackChunkName: 'layouts/backend/2-columns.vue' */ '~/layouts/backend/2-columns.vue'
    )
}

export default ({ app }) => {
  Vue.use(registerBackendLayouts, {
    context: app,
    layouts
  })
}
