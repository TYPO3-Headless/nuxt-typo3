import { FetchError } from 'ohmyfetch'
import { H3Error } from 'h3'
import { createError, showError } from '#app'
import { RouteLocationNormalized } from 'vue-router'
import { useT3Api } from './useT3Api'
import { useT3i18nState } from './useT3i18n'

export const enum T3ErrorTypes {
  INITIAL_DATA_FAILED = 1,
  PAGE_DATA_FAILED = 2
}

// Note: this is an internal handling and some functionalities might change until stable release.
export const useT3ErrorHandling = (): {
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
  /**
   * Parse error object
   */
  getFallbackDataFromError(error: H3Error): void
} => {
  const { pageData, initialData, getInitialData } = useT3Api()
  const currentLocale = useT3i18nState()

  const getInitialDataFallback = async () => {
    try {
      return await getInitialData(currentLocale.value)
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

    const fallbackData = {
      initialData: {}
    }

    if (errorContext === T3ErrorTypes.INITIAL_DATA_FAILED) {
      fallbackData.initialData = await getInitialDataFallback()
    }

    throw createError({
      unhandled: false,
      fatal: true,
      statusCode: error.response.status || 404,
      statusMessage: error.message,
      data: JSON.stringify(fallbackData)
    })
  }

  const handleClientPageException = (to: RouteLocationNormalized) => {
    const error = to.meta.t3middlewareError as H3Error

    if (error) {
      showError({
        unhandled: false,
        fatal: true,
        statusCode: error.statusCode || 404,
        statusMessage: error.message
      })
    }
  }

  const getFallbackDataFromError = (error: H3Error) => {
    if (process.server && error.data) {
      const errorDataParsed = JSON.parse(error.data)
      if (errorDataParsed.initialData) {
        pageData.value = errorDataParsed.pageData
        initialData.value = errorDataParsed.initialData
      }
    }
  }

  return {
    handleServerException,
    handleClientPageException,
    getFallbackDataFromError
  }
}
