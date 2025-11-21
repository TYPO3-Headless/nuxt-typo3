import { computed, ref } from 'vue'
import type { RouteLocationNormalized } from '#vue-router'
import { useRoute, useAsyncData, showError, clearNuxtData, useNuxtApp } from '#app'
import { useT3Api } from './useT3Api'
import { hasLayout, useT3Utils } from './useT3Utils'
import { useT3Meta } from './useT3Meta'
import { getCurrentInstance, onBeforeUnmount } from '#imports'

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
  const { isHydrating, payload } = useNuxtApp()
  const pageDataAbortController = new AbortController()
  const isNotHydrating = import.meta.client && !isHydrating
  const pageCacheKey = computed(() => getPageKey(route.fullPath))

  const { data, execute: getAsyncPage, error, refresh: refreshPageData } = useAsyncData(
    pageCacheKey.value,
    () => getPage(route.fullPath, {
      signal: pageDataAbortController.signal
    }),
    {
      immediate: false
    }
  )

  const getPageData = async () => {
    if (!isNotHydrating) {
      clearNuxtData(pageCacheKey.value)
      delete payload.data[pageCacheKey.value]
    }

    await getAsyncPage()

    // show error page only for current page route
    if ((error.value || !data.value) && useRoute().fullPath === route.fullPath) {
      showError({
        ...error.value,
        unhandled: false,
        fatal: false,
        data: {
          initialData: initialData.value,
          pageData: error.value?.data
        }
      })
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
  const frontendLayout = hasLayout(pageData.value?.appearance?.layout) ? pageData.value?.appearance.layout : 'default'

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
