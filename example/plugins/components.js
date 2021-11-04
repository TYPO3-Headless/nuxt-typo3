import Vue from 'vue'
import CeText from '~/components/CeText'
import FormFieldTemplate from '~/components/FormFieldTemplate'

const components = {
  T3CeText: CeText,
  T3FormField: FormFieldTemplate
}

export default () => {
  Object.keys(components).forEach((key) => {
    Vue.component(key, components[key])
  })
}
