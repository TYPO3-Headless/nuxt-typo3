import API from '~typo3/lib/api'
import i18nPlugin from '~typo3/plugins/i18n'
export default function (context, inject) {
  const moduleOptions = <%= serialize(options) %>
  const _options = {
    $api: new API(moduleOptions),
    options: moduleOptions,
    i18n: i18nPlugin(context, moduleOptions)
  }
  inject('typo3', _options)
}
