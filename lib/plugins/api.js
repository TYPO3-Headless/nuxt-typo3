import API from '~typo3/lib/api'
import { getLocaleCodePath } from '~typo3/lib/i18n'
export default function (context, options) {
  const { store, $axios } = context
  let initialDataRetried = false

  const api = {
    ...new API(
      store.state.typo3 && store.state.typo3.domain
        ? Object.assign(options.api, store.state.typo3.domain.api)
        : options.api,
      $axios
    ),
    setOptions (options) {
      Object.assign(this.$http.defaults, options)
      Object.assign(this.options, options)
    }
  }

  // add initialData fallback for 404 pages
  api.$http.onError((error) => {
    if (
      error.response.status === 404 &&
      error.config.url &&
      error.config.url.includes(options.api.endpoints.initialData)
    ) {
      if (!initialDataRetried) {
        initialDataRetried = true
        return api.getInitialData({
          path: getLocaleCodePath(context)
        })
      } else {
        throw new Error(
          `initialData fallback not available for ${error.config.baseURL}${error.config.url}`
        )
      }
    }
  })

  return api
}
