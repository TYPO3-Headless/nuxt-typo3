import type { RouteLocationNormalized } from 'vue-router'
import { cleanDoubleSlashes } from 'ufo'
import { showError } from '#app'
import { useT3Api } from '../composables/useT3Api'
import { useT3Options } from '../composables/useT3Options'
import { useT3i18n } from '../composables/useT3i18n'

export async function t3initialDataMiddleware (to: RouteLocationNormalized) {
  if (process.client) {
    return
  }

  const { initialData, getInitialData } = useT3Api(to.fullPath)
  const { currentSiteOptions } = useT3Options()
  const { getPathWithLocale } = useT3i18n(to.fullPath)
  const initialDataEndpoint = currentSiteOptions.value.api.endpoints?.initialData
  const initialDataFallback = currentSiteOptions.value.api.endpoints?.initialDataFallback

  const getInitialDataPath = (endpoint: string) => {
    return cleanDoubleSlashes(endpoint?.startsWith('?') ? getPathWithLocale(to.fullPath) + endpoint : getPathWithLocale() + endpoint)
  }

  try {
    let data
    try {
      data = await getInitialData(getInitialDataPath(initialDataEndpoint!), {}, true)
    } catch {
      data = await getInitialData(getInitialDataPath(initialDataFallback!), {}, true)
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
