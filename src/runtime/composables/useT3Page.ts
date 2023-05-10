import { computed } from 'vue'
import type { FetchError } from 'ofetch'
import { useAsyncData, useRoute } from '#app'
import { useT3Api } from './useT3Api'
import { useT3Utils } from './useT3Utils'
import { useT3Meta } from './useT3Meta'
import { useT3DynamicBl } from './useT3DynamicComponent'
import { useT3ErrorHandling } from './useT3ErrorHandling'

export const useT3Page = async (options: {
  route?: string,
  fetchOnInit?: boolean
} = {
  route: useRoute().fullPath,
  fetchOnInit: true
}) => {
  const { route, fetchOnInit } = options
  const { pageData, getPage } = useT3Api()
  const { handlePageException } = useT3ErrorHandling()
  const { headData } = useT3Meta()
  const { redirect } = useT3Utils()

  const T3BackendLayout = computed(() => useT3DynamicBl(pageData?.value?.appearance?.backendLayout))

  const getPageData = async (path: string) => {
    const { data, error } = await useAsyncData('t3:page', () => getPage(path))

    if (error?.value) {
      return handlePageException(error.value as FetchError)
    }
    if (data?.value?.redirectUrl) {
      redirect(data.value)
    }

    pageData.value = data.value

    return {
      data,
      error
    }
  }

  if (fetchOnInit && route) {
    await getPageData(route)
  }

  return {
    pageData,
    headData,
    T3BackendLayout
  }
}
