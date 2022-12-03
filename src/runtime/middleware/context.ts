import { isEqual } from 'ufo'
import type { RouteLocationNormalized } from 'vue-router'
import { callWithNuxt, useNuxtApp } from '#app'
import { useT3Api } from '../composables/useT3Api'
import {
  useT3ErrorHandling,
  T3ErrorTypes
} from '../composables/useT3ErrorHandling'
import {
  useT3Redirect,
  isDynamicRoute,
  useT3LocalePath
} from '../composables/utils'

export async function t3ContextMiddleware (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized
) {
  const nuxtApp = useNuxtApp()
  const { pageData, initialData, getPage, getInitialData } = useT3Api()
  const { handleServerException } = useT3ErrorHandling()
  const dynamicRoute = isDynamicRoute(to)
  if (process.server) {
    try {
      const path = dynamicRoute ? to.path : useT3LocalePath()
      const data = await getInitialData(path)
      initialData.value = data
    } catch (error) {
      return await handleServerException(
        error,
        T3ErrorTypes.INITIAL_DATA_FAILED
      )
    }
  }
  if (dynamicRoute && (process.server || !isEqual(to.path, from.path))) {
    nuxtApp.callHook('page:start')
    try {
      const data = await getPage(to.path)
      if (data.redirectUrl) {
        await nuxtApp.callHook('t3:middleware:redirect', data)
        return callWithNuxt(nuxtApp, () => useT3Redirect(data))
      }
      pageData.value = data
    } catch (error) {
      pageData.value = null
      // temporary solution, until we find out how to handle errors on client side caused by middlewares
      // set error on meta page and check after route change should display error page
      to.meta.t3middlewareError = error
    } finally {
      nuxtApp.callHook('page:finish')
    }
  }
}
