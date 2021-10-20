import middleware from '../middleware'
import { isDynamicRoute } from '~typo3/lib/route'
import { SET_PAGE } from '~typo3/store/mutation-types'
import { getBackendLayout, getFrontendLayout } from '~typo3/lib/layouts'

const setContext = (context, response) => {
  if (response && response.data) {
    if (response.data.redirectUrl) {
      if (process.server) {
        return context.redirect(
          response.data.statusCode || 301,
          response.data.redirectUrl
        )
      } else if (process.client && typeof window !== 'undefined') {
        window.location.href = response.data.redirectUrl
        return context.next(false)
      }
    }
    if (response.data.page) {
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
    return context
  }
}

middleware.typo3Context = function (context) {
  const path = context.route.fullPath || context.route.path
  if (isDynamicRoute(context.route)) {
    return context.app.$typo3.api
      .getPage(path)
      .then(response => setContext(context, response))
      .catch((error) => {
        const err = {
          ssr: null,
          message: error.response.message,
          statusCode: error.response.status
        }
        if (error.response.data && error.response.data.page) {
          const { layout, pageContent, backendLayout } = setContext(
            context,
            error.response
          )
          err.ssr = {
            layout,
            pageContent,
            backendLayout
          }
        }
        return context.error(err)
      })
  }
  return true
}
