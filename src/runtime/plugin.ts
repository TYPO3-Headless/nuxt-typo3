
import { defineNuxtPlugin, addRouteMiddleware, callWithNuxt, useRoute, useNuxtApp } from '#app'
import type { NuxtApp } from '#app'
import type { FetchError } from 'ofetch'
import { useT3ErrorHandling } from './composables/useT3ErrorHandling'
import { useT3Options } from './composables/useT3Options'
import { useT3i18n } from './composables/useT3i18n'
import { useT3Api } from './composables/useT3Api'
import { useT3Utils } from './composables/useT3Utils'
import { T3ApiClient } from './lib/apiClient'
import { t3i18nMiddleware } from './middleware/i18n'
import { setT3ClientState, useSSRHeaders, isDynamicRoute } from './lib/utils'

const initInitialData = async () => {
  const route = useRoute()
  const nuxtApp = useNuxtApp()
  const { initialData, getInitialData } = useT3Api(route.fullPath)
  const { handleServerException } = useT3ErrorHandling(route.fullPath)
  const { localePath } = useT3Utils()
  const dynamicRoute = isDynamicRoute(route)

  if (process.server) {
    try {
      const path = dynamicRoute ? route.path : localePath()
      const data = await getInitialData(path)
      initialData.value = data
    } catch (error) {
      return await callWithNuxt(nuxtApp, async () => await handleServerException(
        error as FetchError
      )
      )
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
