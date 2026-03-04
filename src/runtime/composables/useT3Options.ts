import type { Ref } from 'vue'
import { ref } from 'vue'
import { useRuntimeConfig, useRequestHeaders } from '#app'
import type { T3Site, T3Options } from '../../module'
import { getRawHost } from '../lib/url'
import { defu } from "defu";

export const useT3OptionsState = () => {
  const options = ref<T3Site | null>(null)
  return options
}

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
  currentSiteOptions: Ref<T3Site>
} => {
  const config = useRuntimeConfig()
  const options = defu(
      {},
      config.typo3 || {},
      config.public.typo3 || {}
  ) as T3Options
  const currentSiteOptions = useT3OptionsState() as Ref<T3Site>

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

  if (!currentSiteOptions.value) {
    currentSiteOptions.value = getSiteOptions()
  }

  return { options, getSiteOptions, currentSiteOptions }
}
