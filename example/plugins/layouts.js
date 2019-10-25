import Vue from 'vue'
import { registerBackendLayouts } from '~typo3/plugins/layouts'
import BeDefault from '~/layouts/backend/default'
import BeSinglecolumn from '~/layouts/backend/BeSinglecolumn'

const layouts = {
  BeDefault,
  BeSinglecolumn
  // beLayout2Columns,
  // example of async use
  // BeSinglecolumn: () =>
  //   import(
  //     /* webpackChunkName: 'layouts/backend/BeSinglecolumn.vue' */ '~/layouts/backend/BeSinglecolumn.vue'
  //   )
}

export default ({ app }) => {
  Vue.use(registerBackendLayouts, {
    context: app,
    layouts
  })
}
