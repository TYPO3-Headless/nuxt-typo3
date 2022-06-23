import Vue from 'vue'
import T3CeFormFormframework from '~typo3/components/T3CeFormFormframework'
import T3Form from '~typo3/components/T3Form/T3Form.vue'
import T3CeFeloginLogin from '~typo3/components/T3CeFeloginLogin/T3CeFeloginLogin.vue'

const components = {
  T3Form,
  T3CeFormFormframework,
  T3CeFeloginLogin
}

Object.keys(components).forEach((key) => {
  Vue.component(key, components[key])
})
