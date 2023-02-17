import { defu } from 'defu'
import Hookable from 'hable'
import api from '~typo3/plugins/api'
import i18n from '~typo3/plugins/i18n'
import domains from '~typo3/plugins/domains'
export default function (context, inject) {
  const runtimeConfig = context.$config && context.$config.typo3
  let moduleOptions = <%= serialize(options) %>

  if (runtimeConfig) {
    moduleOptions = defu(runtimeConfig, moduleOptions)
  }

  const hooks = new Hookable()

  const _options = {
    api: api(context, moduleOptions),
    i18n: i18n(context, moduleOptions),
    domains: domains(context, moduleOptions),
    options: moduleOptions,
    ...hooks
  }
  inject('typo3', _options)
}
