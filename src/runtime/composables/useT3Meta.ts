import { ComputedRef, computed } from 'vue'
import { Meta } from '@zhead/schema'
import type { ReactiveHead } from '@vueuse/head'
import type { T3Meta } from '../../types'
import { useT3PageState } from './useT3Api'
import { useT3i18n } from './useT3i18n'

export const useT3Meta = (): {
  metaData: ComputedRef<T3Meta>
  /**
   * TYPO3 head attributes for Nuxt Head
   */
  headData: ComputedRef<ReactiveHead>
  /**
   * TYPO3 Twitter meta data
   */
  twitter: ComputedRef<Meta[]>
  /**
   * TYPO3 Open Graph meta data
   */
  opengraph: ComputedRef<Meta[]>
  /**
   * TYPO3 base attributes (description, robots, generator)
   */
  base: ComputedRef<Meta[]>
} => {
  const { getCurrentLocaleData } = useT3i18n()
  const currentLocale = getCurrentLocaleData()
  const data = useT3PageState()
  const metaData = computed(() => data.value?.meta)

  const twitter = computed(() => {
    return [
      {
        id: 'twitter:title',
        name: 'twitter:title',
        content: metaData.value?.twitterTitle || metaData?.value?.title
      },
      {
        id: 'twitter:description',
        name: 'twitter:description',
        content:
          metaData?.value?.twitterDescription || metaData?.value?.description
      },
      {
        id: 'twitter:image',
        property: 'twitter:image',
        content: metaData?.value?.ogImage || undefined
      },
      {
        id: 'twitter:card',
        name: 'twitter:card',
        content: metaData?.value?.twitterCard || 'summary'
      }
    ]
  })

  const opengraph = computed(() => {
    return [
      {
        id: 'og:title',
        property: 'og:title',
        content: metaData.value?.ogTitle || metaData?.value?.title
      },
      {
        id: 'og:description',
        name: 'og:description',
        content: metaData?.value?.ogDescription || metaData?.value?.description
      },
      {
        id: 'og:type',
        property: 'og:type',
        content: 'website'
      },
      {
        id: 'og:image',
        property: 'og:image',
        content: metaData?.value?.ogImage || undefined
      }
    ]
  })

  const base = computed(() => {
    return [
      {
        id: 'generator',
        name: 'generator',
        content: 'TYPO3 CMS x TYPO3PWA'
      },
      {
        id: 'description',
        name: 'description',
        content: metaData?.value?.description
      },
      {
        id: 'robots',
        name: 'robots',
        content: Object.keys(metaData.value?.robots || {})
          .filter(key => metaData.value?.robots[key])
          .join(', ')
      }
    ]
  })

  const headData = computed(() => {
    const meta = Array.prototype.concat(base.value, twitter.value, opengraph.value)

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

  const metaFilter = (meta: Partial<Meta>[]) => {
    return meta.filter(
      ({ content }) =>
        !!content && (Object.keys(content).length > 0 || (typeof content === 'string' && content.length > 0))
    )
  }
  return {
    metaData,
    headData,
    twitter,
    base,
    opengraph
  }
}
