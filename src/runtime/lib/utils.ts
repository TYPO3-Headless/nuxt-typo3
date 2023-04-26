import { defu } from 'defu'
import type { FetchOptions } from 'ofetch'
import type { T3Site } from '../../types'
import { NuxtApp, useRequestHeaders } from '#app'

/**
 * Share API client state between SSR/Client
 * @param {T3Site} currentSite
 * @param {NuxtApp} nuxtApp
 * @returns {Record<client: FetchOptions<'json'>} shared t3State
 */
export const setT3ClientState = (
  currentSite: T3Site,
  nuxtApp: NuxtApp
): {
  client: FetchOptions<'json'>
} => {
  if (process.server) {
    nuxtApp._t3State = {
      client: defu(currentSite.api, {
        headers: {}
      })
    }
    nuxtApp.payload.data.t3State = nuxtApp._t3State
  } else {
    nuxtApp._t3State = nuxtApp.payload.data.t3State
  }
  return nuxtApp._t3State
}

/**
 * Get selcted Headers for SSR purpose only
 * @param {T3Site} currentSite
 * @returns {Record<string, string>} ssrHeaders
 */
export const useSSRHeaders = (currentSite: T3Site): Record<string, string> =>
  process.server && Array.isArray(currentSite.api.proxyHeaders)
    ? useRequestHeaders(currentSite.api.proxyHeaders)
    : {}
