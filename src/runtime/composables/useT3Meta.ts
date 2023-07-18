import { ComputedRef, computed } from 'vue'
import type { Meta } from 'zhead'
import type { ReactiveHead } from '@unhead/vue'
import type { T3Meta } from '../../types'
import { useT3PageState } from './useT3Api'
import { useT3i18n } from './useT3i18n'

export const useT3Meta = (): {
  metaData: ComputedRef<T3Meta | undefined>
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
  openGraph: ComputedRef<Meta[]>
  /**
  * @deprecated since version 2.0.0, use openGraph
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
    const { twitterTitle, twitterDescription, twitterImage, twitterCard, title, description, ogImage } = metaData.value!

    return [
      {
        id: 'twitter:title',
        name: 'twitter:title',
        content: twitterTitle || title
      },
      {
        id: 'twitter:description',
        name: 'twitter:description',
        content:
          twitterDescription || description
      },
      {
        id: 'twitter:image',
        name: 'twitter:image',
        content: twitterImage?.publicUrl || ogImage?.publicUrl || undefined
      },
      {
        id: 'twitter:card',
        name: 'twitter:card',
        content: twitterCard || 'summary'
      }
    ]
  })

  const openGraph = computed(() => {
    const { ogTitle, ogDescription, ogImage, title, description } = metaData.value!
    return [
      {
        id: 'og:title',
        property: 'og:title',
        content: ogTitle || title
      },
      {
        id: 'og:description',
        property: 'og:description',
        content: ogDescription || description
      },
      {
        id: 'og:type',
        property: 'og:type',
        content: 'website'
      },
      {
        id: 'og:image',
        property: 'og:image',
        content: ogImage?.publicUrl || undefined
      }
    ]
  })

  const base = computed(() => {
    return [
      {
        id: 'generator',
        name: 'generator',
        content: 'TYPO3 CMS x T3Headless'
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

  const links = computed(() => {
    const { canonical } = metaData.value!

    if (!canonical) {
      return []
    }

    return [{
      ref: 'canonical',
      href: canonical.href
    }]
  })

  const headData = computed(() => {
    if (!metaData.value) {
      return {}
    }

    const meta = Array.prototype.concat(base.value, twitter.value, openGraph.value)

    return {
      title: metaData?.value?.title,
      htmlAttrs: {
        lang: currentLocale?.twoLetterIsoCode,
        dir: currentLocale?.direction
      },
      meta: metaFilter(meta),
      link: links
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
    opengraph: openGraph,
    openGraph
  }
}
