import { showError } from '#app'
import type { RouteLocationNormalized } from 'vue-router'
import { useT3Api } from '../composables/useT3Api'
import { useT3Options } from '../composables/useT3Options'
import { useT3i18n } from '../composables/useT3i18n'

export async function t3initialDataMiddleware (to: RouteLocationNormalized) {
  if (process.client) {
    return
  }

  const { initialData, getInitialData } = useT3Api(to.fullPath)

  try {
    const { currentSiteOptions } = useT3Options()
    const { getPathWithLocale } = useT3i18n(to.fullPath)
    const data = await getInitialData(getPathWithLocale(currentSiteOptions.value.api.endpoints?.initialData))
    initialData.value = data
  } catch (error: any) {
    showError({
      fatal: true,
      unhandled: false,
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage,
      data: error.response?._data,
      message: error.message

    })
  }
}
