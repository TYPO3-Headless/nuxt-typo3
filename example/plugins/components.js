import Vue from 'vue'
import CeText from '~/components/CeText'

const components = {
  T3CeText: CeText
}

export default () => {
  Object.keys(components).forEach((key) => {
    Vue.component(key, components[key])
  })
}
