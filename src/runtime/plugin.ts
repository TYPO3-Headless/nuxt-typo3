import { defineNuxtPlugin, addRouteMiddleware, useRoute, showError } from '#app'
import type { NuxtApp } from '#app'
import { useT3Options } from './composables/useT3Options'
import { useT3i18n } from './composables/useT3i18n'
import { T3ApiClient } from './lib/apiClient'
import { t3i18nMiddleware } from './middleware/i18n'
import { t3initialDataMiddleware } from './middleware/initialData'
import { setT3ClientState, useSSRHeaders } from './lib/utils'

export default defineNuxtPlugin((nuxtApp) => {
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
    addRouteMiddleware('typo3-initialData-middleware', t3initialDataMiddleware, {
      global: true
    })
  }

  if (currentSiteOptions.value.features?.i18nMiddleware) {
    addRouteMiddleware('typo3-i18n-middleware', t3i18nMiddleware, {
      global: true
    })
  }
})
