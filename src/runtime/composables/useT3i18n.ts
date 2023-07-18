import type { Ref } from 'vue'
import { computed } from 'vue'
import { parseURL, withoutTrailingSlash } from 'ufo'
import { useNuxtApp, useRoute, useState } from '#app'
import type { T3I18N } from '../../types'
import { useT3Api, useT3InitialDataState } from './useT3Api'
import { useT3Options } from './useT3Options'

export const useT3i18nState = () => {
  const i18nState = useState<string>('T3:i18n')
  return i18nState
}

export const useT3i18n = (
  path?: string | undefined
): {
  /**
   * Get current locale code by path
   */
  getLocale: (path?: string) => string
  /**
   * Set new locale and update initialData
   */
  setLocale: (localeCode: string) => void
  /**
   * Initialize locale (check if different than default)
   */
  initLocale: () => void
  /**
   * Return current locale state
   */
  currentLocale: Ref<string>
  /**
   * Get current locale object
   */
  getCurrentLocaleData: () => T3I18N | null
  /**
   * Return locale code for url path
   */
  getPathWithLocale: (path?: string) => string
} => {
  const { callHook } = useNuxtApp()
  const defaultPath = path || useRoute().fullPath
  const { currentSiteOptions } = useT3Options()
  const { i18n } = currentSiteOptions.value
  const currentLocale = useT3i18nState()

  const getLocale = (path: string = defaultPath) => {
    const { pathname: slugs } = parseURL(path)
    const localeCode = slugs?.split('/')[1]

    if (i18n.locales && i18n.locales?.find(locale => locale === localeCode)) {
      return localeCode // if localCode doesn't exist and current locale is not fallback locale
    }

    return i18n.default
  }

  const setLocale = async (localeCode: string) => {
    const { getInitialData, initialData } = useT3Api(path)
    const oldLocale = currentLocale.value
    currentLocale.value = localeCode
    await callHook('t3:i18n', localeCode, oldLocale)
    initialData.value = await getInitialData(getPathWithLocale())
  }

  const initLocale = async () => {
    currentLocale.value = getLocale()
    await callHook('t3:i18n', currentLocale.value, i18n.default)
  }

  const getPathWithLocale = (path = '') => {
    return withoutTrailingSlash(
      currentLocale.value === i18n.default
        ? path
        : `/${currentLocale.value}${path}`
    )
  }

  const getCurrentLocaleData = () => {
    const initialData = useT3InitialDataState()

    if (!initialData.value) {
      return null
    }

    const locales = computed(() => initialData.value.i18n)
    return locales.value?.find((t3locale) => {
      const twoLettterCurrentLocale = currentLocale.value.split('-')[0]
      return t3locale.twoLetterIsoCode === twoLettterCurrentLocale
    }) || null
  }

  return {
    currentLocale,
    getLocale,
    setLocale,
    initLocale,
    getPathWithLocale,
    getCurrentLocaleData
  }
}
