import type { FetchOptions } from 'ofetch'
import type { Ref } from 'vue'
import { useState, useNuxtApp, useRoute } from '#app'
import { hash } from 'ohash'
import type { T3InitialData, T3Page } from '../../module'
import type { T3Api } from '../lib/apiClient'
import { useT3Options } from '#imports'

/**
 * Get page data state
 * @returns {Ref<T3Page>}
 */
export const useT3PageState = () => {
  const pageState = useState<T3Page | null>('T3:Page')
  return pageState
}

/**
 * Get initial data state
 * @returns {Ref<T3InitialData>}
 */
export const useT3InitialDataState = () => {
  const initialDataState = useState<T3InitialData>('T3:InitialData')
  return initialDataState
}

/**
 * Use API client as composable
 * @param {String} path
 * @param {FetchOptions} options
 */
export const useT3Api = (
  path?: string,
  options?: FetchOptions
): {
  /**
   * TYPO3 Page Data
   */
  pageData: Ref<T3Page | null>
  /**
   * TYPO3 Initial Data
   */
  initialData: Ref<T3InitialData>
  /**
   * Sharable $fetch client for TYPO3 API
   */
  $fetch: T3Api['$fetch']
  /**
   * Get TYPO3 Page data
   */
  getPage(path: string, options?: FetchOptions): Promise<T3Page>
  /**
   * Get unique cache key for TYPO3 page data based on route full path.
   * Falls back to a static key if Nuxt version < 3.17.0 (changed useAsyncData implementation).
   */
  getPageKey(fullPath?: string): string
  /**
   * Get TYPO3 Initial data
   */
  getInitialData(path?: string, options?: FetchOptions): Promise<T3InitialData>
  /**
   * Set API Headers
   */
  setHeaders(headers: Record<string, string>): void,
  /**
   * Set API Client global options
   */
  setOption<T extends keyof FetchOptions>(key: T, value:FetchOptions[T]): void
} => {
  const app = useNuxtApp()
  const { $typo3, callHook } = app
  const defaultPath = path || useRoute().fullPath
  const defaultOptions = options!
  const pageData = useT3PageState()
  const initialData = useT3InitialDataState()
  const { currentSiteOptions } = useT3Options()

  const $fetch = async <T>(
    path: RequestInfo = defaultPath,
    options: FetchOptions = defaultOptions
  ): Promise<T> => {
    return await $typo3.api.$fetch(path, options)
  }

  const getPage = async (
    path: string = defaultPath,
    options: FetchOptions = defaultOptions
  ) => {
    const pageData = await $typo3.api.getPage(path, options)
    await callHook('t3:page', pageData)
    return pageData
  }

  const getPageKey = (fullPath = defaultPath): string => {
    return currentSiteOptions.value.features?.dynamicPageKey ? `t3:page:${hash(fullPath)}` : 't3:page'
  }

  const getInitialData = async (
    path: string = defaultPath,
    options: FetchOptions = defaultOptions
  ) => {
    const initialData = await $typo3.api.getInitialData(path, options)
    await callHook('t3:initialData', initialData)
    return initialData
  }

  const setHeaders = (headers: Record<string, string>) => {
    $typo3.api.setHeaders(headers)
  }

  const setOption = <T extends keyof FetchOptions>(key: T, value:FetchOptions[T]) => {
    $typo3.api.fetchOptions[key] = value
  }

  return {
    pageData,
    initialData,
    $fetch,
    getPage,
    getPageKey,
    getInitialData,
    setHeaders,
    setOption
  }
}
