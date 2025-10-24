import type { RouteLocationNormalized, LocationQuery } from 'vue-router'
import { parseURL, parseQuery, withQuery } from 'ufo'
import { showError, callOnce } from '#app'
import { useT3Api } from '../composables/useT3Api'
import { useT3Options } from '../composables/useT3Options'
import { useT3i18n } from '../composables/useT3i18n'

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
      return withQuery(getPathWithLocale(fullPathPathname), mergedQuery)
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
    } catch {
      data = await getInitialData(getInitialDataPath(initialDataFallback!))
    }
    initialData.value = data
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

export async function t3initialDataMiddleware (to: RouteLocationNormalized) {
  await callOnce('t3:initialData', async () => await fetchInitialData(to))
}
