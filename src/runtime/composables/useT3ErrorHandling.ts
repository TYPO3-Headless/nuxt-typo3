import { FetchError } from 'ofetch'
import { createError, useRoute } from '#app'
import { useT3Api } from './useT3Api'
import { useT3i18n } from './useT3i18n'

// Note: this is an internal handling and some functionalities might change until stable release.
export const useT3ErrorHandling = (path?: string) => {
  path ??= useRoute().fullPath
  const { pageData, initialData, getInitialData, getPage } = useT3Api(path)

  const handleServerException = async (
    error: FetchError
  ) => {
    if (!process.server) {
      return
    }

    if (error.response && error.response.status !== 404) {
      throw createError({
        fatal: true,
        statusCode: error.response.status || 500,
        statusMessage: error.message
      })
    }

    try {
      await Promise.allSettled([
        getInitialDataFallback(),
        getPageDataFallback()
      ])
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err)
    }

    throw createError({
      unhandled: false,
      fatal: true,
      statusCode: error.response?.status || 404,
      statusMessage: error.message
    })
  }

  const getPageDataFallback = async () => {
    try {
      await getPage(path!, {
        onResponseError (payload) {
          if (JSON.parse(JSON.stringify(payload.response?._data))) {
            pageData.value = payload.response?._data
          }
        }
      })
    } catch (err) {}
  }

  const getInitialDataFallback = async () => {
    const { getPathWithLocale } = useT3i18n(path)

    try {
      initialData.value = await getInitialData(getPathWithLocale())
    } catch (error: unknown) {
      if (error instanceof FetchError) {
        throw createError({
          fatal: true,
          statusCode: error.response?.status || 500,
          statusMessage: `Can't get initialData fallback: ${error.message}`
        })
      }
    }
  }

  const handlePageException = (error: FetchError) => {
    pageData.value = JSON.parse(JSON.stringify(error.data))
    throw createError({
      ...error,
      data: JSON.stringify(error.data),
      fatal: true
    })
  }

  return {
    handleServerException,
    handlePageException
  }
}
