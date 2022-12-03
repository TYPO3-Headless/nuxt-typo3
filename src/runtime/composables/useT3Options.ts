import { computed } from 'vue'
import type { ComputedRef } from 'vue'
import { useRuntimeConfig, useRequestHeaders } from '#app'
import type { T3Site, T3Options } from '../../types'
import { getRawHost } from '../lib/url'

export const useT3Options = (): {
  /**
   * Get all module options
   */
  options: T3Options
  /**
   * Get site settings
   */
  getSiteOptions: (domain?: string) => T3Site
  /**
   * Get current site options computed value
   */
  currentSiteOptions: ComputedRef<T3Site>
} => {
  const options = useRuntimeConfig().public.typo3 as T3Options

  const currentSiteOptions = computed(() => getSiteOptions())

  const getSiteOptions = (domain?: string): T3Site => {
    const { sites } = options

    if (!sites || !sites.length) {
      return options
    }

    const host = domain || useRequestHeaders()?.host || window?.location.origin
    const rawHost = getRawHost(host)

    const site = sites.find(({ hostname }) => {
      if (rawHost && Array.isArray(hostname)) {
        return hostname.includes(rawHost)
      }

      return hostname === rawHost
    })

    if (!site) {
      throw new Error(`Hostname: ${host} not found in sites configuration`)
    }

    return site
  }

  return { options, getSiteOptions, currentSiteOptions }
}
