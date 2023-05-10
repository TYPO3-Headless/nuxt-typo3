import { cleanDoubleSlashes } from 'ufo'
import { callWithNuxt, navigateTo, useNuxtApp } from '#app'
import { T3RedirectData } from '../../types'
import { useT3i18nState } from './useT3i18n'
import { useT3Options } from './useT3Options'

export const useT3Utils = () => {
  const nuxtApp = useNuxtApp()
  const currentLocale = useT3i18nState()
  const { currentSiteOptions } = useT3Options()

  /**
   * Handle TYPO3 Redirect
   * @param {T3RedirectData} redirectData
   * @returns
   */
  const redirect = async (redirectData: T3RedirectData) => {
    await callWithNuxt(nuxtApp, async () => {
      await nuxtApp.callHook('t3:middleware:redirect', redirectData)
      const { redirectUrl, statusCode } = redirectData

      return navigateTo(redirectUrl, {
        redirectCode: statusCode,
        external: true
      })
    })
  }

  /**
   * Get path with current locale code
   * @param path
   * @returns
   */
  const localePath = (path?: string) => {
    const { i18n } = currentSiteOptions.value
    const code = i18n.default === currentLocale.value ? '' : currentLocale.value
    return cleanDoubleSlashes(`/${code}${path ? `/${path}` : ''}`)
  }

  return {
    redirect,
    localePath
  }
}