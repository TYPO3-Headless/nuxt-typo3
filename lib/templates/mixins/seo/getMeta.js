export default {
  methods: {
    getMeta() {
      const pageData = this.page.page
      const baseUrl = this.$typo3.options.baseURL
      const meta = {
        title:
          pageData.meta.title ||
          pageData.title ||
          this.$nuxt.$options.head.title,
        meta: [
          {
            hid: 'generator',
            name: 'generator',
            content: 'TYPO3 CMS x TYPO3PWA'
          },
          {
            hid: 'og:title',
            name: 'og:title',
            content:
              pageData.meta.title ||
              pageData.title ||
              this.$nuxt.$options.head.title
          }
        ]
      }

      if (pageData.meta.description.length) {
        meta.meta.push({
          hid: 'description',
          name: 'description',
          content: pageData.meta.description
        })
        meta.meta.push({
          hid: 'og:description',
          name: 'og:description',
          content: pageData.meta.description
        })
      }

      if (pageData.meta.canonical && pageData.meta.canonical.url) {
        meta.link = [
          {
            rel: 'canonical',
            href: `${pageData.meta.canonical.type !== 'url' ? baseUrl : ''}${
              pageData.meta.canonical.url
            }`
          }
        ]
      }

      return meta
    }
  }
}
