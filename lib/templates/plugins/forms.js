/* eslint-disable camelcase */
import Vue from 'vue'
import VueFormulate from '@braid/vue-formulate'
import CeForm_formframework from '~typo3/components/content/elements/CeForm_formframework'

export default ({ app }) => {
  Vue.use(VueFormulate)
  Vue.component('CeForm_formframework', CeForm_formframework)
}
