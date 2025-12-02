import { defineNuxtPlugin, useNuxtApp } from '#app'
import { getProperty, setProperty } from 'dot-prop'
import type { T3InitialData, T3Page } from '../../types'
import { useT3Api, useT3Options } from '#imports'

const processNestedProperty = (
  data: any,
  path: string,
  replaceFn: (value: string) => string
) => {
  if (!data) { return }

  if (path.includes('.*')) {
    const parts = path.split('.*')
    const arrayPath = parts[0]
    const remainingPath = parts.slice(1).join('.*').replace(/^\./, '')

    if (!arrayPath) { return }

    const array = getProperty(data, arrayPath)

    if (Array.isArray(array)) {
      array.forEach((item, index) => {
        if (remainingPath) {
          processNestedProperty(item, remainingPath, replaceFn)
        } else if (typeof item === 'string') {
          array[index] = replaceFn(item)
        }
      })
    }
  } else {
    const value = getProperty(data, path)
    if (value && typeof value === 'string') {
      setProperty(data, path, replaceFn(value))
    }
  }
}

const backslashPageData = (
  pageData: T3Page | T3InitialData | null,
  properties: Array<string> = []
) => {
  if (!pageData || !properties.length) { return pageData }

  for (const property of properties) {
    processNestedProperty(pageData, property, value =>
      value.replaceAll('/', '\\/')
    )
  }

  return pageData
}

const debackslashPageData = (
  pageData: T3Page | T3InitialData | null,
  properties: Array<string> = []
) => {
  if (!pageData || !properties.length) { return pageData }

  for (const property of properties) {
    processNestedProperty(pageData, property, value =>
      value.replaceAll('\\/', '/')
    )
  }

  return pageData
}

export default defineNuxtPlugin(() => {
  const { hook } = useNuxtApp()
  const { currentSiteOptions } = useT3Options()

  const config = currentSiteOptions.value.features?.backslashApiProperties

  if (!config) {
    return
  }

  let pageDataProperties: Array<string> = []
  let initialDataProperties: Array<string> = []
  let unbackslashOnClient = false

  if (Array.isArray(config)) {
    pageDataProperties = config
    initialDataProperties = config
  } else {
    pageDataProperties = config.pageDataProps || []
    initialDataProperties = config.initialDataProps || []
    unbackslashOnClient = config.unbackslashOnClient ?? false
  }

  if (import.meta.server) {
    if (pageDataProperties.length > 0) {
      hook('t3:page', (data: T3Page) => {
        backslashPageData(data, pageDataProperties)
      })
    }

    if (initialDataProperties.length > 0) {
      hook('t3:initialData', (data: T3InitialData) => {
        backslashPageData(data, initialDataProperties)
      })
    }
  }

  if (import.meta.client && unbackslashOnClient) {
    const { pageData, initialData } = useT3Api()

    hook('app:created', () => {
      if (pageDataProperties.length > 0 && pageData.value) {
        debackslashPageData(pageData.value, pageDataProperties)
      }

      if (initialDataProperties.length > 0 && initialData.value) {
        debackslashPageData(initialData.value, initialDataProperties)
      }
    })
  }
})
