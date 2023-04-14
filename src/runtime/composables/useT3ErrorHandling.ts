import { FetchError } from 'ofetch'
import { H3Error } from 'h3'
import { createError, showError, useRoute } from '#app'
import { RouteLocationNormalized } from 'vue-router'
import { useT3Api } from './useT3Api'
import { useT3i18n } from './useT3i18n'

export const enum T3ErrorTypes {
  INITIAL_DATA_FAILED = 1,
  PAGE_DATA_FAILED = 2
}

// Note: this is an internal handling and some functionalities might change until stable release.
export const useT3ErrorHandling = (path?: string): {
  /**
   * Create error and pass page content as error data
   */
  handleServerException(
    error: Partial<H3Error>,
    errorContext: T3ErrorTypes
  ): void
  /**
   * Show client error page when page data not exist
   */
  handleClientPageException(to: RouteLocationNormalized): void

} => {
  path ??= useRoute().fullPath
  const { pageData, initialData, getInitialData, getPage } = useT3Api(path)

  const getInitialDataFallback = async () => {
    const { getPathWithLocale } = useT3i18n(path)

    try {
      initialData.value = await getInitialData(getPathWithLocale())
    } catch (error) {
      throw createError({
        fatal: true,
        statusCode: error.response.status || 500,
        statusMessage: `Can't get initialData fallback: ${error.message}`
      })
    }
  }

  const handleServerException = async (
    error: FetchError,
    errorContext: T3ErrorTypes
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

    if (errorContext === T3ErrorTypes.INITIAL_DATA_FAILED) {
      try {
        await Promise.allSettled([
          getInitialDataFallback(),
          getPageDataFallback()
        ])
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err)
      }
    }

    throw createError({
      unhandled: false,
      fatal: true,
      statusCode: error.response.status || 404,
      statusMessage: error.message
    })
  }

  const handleClientPageException = async (to: RouteLocationNormalized) => {
    const error = to.meta.t3middlewareError as H3Error

    if (error) {
      await getPageDataFallback()
      showError({
        unhandled: false,
        fatal: true,
        statusCode: error.statusCode || 404,
        statusMessage: error.message
      })
    }
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

  return {
    handleServerException,
    handleClientPageException
  }
}
