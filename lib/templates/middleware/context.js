import middleware from '../middleware'
import { isDynamicRoute } from '~typo3/lib/route'
import { SET_PAGE } from '~typo3/store/mutation-types'
import { getBackendLayout, getFrontendLayout } from '~typo3/lib/layouts'

const setContext = (context, response) => {
  if (response && response.data && response.data.page) {
    context.layout = getFrontendLayout(
      response.data.page.appearance.layout,
      context.app.$typo3.options.layouts
    )
    context.backendLayout = getBackendLayout(
      context.app.components,
      response.data.page.appearance.backendLayout
    )
    context.pageContent = response.data
    context.store.commit(SET_PAGE, response.data)
  }
}

middleware.typo3Context = function(context) {
  const path = context.route.fullPath || context.route.path
  if (isDynamicRoute(context.route)) {
    return context.app.$typo3.api
      .getPage(path)
      .then(response => setContext(context, response))
      .catch(error => {
        setContext(context, error.response)
        return context.error({
          ssr: context.pageContent
            ? {
                layout: context.layout,
                backendLayout: context.backendLayout,
                pageContent: context.pageContent
              }
            : null,
          message: error.response.message,
          statusCode: error.response.status
        })
      })
  }
  return true
}
