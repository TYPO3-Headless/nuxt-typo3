import { ComputedRef, computed } from 'vue'
import type { T3Meta } from '../../types'
import { useT3PageState } from './useT3Api'
import { useT3i18n } from './useT3i18n'
export interface T3MetaForUseHead {
  title: string
  htmlAttrs: {
    lang: string
    dir: string
  }
  meta: object[]
  link: object[]
}

export interface T3MetaObject {
  hid: string
  property?: string
  name?: string
  content: string
}

export const useT3Meta = (): {
  /**
   * TYPO3 Changed Meta Data
   */
  getMeta: ComputedRef<T3MetaForUseHead>
  /**
   * TYPO3 twitterTag
   */
  twitterTags: ComputedRef<T3MetaObject[]>
  /**
   * TYPO3 ogTag
   */
  ogTags: ComputedRef<T3MetaObject[]>
  /**
   * TYPO3 defaultTag
   */
  defaultTags: ComputedRef<T3MetaObject[]>
  metaFilter: (meta: T3MetaObject[]) => T3MetaObject[]
  /**
   * TYPO3 Meta Initial Data
   */
  metaData: ComputedRef<T3Meta>
} => {
  const data = useT3PageState()
  const metaData = computed(() => data.value?.meta)

  const twitterTags = computed(() => {
    return [
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: metaData.value?.twitterTitle || metaData?.value?.title
      },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content:
          metaData?.value?.twitterDescription || metaData?.value?.description
      },
      {
        hid: 'twitter:image',
        property: 'twitter:image',
        content: metaData?.value?.ogImage || null
      },
      {
        hid: 'twitter:card',
        name: 'twitter:card',
        content: metaData?.value?.twitterCard || 'summary'
      }
    ]
  })

  const ogTags = computed(() => {
    return [
      {
        hid: 'og:title',
        property: 'og:title',
        content: metaData.value?.ogTitle || metaData?.value?.title
      },
      {
        hid: 'og:description',
        name: 'og:description',
        content: metaData?.value?.ogDescription || metaData?.value?.description
      },
      {
        hid: 'og:type',
        property: 'og:type',
        content: 'website'
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: metaData?.value?.ogImage || null
      }
    ]
  })

  const defaultTags = computed(() => {
    return [
      {
        hid: 'generator',
        name: 'generator',
        content: 'TYPO3 CMS x TYPO3PWA'
      },
      {
        hid: 'description',
        name: 'description',
        content: metaData?.value?.description
      },
      {
        hid: 'robots',
        name: 'robots',
        content: Object.keys(metaData.value?.robots || {})
          .filter(key => metaData.value?.robots[key])
          .join(', ')
      }
    ]
  })

  const { getCurrentLocaleData } = useT3i18n()
  const currentLocale = getCurrentLocaleData()

  const getMeta = computed(() => {
    const meta = [].concat(defaultTags.value, twitterTags.value, ogTags.value)

    const link = []
    if (metaData?.value?.canonical) {
      link.push({
        ref: 'canonical',
        href: metaData?.value?.canonical
      })
    }

    return {
      title: metaData?.value?.title,
      htmlAttrs: {
        lang: currentLocale?.twoLetterIsoCode,
        dir: currentLocale?.direction
      },
      meta: metaFilter(meta),
      link
    }
  })

  const metaFilter = (meta: T3MetaObject[]) => {
    return meta.filter(
      ({ content }) =>
        !!content && (Object.keys(content).length > 0 || content.length > 0)
    )
  }
  return {
    metaData,
    getMeta,
    twitterTags,
    defaultTags,
    ogTags,
    metaFilter
  }
}
