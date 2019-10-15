import Vue from 'vue'
import CeText from '~/components/content/elements/CeText'
import CeTextmedia from '~/components/content/elements/CeTextmedia'

const components = {
  CeText,
  CeTextmedia
}

export default ({ app }) => {
  Object.keys(components).forEach(key => {
    Vue.component(key, components[key])
  })
}
