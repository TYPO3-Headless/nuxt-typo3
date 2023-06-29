import logger from '~typo3/lib/logger'

export default {
  methods: {
    getMeta () {
      const baseUrl = this.$typo3.options.baseURL
      const direction = this.$store?.state?.typo3?.initial?.languages?.find(lang => lang.active === 1)?.direction || 'ltr'
      const {
        title,
        description,
        canonical,
        ogTitle,
        ogDescription,
        ogImage,
        twitterTitle,
        twitterDescription,
        twitterCard,
        twitterImage,
        robots,
        schema
      } = this.t3page.meta

      const data = {
        title: title || this.$nuxt.$options.head.title,
        htmlAttrs: {
          lang: this.$typo3.i18n.locale,
          dir: direction
        },
        meta: [
          {
            hid: 'generator',
            name: 'generator',
            content: 'TYPO3 CMS x T3Headless'
          },
          {
            hid: 'description',
            name: 'description',
            content: description
          },
          {
            hid: 'robots',
            name: 'robots',
            content: Object.keys(robots || {})
              .filter(key => robots[key])
              .join(', ')
          },

          /**
           * Twitter
           */
          {
            hid: 'twitter:title',
            name: 'twitter:title',
            content:
              twitterTitle ||
              title ||
              this.$nuxt.$options.head.title
          },
          {
            hid: 'twitter:description',
            name: 'twitter:description',
            content: twitterDescription
          },
          {
            hid: 'twitter:card',
            name: 'twitter:card',
            content: twitterCard
          },

          /**
           * Open Graph
           */
          {
            hid: 'og:title',
            property: 'og:title',
            content:
              ogTitle || title || this.$nuxt.$options.head.title
          },
          {
            hid: 'og:description',
            property: 'og:description',
            content: ogDescription || description
          },
          {
            hid: 'og:type',
            property: 'og:type',
            content: 'website'
          }
        ],
        link: []
      }

      /**
       * Twitter Image
       */
      if (twitterImage) {
        data.meta.push({
          hid: `twitter:image:${twitterImage.properties?.uidLocal}`,
          name: 'twitter:image',
          content: twitterImage.publicUrl
        })
      }

      /**
       * Open Graph Image
       */
      if (ogImage) {
        data.meta.push({
          hid: `og:image:${ogImage.properties?.uidLocal}`,
          property: 'og:image',
          content: ogImage.publicUrl
        })
      }

      /**
       * Canonical
       */
      if (canonical && canonical.href) {
        const url = `${baseUrl}${canonical.href}`

        data.link.push({
          rel: 'canonical',
          href: url
        })

        data.meta.push({
          hid: 'og:url',
          property: 'og:url',
          content: url
        })
      }

      /**
       * Inject ld+json schema
       */
      if (schema) {
        try {
          data.script = [
            {
              hid: 'schema',
              type: 'application/ld+json',
              json: JSON.parse(schema)
            }
          ]
        } catch (e) {
          logger.warn(`Error on parsing ld+json schema: ${e}`)
        }
      }

      /**
       * Filter empty meta tags
       */
      data.meta = data.meta.filter(
        ({ content }) =>
          (!!content &&
            Object.prototype.hasOwnProperty.call(content, 'length') &&
            content.length > 0) ||
          (!!content && Object.keys(content).length > 0)
      )

      return data
    }
  }
}
