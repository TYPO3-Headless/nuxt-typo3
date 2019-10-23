import Vue from 'vue'
import CeText from '~/components/content/elements/CeText'

const components = {
  CeText
}

export default ({ app }) => {
  Object.keys(components).forEach(key => {
    Vue.component(key, components[key])
  })
}
