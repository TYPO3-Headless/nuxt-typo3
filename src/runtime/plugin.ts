import { defineNuxtPlugin, addRouteMiddleware, useHydration, useRequestEvent, useRequestHeaders } from '#app'
import { setResponseHeaders } from 'h3'
import { useT3Options } from './composables/useT3Options'
import { useT3i18n } from './composables/useT3i18n'
import { T3ApiClient } from './lib/apiClient'
import { t3i18nMiddleware } from './middleware/i18n'
import { t3initialDataMiddleware } from './middleware/initialData'

export default defineNuxtPlugin((nuxtApp) => {
  const { currentSiteOptions } = useT3Options()
  const { initLocale } = useT3i18n()
  const client = new T3ApiClient(currentSiteOptions.value)

  initLocale()
  hydrateT3ClientHeaders(client)
  const typo3 = {
    api: client,
    $fetch: client.$fetch.bind(client)
  }

  const proxyReqHeaders = client.siteOptions.api.proxyReqHeaders
  const reqHeaders = (proxyReqHeaders && Array.isArray(proxyReqHeaders) && proxyReqHeaders.length) ? useRequestHeaders(proxyReqHeaders) : {}
  client.fetchOptions.headers = { ...client.fetchOptions.headers, ...reqHeaders }

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

  nuxtApp.hook('app:rendered', () => {
    if (client.siteOptions.api.proxyHeaders) {
      setResponseHeaders(useRequestEvent(), client.apiHeaders)
    }
  })
})

// grab SSR and Request headers and hydrate them to ClientSide
export const hydrateT3ClientHeaders = (client: T3ApiClient) => {
  useHydration('T3:api:headers',
    () => {
      return client.fetchOptions.headers
    },
    (headers) => {
      client.fetchOptions.headers = headers
      window.__NUXT__!['T3:api:headers'] = null
    }
  )
}
