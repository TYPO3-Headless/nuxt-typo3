import Vue from 'vue'
import { registerBackendLayouts } from '~typo3/plugins/layouts'
import BlDefault from '~/components/BlDefault'
import Bl2cols from '~/components/Bl2cols'

const layouts = {
  T3BlDefault: BlDefault,
  T3Bl2cols: Bl2cols
}

export default ({ app }) => {
  Vue.use(registerBackendLayouts, {
    context: app,
    layouts
  })
}
