import { computed } from 'vue'
import type { Meta } from 'zhead'
import type { T3I18N, T3SeoMetaItem } from '../../module'
import { useT3Options } from '../composables/useT3Options'
import { useT3Api, useT3PageState } from './useT3Api'
import { useT3i18n } from './useT3i18n'


export const useT3Meta = () => {
  const { getCurrentLocaleData } = useT3i18n()
  const currentLocale = getCurrentLocaleData()
  const { pageData } = useT3Api()
  const data = useT3PageState()
  const { currentSiteOptions } = useT3Options()
  const metaData = computed(() => data.value?.meta)
  const seoData = computed(() => pageData.value?.seo)

  const twitter = computed(() => {
    if (!metaData.value) {
      return null
    }

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
    if (!metaData.value) {
      return null
    }

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
    if (!metaData.value) {
      return null
    }

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
    const link: { rel: string; hreflang?: string; href: string }[] = []

    if (seoData.value?.link?.length) {
      return seoData.value.link
    }

    const baseUrl = currentSiteOptions.value?.baseUrl
    const canonical = {
      rel: 'canonical',
      href: metaData.value?.canonical?.href || ''
    }

    if (baseUrl) {
      data.value?.i18n.forEach((item: T3I18N) => {
        if (item.active) {
          canonical.href = baseUrl + (canonical.href || item.link)
        }

        if (item.languageId === 0) {
          link.push({
            rel: 'alternate',
            hreflang: 'x-default',
            href: baseUrl + item.link
          })
        }

        if (item.available) {
          link.push({
            rel: 'alternate',
            hreflang: item.hreflang,
            href: baseUrl + item.link
          })
        }
      })
    }
    if (canonical.href) {
      link.push(canonical)
    }

    return link
  })

  const seoMeta = computed(() => {
    if (!seoData.value) {
      return null
    }

    const fallbackRequired = {
      'og:title': true,
      'og:description': true,
      'twitter:title': true,
      'twitter:description': true,
      'twitter:card': true,
      generator: true
    }

    const fallback = {
      'og:title': seoData.value?.title,
      'og:description': seoData.value?.description,
      'twitter:title': seoData.value?.title,
      'twitter:description': seoData.value?.description,
      'twitter:card': 'summary',
      generator: 'TYPO3 CMS x T3Headless'
    }

    const metaArray = seoData.value?.meta.map((item: T3SeoMetaItem) => {
      if (item?.name) {
        if (item.name in fallbackRequired) {
          fallbackRequired[item.name] = false
        }

        return { ...item, id: item.name }
      } else if (item?.property) {
        if (item.property in fallbackRequired) {
          fallbackRequired[item.property] = false
        }

        return { ...item, id: item.property }
      }
      return null
    })

    const metaFallbackArray = Object.keys(fallback).map(key => fallbackRequired?.[key] ? fallback[key] : null)

    const base = [
      {
        id: 'og:type',
        property: 'og:type',
        content: 'website'
      },
      {
        id: 'robots',
        name: 'robots',
        content: Object.keys(seoData.value?.robots || {})
          .filter(key => seoData.value?.robots[key])
          .join(', ')
      }
    ]

    return [...base, ...metaFallbackArray, ...metaArray]
  })

  const headData = computed(() => {
    if (!metaData.value && !seoMeta.value) {
      return {}
    }

    if (!seoMeta.value) {
      // eslint-disable-next-line no-console
      console.log('Using meta object is deprecated. Will be removed in a future major release of ext:headless. Please move to SEO object.')
    }

    const meta = Array.prototype.concat(base.value, twitter.value, openGraph.value)

    return {
      title: metaData?.value?.title,
      htmlAttrs: {
        lang: currentLocale?.twoLetterIsoCode,
        dir: currentLocale?.direction
      },
      bodyAttrs: {
        class: bodyClassString
      },
      meta: seoMeta.value.filter(item => item) || metaFilter(meta),
      link: links
    }
  })

  const bodyClassString = computed(() => {
    const classPrefixes: Record<string, number | string | undefined> = {
      pid: data.value?.id,
      layout: data.value?.appearance?.layout
    }

    const classStringArray: string[] = []

    for (const prefix in classPrefixes) {
      if (classPrefixes[prefix] !== undefined) {
        classStringArray.push(`${prefix}-${classPrefixes[prefix]}`)
      }
    }

    const classString = classStringArray.join(' ')

    return classString
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
