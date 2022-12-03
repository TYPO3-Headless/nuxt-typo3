
import { defineNuxtPlugin, addRouteMiddleware, useRouter } from '#app'
import type { NuxtApp } from '#app'
import { useT3ErrorHandling } from './composables/useT3ErrorHandling'
import { useT3Options } from './composables/useT3Options'
import { useT3i18n } from './composables/useT3i18n'
import { T3ApiClient } from './lib/apiClient'
import { t3ContextMiddleware } from './middleware/context'
import { t3i18nMiddleware } from './middleware/i18n'
import { setT3ClientState, useSSRHeaders } from './composables/utils'

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

  if (currentSiteOptions.value.features?.i18nMiddleware) {
    addRouteMiddleware('typo3-i18n-middleware', t3i18nMiddleware, {
      global: true
    })
  }

  if (currentSiteOptions.value.features?.pageMiddleware) {
    const { handleClientPageException } = useT3ErrorHandling()
    const router = useRouter()

    // temporary fix, until nuxt team fix this, we handle all error during middleware
    // https://github.com/nuxt/framework/issues/6957
    router.onError(() => {})
    router.afterEach((to) => {
      const { t3middlewareError } = to.meta
      if (t3middlewareError) {
        handleClientPageException(to)
      }
    })

    addRouteMiddleware('typo3-page-middleware', t3ContextMiddleware, {
      global: true
    })
  }
})
