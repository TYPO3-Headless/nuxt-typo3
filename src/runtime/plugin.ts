import { defineNuxtPlugin, addRouteMiddleware, useRoute, showError } from '#app'
import type { NuxtApp } from '#app'
import { useT3Options } from './composables/useT3Options'
import { useT3i18n } from './composables/useT3i18n'
import { useT3Api } from './composables/useT3Api'
import { T3ApiClient } from './lib/apiClient'
import { t3i18nMiddleware } from './middleware/i18n'
import { setT3ClientState, useSSRHeaders } from './lib/utils'

const initInitialData = async () => {
  const route = useRoute()
  const { initialData, pageData, getInitialData } = useT3Api(route.fullPath)

  if (process.server) {
    try {
      const { currentSiteOptions } = useT3Options()
      const { getPathWithLocale } = useT3i18n(route.fullPath)
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
}

export default defineNuxtPlugin(async (nuxtApp) => {
  const { currentSiteOptions } = useT3Options()
  const { initLocale } = useT3i18n()

  initLocale()
  const t3State = setT3ClientState(currentSiteOptions.value, nuxtApp as NuxtApp & typeof nuxtApp)
  const ssrHeaders = useSSRHeaders(currentSiteOptions.value)
  const client = new T3ApiClient(
    currentSiteOptions.value,
    t3State.client,
    ssrHeaders
  )

  const typo3 = {
    api: client,
    $fetch: client.$fetch
  }

  nuxtApp.provide('typo3', typo3)
  if (currentSiteOptions.value.features?.initInitialData) {
    await initInitialData()
  }

  if (currentSiteOptions.value.features?.i18nMiddleware) {
    addRouteMiddleware('typo3-i18n-middleware', t3i18nMiddleware, {
      global: true
    })
  }
})
