import { computed, ref } from 'vue'
import { useRoute, useAsyncData, showError, createError, clearNuxtData, useNuxtApp } from '#app'
import type { RouteLocationNormalized } from '#vue-router'
import type { T3Page } from '../../types'
import { useT3Api } from './useT3Api'
import { hasLayout, useT3Utils } from './useT3Utils'
import { useT3Meta } from './useT3Meta'
import { getCurrentInstance, onBeforeUnmount } from '#imports'

// TYPO3 can answer with something that is not a page (sitemap XML, backend HTML, files)
const isPageResponse = (value: unknown): value is T3Page =>
  value !== null && typeof value === 'object' && Object.getPrototypeOf(value) === Object.prototype

export const useT3Page = async (options: {
  route: RouteLocationNormalized,
  fetchOnInit: boolean,
  abortSignal: boolean
} = {
  route: useRoute(),
  fetchOnInit: true,
  abortSignal: true
}) => {
  const { route } = options
  const { pageData, getPage, getPageKey, initialData } = useT3Api()
  const { headData } = useT3Meta()
  const { redirect } = useT3Utils()
  const nuxtApp = useNuxtApp()
  const { isHydrating, payload } = nuxtApp
  const pageDataAbortController = new AbortController()
  const isNotHydrating = import.meta.client && !isHydrating

  const pageCacheKey = computed(() => getPageKey(route.fullPath))

  const { data, execute: getAsyncPage, error, refresh } = useAsyncData<T3Page>(
    pageCacheKey.value,
    () => getPage(route.fullPath, {
      signal: pageDataAbortController.signal
    }).then((response) => {
      if (!isPageResponse(response)) {
        throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
      }
      return response
    }),
    {
      immediate: false
    }
  )

  const refreshPageData: () => Promise<void> = () => refresh()

  const getPageData = async () => {
    if (!isNotHydrating) {
      clearNuxtData(pageCacheKey.value)
      delete payload.data[pageCacheKey.value]
    }

    await getAsyncPage()

    // Nuxt context is lost after the await above, so use nuxtApp captured before it.
    // show error page only for current page route
    if ((error.value || !data.value) && nuxtApp._route.fullPath === route.fullPath) {
      nuxtApp.runWithContext(() => showError({
        ...error.value,
        unhandled: false,
        fatal: false,
        data: {
          initialData: initialData.value,
          pageData: error.value?.data
        }
      }))
    }

    if (data.value?.redirectUrl) {
      return redirect(data.value)
    }

    pageData.value = data.value!

    return {
      data,
      error
    }
  }

  // abort paga data fetching on unmounting component
  if (options.abortSignal && getCurrentInstance()) {
    onBeforeUnmount(() => {
      pageDataAbortController.abort()
    })
  }

  // call it only on client navigation
  if (options.fetchOnInit && route && isNotHydrating) {
    await getPageData()
  }

  const backendLayout = pageData.value?.appearance?.backendLayout || 'default'
  const frontendLayoutName = pageData.value?.appearance?.layout
  const frontendLayout = frontendLayoutName && hasLayout(frontendLayoutName) ? frontendLayoutName : 'default'

  return {
    pageData: import.meta.server ? pageData : ref(pageData.value),
    getPageData,
    refreshPageData,
    pageDataAbortController,
    headData,
    backendLayout,
    frontendLayout
  }
}
