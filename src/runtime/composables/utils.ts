import type { Component } from 'vue'
import { RouteLocationNormalized } from 'vue-router'
import { pascalCase } from 'scule'
import { cleanDoubleSlashes } from 'ufo'
import { NuxtApp } from 'nuxt/dist/app/nuxt'
import defu from 'defu'
import type { FetchOptions } from 'ohmyfetch'
import { navigateTo, useRequestHeaders } from '#app'
import type { T3RedirectData, T3Site } from '../../types'
import { useT3i18nState } from './useT3i18n'

/**
 * Handle TYPO3 Redirect
 * @param {T3RedirectData} redirectData
 * @returns
 */
export const useT3Redirect = (redirectData: T3RedirectData) => {
  const { redirectUrl, statusCode } = redirectData

  return navigateTo(redirectUrl, {
    redirectCode: statusCode
  })
}

/**
 * Check if targeted route is dynamic or not
 *
 * @param {RouteLocationNormalized} route current route
 * @returns {Boolean}
 */
export const isDynamicRoute = (route: RouteLocationNormalized) => {
  return route?.matched?.[0]?.path.includes('/:slug(.*)*')
}

/**
 * Get component name for T3Renderer
 * @param {String} type Content Element type
 * @param {Record<string, Component>} components List of available components
 * @returns {String} Component name
 */
export const getComponentName = (
  type: string,
  components?: Record<string, Component>
): string => {
  const component = `LazyT3Ce${pascalCase(type)}`
  if (!components) {
    return component
  }

  if (Object.prototype.hasOwnProperty.call(components, component)) {
    return component
  }

  return 'T3CeDefault'
}

export const useT3LocalePath = (path?: String) => {
  const currentLocale = useT3i18nState()
  return cleanDoubleSlashes(`/${currentLocale.value}${path ? `/${path}` : ''}`)
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
