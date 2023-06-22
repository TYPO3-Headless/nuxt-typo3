import { SET_PAGE_DATA } from '~typo3/store/mutation-types'
import { isDynamicRoute, redirect } from '~typo3/lib/route'
import { getFrontendLayout } from '~typo3/lib/layouts'

/**
 * Extend NuxtContext by TYPO3 API
 *
 * @param {Object} context -  NuxtContext
 * @param {Object} response - page response
 * @returns {Object} context
 */
async function setContext (context, response) {
  const { data } = response
  const { store, app } = context

  if (data) {
    const { appearance } = data
    if (appearance) {
      context.layout = getFrontendLayout(
        appearance.layout,
        context.app.$typo3.options.layouts
      )
    }

    context.t3page = data
    store.commit(SET_PAGE_DATA, data)

    await app.$typo3.callHook('context', context, data)
  }

  return context
}

/**
 * Extend NuxtContext by TYPO3 API
 *
 * @param {Object} context - NuxtContext
 * @param {Object} httpError - axios error response
 * @returns {Object} context
 */
async function setErrorContext (context, httpError) {
  const { error } = context
  const errorContext = {
    ssr: null,
    message: httpError.response?.message || httpError.message,
    statusCode: httpError.response?.status || 500,
    rawError: httpError
  }

  if (httpError.response?.data) {
    const { layout, t3page } = await setContext(
      context,
      httpError.response
    )

    errorContext.ssr = {
      layout,
      t3page
    }
  }

  return error(errorContext)
}

/**
 * Set response headers on SSR request
 *
 * @param {Object} context - NuxtContext
 * @param {Object} headers - headers to be set
 *
 */
function setResponseHeaders (context, headers) {
  const allowedHeaders = context.app.$typo3.options.headers || false
  context.app.$typo3.callHook('ssr:headers', headers)

  if (!allowedHeaders) {
    return
  }

  if (Array.isArray(allowedHeaders)) {
    allowedHeaders
      .filter(name => name.toLowerCase() in headers)
      .forEach((name) => {
        context.res.setHeader(name, headers[name.toLowerCase()])
      })
    return
  }

  Object.entries(headers).forEach(([name, value]) => {
    context.res.setHeader(name, value)
  })
}

/**
 * Context route middleware
 *
 * @param {Object} context -  NuxtContext
 *
 */
async function contextMiddleware (context) {
  const { route, app, store, from } = context
  const path = route.fullPath || route.path
  const isPageExist = store.state.typo3?.page?.slug
  const isDifferentPage = isPageExist ? from?.path !== route.path : true

  if (isDynamicRoute(context.route) && isDifferentPage) {
    try {
      const response = await app.$typo3.api.getPage(path)
      const { data } = response

      if (context.res) {
        setResponseHeaders(context, response.headers)
      }

      if (data && data.redirectUrl) {
        const { redirectUrl, statusCode } = data
        await app.$typo3.callHook('redirect', context, data)
        return redirect(context, redirectUrl, statusCode)
      }

      setContext(context, response)
    } catch (error) {
      setErrorContext(context, error)
    }
  }
  return context
}

export { setContext, setErrorContext, contextMiddleware }
