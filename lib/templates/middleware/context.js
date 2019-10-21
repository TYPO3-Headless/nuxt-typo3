import middleware from '../middleware'
import { isDynamicRoute } from '~typo3/lib/route'
import { SET_PAGE } from '~typo3/store/mutation-types'
import { getBackendLayout, getFrontendLayout } from '~typo3/lib/layouts'

middleware.context = function(context) {
  const path = context.route.fullPath || context.route.path
  if (isDynamicRoute(context.route)) {
    return context.app.$typo3.$api
      .getPage(path)
      .then(resp => {
        context.layout = getFrontendLayout(
          context.app.$typo3.options.layouts,
          resp.data.page.appearance.layout
        )
        context.backendLayout = getBackendLayout(
          context.app.components,
          resp.data.page.appearance.backendLayout
        )
        context.pageContent = resp.data
        context.store.commit(SET_PAGE, resp.data)
      })
      .catch(error => {
        context.errorResponse = error.response
        return context.error({
          message: error.response.message,
          statusCode: error.response.status
        })
      })
  }
  return true
}
