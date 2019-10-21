import API from '~typo3/lib/api'
export default function ({}, inject) {
  const moduleOptions = <%= serialize(options) %>
  const _options = {
    $api: new API(moduleOptions),
    options: moduleOptions
  }
  inject('typo3', _options)
}
