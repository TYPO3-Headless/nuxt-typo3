import api from '~typo3/plugins/api'
import i18n from '~typo3/plugins/i18n'
export default function (context, inject) {
  const moduleOptions = <%= serialize(options) %>
  const _options = {
    api: api(context, moduleOptions),
    i18n: i18n(context, moduleOptions),
    options: moduleOptions
  }
  inject('typo3', _options)
}
