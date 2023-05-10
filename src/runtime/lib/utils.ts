import { RouteLocationNormalized } from 'vue-router'
import { isEqual } from 'ufo'
import { NuxtApp, useRequestHeaders } from '#app'
import { defu } from 'defu'
import type { FetchOptions } from 'ofetch'
import type { T3Site } from '../../types'

/**
 * Check if targeted route is dynamic or not
 *
 * @param {RouteLocationNormalized} route current route
 * @returns {Boolean}
 */
export const isDynamicRoute = (route: RouteLocationNormalized): boolean => {
  return route?.matched?.[0]?.path.includes('/:slug(.*)*')
}

/**
 * Check if provieded paths are equal after remove hashes
 * @param {String} a
 * @param {String} b
 * @returns {Boolean}
 */
export const isEqualWithoutHash = (a: string, b: string): boolean => {
  return isEqual(a?.split('#')?.[0], b.split('#')?.[0])
}

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
