import { computed, ref } from 'vue'
import type { RouteLocationNormalized } from '#vue-router'
import { useRoute, useAsyncData, showError, clearNuxtData, useNuxtApp } from '#app'
import { useT3Api } from './useT3Api'
import { hasLayout, useT3Utils } from './useT3Utils'
import { useT3Meta } from './useT3Meta'

export const useT3Page = async (options: {
  route: RouteLocationNormalized,
} = {
  route: useRoute()
}) => {
  const { route } = options
  const { pageData, getPage, getPageKey, initialData } = useT3Api()
  const { headData } = useT3Meta()
  const { redirect } = useT3Utils()
  const { isHydrating, payload } = useNuxtApp()

  const pageCacheKey = computed(() => getPageKey(route.fullPath))

  const { data, execute: getAsyncPage, error } = useAsyncData(
    pageCacheKey.value,
    () => getPage(route.fullPath),
    {
      immediate: false
    }
  )

  const getPageData = async () => {
    if (import.meta.client && !useNuxtApp().isHydrating) {
      clearNuxtData(pageCacheKey.value)
      delete payload.data[pageCacheKey.value]
    }

    await getAsyncPage()

    if (error.value || !data.value) {
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

  // call it only on client navigation
  if (route && !import.meta.server && !isHydrating) {
    await getPageData()
  }

  const backendLayout = pageData.value?.appearance?.backendLayout || 'default'
  const frontendLayout = hasLayout(pageData.value?.appearance?.layout) ? pageData.value?.appearance.layout : 'default'

  return {
    pageData: import.meta.server ? pageData : ref(pageData.value),
    getPageData,
    headData,
    backendLayout,
    frontendLayout
  }
}
