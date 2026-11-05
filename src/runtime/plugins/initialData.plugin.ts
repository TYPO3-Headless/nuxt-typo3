import type { RouteLocationNormalized, LocationQuery } from 'vue-router'
import { parseURL, parseQuery, withQuery, withoutTrailingSlash } from 'ufo'
import { showError } from '#app'
import logger from '../lib/logger'
import { useT3Api } from '../composables/useT3Api'
import { useT3Options } from '../composables/useT3Options'
import { useT3i18n } from '../composables/useT3i18n'
import type { T3Error } from '../../types'
import { defineNuxtPlugin, useError, useRoute, useT3Page } from '#imports'

async function fetchInitialData (to: RouteLocationNormalized) {
  const { initialData, getInitialData } = useT3Api(to.fullPath)
  const { currentSiteOptions } = useT3Options()
  const { getPathWithLocale } = useT3i18n(to.fullPath)
  const initialDataEndpoint = currentSiteOptions.value.api.endpoints?.initialData
  const initialDataFallback = currentSiteOptions.value.api.endpoints?.initialDataFallback

  /**
   * Builds initial data path when the endpoint is either:
   * - a pure query string (e.g. "?type=834"), in which case we merge it with fullPath
   * - a full path with optional query (e.g. "/endpoint?type=834"), in which case we use it directly
   *
   * @param endpoint - the initialData or initialDataFallback endpoint
   * @param fullPath - optional fullPath from the current route, used only for merging when endpoint is query string starting with "?"
   * @returns a fully constructed path
   */
  const buildInitialDataPath = (endpoint: string, fullPath?: string): string => {
    const { pathname: endpointPathname, search: endpointSearch } = parseURL(endpoint)
    const staticConfigEndpointQuery = parseQuery(endpointSearch)

    if (fullPath && endpoint.startsWith('?')) {
      const { pathname: fullPathPathname, search: baseSearch } = parseURL(fullPath)
      const baseQuery = parseQuery(baseSearch)
      const mergedQuery = { ...baseQuery, ...staticConfigEndpointQuery }
      return withQuery(withoutTrailingSlash(fullPathPathname), mergedQuery)
    }

    return withQuery(getPathWithLocale(endpointPathname), staticConfigEndpointQuery)
  }

  /**
   * Builds the initial data path in the default case:
   * - both the endpoint and the current route have their own query parameters
   * - both sets of query parameters are merged into the final result
   *
   * This is only called when:
   * - the route has query
   * - the endpoint is a full path, not just a query string
   */
  const buildDefaultInitialDataPath = (endpoint: string, routeQuery: LocationQuery): string => {
    const { pathname, search } = parseURL(endpoint)
    const endpointQuery = parseQuery(search)
    const mergedQuery = { ...endpointQuery, ...routeQuery }
    // cHash belongs to the path of the current page. TYPO3 rejects it on the initial data endpoint with a 404.
    delete mergedQuery.cHash
    return withQuery(getPathWithLocale(pathname), mergedQuery)
  }

  /**
   * Determines the correct initial data path, based on:
   * - the format of the endpoint
   * - the state of the current route's query
   */
  const getInitialDataPath = (endpoint: string): string => {
    if (endpoint.startsWith('?')) {
      return buildInitialDataPath(endpoint, to.fullPath)
    }

    const routeQuery = to.query
    if (!Object.keys(routeQuery).length) {
      return buildInitialDataPath(endpoint)
    }

    if (Object.keys(routeQuery).some(key => key.includes('[controller]'))) {
      return withQuery(to.fullPath, routeQuery)
    }

    return buildDefaultInitialDataPath(endpoint, routeQuery)
  }

  try {
    let data
    try {
      data = await getInitialData(getInitialDataPath(initialDataEndpoint!))
    } catch (error) {
      if (initialDataFallback && typeof initialDataFallback === 'string') {
        if (import.meta.dev) {
          logger.warn('[DEPRECATED]: initialDataFallback is depracted and will be removed in the next minor version, use interceptor instead')
        }
        data = await getInitialData(getInitialDataPath(initialDataFallback!))
      } else {
        throw new Error(error as any)
      }
    }
    initialData.value = data
    return data
  } catch (error: any) {
    showError({
      fatal: true,
      unhandled: false,
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage,
      data: error.response?._data,
      message: `Initial Data is unavailable: ${error.message}`
    })
  }
}

export default defineNuxtPlugin(async () => {
  if (!import.meta.server) {
    return
  }

  const route = useRoute()
  const isT3Page = route.meta.t3Page === true
  const avoidInitialData = route.meta.t3InitialData === false

  const { currentSiteOptions } = useT3Options()
  const { initialData, pageData } = useT3Api()
  const { getPageData } = await useT3Page()

  const error: T3Error = useError().value as T3Error

  // restore state from previous event context
  // https://github.com/nuxt/nuxt/issues/33651
  if (error?.data) {
    initialData.value = error.data.initialData ?? null
    pageData.value = error.data.pageData ?? null

    // perevent double API calls for error pages
    // https://github.com/nuxt/nuxt/issues/25084#issuecomment-1939607226
    return
  }

  if (currentSiteOptions.value.features?.initialDataPlugin && !avoidInitialData) {
    await fetchInitialData(route)
  }

  // only run TYPO3 page resolution for routes handled by this module.
  // routes opt in via `meta.typo3` (set on the module's catch-all route,
  // or by user pages that re-implement TYPO3 rendering through
  // `definePageMeta({ typo3: true })`). static/own pages are left untouched.
  if (!isT3Page) {
    return
  }
  // fetch page data on the server once,
  // then access it in the page-level composable.

  await getPageData()
})
