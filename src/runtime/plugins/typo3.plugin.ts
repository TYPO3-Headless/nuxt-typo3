import { setResponseHeaders } from 'h3'
import { defineNuxtPlugin, addRouteMiddleware, useHydration, useRequestEvent, useRequestHeaders, useNuxtApp, useRuntimeConfig } from '#app'
import { useT3Options, useT3OptionsState } from '../composables/useT3Options'
import { useT3i18n } from '../composables/useT3i18n'
import { T3ApiClient } from '../lib/apiClient'
import { t3i18nMiddleware } from '../middleware/i18n'

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

  if (currentSiteOptions.value.features?.i18nMiddleware) {
    addRouteMiddleware('typo3-i18n-middleware', t3i18nMiddleware, {
      global: true
    })
  }

  nuxtApp.hook('app:rendered', () => {
    const ssrConfig = useRuntimeConfig().typo3
    // clear the merged SSR config to prevent hydration on the client side
    if (ssrConfig) {
      const state = useT3OptionsState()
      state.value = null
    }

    if (client.siteOptions.api.proxyHeaders) {
      const reqEvent = useRequestEvent()
      if (reqEvent) {
        setResponseHeaders(reqEvent, client.apiHeaders)
      }
    }
  })
})

/**
 * Header names that must not reach the browser, lower-cased for matching:
 * `api.headers` may hold server-only auth, `api.proxyReqHeaders` are
 * request-scoped (cookie, forwarded-for) and the client re-derives them anyway.
 */
const getSensitiveHeaderNames = (client: T3ApiClient): Set<string> => {
  const sensitive = new Set<string>()

  const configHeaders = client.siteOptions.api.headers
  if (configHeaders) {
    for (const name of Object.keys(configHeaders)) {
      sensitive.add(name.toLowerCase())
    }
  }

  const proxyReqHeaders = client.siteOptions.api.proxyReqHeaders
  if (Array.isArray(proxyReqHeaders)) {
    for (const name of proxyReqHeaders) {
      sensitive.add(String(name).toLowerCase())
    }
  }

  return sensitive
}

/**
 * Filter into a new object, so SSR fetches keep using the full headers.
 */
const stripSensitiveHeaders = (
  headers: HeadersInit | undefined,
  sensitive: Set<string>
): Record<string, string> => {
  if (!headers || typeof headers !== 'object' || Array.isArray(headers) || headers instanceof Headers) {
    return {}
  }

  return Object.fromEntries(
    Object.entries(headers as Record<string, string>)
      .filter(([name]) => !sensitive.has(name.toLowerCase()))
  )
}

// Grab SSR and Request headers and hydrate them to client side.
// The getter runs on `app:rendered`, so it sees the final headers — sensitive
// ones are dropped there to keep them out of the `__NUXT_DATA__` payload.
export const hydrateT3ClientHeaders = (client: T3ApiClient) => {
  useHydration('T3:api:headers',
    () => {
      const sensitive = getSensitiveHeaderNames(client)
      return stripSensitiveHeaders(client.fetchOptions.headers, sensitive)
    },
    (headers) => {
      client.fetchOptions.headers = { ...client.fetchOptions.headers, ...headers }

      const { payload } = useNuxtApp()
      payload['T3:api:headers'] = null
    }
  )
}
