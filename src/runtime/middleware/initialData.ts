import type { RouteLocationNormalized, LocationQuery } from 'vue-router'
import { withoutLeadingSlash, withQuery, withoutTrailingSlash } from 'ufo'
import { showError, callOnce } from '#app'
import { useT3Api } from '../composables/useT3Api'
import { useT3Options } from '../composables/useT3Options'
import { useT3i18n } from '../composables/useT3i18n'

function hasControllerKey (obj: LocationQuery) {
  return Object.keys(obj).some(key => key.includes('[controller]'))
}

async function fetchInitialData (to: RouteLocationNormalized) {
  const { initialData, getInitialData } = useT3Api(to.fullPath)
  const { currentSiteOptions } = useT3Options()
  const { getPathWithLocale } = useT3i18n(to.fullPath)
  const initialDataEndpoint = currentSiteOptions.value.api.endpoints?.initialData
  const initialDataFallback = currentSiteOptions.value.api.endpoints?.initialDataFallback

  const getInitialDataPath = (endpoint: string) => {
    if (endpoint.startsWith('?')) {
      return withoutTrailingSlash(to.fullPath)
    }

    if (!Object.keys(to.query).length) {
      return withoutLeadingSlash(getPathWithLocale())
    }

    if (hasControllerKey(to.query)) {
      return withQuery(to.fullPath, to.query)
    }

    return withQuery(getPathWithLocale(), to.query)
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
