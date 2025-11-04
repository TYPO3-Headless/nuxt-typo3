import { computed } from 'vue'
import type { T3I18N } from '../../module'
import { useT3Options } from '../composables/useT3Options'
import { useT3PageState } from './useT3Api'
import { useT3i18n } from './useT3i18n'

export const useT3Meta = () => {
  const { getCurrentLocaleData } = useT3i18n()
  const currentLocale = getCurrentLocaleData()
  const data = useT3PageState()
  const { currentSiteOptions } = useT3Options()
  const metaData = computed(() => data.value?.meta)
  const seoData = computed(() => data.value?.seo)

  const twitter = computed(() => {
    if (!metaData.value) { return [] }

    const { twitterTitle, twitterDescription, twitterImage, twitterCard, title, description, ogImage } = metaData.value

    return [
      {
        name: 'twitter:title',
        content: twitterTitle || title
      },
      {
        name: 'twitter:description',
        content: twitterDescription || description
      },
      {
        name: 'twitter:image',
        content: twitterImage?.publicUrl || ogImage?.publicUrl || undefined
      },
      {
        name: 'twitter:card',
        content: twitterCard || 'summary'
      }
    ]
  })

  const openGraph = computed(() => {
    if (!metaData.value) { return [] }

    const { ogTitle, ogDescription, ogImage, title, description } = metaData.value
    return [
      {
        property: 'og:title',
        content: ogTitle || title
      },
      {
        property: 'og:description',
        content: ogDescription || description
      },
      {
        property: 'og:type',
        content: 'website'
      },
      {
        property: 'og:image',
        content: ogImage?.publicUrl || undefined
      }
    ]
  })

  const base = computed(() => {
    if (!metaData.value) { return [] }

    return [
      {
        name: 'generator',
        content: 'TYPO3 CMS x T3Headless'
      },
      {
        name: 'description',
        content: metaData.value.description
      },
      {
        name: 'robots',
        content: Object.keys(metaData.value.robots || {})
          .filter(key => metaData.value?.robots?.[key])
          .join(', ')
      }
    ]
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

    return classStringArray.join(' ')
  })

  const links = computed(() => {
    const link: { rel: string; hreflang?: string; href: string }[] = []
    const baseUrl = currentSiteOptions.value?.baseUrl

    if (!baseUrl || !metaData.value) {
      return link
    }

    const canonical = {
      rel: 'canonical',
      href: metaData.value.canonical?.href || ''
    }

    if (baseUrl) {
      data.value?.i18n?.forEach((item: T3I18N) => {
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

  const metaFilter = (meta: any[]) => {
    return meta.filter(
      item =>
        item?.content && (typeof item.content === 'string' && item.content.length > 0)
    )
  }

  const headData = computed(() => {
    if (seoData.value) {
      return {
        ...seoData.value
      }
    }

    if (!metaData.value) {
      return {
        htmlAttrs: {
          lang: currentLocale?.twoLetterIsoCode,
          dir: currentLocale?.direction
        },
        bodyAttrs: {
          class: bodyClassString.value
        }
      }
    }

    const meta = [...base.value, ...twitter.value, ...openGraph.value]

    return {
      title: metaData.value.title,
      htmlAttrs: {
        lang: currentLocale?.twoLetterIsoCode,
        dir: currentLocale?.direction
      },
      bodyAttrs: {
        class: bodyClassString.value
      },
      meta: metaFilter(meta),
      link: links.value
    }
  })

  return {
    metaData,
    headData,
    twitter,
    base,
    openGraph
  }
}
