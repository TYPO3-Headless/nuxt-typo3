import API from '~typo3/lib/api'
import { getLocaleCodePath } from '~typo3/lib/i18n'
export default function(context, options) {
  const api = {
    ...new API(options, context.$axios)
  }

  // add initialData fallback for 404 pages
  api.$http.onError(error => {
    if (
      error.response.status === 404 &&
      error.config.url &&
      error.config.url.includes(options.api.endpoints.initialData)
    ) {
      return api.getInitialData({
        path: getLocaleCodePath(context)
      })
    }
  })

  return api
}
