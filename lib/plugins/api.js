import API from '~typo3/lib/api'
import { getLocaleCodePath } from '~typo3/lib/i18n'
import logger from '~typo3/lib/logger'

export default function (context, options) {
  const { store, $axios, error } = context
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
  api.$http.onError((httpError) => {
    if (httpError.config?.url?.includes(options.api.endpoints.initialData)) {
      if (!initialDataRetried) {
        initialDataRetried = true
        logger.warn(`cant get the initial config ${api.options.baseURL}`)
        return api.getInitialData({
          path: getLocaleCodePath(context)
        })
      } else {
        const message = `initialData fallback not available for ${httpError.config.baseURL}${httpError.config.url}`
        logger.warn(message)
        error({
          ssr: null,
          message,
          statusCode: 500,
          rawError: httpError
        })
      }
    }
  })

  return api
}
