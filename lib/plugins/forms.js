/* eslint-disable camelcase */
import Vue from 'vue'
import T3CeFormFormframework from '~typo3/components/T3CeFormFormframework/T3CeFormFormframework.vue'
import T3Form from '~typo3/components/T3Form/T3Form.vue'

export default () => {
  Vue.component('T3Form', T3Form)
  Vue.component('T3CeFormFormframework', T3CeFormFormframework)
}
