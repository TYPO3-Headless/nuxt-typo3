import { computed, ref } from 'vue'
import type { Ref } from 'vue'
import { FetchError } from 'ofetch'
import { T3Page } from '../../types'
import { useT3Api } from './useT3Api'
import { useT3Utils } from './useT3Utils'
import { useT3Meta } from './useT3Meta'
import { useT3DynamicBl } from './useT3DynamicComponent'
import { useRoute, useAsyncData, useError, showError } from '#app'
import { RouteLocationNormalized } from '~/.nuxt/vue-router'

export const useT3Page = async (options: {
  route?: RouteLocationNormalized,
  fetchOnInit?: boolean
} = {
  route: useRoute(),
  fetchOnInit: true
}) => {
  const { route, fetchOnInit } = options
  const { pageData, getPage } = useT3Api()
  const { headData } = useT3Meta()
  const { redirect } = useT3Utils()

  const getPageData = async (path: string) => {
    const { data, error } = await useAsyncData('t3:page', () => getPage(path))

    if (data.value) {
      pageData.value = data.value

      if (pageData?.value.redirectUrl) {
        redirect(pageData.value)
      }
    }

    if (error.value as any) {
      const _error = error as any as Ref<FetchError>

      showError({
        unhandled: false,
        fatal: true,
        message: _error.value?.message,
        statusCode: _error.value?.statusCode || 500,
        data: _error.value?.data,
        statusMessage: _error.value?.message
      })
    }

    return { data, error }
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

  const T3BackendLayout = computed(() => useT3DynamicBl(pageData?.value?.appearance?.backendLayout))

  if (fetchOnInit && route) {
    await getPageData(route.fullPath)
  }

  return {
    pageDataFallback,
    pageData: process.server ? pageData : ref<T3Page | null>(pageData.value),
    getPageData,
    headData,
    T3BackendLayout
  }
}
