export default {
  methods: {
    getMeta () {
      const baseUrl = this.$typo3.options.baseURL
      const { meta, socialMedia, title } = this.page.page
      const { canonical, robots } = meta
      const {
        ogTitle,
        ogDescription,
        ogImage,
        twitterTitle,
        twitterDescription,
        twitterCard,
        twitterImage
      } = socialMedia

      const data = {
        title: meta.title || title || this.$nuxt.$options.head.title,
        htmlAttrs: {
          lang: this.$typo3.i18n.locale
        },
        meta: [
          {
            hid: 'generator',
            name: 'generator',
            content: 'TYPO3 CMS x TYPO3PWA'
          },
          {
            hid: 'description',
            name: 'description',
            content: meta.description
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
              meta.title ||
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
              ogTitle || meta.title || title || this.$nuxt.$options.head.title
          },
          {
            hid: 'og:description',
            name: 'og:description',
            content: ogDescription || meta.description
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
      twitterImage.map(image =>
        data.meta.push({
          hid: `twitter:image:${image.properties.uidLocal}`,
          name: 'twitter:image',
          content: image.publicUrl
        })
      )

      /**
       * Open Graph Image
       */
      ogImage.forEach(image =>
        data.meta.push({
          hid: `og:image:${image.properties.uidLocal}`,
          name: 'og:image',
          content: image.publicUrl
        })
      )

      /**
       * Canonical
       */
      if (canonical && canonical.url) {
        const url = `${canonical.type !== 'url' ? baseUrl : ''}${canonical.url}`

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
