import { computed, watch } from 'vue'
import { useRoute, useAsyncData, useError, showError, clearNuxtData, useNuxtApp, useRuntimeConfig } from '#app'
import type { RouteLocationNormalized } from '#vue-router'
import type { T3Page } from '../../module'
import { useT3Api } from './useT3Api'
import { hasLayout, useT3Utils } from './useT3Utils'
import { useT3Meta } from './useT3Meta'

export const useT3Page = async (options: {
  route: RouteLocationNormalized,
  fetchOnInit?: boolean
} = {
  route: useRoute(),
  fetchOnInit: true
}) => {
  const { route, fetchOnInit } = options
  const useLegacyAsyncDataPageKey = useRuntimeConfig().public.typo3Internals?.useLegacyAsyncDataPageKey
  const { pageData, getPage, getPageKey } = useT3Api()
  const { headData } = useT3Meta()
  const { redirect } = useT3Utils()
  const { payload } = useNuxtApp()

  const pageCacheKey = computed(() => getPageKey(route.fullPath))

  const { data, execute: getAsyncPage, error } = useAsyncData(
    useLegacyAsyncDataPageKey ? pageCacheKey.value : pageCacheKey,
    () => getPage(route.fullPath),
    {
      immediate: false
    }
  )

  const getPageData = async () => {
    /**
     * If app is running client side only, we need to clear cached data for 't3:page:${pageHash}'
     * to allow refetching data e.g. when redirect happens.
     * https://github.com/nuxt/nuxt/issues/31818
     */
    if (import.meta.client && !payload.serverRendered) {
      clearNuxtData(pageCacheKey.value)
    }

    await getAsyncPage()

    if (error.value) {
      showError({
        ...error.value,
        unhandled: false,
        fatal: true
      })
    }
    if (data.value?.redirectUrl) {
      return redirect(data.value)
    }
    pageData.value = data.value

    return {
      data,
      error
    }
  }

  const pageDataFallback = computed<T3Page | null>(() => {
    const error = useError()

    if (!error.value || !('data' in error.value)) {
      return null
    }

    try {
      if (typeof error.value.data === 'string') {
        return JSON.parse(error.value.data)
      }
      return error.value.data
    } catch {
      return null
    }
  })

  if (fetchOnInit && route) {
    await getPageData()
  }

  watch(() => route.query, getPageData)

  const backendLayout = pageData.value?.appearance?.backendLayout || 'default'
  const frontendLayout = hasLayout(pageData.value?.appearance?.layout) ? pageData.value?.appearance.layout : 'default'

  return {
    pageDataFallback,
    pageData,
    getPageData,
    headData,
    backendLayout,
    frontendLayout
  }
}
